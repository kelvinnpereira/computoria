import React, { useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Portal from "../portal";

const Modal = ({
  title,
  btns,
  body,
  open,
  setOpen,
  maxWidth = "lg:max-w-lg max-w-sm"
}) => {
  const modalRef = useRef(null);
  const { palettes } = useSelector(
    (state) => ({
      palettes: state.palettes
    }),
    shallowEqual
  );
  let { background } = {
    ...palettes
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef || !modalRef.current) return false;
      if (!open || modalRef.current.contains(event.target)) {
        return false;
      }
      setOpen(!open);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, modalRef]);

  return open ? (<Portal selector="#portal">
    <div className="modal-backdrop fade-in" />
    <div
      className={`modal show ${background === "dark" ? "dark" : ""}`}
      data-background={background}>
      <div
        className={`relative w-auto lg:my-4 mx-auto ${maxWidth}`}
        ref={modalRef}>
        <div
          className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
          <div className="relative p-4 flex-auto">
            <div className="flex items-start justify-start p-2 space-x-4">
              <div className="flex flex-col w-full">
                <div className="text-xl mb-2 font-bold text-center">{title}</div>
                {body}
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
            {btns}
          </div>
        </div>
      </div>
    </div>
  </Portal>) : null;
};

export default Modal;
