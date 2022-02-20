import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { FiSettings, FiMenu } from "react-icons/fi";

import DropdownApps from "./dropdown-app";
import DropdownAccount from "./dropdown-account";
import DropdownNotification from "./dropdown-notification";
import Search from "./search";
import { usePush } from "../../hooks/push";
import { useRequirementWebsocket } from "../../hooks/websocket";
import { useFetch } from "../../hooks/fetch";
import DropdownDevices from "./dropdown-device";

const Navbar = () => {
  const { config, auth } = useSelector(
    state => ({
      config: state.config,
      auth: state.auth
    }),
    shallowEqual
  );

  let { rightSidebar, collapsed } = { ...config };

  const dispatch = useDispatch();

  const {
    data,
    reValidate
  } = useFetch(
    `/auth/notification`, { refreshInterval: 120000 });

  const {
    data: dataDevices,
    reValidate: reValidateDevices
  } = useFetch(
    `/tasks/device-connected`);

  const {
    pushData: clearMessages
  } = usePush(
    `/auth/notification`);

  const { socketData } = useRequirementWebsocket(
    `/ws/mapdeveloper/${auth?.username}`, false);

  useEffect(() => {
    if (!socketData?.message) {
      return;
    }

    reValidate({ ...data, messages: socketData.message.message });
  }, [socketData]);

  return (
    <div className="navbar navbar-1 border-b">
      <div className="navbar-inner w-full flex items-center justify-start">
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed
            })
          }
          className="mx-4">
          <FiMenu size={20}/>
        </button>
        <Search/>
        <span className="ml-auto"></span>
        <DropdownDevices devices={dataDevices?.result}
                         refresh={reValidateDevices}/>
        <DropdownApps/>
        {data?.has_update || data?.has_required_update || data?.has_news ||
        data?.messages?.length ? (
          <DropdownNotification
            clearMessages={async () => {
              await clearMessages({ type: "error-messages" });
              reValidate();
            }}
            hasUpdate={data?.has_update}
            hasRequiredUpdate={data?.has_required_update}
            hasNews={data?.has_news}
            messages={data?.messages}/>) : null}
        <DropdownAccount emailCount={data?.email_count}/>
        <button
          className="btn-transparent flex items-center justify-center h-16 w-8 mx-4"
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "rightSidebar",
              value: !rightSidebar
            })
          }>
          <FiSettings size={18}/>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
