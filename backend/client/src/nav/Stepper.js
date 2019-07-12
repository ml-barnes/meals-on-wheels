import React, { Component } from "react";
import { Icon, Step } from "semantic-ui-react";

export default class Stepper extends Component {
  render() {
    return (
      <React.Fragment>
        <Step.Group
          widths={this.props.stepState.stepSize}
          style={{ margin: 0, boxShadow: "1px 1px 5px gray" }}
        >
          {this.props.stepState.stepData.map(data => (
            <Step
              active={
                data.key == this.props.stepState.currentStep ? true : false
              }
              key={data.key}
            >
              <Icon name={data.icon} />
              <Step.Content>
                <Step.Title>{data.title}</Step.Title>
              </Step.Content>
            </Step>
          ))}
        </Step.Group>
      </React.Fragment>
    );
  }
}
