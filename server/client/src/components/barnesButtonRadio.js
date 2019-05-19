import React from "react";

class BarnesButtonRadio extends React.Component {
  static defaultProps = {
    checkedBackground: "#74adf880",
    background: "#e0e1e2",
    textColor: "rgba(0,0,0,.6)",
    checkedTextColor: "black"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      options: props.options,
      checked: props.checked,
      background: props.backgound,
      checkedBackground: props.checkedBackground,
      textColor: props.textColor,
      checkedTextColor: props.checkedTextColor
    };
  }

  changeChecked = option => {
    if (this.props.checked === option.key) {
      return {
        background: this.props.checkedBackground,
        color: this.props.checkedTextColor
      };
    } else {
      return {
        background: this.props.background,
        color: this.props.textColor
      };
    }
  };

  render() {
    return (
      <div style={divStyle}>
        {this.props.options.map(option => {
          return (
            <label
              key={option.key}
              style={Object.assign(
                {},
                labelRadioButton,
                this.changeChecked(option)
              )}
            >
              <input
                type="radio"
                name={this.state.name}
                value={option.key}
                checked={this.props.checked === option.key}
                onChange={this.props.handleOptionChange}
                style={removeRadioButton}
              />
              {option.text}
            </label>
          );
        })}
      </div>
    );
  }
}

const removeRadioButton = {
  position: "absolute",
  visibility: "hidden",
  display: "none"
};

const labelRadioButton = {
  display: "inline-block",
  cursor: "pointer",
  padding: "3px 3px",
  margin: "0px"
};

const divStyle = {
  border: "solid 2px #e5e5e5",
  display: "inline-block",
  margin: "5px 5px 0px 0px",
  borderRadius: "5px",
  overflow: "hidden"
};

export default BarnesButtonRadio;
