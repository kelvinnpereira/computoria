import {
  FiCompass
} from "react-icons/fi";

import {
  HiOutlineDocumentSearch
} from "react-icons/hi";

import {
  CgListTree, CgTemplate
} from "react-icons/cg";

import { MdBusiness, MdShowChart } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { ImInsertTemplate } from "react-icons/im";
import { FaRocket } from "react-icons/fa";

const getStorageLevel = () => typeof window !== "undefined" &&
localStorage.getItem("level") ? JSON.parse(
  localStorage.getItem("level")) : {
  tasks: [],
};

const menuLevels = getStorageLevel();

const initialState = [
  {
    title: "Computoria",
    items: [
      {
        url: "/home",
        icon: <FiCompass size={20}/>,
        title: "Computoria",
        items: [
          {
            url: "/home",
            title: "Dashboard",
            items: menuLevels.tasks,
            onlyChildren: true
          }
        ]
      },
      {
        url: "/home",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Computoria",
        items: [
          {
            url: "/home",
            title: "Dashboard",
            items: menuLevels.reviews,
            onlyChildren: true
          }
        ]
      },
      {
        url: "/home",
        icon: <CgListTree size={20}/>,
        title: "Computoria",
        items: [
          {
            url: "/home",
            title: "Dashboard",
            items: menuLevels.propagations,
            onlyChildren: true
          }
        ]
      },
      {
        url: "/home",
        icon: <FaRocket size={20}/>,
        title: "Computoria",
        items: [
          {
            url: "/home",
            title: "Dashboard",
            items: menuLevels.pre_releases,
            onlyChildren: true
          }
        ]
      }
    ]
  }
];

export default function navigation (state = initialState, action) {
  switch (action.type) {
    case "ADD_MENU_LEVELS": {
      let newState = Array.from(state);
      if (!menuLevels[action.payload.group]?.filter(
        mLevel => mLevel.title === action.payload.title).length) {
        menuLevels[action.payload.group] = menuLevels[action.payload.group] ??
          [];
        menuLevels[action.payload.group].splice(0, 0, {
          url: action.payload.url,
          title: action.payload.title,
          isRemovable: true,
          items: []
        });
      }

      localStorage.setItem("level", JSON.stringify(menuLevels));
      return newState;
    }
    case "REMOVE_MENU_LEVELS": {
      let newState = Array.from(state);
      if (action.payload.index > -1) {
        action.payload.list.splice(action.payload.index, 1);
      }

      localStorage.setItem("level", JSON.stringify(menuLevels));
      return newState;
    }
    default:
      return state;
  }
}
