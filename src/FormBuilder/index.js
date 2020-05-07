import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./form-elements/button";
import CheckboxField from "./form-elements/checkbox-field";
import OptionRadioField from "./form-elements/option-radio-field";
import TextField from "./form-elements/text-field";
import TextAreaField from "./form-elements/textarea-field";
import { v4 as uuidv4 } from "uuid";

class FormBuilder extends Component {
  state = { id: uuidv4() };

  valueToState = ({ name, value, checked, type }) => {
    this.setState(current => {
      if (type === "checkbox") {
        console.log(name, value);
        if (!current[name] && checked) {
          return { ...current, [name]: [value] };
        }

        if (current[name] && checked) {
          return { ...current, [name]: [...current[name], value] };
        }

        if (current[name] && !checked) {
          return {
            ...current,
            [name]: current[name].filter(val => val !== value)
          };
        }
      }
      return { [name]: value };
    });
  };

  validateForm = event => {
    event.preventDefault();
    // TODO: Do extra validations
    this.sendForm();
  };

  cleanForm = () => {
    this.setState({
      ...Object.assign(...Object.keys(this.state).map(k => ({ [k]: null }))),
      id: uuidv4()
    });
  };

  sendForm = () => {
    const { action, method } = this.props;
    const data = this.state;

    fetch(action, {
      method: method, // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.cleanForm();
        console.log("Success:", response);
      });
  };

  render() {
    const debug = false;
    const { action, method, name, fields } = this.props;

    return (
      <form action={action} method={method} onSubmit={this.validateForm}>
        <legend>{name}</legend>
        {debug && <pre>{JSON.stringify(this.state, null, 2)}</pre>}
        {fields.map((currentField, index) => {
          switch (currentField.type) {
            case "text":
            case "email":
            case "number":
              return (
                <TextField
                  {...currentField}
                  key={index}
                  value={this.state[currentField.name] || ""}
                  onChangeHandler={this.valueToState}
                />
              );
            case "textarea":
              return (
                <TextAreaField
                  {...currentField}
                  key={index}
                  value={this.state[currentField.name] || ""}
                  onChangeHandler={this.valueToState}
                />
              );
            case "radio":
              return (
                <OptionRadioField
                  {...currentField}
                  key={index}
                  value={this.state[currentField.name]}
                  onChangeHandler={this.valueToState}
                />
              );
            case "checkbox":
              return (
                <CheckboxField
                  {...currentField}
                  key={index}
                  value={this.state[currentField.name]}
                  onChangeHandler={this.valueToState}
                />
              );
            case "button":
              return <Button key={index} {...currentField} />;
            default:
              return null;
          }
        })}
      </form>
    );
  }
}

FormBuilder.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  name: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      required: PropTypes.bool,
      label: PropTypes.string,
      placeholder: PropTypes.string,
      option: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      )
    })
  )
};

export default FormBuilder;
