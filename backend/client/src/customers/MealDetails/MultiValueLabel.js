import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {components} from "react-select";
import "customers/MealDetails/style.css";

export default class MultiValueLabel extends React.Component {
  render() {
    return (
      <components.MultiValueContainer {...this.props}>
        <Row>
          <Col sm="auto" className="flexVertCenter">
            <p>{this.props.data.label}</p>
          </Col>
          <Col className="flexVertCenter" id={this.props.selectProps.parentID}>
            <input
              type="number"
              className="small-input"
              onChange={this.props.selectProps.onNumberChange}
              id={this.props.data.label}
              placeholder={this.props.data.quantity}
              min="1"
              max="20"
            />
          </Col>
        </Row>
      </components.MultiValueContainer>
    );
  }
}
