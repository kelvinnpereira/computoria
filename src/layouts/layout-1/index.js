import Head from "next/head";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Navbar1 from "../../components/navbar";
import LeftSidebar1 from "../../components/left-sidebar";
import RightSidebar1 from "../../components/right-sidebar";
import { useEffect } from "react";

const Layout1 = ({ children }) => {
  const dispatch = useDispatch();
  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.auth
    }),
    shallowEqual
  );
  const { layout, collapsed } = { ...config };
  let { background, navbar, leftSidebar, rightSidebar } = {
    ...palettes
  };

  useEffect(() => {
    dispatch({ type: "RESTORE_PALETTE" });
    if (!auth?.matricula) {
      dispatch({ type: "RESTORE" });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Computoria</title>
      </Head>
      <div
        data-layout={layout}
        data-collapsed={collapsed}
        data-background={background}
        data-navbar={navbar}
        data-left-sidebar={leftSidebar}
        data-right-sidebar={rightSidebar}
        className={`font-sans antialiased text-sm disable-scrollbars ${
          background === "dark" ? "dark" : ""
        }`}>
        <RightSidebar1/>
        <div className="wrapper">
          <LeftSidebar1/>
          <div
            className="main w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
            <Navbar1/>
            <div className="h-screen w-full p-4 allow-scrollbar overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Layout1;
