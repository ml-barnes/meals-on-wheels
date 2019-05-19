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
import MultiValueLabel from "./MultiValueLabel";
import frozen from "../../../../assets/icons/frozen.png";
import smallPlate from "../../../../assets/icons/small_plate.png";
import largePlate from "../../../../assets/icons/large_plate.png";
import tinfoil from "../../../../assets/icons/tinfoil.png";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./style.css";
import moment from "moment";

const icons = [
  ["Small Portion on Plate", smallPlate],
  ["Large Portion on Plate", largePlate],
  ["Tinfoil", tinfoil],
  ["Frozen", frozen]
];

class MealDay extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row key={this.props.day.key} id={this.props.day.key}>
          <Col>
            {this.forms(this.props.day)}
            {this.horizontalLine()}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  button = (icon, link) => {
    return (
      <Link to={link}>
        <Button
          circular
          variant="primary"
          type="submit"
          color="blue"
          icon={icon}
        />
      </Link>
    );
  };

  titles = data => {
    return (
      <Row id="titles" style={titlesStyle}>
        <Col sm={6} style={boldStyle}>
          <p>{data.display}</p>
        </Col>
        <Col sm={6} style={italicStyle}>
          <p>Extras</p>
        </Col>
      </Row>
    );
  };

  mainForm = data => {
    const date = moment(data.date).format("DD/MM/YY");
    return (
      <Row style={{ alignItems: "center" }}>
        <Col sm="2">
          <p style={boldStyle}>{data.display}</p>
          <OverlayTrigger
            key={"quantityTooltip"}
            placement={"right"}
            overlay={<Tooltip>Quantity</Tooltip>}
          >
            <input
              className="small-input"
              id={data.key}
              value={data.quantity}
              type="number"
              min="0"
              max="100"
              onChange={this.props.handleQuantityChange}
              style={inputStyle}
            />
          </OverlayTrigger>
        </Col>
        <Col
          sm="10"
          style={{
            paddingRight: "10%",
            paddingLeft: "10%"
          }}
        >
          <p style={{ height: "20px" }}>{date}</p>

          <Button.Group id={data.key} style={{ marginRight: "7%" }}>
            {icons.map((title, i) => {
              return (
                <OverlayTrigger
                  key={title[0] + "Tooltip"}
                  placement={"top"}
                  overlay={<Tooltip>{title[0]}</Tooltip>}
                >
                  <Button
                    key={i}
                    id={i}
                    onClick={this.props.handleDishChange}
                    size="mini"
                    toggle
                    active={this.props.day.dishType == i}
                    style={buttonPad}
                  >
                    <img key={i} id={i} src={title[1]} style={iconImage} />
                  </Button>
                </OverlayTrigger>
              );
            })}
          </Button.Group>
        </Col>
      </Row>
    );
  };

  forms = data => {
    return (
      <Row id="forms">
        <Col sm={5} style={{ alignSelf: "center" }}>
          {this.mainForm(data)}
        </Col>
        <Col sm={7} id={data.key}>
          <p style={italicStyle}>Extras</p>
          <Select
            defaultValue={data.extras}
            name={data.key}
            isMulti
            components={{ MultiValueLabel }}
            options={extras}
            onChange={this.props.handleMealSelectChange}
            onNumberChange={this.props.handleNumberChange}
            style={selectStyle}
            backspaceRemovesValue={false}
          />
        </Col>
      </Row>
    );
  };

  horizontalLine = () => {
    return (
      <Row>
        <Col id={"line"}>
          <hr />
        </Col>
      </Row>
    );
  };
}

const mainColumns = [1, 5, 6];

// ----- Styles ------

const boldStyle = {
  fontWeight: "bold"
};

const titlesStyle = {
  marginBottom: "10px"
};

const iconImage = {
  width: "28px",
  height: "28px",
  pointerEvents: "none"
};

const buttonPad = {
  padding: "5px"
};

const inputStyle = {
  width: "100%",
  height: "26px",
  marginTop: "7px",
  marginBottom: "7px"
};

const italicStyle = {
  fontStyle: "italic",
  textAlign: "left"
};

const selectStyle = {
  marginTop: "1%"
};

export default MealDay;
