import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import { Item1 } from "./items";
import Title from "./title";
import { getColor } from "../../functions/colors";

const Kanban = ({
  data,
  setOption = (option, task) => console.log(option, task),
  columnCount = 4
}) => {
  const { palettes } = useSelector(
    state => ({
      palettes: state.palettes
    }),
    shallowEqual
  );
  const { background } = { ...palettes };

  const getItemStyle = () => {
    let color = background === "dark" ? "bg-gray-800" : "bg-gray-50";
    return {
      background: getColor(color)
    };
  };

  return (
    <div className="w-full" key={background}>
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2">
        {data?.map((lane, index) =>
          <div className={`w-full mb-4 lg:w-1/${columnCount} lg:mb-2`}
               key={`kanban-lane-${index}`}>
            <Title title={lane.title} total={lane.cards.length}/>
            <div
              className="w-full space-y-2">
              {lane.cards.map((item, i) => (
                <div
                  key={`kanban-container-${i}`}
                  className="p-0 m-0 border-gray-200 border rounded"
                  style={getItemStyle()}>
                  <Item1 key={item.id} {...item} setOption={setOption}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kanban;
