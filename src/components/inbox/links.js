import Link from "next/link";
import { CircularBadge } from "../badges";

const Links = ({ items, isDisable }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      {items.map((item, i) => (
        item.url ? (<Link href={item.url} key={i}>
          <a className="w-full flex items-center justify-start p-2 text-sm">
            {item.icon}
            <span className="ml-2">{item.name}</span>
            {item.badge && (
              <span className="ml-auto">
                <CircularBadge size="sm" color={item.badge.color}>
                  {item.badge.total}
                </CircularBadge>
              </span>
            )}
          </a>
        </Link>) : (
          <div
            onClick={() => !isDisable ? item.onClick() : null}
            key={i}
            className={item.active ? "bg-gray-100" : ""}>
            <a className="w-full flex items-center justify-start p-2 text-sm">
              {item.icon}
              <span className="ml-2">{item.name}</span>
              {item.badge && (
                <span className="ml-auto">
                <CircularBadge size="sm" color={item.badge.color}>
                  {item.badge.total}
                </CircularBadge>
              </span>
              )}
            </a>
          </div>
        )
      ))}
    </div>
  );
};

export default Links;
