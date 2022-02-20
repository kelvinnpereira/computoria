import {
  FiCode,
  FiList, FiPlus,
  FiSearch
} from "react-icons/fi";
import { ImTable, ImInsertTemplate } from "react-icons/im";
import { MdSettings } from "react-icons/md";
import { BiWrench } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { CgTemplate } from "react-icons/cg";
import { shallowEqual, useSelector } from "react-redux";
import { HOST } from "../../lib/requirement";
import popupCenter from "../../functions/popup";

const Apps = () => {
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth
    }),
    shallowEqual
  );

  const items = [
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/engineering/p4?${auth.token.replace(" ", "=")}&type=cl`,
          w: 1000,
          h: 800
        });
      },
      title: "CL",
      icon: <FiCode
        className="stroke-current text-xl text-blue-700"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/engineering/p4?${auth.token.replace(" ",
            "=")}&type=workspace`,
          w: 1000,
          h: 800
        });
      },
      title: "Workspace",
      icon: <FiList className="stroke-current text-xl text-blue-700"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/engineering/p4?${auth.token.replace(" ",
            "=")}&type=find`,
          w: 1300,
          h: 600
        });
      },
      title: "Find Files",
      icon: <FiSearch
        className="stroke-current text-xl text-blue-700"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/engineering/p4?${auth.token.replace(" ",
            "=")}&type=extra`,
          w: 1000,
          h: 450
        });
      },
      title: "P4 Extra",
      icon: <FiPlus
        className="stroke-current text-xl text-blue-700"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/engineering/utility/area?${auth.token.replace(" ",
            "=")}`,
          w: 1000,
          h: 800
        });
      },
      title: "Utility",
      icon: <BiWrench className="stroke-current text-xl text-red-500"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/engineering/mps/area?${auth.token.replace(" ",
            "=")}`,
          w: 1400,
          h: 600
        });
      },
      title: "MPS",
      icon: <ImTable
        className="stroke-current text-xl text-red-500"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/requirement/match/area?${auth.token.replace(" ",
            "=")}`,
          w: 1400,
          h: 600
        });
      },
      title: "Match",
      icon: <CgTemplate
        className="stroke-current text-xl text-green-500"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/requirement/template/area?${auth.token.replace(" ",
            "=")}`,
          w: 1400,
          h: 600
        });
      },
      title: "Template",
      icon: <ImInsertTemplate
        className="stroke-current text-xl text-green-500"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/requirement/question/area?${auth.token.replace(" ",
            "=")}`,
          w: 1300,
          h: 600
        });
      },
      title: "Question",
      icon: <BsQuestionCircle
        className="stroke-current text-xl text-green-500"/>
    },
    {
      onClick: () => {
        popupCenter({
          url: `${HOST}/engineering/samsung?${auth.token.replace(" ",
            "=")}&no_layout=True`,
          w: 1300,
          h: 600
        });
      },
      title: "Services",
      icon: <MdSettings
        className="stroke-current text-xl text-green-500"/>
    }
  ];
  return (
    <>
      <div className="dropdown-title">Apps</div>
      <div className="flex flex-wrap text-center">
        {items.map((item, i) => (
          <div
            onClick={item.onClick}
            key={i}
            className="w-1/3 flex flex-col items-center justify-center h-20 space-y-1 dropdown-item cursor-pointer">
            {item.icon}
            <span className="text-xs">{item.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Apps;
