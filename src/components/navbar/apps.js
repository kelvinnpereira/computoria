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
import Router from "next/router";

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
        Router.push("/home");
      },
      title: 'Computoria',
      icon: <FiCode
        className="stroke-current text-xl text-blue-700"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
      icon: <FiList className="stroke-current text-xl text-blue-700"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
      icon: <FiSearch
        className="stroke-current text-xl text-blue-700"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
      icon: <FiPlus
        className="stroke-current text-xl text-blue-700"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
      icon: <BiWrench className="stroke-current text-xl text-red-500"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
      icon: <ImTable
        className="stroke-current text-xl text-red-500"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
      icon: <CgTemplate
        className="stroke-current text-xl text-green-500"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
      icon: <ImInsertTemplate
        className="stroke-current text-xl text-green-500"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
      icon: <BsQuestionCircle
        className="stroke-current text-xl text-green-500"/>
    },
    {
      onClick: () => {
        Router.push("/home");
      },
      title: "Computoria",
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
