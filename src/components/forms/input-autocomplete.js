import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import { getBase } from "../../lib/requirement";

const Input = (props) => {
  return <textarea
    className="border-0 resize-none w-full h-full"
    onChange={props.onChange}
    value={props.value}/>;
};

const InputAutocomplete = ({
  setText,
  url,
  defaultValue,
  isTextarea,
  placeholder = "Select...",
  isMulti = true,
  classNamePrefix
}) => {
  const [newValue, setNewValue] = useState();

  const promiseOptions = async (inputValue) => {
    const response = await getBase(url + inputValue);
    const { results } = response.data;
    return [
      ...results?.map(item => {
        return {
          label: item,
          value: item
        };
      }), { value: newValue, label: newValue }];
  };

  useEffect(() => {
    setNewValue(defaultValue);
  }, [defaultValue]);

  const handleInputChange = (inputValue) => {
    setNewValue(inputValue);
  };

  let key;
  try {
    key = defaultValue?.map(item => item.value).join(",");
  } catch {
  }

  if (isTextarea) {
    return (
      <div className="w-full">
        <AsyncSelect
          key={key}
          isClearable
          backspaceRemovesValue={true}
          components={{ Input }}
          classNamePrefix={classNamePrefix}
          isMulti={isMulti}
          placeholder={<div>{placeholder}</div>}
          onInputChange={handleInputChange}
          onChange={(e) => {
            setText(e);
            handleInputChange("");
          }}
          inputValue={newValue?.value ? newValue?.value : newValue}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              handleInputChange(`${newValue}\n`);
              e.preventDefault();
            }
          }}
          defaultValue={defaultValue}
          loadOptions={promiseOptions}/>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AsyncSelect
        key={key}
        isClearable
        classNamePrefix={classNamePrefix}
        isMulti={isMulti}
        placeholder={<div>{placeholder}</div>}
        onInputChange={handleInputChange}
        onChange={setText}
        defaultValue={defaultValue}
        loadOptions={promiseOptions}/>
    </div>
  );
};

export default InputAutocomplete;