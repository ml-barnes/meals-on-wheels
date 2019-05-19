import React from "react";
import MealDay from "./MealDay";

class MealDetailsForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.mealData.map(data => {
          console.log(data);
          return (
            <MealDay
              key={data.key}
              day={data}
              handleMealSelectChange={this.props.handleMealSelectChange}
              handleNumberChange={this.props.handleNumberChange}
              handleQuantityChange={this.props.handleQuantityChange}
              handleDishChange={this.props.handleDishChange}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default MealDetailsForm;
