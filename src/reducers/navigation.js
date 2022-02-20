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
  reviews: [],
  tgrms: [],
  propagations: [],
  pre_releases: []
};

const menuLevels = getStorageLevel();

const initialState = [
  {
    title: "Checklist",
    items: [
      {
        url: "/dashboard/tasks",
        icon: <FiCompass size={20}/>,
        title: "Task",
        items: [
          {
            url: "/dashboard/tasks",
            title: "Dashboard",
            items: menuLevels.tasks,
            onlyChildren: true
          }
        ]
      },
      {
        url: "/dashboard/reviews",
        icon: <HiOutlineDocumentSearch size={20}/>,
        title: "Review",
        items: [
          {
            url: "/dashboard/reviews",
            title: "Dashboard",
            items: menuLevels.reviews,
            onlyChildren: true
          }
        ]
      },
      {
        url: "/dashboard/propagations",
        icon: <CgListTree size={20}/>,
        title: "Propagation",
        items: [
          {
            url: "/dashboard/propagations",
            title: "Dashboard",
            items: menuLevels.propagations,
            onlyChildren: true
          }
        ]
      },
      {
        url: "/dashboard/pre-releases",
        icon: <FaRocket size={20}/>,
        title: "Pre Release",
        items: [
          {
            url: "/dashboard/pre-releases",
            title: "Dashboard",
            items: menuLevels.pre_releases,
            onlyChildren: true
          }
        ]
      }
    ]
  },
  {
    title: "Business Intelligence",
    items: [
      {
        url: "/dashboard/status",
        icon: <MdShowChart size={20}/>,
        title: "Status"
      }
    ]
  },
  {
    title: "Requirement Manager",
    items: [
      {
        url: "/dashboard/tgrms",
        icon: <MdBusiness size={20}/>,
        title: "TGRM",
        items: [
          {
            url: "/dashboard/tgrms",
            title: "Dashboard",
            items: menuLevels.tgrms,
            onlyChildren: true
          }
        ]
      },
      {
        url: "/dashboard/matches",
        icon: <CgTemplate size={20}/>,
        title: "Match"
      },
      {
        url: "/dashboard/templates",
        icon: <ImInsertTemplate size={20}/>,
        title: "Template"
      },
      {
        url: "/dashboard/questions",
        icon: <BsQuestionCircle size={20}/>,
        title: "Question"
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
