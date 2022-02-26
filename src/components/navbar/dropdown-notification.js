import React, { useState, useEffect, useRef } from "react";
import { FiBell } from "react-icons/fi";
import Notifications from "./notifications";

const DropdownNotification = ({
  hasUpdate,
  hasRequiredUpdate,
  hasNews,
  messages,
  clearMessages
}) => {
  const [hidden, setHidden] = useState(true);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        dropdownRef.current.contains(event.target)
      ) {
        return false;
      }
      setHidden(!hidden);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hidden, dropdownRef, buttonRef]);

  const handleDropdownClick = () => {
    setHidden(!hidden);
  };

  return (
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="flex items-center justify-center h-16 w-12">
        <FiBell size={18}/>
        {messages?.length ? (
          <span
            className="absolute uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full bg-red-500 text-white"
            style={{ top: 14, right: 8 }}>
          {messages.length}
        </span>
        ) : null}
      </button>
      <div ref={dropdownRef}
           className={`dropdown absolute top-0 right-0 mt-16 ${hidden
             ? ""
             : "open"}`}>
        <div className="dropdown-content w-96 bottom-start">
          <Notifications hasNews={hasNews} hasRequiredUpdate={hasRequiredUpdate}
                         hasUpdate={hasUpdate} messages={messages}
                         clearMessages={clearMessages}/>
        </div>
      </div>
    </div>
  );
};

export default DropdownNotification;
