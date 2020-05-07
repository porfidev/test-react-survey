import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const isChecked = (selectedValue, allValues) => {
  return !allValues ? false : allValues.includes(selectedValue);
};

const CheckboxField = ({ label, name, options, value, onChangeHandler }) => {
  return (
    <div>
      <label>{label}</label>
      {options.map(currentOption => {
        return (
          <React.Fragment key={uuidv4()}>
            <label htmlFor={currentOption.value}>{currentOption.label}</label>
            <input
              type="checkbox"
              name={name}
              id={currentOption.value}
              value={currentOption.value}
              checked={isChecked(currentOption.value, value)}
              onChange={event => onChangeHandler(event.target)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
};

export default CheckboxField;
