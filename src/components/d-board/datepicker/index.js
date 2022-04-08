import React, { useState } from 'react'
import Datetime from 'react-datetime'
import moment from 'moment';

const Datepicker = ({ label = '' , name = 'date', register, register_obj, timepicker = false, valid}) => {
  const day = 'DD-MM-YYYY';
  const hour = 'HH:mm'
  const format = `${day} ${hour}`;
  const [value, setValue] = useState(null);

  const onChange = v => {
    setValue(v)
  }

  const default_valid = function (current) {
    const yesterday = moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  };
  return (
    <div className="form-element">
      <div className="form-label text-white">{label}</div>
      <Datetime
        defaultValue={new Date()}
        dateFormat={day}
        timeFormat={timepicker ? hour : false}
        input={true}
        inputProps={{
          className: 'form-input',
          placeholder: 'Select date',
          name: name,
          ref: register(register_obj),
          autoComplete: 'off'
        }}
        viewMode={'days'}
        onChange={onChange}
        isValidDate={default_valid}
      />
    </div>
  )
}

export default Datepicker
