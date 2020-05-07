import React from "react";
import PropTypes from "prop-types";

class TextAreaField extends React.Component {
  state = {};

  render() {
    let {label, name, required, placeholder, onChangeHandler, value} = this.props;
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <textarea name={name} placeholder={placeholder} required={required}
                  value={value}
                  onChange={event => onChangeHandler(event.target)} />
      </div>
    );
  }
}

TextAreaField.defaultProps = {required: false, placeholder: ""}

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string
};

export default TextAreaField;
