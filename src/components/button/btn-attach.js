import React, { useState } from "react";
import AttachModal from "../checklist/attachments/modal";

const BtnAttach = ({ attachments, pushAttach }) => {
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  return <>
    <button
      className="btn btn-sm btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
      onClick={() => setViewerIsOpen(true)}>
      Show Prints
    </button>
    {viewerIsOpen ? (
      <AttachModal
        pushAttach={pushAttach}
        attachments={attachments}
        currentImage={0}
        closeLightBox={() => setViewerIsOpen(false)}/>
    ) : null}
  </>;
};

export default BtnAttach;
