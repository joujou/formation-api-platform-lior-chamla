import React from 'react'

const Select = ({ name, value, error, label, onChange, children }) => {
  return (
    <div className="form-group row">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        className={'form-control' + (error && ' is_invalid')}
        onChange={onChange}
        value={value}
      >
        {children}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

export default Select
