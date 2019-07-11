import React from "react";
import Stepper from "nav/Stepper";
import CustomerDetailsForm from "customers/Details/CustomerDetailsForm";
import MealDetailsForm from "customers/MealDetails/MealDetailsForm";
import RestrictionsForm from "customers/Restrictions/RestrictionsForm";
import ConfirmForm from "customers/Confirm/ConfirmForm";
import Col from "react-bootstrap/Col";
import { Button } from "semantic-ui-react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import fetchHelper from "fetchHelper/fetchHelper";
import { baseRowStyle } from "styles/baseStyles";
import SubmitButton from "SubmitButton";
import * as dataHelper from "customers/DataHelper/customerDataHelper";

const DEFAULT_MEAL = 4;

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepState: {
        validated: new Set(),
        triedToValidate: false,
        stepSize: 4,
        stepData: [
          { key: "0", icon: "address card", title: "Customer details" },
          { key: "1", icon: "utensils", title: "Meal details" },
          { key: "2", icon: "exclamation triangle", title: "Restrictions" },
          { key: "3", icon: "info circle", title: "Confirm" }
        ],
        currentStep: 0,
        loaded: false
      }
    };
  }

  componentDidMount() {
    this.setState({
      stepState: {
        validated: new Set(),
        triedToValidate: false,
        stepSize: 4,
        stepData: [
          { key: "0", icon: "address card", title: "Customer details" },
          { key: "1", icon: "utensils", title: "Meal details" },
          { key: "2", icon: "exclamation triangle", title: "Restrictions" },
          { key: "3", icon: "info circle", title: "Confirm" }
        ],
        currentStep: 0,
        loaded: true
      },
      detailData: dataHelper.getDefaultDetailData(),
      mealData: dataHelper.getDefaultMealData(),
      restrictionData: dataHelper.getDefaultRestrictionData()
    });
  }

  // -------------------- Stepper Functions

  resetValidation = () => {
    let { stepState } = this.state;
    stepState.validated = new Set();
    this.setState({ stepState });
  };

  submit = () => {
    var stateCopy = JSON.parse(JSON.stringify(this.state));
    delete stateCopy.stepState;
    this.handleSubmit(
      stateCopy,
      "http://localhost:3001/api/createCustomer",
      "Customer created",
      "Error creating customer"
    );
  };

  handleSubmit = (data, address, successMessage, failMessage) => {
    this.setState(
      { isSubmitting: true },
      fetchHelper.fetch(
        address,
        {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        },
        res => {
          console.log(res);
          let message = failMessage;
          let className = "warning-snackbar";
          if (res instanceof Error == false) {
            message = successMessage;
            className = "success-snackbar";
          }

          this.setState(
            {
              snackMessage: message,
              snackClass: className
            },
            () =>
              this.setState({ isSubmitting: false, openSnackbar: true }, () =>
                console.log("Done")
              )
          );
        }
      )
    );
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

  handleAddressChange = e => {
    let long = "",
      lat = "",
      address = "";

    if (e.length > 0) {
      lat = e[0].x;
      long = e[0].y;
      address = e[0].label;
    }

    const { detailData } = this.state;
    detailData.latitude = lat;
    detailData.longitude = long;
    detailData.address = address;
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
    console.log(id.name);
    console.log(newData);
    mealData[id.name].extras = newData;
    this.setState({ mealData });
  };

  handleNumberChange = e => {
    const node = e.target;
    if (
      Number(node.value) <= Number(node.max) &&
      Number(node.value) >= Number(node.min)
    ) {
      const { mealData } = this.state;
      mealData[node.parentNode.id].extras.filter(
        extra => extra.label == node.id
      )[0].quantity =
        node.value;

      this.setState({ mealData });
    }
  };

  // -------------------- Restriction Details Functions

  handleRestrictionChange = (newData, id) => {
    console.log(newData, id.name);
    const { restrictionData } = this.state;

    restrictionData.filter(data => {
      return data.display.split(" ")[0] === id.name;
    })[0].restrictionOptions = newData;

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

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackbar: false }, () => {
      this.state.snackClass !== "warning-snackbar" &&
        this.props.history.push("/customers/display");
    });
  };

  resetAddress = () => {
    let { detailData } = this.state;
    detailData.address = "";
    detailData.longitude = "";
    detailData.latitude = "";
    this.setState({ detailData });
  };

  handleDetailsSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.handleTryToValidate();
    } else {
      this.handleValidate(form);
      this.next();
    }
  }

  render() {
    return this.state.stepState.loaded ? (
      <React.Fragment>
        <Stepper
          step={this.handleIncrementStep}
          stepState={this.state.stepState}
        />

        <Container fluid className="baseContainer">
          <Row style={baseRowStyle}>
            <Col sm="1" className="baseButtonColumn">
              {this.state.stepState.currentStep != 0 &&
                this.button("arrow left", -1)}
            </Col>
            <Col>
              <Row>
                <Col className="baseDiv">
                  {this.state.stepState.currentStep == 0 && (
                    <CustomerDetailsForm
                      stepState={this.state.stepState}
                      detailData={this.state.detailData}
                      handleChange={this.handleChange}
                      resetValidation={this.resetValidation}
                      handleAddressChange={this.handleAddressChange}
                      resetAddress={this.resetAddress}
                      handleSubmit={this.handleDetailsSubmit}
                      validated={this.state.stepState.validated}
                      triedToValidate={this.state.stepState.triedToValidate}
                      handleTryToValidate={() => {
                        let { stepState } = this.state;
                        stepState.triedToValidate = true;
                        this.setState({ stepState });
                      }}
                      handleValidate={form => {
                        let { stepState } = this.state;
                        stepState.validated.add(form);
                        this.setState({ stepState });
                      }}
                      next={() =>
                        this.state.stepState.validated.size === 2 &&
                        this.state.detailData.address !== "" &&
                        this.formChange(1)}
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
                    <ConfirmForm CustomerData={this.state} />
                  )}
                </Col>
              </Row>
              <Row sm="12">
                <Col id="Button" sm="12">
                  {this.state.stepState.currentStep == 3 && (
                    <SubmitButton
                      onClick={this.submit}
                      disabled={this.state.isSubmitting}
                      open={this.state.openSnackbar}
                      handleClose={this.handleClose}
                      snackMessage={this.state.snackMessage}
                      snackClass={this.state.snackClass}
                    />
                  )}
                </Col>
              </Row>
            </Col>

            <Col sm="1" className="baseButtonColumn">
              {this.state.stepState.currentStep <
                this.state.stepState.stepSize - 1 &&
                (this.state.stepState.currentStep !== 0 ? (
                  this.button("arrow right", 1)
                ) : (
                  <div>
                    <Button
                      circular
                      variant="primary"
                      color="blue"
                      icon={"arrow right"}
                      onClick={() => {
                        //this.formChange(1);
                        let { stepState } = this.state;
                        stepState.triedToValidate = true;
                        this.setState({ stepState });
                        this.button1.ref.click();
                        this.button2.ref.click();
                      }}
                    />
                    <Button
                      hidden
                      form="form1"
                      type="submit"
                      ref={Button => (this.button1 = Button)}
                    />
                    <Button
                      hidden
                      form="form2"
                      type="submit"
                      ref={Button => (this.button2 = Button)}
                    />
                  </div>
                ))}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    ) : (
      <h4>Loading</h4>
    );
  }
}

export default CustomerForm;
