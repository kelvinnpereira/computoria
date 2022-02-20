import { shallowEqual, useSelector } from "react-redux";
import Link from "next/link";

import { Badge } from "../badges";
import { ProgressBarWithText } from "../progress-bars";
import Tooltip from "../tooltips";
import Dropdown from "./dropdown";

export const Item1 = ({
  img,
  title,
  url,
  subtitle,
  progress,
  progressColor,
  tip,
  description,
  options,
  setOption,
  badges = [],
  urls = []
}) => {
  const { palettes } = useSelector(
    state => ({
      palettes: state.palettes
    }),
    shallowEqual
  );
  const { background } = { ...palettes };

  return (
    <div className="flex flex-col p-2 w-full">
      <div className="flex items-start justify-start mb-2">
        {img ? (<div className="flex-shrink-0 w-8">
          <img
            src={img}
            alt="media"
            className="h-8 shadow-lg rounded-full w-full"
          />
        </div>) : null}
        <div className="ml-2 w-full">
          {url ? (
            <Link href={url}>
              <a
                className="text-sm font-bold cursor-pointer">
                {title}
              </a>
            </Link>
          ) : (
            <div className="text-sm font-bold">
              {title}
            </div>
          )}
          <div className={`text-xs ${background === "dark"
            ? "text-white-500"
            : "text-gray-500"}`}>
            {subtitle}
          </div>
          {description}
        </div>

        {options?.length ? (
          <Dropdown
            setOption={(option) => setOption(option, title)}
            options={options}/>
        ) : null}
      </div>

      {badges.length ? (
        <div
          className="flex flex-row items-center justify-start space-x-1 mb-1">
          {badges.map((badge, i) => (
            <Badge key={i} size="sm" color={badge.color} rounded>
              {badge.title}
            </Badge>
          ))}
        </div>
      ) : null}

      {urls.length ? (
        <div className="flex flex-row justify-end space-x-1">
          {urls.map((item, i) => (
            <a
              className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon"
              key={`link-propagation-${i}`} href={item.url}>
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>
      ) : null}

      {progress ? (
        <div className="w-full">
          <Tooltip
            placement="top"
            content={tip}>
            <ProgressBarWithText width={progress}
                                 color={`bg-${progressColor}-500`}/>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};
