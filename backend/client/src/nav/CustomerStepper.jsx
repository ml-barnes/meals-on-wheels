import React, { Component } from "react";
import { Icon, Step } from "semantic-ui-react";

export default class CustomerStepper extends Component {
  constructor(props) {
    super(props);
    this.state.currentStep = props.currentStep;
  }

  state = {
    stepSize: 4,
    stepData: [
      { key: "0", icon: "address card", title: "Customer details" },
      { key: "1", icon: "utensils", title: "Meal details" },
      { key: "2", icon: "exclamation triangle", title: "Restrictions" },
      { key: "3", icon: "info circle", title: "Confirm" }
    ],
    currentStep: 0
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Step.Group widths={this.state.stepSize}>
            {this.state.stepData.map(data => (
              <Step
                active={data.key == this.state.currentStep ? true : false}
                key={data.key}
              >
                <Icon name={data.icon} />
                <Step.Content>
                  <Step.Title>{data.title}</Step.Title>
                </Step.Content>
              </Step>
            ))}
          </Step.Group>
        </div>
      </React.Fragment>
    );
  }
}
