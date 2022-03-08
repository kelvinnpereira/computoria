import { FiSearch } from "react-icons/fi";
import { shallowEqual, useSelector } from "react-redux";
import { useState } from "react";
import popupCenter from "../../functions/popup";
import { HOST } from "../../lib/api";

const Search = () => {
  const [text, setText] = useState("");
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth
    }),
    shallowEqual
  );

  return (
    <div className="w-full max-w-xs mr-2 navbar-search">
      <div className="relative">
        <input
          type="search"
          name="search"
          placeholder="Requirement Search..."
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              popupCenter({
                url: `${HOST}/requirement/search?${auth.token.replace(" ",
                  "=")}&text=${text}`,
                w: 1200,
                h: 800
              });
              setText("");
            }
          }}
          onChange={event => setText(event.target.value)}
          className="pl-10 pr-5 appearance-none h-10 w-full rounded-full text-sm focus:outline-none"
        />
        <button className="absolute top-0 mt-3 left-0 ml-4">
          <FiSearch className="stroke-current h-4 w-4"/>
        </button>
      </div>
    </div>
  );
};

export default Search;
