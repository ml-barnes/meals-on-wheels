import React from "react";
import BarnesButtonRadio from "./barnesButtonRadio.js";

class BarnesButtonSingle extends BarnesButtonRadio {
  changeChecked = option => {
    if (this.props.checked === true) {
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
}

export default BarnesButtonSingle;
