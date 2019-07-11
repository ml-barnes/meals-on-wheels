import React from "react";
import MealDay from "customers/MealDetails/MealDay";

class MealDetailsForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.mealData.map(day => {
          return (
            <MealDay
              key={day.key}
              day={day}
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
