const getStoragePage = () => typeof window !== "undefined" &&
localStorage.getItem("palette") ? JSON.parse(
  localStorage.getItem("palette")) : {
  background: "light",
  leftSidebar: "light",
  navbar: "light",
  rightSidebar: "light"
};

export default function palettes (
  state = {
    background: "light",
    leftSidebar: "light",
    navbar: "light",
    rightSidebar: "light"
  },
  action
) {
  switch (action.type) {
    case "SET_PALETTE": {
      let stateToStore = { ...getStoragePage(), ...action.palette };
      localStorage.setItem("palette", JSON.stringify(stateToStore));
      console.log({
        ...state,
        ...action.palette
      });
      return {
        ...state,
        ...action.palette
      };
    }
    case "RESET_PALETTES": {
      let stateToStore = {
        background: "light",
        leftSidebar: "light",
        navbar: "light",
        rightSidebar: "light"
      };
      localStorage.setItem("palette", JSON.stringify(stateToStore));
      return stateToStore;
    }
    case "RESTORE_PALETTE":
      return getStoragePage();
    default:
      return state;
  }
}
