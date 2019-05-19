import React from "react";
import Stepper from "../../nav/Stepper";
import CustomerDetailsForm from "./Details/CustomerDetailsForm";
import MealDetailsForm from "./MealDetails/MealDetailsForm";
import { extras } from "./MealDetails/mealFormData";
import RestrictionsForm from "./Restrictions/RestrictionsForm";
import ConfirmForm from "./Confirm/ConfirmForm";
import Col from "react-bootstrap/Col";
import { Button } from "semantic-ui-react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Link } from "react-router-dom";
import {
  baseDivStyle,
  baseContainerStyle,
  baseRowStyle,
  baseButtonColumnStyle
} from "../../styles/baseStyles";
import { stat } from "fs";

const SMALL_MEAL = 0;
const LARGE_MEAL = 1;
const TINFOIL_MEAL = 2;
const FROZEN_MEAL = 3;
const DEFAULT_MEAL = 4;

class CustomerForm extends React.Component {
  state = {
    stepState: {
      stepSize: 4,
      stepData: [
        { key: "0", icon: "address card", title: "Customer details" },
        { key: "1", icon: "utensils", title: "Meal details" },
        { key: "2", icon: "exclamation triangle", title: "Restrictions" },
        { key: "3", icon: "info circle", title: "Confirm" }
      ],
      currentStep: 0
    },
    detailData: {
      title: "",
      firstName: "",
      lastName: "",
      latitude: "",
      longitude: "",
      phone: "",
      email: "",
      address: "",
      notes: ""
    },
    mealData: [
      {
        key: 0,
        quantity: 1,
        display: "Monday",
        extras: [],
        dishType: DEFAULT_MEAL
      },
      {
        key: 1,
        quantity: 1,
        display: "Tuesday",
        extras: [],
        dishType: DEFAULT_MEAL
      },
      {
        key: 2,
        quantity: 1,
        display: "Wednesday",
        extras: [],
        dishType: DEFAULT_MEAL
      },
      {
        key: 3,
        quantity: 1,
        display: "Thursday",
        extras: [],
        dishType: DEFAULT_MEAL
      },
      {
        key: 4,
        quantity: 1,
        display: "Friday",
        extras: [],
        dishType: DEFAULT_MEAL
      },
      {
        key: 5,
        quantity: 1,
        display: "Saturday",
        extras: [],
        dishType: DEFAULT_MEAL
      }
    ],
    restrictionData: [
      { key: 0, display: "Meal Options", restrictionOptions: [] },
      { key: 1, display: "Meat Restrictions", restrictionOptions: [] },
      { key: 2, display: "Vegetable Restrictions", restrictionOptions: [] },
      { key: 3, display: "Fruit Restrictions", restrictionOptions: [] },
      { key: 4, display: "Sandwich Restrictions", restrictionOptions: [] },
      { key: 5, display: "Dessert Restrictions", restrictionOptions: [] },
      { key: 6, display: "Soup Restrictions", restrictionOptions: [] }
    ]
  };

  // -------------------- Stepper Functions

  handleSubmit = () => {
    var stateCopy = this.state;
    delete stateCopy.stepState;
    console.log(stateCopy);
    fetch("http://localhost:3001/api/createCustomer", {
      body: JSON.stringify(stateCopy),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  handleIncrementStep = () => {
    var stepState = { ...this.state.stepState };
    stepState.currentStep =
      stepState.currentStep > 1 ? 0 : stepState.currentStep + 1;
    this.setState({ stepState });
  };

  formChange = direction => {
    var stepState = { ...this.state.stepState };

    var formNumber = stepState.currentStep + direction;
    stepState.currentStep = formNumber;
    this.setState({ stepState });
  };

  // -------------------- Customer Detail Functions

  handleChange = e => {
    const { detailData: prevdetailData } = this.state;
    const detailData = { ...prevdetailData, [e.target.id]: e.target.value };
    this.setState({ ...this.state, detailData });
  };

  // -------------------- Meal Details Functions

  handleQuantityChange = e => {
    const id = e.target.id;
    const { mealData } = this.state;
    mealData[id].quantity = e.target.value;
    this.setState({ mealData });
  };

  handleDishChange = e => {
    const id = e.target.parentNode.id;
    const { mealData } = this.state;
    const index = e.target.id;
    if (mealData[id].dishType == index) {
      mealData[id].dishType = DEFAULT_MEAL;
    } else {
      mealData[id].dishType = index;
    }
    this.setState({ mealData });
  };

  handleMealSelectChange = (newData, id) => {
    const { mealData } = this.state;
    mealData[id.name].extras = newData;
    this.setState({ mealData });
  };

  handleNumberChange = e => {
    if (e.target.value <= e.target.max && e.target.value >= e.target.min) {
      var node = e.target;
      for (var i = 0; i < 9; i++) {
        node = node.parentNode;
      }
      const { mealData } = this.state;
      mealData[node.id].extras[e.target.id].quantity = e.target.value;
      this.setState({ mealData });
    }
  };

  // -------------------- Restriction Details Functions

  handleRestrictionChange = (newData, id) => {
    console.log(newData, id);
    const { restrictionData } = this.state;
    restrictionData[id.name].restrictionOptions = newData;
    this.setState({ restrictionData });
  };

  button = (icon, direction) => {
    return (
      <Button
        circular
        variant="primary"
        type="submit"
        color="blue"
        icon={icon}
        onClick={() => this.formChange(direction)}
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <Stepper
          step={this.handleIncrementStep}
          stepState={this.state.stepState}
        />

        <Container fluid style={baseContainerStyle}>
          <Row style={baseRowStyle}>
            <Col sm="1" style={baseButtonColumnStyle}>
              {this.state.stepState.currentStep != 0 &&
                this.button("arrow left", -1)}
            </Col>

            <Col style={baseDivStyle}>
              {this.state.stepState.currentStep == 0 && (
                <CustomerDetailsForm
                  detailData={this.state.detailData}
                  handleChange={this.handleChange}
                />
              )}

              {this.state.stepState.currentStep == 1 && (
                <MealDetailsForm
                  mealData={this.state.mealData}
                  handleMealSelectChange={this.handleMealSelectChange}
                  handleNumberChange={this.handleNumberChange}
                  handleQuantityChange={this.handleQuantityChange}
                  handleDishChange={this.handleDishChange}
                />
              )}

              {this.state.stepState.currentStep == 2 && (
                <RestrictionsForm
                  restrictionData={this.state.restrictionData}
                  handleRestrictionChange={this.handleRestrictionChange}
                />
              )}

              {this.state.stepState.currentStep == 3 && (
                <ConfirmForm
                  CustomerData={this.state}
                  handleSubmit={this.handleSubmit}
                />
              )}
            </Col>

            <Col sm="1" style={baseButtonColumnStyle}>
              {this.state.stepState.currentStep <
                this.state.stepState.stepSize - 1 &&
                this.button("arrow right", 1)}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default CustomerForm;
