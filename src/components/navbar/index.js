import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { FiSettings, FiMenu } from "react-icons/fi";

import DropdownApps from "./dropdown-app";
import DropdownAccount from "./dropdown-account";
import DropdownNotification from "./dropdown-notification";
import Search from "./search";
import { usePush } from "../../hooks/push";
import { useRequirementWebsocket } from "../../hooks/websocket";
import { useFetch } from "../../hooks/fetch";
import DropdownDevices from "./dropdown-device";

const Navbar = () => {
  const { config, auth } = useSelector(
    state => ({
      config: state.config,
      auth: state.auth
    }),
    shallowEqual
  );

  let { rightSidebar, collapsed } = { ...config };

  const dispatch = useDispatch();

  return (
    <div className="navbar navbar-1 border-b">
      <div className="navbar-inner w-full flex items-center justify-start">
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed
            })
          }
          className="mx-4">
          <FiMenu size={20}/>
        </button>
        <Search/>
        <span className="ml-auto"></span>
        <DropdownApps/>
        <DropdownAccount />
        <button
          className="btn-transparent flex items-center justify-center h-16 w-8 mx-4"
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "rightSidebar",
              value: !rightSidebar
            })
          }>
          <FiSettings size={18}/>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
