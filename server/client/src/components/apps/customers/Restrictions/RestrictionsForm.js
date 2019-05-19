import React from "react";
import Col from "react-bootstrap/Col";
import { Button, Icon } from "semantic-ui-react";
import Row from "react-bootstrap/Row";
import CustomerStepper from "../../../nav/CustomerStepper.jsx";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Select, { components } from "react-select";
import { restrictionData } from "./restrictionData";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import frozen from "../../../../assets/icons/frozen.png";
import plate from "../../../../assets/icons/plate.png";
import tinfoil from "../../../../assets/icons/tinfoil.png";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Input } from "semantic-ui-react";

class RestrictionsForm extends React.Component {
  getRestrictionData = index => {
    console.log(index);
    return restrictionData[index];
  };
  render() {
    return (
      <React.Fragment>
        {this.props.restrictionData.map(data => {
          return (
            <div key={data.key} id={data.key} style={{ marginBottom: "2%" }}>
              <label htmlFor={data.key}>{data.display}</label>
              <Select
                defaultValue={data.restrictionOptions}
                name={data.key}
                isMulti
                options={this.getRestrictionData(data.key)}
                onChange={this.props.handleRestrictionChange}
                style={selectStyle}
                backspaceRemovesValue={false}
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

const mainColumns = [1, 5, 6];

// ----- Styles ------

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px",
  marginTop: "20px"
};

const boldStyle = {
  fontWeight: "bold"
};

const italicStyle = {
  fontStyle: "italic"
};

const selectDisplayStyle = {
  minWidth: "10px",
  float: "left",
  marginBottom: "0",
  marginRight: "10px",
  marginTop: "2px"
};

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

const divStyle = {
  border: "2px solid #e0e1e2",
  background: "#f8f9fa",
  borderRadius: "5px",
  paddingTop: "20px",
  marginTop: "1%",
  marginBottom: "1%"
};
const centerDiv = {
  marginTop: "auto",
  marginBottom: "auto",
  marginLeft: "1%",
  marginRight: "1%",
  textAlign: "center"
};
const labelStyle = {
  fontWeight: "bold",
  width: "100%",
  marginTop: "2%"
};
const selectStyle = {
  marginTop: "1%"
};

const titlesStyle = {
  marginBottom: "10px"
};

export default RestrictionsForm;
