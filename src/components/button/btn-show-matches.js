import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";

import Modal from "../modals";
import { useLoad } from "../../hooks/load";
import Doc from "../checklist/match/doc";

const LoadView = () => (
  <ContentLoader viewBox="0 0 380 330">
    <rect x="10" y="20" width="350" height="40"/>
    <rect x="10" y="70" width="350" height="40"/>
    <rect x="10" y="120" width="350" height="40"/>
    <rect x="10" y="170" width="350" height="40"/>
    <rect x="10" y="220" width="350" height="40"/>
    <rect x="10" y="270" width="350" height="40"/>
  </ContentLoader>
);

const BtnShowMatches = ({ device, carrier, osVersion, team }) => {
  const [open, setOpen] = useState(false);
  const { page } = useSelector(
    state => ({
      page: state.page
    }),
    shallowEqual
  );
  let requirement = page["VERTICAL_TAB"];
  if (!requirement) {
    requirement = "";
  } else if (requirement?.toLowerCase().includes("client id")) {
    requirement = "Client ID";
  } else if (requirement?.toLowerCase().includes("data slot")) {
    requirement = "Data";
  } else if (requirement?.toLowerCase().includes("stk")) {
    requirement = "STK";
  } else if (requirement?.toLowerCase().includes("samsung galaxy")) {
    requirement = "Samsung Galaxy";
  } else if (requirement?.toLowerCase().includes("power")) {
    requirement = "Power";
  } else if (requirement?.toLowerCase().includes("wallpaper")) {
    requirement = "Wallpaper";
  }

  const queryFilter = {
    contains: requirement,
    device,
    carrier,
    os_version: osVersion,
    team
  };

  const {
    loadData,
    isLoading,
    data
  } = useLoad(
    `/matches/report`);

  return (<>
    <button
      onClick={() => {
        loadData(new URLSearchParams(queryFilter).toString());
        setOpen(true);
      }}
      className="btn btn-default btn-rounded btn-icon bg-blue-500 hover:bg-blue-600 text-white space-x-1">
      <span>Show Matches</span>
    </button>
    <Modal
      title="Matches"
      body={
        <div className="text-sm">
          <div className="w-full mb-4 overflow-y-auto max-h-96 allow-scrollbar"
               style={{ minWidth: "300px" }}>
            {isLoading ? (LoadView()) : <Doc
              noContainer={true}
              matches={data.matches_documentation}/>}
          </div>
        </div>
      }
      open={open}
      setOpen={setOpen}
    />
  </>);
};

export default BtnShowMatches;