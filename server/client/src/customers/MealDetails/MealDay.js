import React from "react";
import Col from "react-bootstrap/Col";
import { Button } from "semantic-ui-react";
import Row from "react-bootstrap/Row";
import { BrowserRouter as Link } from "react-router-dom";
import Select from "react-select";
import MultiValueLabel from "./MultiValueLabel";
import frozen from "assets/icons/frozen.png";
import smallPlate from "assets/icons/small_plate.png";
import largePlate from "assets/icons/large_plate.png";
import tinfoil from "assets/icons/tinfoil.png";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "customers/MealDetails/style.css";
import moment from "moment";

const icons = [
  ["Small Portion on Plate", smallPlate],
  ["Large Portion on Plate", largePlate],
  ["Tinfoil", tinfoil],
  ["Frozen", frozen]
];

class MealDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      extras: [
        { value: "dessert", label: "Dessert", key: 0, quantity: 1 },
        { value: "soup", label: "Soup", key: 1, quantity: 1 },
        { value: "frozen", label: "Frozen", key: 2, quantity: 1 },
        { value: "sandwiches", label: "Sandwiches", key: 3, quantity: 1 },
        { value: "fruit", label: "Fruit", key: 4, quantity: 1 },
        { value: "baking", label: "Baking", key: 5, quantity: 1 }
      ]
    };
  }
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
      <Row id="titles">
        <Col sm={6} className="bold">
          <p>{data.display}</p>
        </Col>
        <Col sm={6} className="italic">
          <p>Extras</p>
        </Col>
      </Row>
    );
  };

  mainForm = data => {
    const date = data.date ? moment(data.date).format("DD/MM/YY") : "_";
    return (
      <Row>
        <Col lg="3">
          <p className="bold">{data.display}</p>
          <OverlayTrigger
            key={"quantityTooltip"}
            placement={"right"}
            overlay={<Tooltip>Quantity</Tooltip>}
          >
            <input
              className="quantity-input"
              id={data.key}
              value={data.quantity}
              type="number"
              min="0"
              max="100"
              onChange={this.props.handleQuantityChange}
            />
          </OverlayTrigger>
        </Col>
        <Col lg="9">
          <p className={date === "_" ? "hiddenDate" : "italic"}>{date}</p>

          <Button.Group id={data.key}>
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
                    style={{ padding: "5px" }}
                  >
                    <img key={i} id={i} src={title[1]} className="iconImage" />
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
          <p className="italic">Extras</p>
          <Select
            parentID={data.key}
            defaultValue={data.extras}
            name={data.key}
            isMulti
            components={{ MultiValueLabel }}
            options={this.state.extras}
            onChange={this.props.handleMealSelectChange}
            onNumberChange={this.props.handleNumberChange}
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

export default MealDay;
