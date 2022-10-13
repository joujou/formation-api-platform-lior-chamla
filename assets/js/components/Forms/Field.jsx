import React from 'react'

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder = '',
  type,
  error,
}) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder || label}
        className={'form-control' + (error && ' is-invalid')}
        id={name}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  )
}
export default Field
