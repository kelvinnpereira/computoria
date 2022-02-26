import React, { useState, useEffect, useRef } from "react";
import { FiSmartphone } from "react-icons/fi";
import Devices from "./devices";

const DropdownDevices = ({ devices, refresh }) => {
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
        <FiSmartphone size={18}/>
      </button>
      <div ref={dropdownRef}
           className={`dropdown absolute top-0 right-0 mt-16 ${hidden
             ? ""
             : "open"}`}>
        <div className="dropdown-content w-64 bottom-start">
          <Devices devices={devices} refresh={refresh}/>
        </div>
      </div>
    </div>
  );
};

export default DropdownDevices;
