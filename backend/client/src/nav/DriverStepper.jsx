import React, { Component } from "react";
import { Icon, Step } from "semantic-ui-react";

export default class DriverStepper extends Component {
  constructor(props) {
    super(props);
    this.state.currentStep = props.currentStep;
  }

  state = {
    stepSize: 1,
    stepData: [{ key: "0", icon: "address card", title: "Driver details" }],
    currentStep: 0
  };

  render() {
    return (
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
    );
  }
}
