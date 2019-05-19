import React from "react";

class SimpleRadioButton extends React.Component {
  static defaultProps = {
    checkedBackground: "black",
    background: "white",
    textColor: "black",
    checkedTextColor: "white"
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
                this.props.checked === option.key
                  ? {
                      background: this.props.checkedBackground,
                      color: this.props.checkedTextColor
                    }
                  : {
                      background: this.props.background,
                      color: this.props.textColor
                    }
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
  fontWeight: "bold",
  padding: "12px 20px",
  margin: "0px"
};

const divStyle = {
  border: "solid 2px black",
  display: "inline-block",
  margin: "20px",
  borderRadius: "10px",
  overflow: "hidden"
};

export default SimpleRadioButton;
