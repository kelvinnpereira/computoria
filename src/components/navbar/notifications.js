import { FiX } from "react-icons/fi";
import { shallowEqual, useSelector } from "react-redux";

const Notifications = ({
  hasUpdate,
  hasRequiredUpdate,
  hasNews,
  messages,
  clearMessages
}) => {
  const { palettes } = useSelector(
    state => ({
      palettes: state.palettes
    }),
    shallowEqual
  );
  const { background } = { ...palettes };
  return (
    <div className="flex flex-row flex-wrap overflow-y-auto"
         style={{ maxHeight: "48rem" }}>
      {hasUpdate || hasRequiredUpdate || hasNews ? (
        <>
          <div className="flex space-x-3">
            <div className="text-sm font-bold ml-4 mt-2">Alerts</div>
          </div>
          {hasUpdate ? (
            <div className="w-full">
              <div
                className="flex items-center justify-start dropdown-item p-2">
                <div className="ml-2">
                  <div className="text-xs">There is a new optional service
                    version
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {hasRequiredUpdate ? (
            <div className="w-full">
              <div
                className="flex items-center justify-start dropdown-item p-2">
                <div className="ml-2">
                  <div className="text-xs">There is a new required service
                    version
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {hasNews ? (
            <div className="w-full">
              <div
                className="flex items-center justify-start dropdown-item p-2">
                <div className="ml-2">
                  <div className="text-xs">There are newsletter to read
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {messages?.length ? (<div className="flex space-x-3" key={background}>
        <div className={`text-sm font-bold ml-4 mt-2 ${background === "dark"
          ? "text-white-500"
          : "text-black"}`}>Messages
        </div>
        <FiX size={18}
             onClick={clearMessages}
             className="stroke-current mt-2 text-gray-400 cursor-pointer"/>
      </div>) : null}


      {messages?.map((item, i) => (
        <div key={i} className="w-full">
          <div
            className="flex items-center justify-start dropdown-item p-2"
            key={i}>
            <div className="ml-2">
              <div
                className="text-xs whitespace-pre-line break-words">{item.message}</div>
              <div
                className="text-gray-400 font-light mb-2 text-xs">{item.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
