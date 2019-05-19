import React from "react";
import Col from "react-bootstrap/Col";
import { Button } from "semantic-ui-react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Link } from "react-router-dom";
import Select, { components } from "react-select";
import { extras } from "./mealFormData";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import frozen from "../../../../assets/icons/frozen.png";
import smallPlate from "../../../../assets/icons/small_plate.png";
import largePlate from "../../../../assets/icons/large_plate.png";
import tinfoil from "../../../../assets/icons/tinfoil.png";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./style.css";

export default class MultiValueLabel extends React.Component {
  render() {
    return (
      <components.MultiValueContainer {...this.props}>
        <div style={selectOuterStyle}>
          <div style={selectInnerStyle}>
            <div>
              <p style={selectDisplayStyle}>{this.props.data.label}</p>
              <input
                type="number"
                className="small-input"
                onChange={this.props.selectProps.onNumberChange}
                id={this.props.data.key}
                placeholder={this.props.data.quantity}
                min="1"
                max="20"
                style={{ width: "30px" }}
              />
            </div>
          </div>
        </div>
      </components.MultiValueContainer>
    );
  }
}

const selectOuterStyle = {
  display: "table",
  justifyContent: "flex-start",
  overflow: "hidden"
};

const selectInnerStyle = {
  display: "table-cell",
  verticalAlign: "middle",
  padding: "5px"
};

const selectDisplayStyle = {
  minWidth: "10px",
  float: "left",
  marginBottom: "0",
  marginRight: "10px",
  marginTop: "2px"
};
