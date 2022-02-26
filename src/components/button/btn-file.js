import React, { useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { put } from "../../lib/requirement";

const BtnFile = ({ task, refresh }) => {
  const inputFileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFileChange = async (e) => {
    setIsLoading(true);
    let formData = new FormData();
    Array.from(e.target.files).forEach(file => {
      formData.append("attaches", file);
    });
    const response = await put(`/checklist/attachments/${task}/`, formData,
      { "Content-Type": "multipart/form-data", cookie: document.cookie });
    refresh(response.data);
    setIsLoading(false);
  };

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  return <>
    <input
      type="file"
      hidden
      multiple
      ref={inputFileRef}
      onChange={onFileChange}
    />
    <button
      className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
      onClick={onBtnClick}>
      {isLoading
        ? (<FaSpinner className="spin-spinner stroke-current mr-2 inline align-middle"/>)
        : null}
      Add Files
    </button>
  </>;
};
export default BtnFile;