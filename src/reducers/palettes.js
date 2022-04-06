const getStoragePage = () => typeof window !== "undefined" &&
localStorage.getItem("palette") ? JSON.parse(
  localStorage.getItem("palette")) : {
  background: "dark",
  leftSidebar: "dark",
  navbar: "dark",
  rightSidebar: "dark"
};

export default function palettes (
  state = {
    background: "dark",
    leftSidebar: "dark",
    navbar: "dark",
    rightSidebar: "dark"
  },
  action
) {
  switch (action.type) {
    case "SET_PALETTE": {
      let stateToStore = { ...getStoragePage(), ...action.palette };
      localStorage.setItem("palette", JSON.stringify(stateToStore));
      return {
        ...state,
        ...action.palette
      };
    }
    case "RESET_PALETTES": {
      let stateToStore = {
        background: "dark",
        leftSidebar: "dark",
        navbar: "dark",
        rightSidebar: "dark"
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
