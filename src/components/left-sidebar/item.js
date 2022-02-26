import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiChevronRight, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

const Item = ({
  url,
  icon,
  title,
  badge,
  isRemovable,
  index,
  items,
  parent,
  onlyChildren
}) => {
  const [hidden, setHidden] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  let { pathname, asPath } = { ...router };
  let active = pathname === url || asPath.replace(new RegExp("%20", "g"), " ") === url;
  if (pathname === "/" && url === "/dashboard") {
    active = true;
  }
  if (pathname === "/" && url !== "/dashboard") {
    active = false;
  }
  const itemsOnlyChildren = items?.filter(item=> item.onlyChildren && !item?.items?.length);
  if (!items?.length || itemsOnlyChildren?.length === items?.length) {
    if (onlyChildren) {
      return null;
    }
    const link = (className) => <Link href={url}>
      <a className={className}
         style={{ flex: "1" }}>
        {icon}
        <span className="title" style={{ flex: "1" }}>{title.length > 17 ? `${title.substring(0, 17)}...` : title}</span>
        {badge && (
          <span className={`badge badge-circle badge-sm ${badge.color}`}>
              {badge.text}
            </span>
        )}
      </a>
    </Link>;

    return (
      isRemovable ? (
        <div className="flex">
          {link(`pr-3 pl-3 left-sidebar-item ${active ? "active" : ""}`)}
          <button className="btn btn-circle self-center mr-1"
                  title="Remove item"
                  onClick={() => dispatch({
                    type: "REMOVE_MENU_LEVELS",
                    payload: {
                      list: parent.items,
                      index: index
                    }
                  })}>
            <FiX size={18} className="stroke-current text-gray-400"/>
          </button>
        </div>
      ) : link(`left-sidebar-item ${active ? "active" : ""}`)
    );
  }

  if (icon) {
    return (<button
      onClick={() => setHidden(!hidden)}
      className={`left-sidebar-item ${active ? "active" : ""} ${
        hidden ? "hidden-sibling" : "open-sibling"
      }`}>
      {icon}
      <span className="title">{title}</span>
      {badge && (
        <span className={`badge badge-circle badge-sm ${badge.color}`}>
          {badge.text}
        </span>

      )}
      <FiChevronRight className="ml-auto arrow"/>
    </button>);
  }

  return (
    <Link href={url}>
      <a className={`pr-3 pl-3 left-sidebar-item ${active ? "active" : ""}`}
         style={{ flex: "1" }}>
        {icon}
        <span className="title" style={{ flex: "1" }}>{title}</span>
        {badge && (
          <span className={`badge badge-circle badge-sm ${badge.color}`}>
              {badge.text}
            </span>
        )}
      </a>
    </Link>
  );
};

export default Item;
