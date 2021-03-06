import { shallowEqual, useSelector } from "react-redux";
import { FiMail, FiUser, FiLogIn, FiSettings } from "react-icons/fi";
import { BiCloudDownload } from "react-icons/bi";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AccountLinks = ({ emailCount }) => {
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth
    }),
    shallowEqual
  );
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(Cookies.get('cargo') === 'coordenador'
      ?
      [
        {
          url: "/home/coordenador",
          icon: <FiMail size={18} className="stroke-current" />,
          name: "Inbox",
          badge: emailCount ? ({
            number: emailCount > 9 ? "+9" : emailCount,
            color: "bg-blue-500 text-white"
          }) : null
        },
        {
          url: "/perfil",
          icon: <FiUser size={18} className="stroke-current" />,
          name: "Perfil",
          badge: null
        },
        {
          url: "/home/coordenador",
          icon: <FiSettings
            className="stroke-current" />,
          name: "Admin",
          badge: null
        },
        {
          url: "/auth/logout",
          icon: <FiLogIn size={18} className="stroke-current" />,
          name: "Logout",
          badge: null
        }
      ]
      :
      [
        {
          url: "/home/usuario",
          icon: <FiMail size={18} className="stroke-current" />,
          name: "Inbox",
          badge: emailCount ? ({
            number: emailCount > 9 ? "+9" : emailCount,
            color: "bg-blue-500 text-white"
          }) : null
        },
        {
          url: "/perfil",
          icon: <FiUser size={18} className="stroke-current" />,
          name: "Perfil",
          badge: null
        },
        {
          url: "/home/usuario",
          icon: <FiSettings
            className="stroke-current" />,
          name: "Admin",
          badge: null
        },
        {
          url: "/auth/logout",
          icon: <FiLogIn size={18} className="stroke-current" />,
          name: "Logout",
          badge: null
        }
      ]
    )
  })

  return (
    <div className="flex flex-col w-full">
      <ul className="list-none">
        {items.map((item, i) => (
          <li key={i} className="dropdown-item">
            <a href={item.url}
              className="flex flex-row items-center justify-start h-10 w-full px-2">
              {item.icon}
              <span className="mx-2">{item.name}</span>
              {item.badge && (
                <span
                  className={`uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full ${item.badge.color} ml-auto`}>
                  {item.badge.number}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountLinks;
