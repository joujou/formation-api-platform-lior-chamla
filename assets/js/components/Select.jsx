import React from 'react'
import { Link } from 'react-router-dom'

const Select = ({ name, value, error, label, onChange, children }) => {
  return (
    <div className="form-group">
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
