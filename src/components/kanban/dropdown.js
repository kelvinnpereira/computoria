import { useState, useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
import Link from "next/link";

const Options = ({ setOption, options }) => {

  return (
    <div className="flex flex-col w-full">
      <ul className="list-none">
        {options.map((item, i) => (
          <li key={i}>
            <Link href="#">
              <a
                onClick={() => setOption(item)}
                className="flex flex-row items-center justify-start h-10 w-full px-2 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800">
                {item}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dropdown = ({ setOption, options }) => {
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
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="btn btn-default btn-circle btn-icon bg-transparent hover:bg-transparent active:bg-transparent relative">
        <FiMoreVertical className="stroke-current stroke-1" size={18}/>
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown absolute top-0 right-0 mt-8 ${hidden
          ? ""
          : "open"}`}>
        <div className="dropdown-content w-48 bottom-start">
          <Options
            setOption={(option) => {
              setOption(option);
              handleDropdownClick();
            }}
            options={options}/>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
