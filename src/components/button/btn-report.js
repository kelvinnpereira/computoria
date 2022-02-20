import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { shallowEqual, useSelector } from "react-redux";

import InputAutocomplete from "../forms/input-autocomplete";
import { usePush } from "../../hooks/push";

const BtnReport = ({ message, uri, id, data, autocompleteUrl }) => {
  const [isShow, setShow] = useState(false);
  const [text, setText] = useState(message);
  const { palettes } = useSelector(
    state => ({
      palettes: state.palettes
    }),
    shallowEqual
  );
  const { background } = { ...palettes };
  const {
    pushData,
    isLoading
  } = usePush(
    uri, id && { type: "CACHE_PAGE", id: id });
  const btnColor = message
    ? "bg-yellow-500 hover:bg-yellow-600"
    : "bg-blue-500 hover:bg-blue-600 ";
  return isShow ? (
    <div className="flex flex-col w-full">
      {autocompleteUrl ? (
        <InputAutocomplete
          isMulti={false}
          placeholder="Enter something..."
          classNamePrefix={"lp-copy-sel"}
          isTextarea={true}
          url={autocompleteUrl}
          defaultValue={text ? {
            value: text,
            label: text
          } : null}
          setText={(newValue) => setText(newValue?.value || "")
          }/>
      ) : (
        <textarea
          key={background}
          name="name"
          className={`form-textarea border-0 ml-2 ${background === "dark"
            ? "text-gray-500"
            : "bg-gray-100"}`}
          rows="3"
          onChange={(event) => setText(event.target.value)}
          value={text}
          placeholder="Enter something..."/>
      )}
      <button onClick={async () => {
        await pushData({ ...data, comment: text });
        setShow(false);
      }}
              className="btn btn-sm btn-rounded bg-blue-500 hover:bg-blue-600 text-white self-end mt-1">
        {isLoading
          ? <FaSpinner
            className="spin-spinner stroke-current mr-2 inline align-middle"/>
          : null}
        Save
      </button>
    </div>
  ) : (
    <button onClick={() => setShow(true)}
            className={"btn btn-sm btn-rounded text-white " + btnColor}>
      Report
    </button>
  );
};

export default BtnReport;
