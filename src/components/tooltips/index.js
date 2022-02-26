import React, { useState, useRef } from "react";
import { usePopper } from "react-popper";

const Tooltip = ({
  placement,
  content,
  children,
  contentWidth = "w-64"
}) => {
  const [hidden, setHidden] = useState(true);

  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  const { styles, attributes } = usePopper(
    buttonRef.current,
    tooltipRef.current,
    {
      placement: placement,
      modifiers: [
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [0, 0]
          }
        }
      ]
    }
  );

  const showTooltip = () => {
    setHidden(false);
  };
  const hideTooltip = () => {
    setHidden(true);
  };

  return (
    <div className="hidden lg:flex relative">
      <div
        ref={buttonRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="flex w-full">
        {children}
      </div>
      <div ref={tooltipRef} style={styles.popper} {...attributes.popper}>
        <div
          style={styles.offset}
          className={`bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 font-normal text-sm max-w-xs no-underline break-words rounded-lg shadow-lg ${contentWidth} z-10 ${hidden
            ? "hidden"
            : "block"}`}>
          <div className="p-2" dangerouslySetInnerHTML={{
            __html: content.replaceAll("\n", "<br>")
          }}/>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
