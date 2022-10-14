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
    <div className="form-group row">
      <label className="form-label-plaintext" htmlFor={name}>
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
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
export default Field
