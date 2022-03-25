import React, { useState } from 'react'
import Datetime from 'react-datetime'
import moment from 'moment';

const Datepicker = () => {
  const day = 'DD-MM-YYYY';
  const hour = 'HH:mm'
  const format = `${day} ${hour}`;
  const [value, setValue] = useState(null);

  const onChange = v => {
    setValue(v)
  }

  const valid = function (current) {
    const yesterday = moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  };
  return (
    <div className="form-element">
      <span className="text-sm text-default">
        <span>Date picker</span>
        {value && <span>: {value.format(format)}</span>}
      </span>
      <Datetime
        defaultValue={new Date()}
        dateFormat={day}
        timeFormat={hour}
        input={true}
        inputProps={{
          className: 'form-input',
          placeholder: 'Select date'
        }}
        viewMode={'days'}
        onChange={onChange}
        isValidDate={valid}
      />
    </div>
  )
}

export default Datepicker
