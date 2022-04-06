import React, { useState } from 'react'
import Datetime from 'react-datetime'

const Timepicker = ({ label = '', register, register_obj, name = 'datetime', initialValue = '00:00', valid }) => {
  const hour = 'HH:mm'
  const [value, setValue] = useState(initialValue)

  const onChange = v => {
    setValue(v)
  }

  const default_valid = (current) => {
    let isValid = valid ? valid(current) : true;
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(current) && isValid;
  }

  return (
    <div className="form-element">
      <div className="form-label text-white">{label}</div>
      <Datetime
        initialValue={initialValue}
        dateFormat={false}
        timeFormat={hour}
        input={true}
        inputProps={{
          className: 'form-input',
          placeholder: `Selecione a hora`,
          name: name,
          ref: register(register_obj),
          autoComplete:'off'
        }}
        viewMode={'days'}
        onChange={onChange}
        isValidDate={default_valid}
      />
    </div>
  )
}

export default Timepicker
