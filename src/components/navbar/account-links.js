import { shallowEqual, useSelector } from "react-redux";
import { FiMail, FiUser, FiLogIn, FiSettings } from "react-icons/fi";
import { BiCloudDownload } from "react-icons/bi";
import Link from "next/link";

import popupCenter from "../../functions/popup";
import { BASE_HOST, HOST } from "../../lib/requirement";

const AccountLinks = ({ emailCount }) => {
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth
    }),
    shallowEqual
  );
  const items = [
    {
      url: "/",
      icon: <FiMail size={18} className="stroke-current"/>,
      name: "Inbox",
      badge: emailCount ? ({
        number: emailCount > 9 ? "+9" : emailCount,
        color: "bg-blue-500 text-white"
      }) : null
    },
    {
      onClick: () => popupCenter({
        url: `${HOST}/checklist/map_developer/form?${auth.token.replace(
          " ", "=")}`,
        w: 800,
        h: 700
      }),
      icon: <FiUser size={18} className="stroke-current"/>,
      name: "Map Developer",
      badge: null
    },
    {
      onClick: () => popupCenter({
        url: `${BASE_HOST}/admin`,
        w: 1200,
        h: 800
      }),
      icon: <FiSettings
        className="stroke-current"/>,
      name: "Admin",
      badge: null
    },
    {
      url: `${BASE_HOST}/media/run_ui.exe`,
      icon: <BiCloudDownload size={18} className="stroke-current"/>,
      name: "Download run_ui.exe"
    },
    {
      url: "/logout",
      icon: <FiLogIn size={18} className="stroke-current"/>,
      name: "Logout",
      badge: null
    }
  ];

  const renderLink = (item) =>
    <a onClick={item.onClick}
       className="flex flex-row items-center justify-start h-10 w-full px-2">
      {item.icon}
      <span className="mx-2">{item.name}</span>
      {item.badge && (
        <span
          className={`uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full ${item.badge.color} ml-auto`}>
                    {item.badge.number}
                  </span>
      )}
    </a>;
  return (
    <div className="flex flex-col w-full">
      <ul className="list-none">
        {items.map((item, i) => (
          <li key={i} className="dropdown-item">
            {item.url ? (
              <Link href={item.url}>
                {renderLink(item)}
              </Link>
            ) : renderLink(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountLinks;
