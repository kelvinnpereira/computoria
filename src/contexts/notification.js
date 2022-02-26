import React, { useState } from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";

import Portal from "../components/portal";

const ContextNotification = React.createContext(null);

const ContextNotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");
  const [color, setColor] = useState("bg-red-500");
  const [show, setShow] = useState(false);

  const onSetNotification = (n, nColor = "bg-red-500") => {
    setNotification(n);
    setColor(nColor);
    setShow(true);
  };

  return (
    <ContextNotification.Provider value={{ onSetNotification }}>
      {children}
      {show ? (
        <Portal selector="#portal">
          <div
            className={`z-50 transform fixed top-0 left-0 h-auto w-96 p-4 ${show
              ? "animate__animated animate__tada"
              : ""}`}>
            <div
              className={`w-full flex items-center justify-start p-4 ${color} text-white`}>
              <div className="flex-shrink">
                <FiAlertCircle
                  className="mr-2 stroke-current h-4 w-4"/></div>
              <div className="flex-grow"><span>{notification}</span>
              </div>
              <div className="flex-shrink">
                <button
                  onClick={() => setShow(false)}
                  className="ml-auto flex items-center justify-center">
                  <FiX className="stroke-current h-4 w-4 ml-2"/>
                </button>
              </div>
            </div>
          </div>
        </Portal>
      ) : null}
    </ContextNotification.Provider>
  );
};

export { ContextNotification, ContextNotificationProvider };