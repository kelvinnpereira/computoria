import { FiSmartphone, FiRefreshCw, FiAlertCircle, FiX } from "react-icons/fi";
import { shallowEqual, useSelector } from "react-redux";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import ContentLoader from "react-content-loader";

import Modal from "../modals";
import { useLoad } from "../../hooks/load";
import Portal from "../portal";

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

const Devices = ({ devices, refresh }) => {
  const { palettes } = useSelector(
    state => ({
      palettes: state.palettes
    }),
    shallowEqual
  );
  const { background } = { ...palettes };
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("set_csc_by_device");
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isActionLoading, setActionLoading] = useState(false);

  const items = devices?.map(d => {
    return {
      ...d,
      icon: <FiSmartphone
        className="stroke-current text-xl text-blue-500"/>
    };
  });

  const {
    loadData
  } = useLoad(
    "/tasks/device-connected");

  const asyncLoadData = async (item) => {
    const info = await loadData(`type=info_by_device&arg=${item.serial}`);
    setDeviceInfo(
      <div className="flex flex-col">
        <div className="flex flex-row mb-3">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-row">
              <span className="text-sm font-bold mr-1 mb-1">CL: </span>
              <span className="text-sm">{info.CL}</span>
            </div>
            <div className="flex flex-row">
              <span className="text-sm font-bold mr-1 mb-1">PDA: </span>
              <span className="text-sm">{info.PDA}</span>
            </div>
            <div className="flex flex-row">
              <span className="text-sm font-bold mr-1 mb-1">CSC: </span>
              <span className="text-sm">{info.CSC}</span>
            </div>
            <div className="flex flex-row">
              <span className="text-sm font-bold mr-1 mb-1">EM-TOKEN: </span>
              <span className="text-sm">{info["EM-TOKEN"]}</span>
            </div>
            <div className="flex flex-row">
              <span className="text-sm font-bold mr-1 mb-1">IMEI: </span>
              <span className="text-sm">{info.IMEI}</span>
            </div>
            <div className="flex flex-row">
          <span
            className="text-sm font-bold mr-1 mb-1">Official Release: </span>
              <span className="text-sm">{info["Official Release"]}</span>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex flex-row">
            <span
              className="text-sm font-bold mr-1 mb-1">Product Code: </span>
              <span className="text-sm">{info["Product Code"]}</span>
            </div>
            <div className="flex flex-row">
              <span className="text-sm font-bold mr-1 mb-1">RES Path: </span>
              <span className="text-sm">{info["RES Path"]}</span>
            </div>
            <div className="flex flex-row">
            <span
              className="text-sm font-bold mr-1 mb-1">Serial: </span>
              <span className="text-sm">{info.Serial}</span>
            </div>
            <div className="flex flex-row">
          <span
            className="text-sm font-bold mr-1 mb-1">TSS-A.ID: </span>
              <span className="text-sm">{info["TSS - ActivatedID"]}</span>
            </div>
            <div className="flex flex-row">
              <span
                className="text-sm font-bold mr-1 mb-1">TSS - CarrierID: </span>
              <span className="text-sm">{info["TSS - CarrierID"]}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <div className="flex flex-row">
            <span className="text-sm font-bold mr-1 mb-1">ETC Path: </span>
            <span className="text-sm">{info["ETC Path"]}</span>
          </div>
          <div className="flex flex-row">
            <span className="text-sm font-bold mr-1 mb-1">OMC Path: </span>
            <span className="text-sm">{info["OMC Path"]}</span>
          </div>
        </div>
      </div>
    );
  };
  const showDeviceInfo = (item) => {
    setCurrentDevice(item);
    setLoading(true);
    asyncLoadData(item);
    setDeviceInfo(
      <div className="flex flex-col">
        {LoadView()}
      </div>
    );
    setOpen(!open);
    setLoading(false);
  };

  const executeOption = async () => {
    setActionLoading(true);
    await loadData(`type=${option}&arg=${currentDevice.serial}`);
    setActionLoading(false);
    setShowNotification(true);
  };

  const modal = () => (
    <Modal
      maxWidth="max-w-md"
      title={`${currentDevice?.device} - ${currentDevice?.carrier}`}
      body={
        <div className="w-96" key={background}>
          {deviceInfo}
        </div>
      }
      btns={
        <div className="flex items-end space-x-2">
          <div className="form-element" style={{ marginBottom: 0 }}>
            <select className="form-select"
                    onChange={(event) => setOption(event.target.value)}>
              <option value="set_csc_by_device">Set CSC</option>
              <option value="skip_wizard">Skip Wizard</option>
              <option value="stay_awake_by_device">Stay Awake</option>
              <option value="wake_up_by_device">Wake Up</option>
              <option value="set_ema_token_id_by_device">Set EMA Token
              </option>
              <option value="clear_data_by_device">Clear Launcher Data
              </option>
              <option value="connect_wifi_by_device">Connect Wifi</option>
              <option value="download_mode_by_device">Enter Download Mode
              </option>
              <option value="setup_wizard_by_device">Fill Setup Wizard
              </option>
              <option value="set_csc_calculator_mode">Set CSC by Calculator
              </option>
              <option value="stk_icon">Show STK Icon</option>
              <option value="bootanimation_attach_by_device">Get Boot
                Animation Gif
              </option>
            </select>
          </div>
          <button
            className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white mb-1"
            type="button"
            onClick={executeOption}>
            {isActionLoading
              ? (<FaSpinner
                className="spin-spinner stroke-current mr-2 inline align-middle"/>)
              : null}
            Execute
          </button>
        </div>
      }
      open={open}
      setOpen={setOpen}
    />
  );

  const notification = () => (
    <Portal selector="#portal">
      <div
        className={`z-50 transform fixed top-0 left-0 h-auto w-96 p-4 ${showNotification
          ? "animate__animated animate__tada"
          : ""}`}>
        <div
          className={`w-full flex items-center justify-start p-4 bg-blue-500 text-white`}>
          <div className="flex-shrink"><FiAlertCircle
            className="mr-2 stroke-current h-4 w-4"/></div>
          <div className="flex-grow">
            <span>Action executed with success !</span>
          </div>
          <div className="flex-shrink">
            <button
              onClick={() => setShowNotification(false)}
              className="ml-auto flex items-center justify-center">
              <FiX className="stroke-current h-4 w-4 ml-2"/>
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );

  return (
    <>
      <div className="flex justify-between">
        <div className="dropdown-title">Devices</div>
        <FiRefreshCw size={18}
                     onClick={async () => {
                       setLoading(true);
                       await refresh();
                       setLoading(false);
                     }}
                     className={`stroke-current mt-2 mr-2 text-gray-400 cursor-pointer ${isLoading
                       ? "spin-spinner"
                       : ""}`}/>

      </div>
      <div className="flex flex-wrap text-center">
        {items?.length ? items?.map((item, i) => (
          <div
            onClick={() => showDeviceInfo(item)}
            key={i}
            className="w-1/3 flex flex-col items-center justify-center h-20 space-y-1 dropdown-item cursor-pointer">
            {item.icon}
            <span className="text-xs">{item.device}</span>
            <span className="text-xs">{item.carrier}</span>
          </div>
        )) : (<h6 className={`text-center m-auto mb-2 ${background === "dark"
          ? "text-white-500"
          : "text-black"}`}>No Devices</h6>)}
      </div>
      {modal()}
      {showNotification ? notification() : null}
    </>
  );
};

export default Devices;
