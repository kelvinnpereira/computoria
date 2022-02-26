import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiAlertCircle, FiX } from "react-icons/fi";

import { usePush } from "../../hooks/push";
import Portal from "../portal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function getIdentify (title, uri, data) {
  let identify = `${title}${uri}_BTN_ACTION`;
  if (data) {
    identify += new URLSearchParams(data).toString();
  }
  return identify;
}

const BtnAction = ({
  title,
  uri,
  id,
  data,
  callback,
  posProcess,
  className = "btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon",
  disabled,
  threadDisable,
  preventPush = false,
  preventNotification = false,
  method = "PUT"
}) => {
  const identify = getIdentify(title, uri, data);

  const { page } = useSelector(
    state => ({
      page: state.page
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [alertMessage, setAlertMessage] = useState("");

  const [open, setOpen] = useState(false);

  const isThreadDisable = threadDisable ? threadDisable.threads.filter(
    thread => page[threadDisable.identify]?.includes(thread))?.length : false;

  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };

  const {
    pushData
  } = usePush(
    uri, id && { type: "CACHE_PAGE", id: id }, method);

  useEffect(() => {
    dispatch({
      type: "CACHE_PAGE",
      payload: {
        id: identify,
        value: { ...page[identify], title: title }
      }
    });
  }, [identify]);

  const onClick = useCallback(async () => {
    dispatch({
      type: "CACHE_PAGE",
      payload: {
        id: identify,
        value: { ...page[identify], isLoading: true }
      }
    });

    callback && callback();
    let response;
    if (!preventPush) {
      response = await pushData(data);
    }

    posProcess && posProcess(response);

    show();

    dispatch({
      type: "CACHE_PAGE",
      payload: {
        id: identify,
        value: { ...page[identify], isLoading: false }
      }
    });

    setAlertMessage(
      `The process "${page[identify]?.title}" was executed with success!`);
  }, [page[identify]]);

  const showPortal = useCallback(() => (
    <Portal selector="#portal">
      <div
        className={`z-50 transform fixed top-0 left-0 h-auto w-96 p-4 ${show
          ? "animate__animated animate__tada"
          : ""}`}>
        <div
          className={`w-full flex items-center justify-start p-4 bg-blue-500 text-white`}>
          <div className="flex-shrink"><FiAlertCircle
            className="mr-2 stroke-current h-4 w-4"/></div>
          <div className="flex-grow"><span>{alertMessage}</span>
          </div>
          <div className="flex-shrink">
            <button
              onClick={hide}
              className="ml-auto flex items-center justify-center">
              <FiX className="stroke-current h-4 w-4 ml-2"/>
            </button>
          </div>
        </div>
      </div>
    </Portal>
  ), [alertMessage]);

  return <>
    <button
      disabled={disabled || isThreadDisable}
      className={className}
      onClick={onClick}>
      {page[identify]?.isLoading
        ? <FaSpinner
          className="spin-spinner stroke-current mr-2 inline align-middle"/>
        : null}
      {title}
    </button>
    {open && !preventNotification ? showPortal() : null}
  </>;
};

export default BtnAction;
