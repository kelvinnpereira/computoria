export const Timeline2 = ({ items }) => {
  return (
    <div className="flex flex-row w-full justify-center">
      {items.map((item, i) => (
        <div className="flex flex-col justify-center items-center" key={i}
             style={{ flex: "1" }}>
          <div
            className="w-full h-6 inset-0 flex items-center justify-center">
            <div
              className="w-full h-1 bg-gray-200 dark:bg-gray-800 pointer-events-none"></div>
          </div>
          {item.main ? (<div
            className="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center text-white relative z-10 font-medium text-sm bottom-6 relative bg-green-500">
            {item.index}
          </div>) : (<div
            className="flex-shrink-0 w-6 h-6 rounded-full inline-flex items-center justify-center text-white relative z-10 font-medium text-sm bottom-6 relative bg-blue-500">
            {item.index}
          </div>)}
          <div className="flex-grow flex items-start flex-col pb-4 -mt-4">
            <div className="flex items-start justify-start">
              <div className="flex flex-col w-full">
                <div className="text-sm font-bold">{item.title}</div>
                <div className="text-sm">{item.sentence}</div>
                <div className="text-sm">{item.timeago}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
