import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export const VerticalStorageTabs = ({
  tabs, openTab, setOpenTab
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-start justify-start tabs"
         style={{ background: "transparent" }}>
      <div className="flex-shrink-0">
        <div className="flex flex-wrap flex-col space-y-2">
          {tabs.map((tab, key) => (
            <button
              key={key}
              onClick={() => {
                setOpenTab(tab.index);
                dispatch({
                  type: "CACHE_PAGE",
                  payload: {
                    id: "VERTICAL_TAB",
                    value: tab.name
                  }
                });
              }}
              className={`tab tab-pill ${
                openTab === tab.index ? "tab-active" : ""
              }`}
              type="button">
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div className="ml-0 w-full">
        {tabs.map((tab, key) => (
          <div
            key={key}
            style={{ background: "transparent" }}
            className={`tab-content ${
              openTab !== tab.index ? "hidden" : "block"
            }`}>
            {openTab === tab.index ? tab.content : null}
          </div>
        ))}
      </div>
    </div>
  );
};

VerticalStorageTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      content: PropTypes.element,
      title: PropTypes.any
    })
  ).isRequired
};

export const VerticalTabs = ({ tabs }) => {
  const dispatch = useDispatch();
  const [openTab, setOpenTab] = useState(0);
  return (
    <div className="flex flex-row items-start justify-start tabs"
         style={{ background: "transparent" }}>
      <div className="flex-shrink-0">
        <div className="flex flex-wrap flex-col space-y-2">
          {tabs.map((tab, key) => (
            <button
              key={key}
              onClick={() => {
                setOpenTab(tab.index);
                dispatch({
                  type: "CACHE_PAGE",
                  payload: {
                    id: "VERTICAL_TAB",
                    value: tab.name
                  }
                });
              }}
              className={`tab tab-pill ${
                openTab === tab.index ? "tab-active" : ""
              }`}
              type="button">
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div className="ml-0 w-full">
        {tabs.map((tab, key) => (
          <div
            key={key}
            style={{ background: "transparent" }}
            className={`tab-content ${
              openTab !== tab.index ? "hidden" : "block"
            }`}>
            {openTab === tab.index ? tab.content : null}
          </div>
        ))}
      </div>
    </div>
  );
};

VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      content: PropTypes.element,
      title: PropTypes.any
    })
  ).isRequired
};

export const Pills = ({ tabs }) => {
  const [openTab, setOpenTab] = useState(0);
  return (
    <div className="flex flex-wrap flex-col w-full tabs">
      <div className="flex lg:flex-wrap flex-row lg:space-x-2">
        {tabs.map((tab, key) => (
          <div key={key} className="flex-none">
            <button
              onClick={() => {
                setOpenTab(tab.index);
              }}
              className={`tab tab-pill ${
                openTab === tab.index ? "tab-active" : ""
              }`}
              type="button">
              {tab.title}
            </button>
          </div>
        ))}
      </div>
      {tabs.map((tab, key) => (
        <div
          key={`tab-${key}`}
          className={`tab-content ${
            openTab !== tab.index ? "hidden" : "block"
          }`}>
          {openTab === tab.index ? tab.content : null}
        </div>
      ))}
    </div>
  );
};

Pills.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      content: PropTypes.element,
      title: PropTypes.any
    })
  ).isRequired
};

export const IconTabs = ({
  tabs,
  openActions,
  openTab,
  setOpenTab
}) => {
  return (
    <div className="flex flex-wrap flex-col w-full tabs"
         style={{ background: "transparent" }}>
      <div className="flex lg:flex-wrap flex-row lg:space-x-2">
        {tabs.map((tab, key) => (
          <div key={key} className="flex-none">
            <button
              key={`btn_${key}`}
              onClick={() => {
                setOpenTab(tab.index);
                if (openActions) {
                  openActions(tab.actions);
                }
              }}
              className={`tab rounded-lg flex flex-row items-center justify-around ${
                openTab === tab.index ? "tab-active" : ""
              }`}
              type="button">
              {tab.title}
            </button>
          </div>
        ))}
      </div>
      {tabs.map((tab, key) => (
        <div
          key={key}
          style={{ background: "transparent" }}
          className={`tab-content ${
            openTab !== tab.index ? "hidden" : "block"
          }`}>
          {openTab === tab.index ? tab.content : null}
        </div>
      ))}
    </div>
  );
};

IconTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      content: PropTypes.element,
      title: PropTypes.any
    })
  ).isRequired
};

export const UnderlinedTabs = ({ tabs }) => {
  const [openTab, setOpenTab] = useState(0);
  return (
    <div className="flex flex-wrap flex-col w-full tabs">
      <div className="flex lg:flex-wrap flex-row lg:space-x-2">
        {tabs.map((tab, key) => (
          <div key={key} className="flex-none">
            <button
              onClick={() => {
                setOpenTab(tab.index);
              }}
              className={
                openTab === tab.index
                  ? "tab tab-underline tab-active"
                  : "tab tab-underline"
              }
              type="button">
              {tab.icon ? tab.icon : null}
              {tab.title}
            </button>
          </div>
        ))}
      </div>
      {tabs.map((tab, key) => (
        <div
          key={key}
          className={`tab-content ${
            openTab !== tab.index ? "hidden" : "block"
          }`}>
          {openTab === tab.index ? tab.content : null}
        </div>
      ))}
    </div>
  );
};

UnderlinedTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      content: PropTypes.element,
      title: PropTypes.any
    })
  ).isRequired
};

export const DefaultTabs = ({ tabs }) => {
  const [openTab, setOpenTab] = useState(0);
  return (
    <div className="flex flex-wrap flex-col w-full tabs">
      <div className="flex lg:flex-wrap flex-row lg:space-x-2">
        {tabs.map((tab, key) => (
          <div key={key} className="flex-none">
            <button
              onClick={() => {
                setOpenTab(tab.index);
              }}
              className={`tab ${openTab === tab.index ? "tab-active" : ""}`}
              type="button">
              {tab.title}
            </button>
          </div>
        ))}
      </div>
      {tabs.map((tab, key) => (
        <div
          key={`tab-${key}`}
          className={`tab-content ${
            openTab !== tab.index ? "hidden" : "block"
          }`}>
          {openTab === tab.index ? tab.content : null}
        </div>
      ))}
    </div>
  );
};

DefaultTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      content: PropTypes.element,
      title: PropTypes.any
    })
  ).isRequired
};
