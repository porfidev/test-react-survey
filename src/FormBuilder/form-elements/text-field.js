import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  type,
  label,
  name,
  required,
  placeholder,
  onChangeHandler,
  value
}) => {
  console.log('rendere');
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={event => onChangeHandler(event.target)}
        value={value}
      />
    </div>
  );
};

TextField.propTypes = {
  type: PropTypes.oneOf(["text", "email", "number"]),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string
};

export default TextField;
