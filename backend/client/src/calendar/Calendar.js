import AddOnCalendar from "calendar/AddOnCalendar";
import React from "react";
import fetchHelper from "fetchHelper/fetchHelper";
import "calendar/styleBig.css";
import Popover from "react-bootstrap/Popover";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import serverAddress from "serverAddress";
class Calendar extends AddOnCalendar {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentMonth: new Date(),
      selectedDate: new Date(),
      show: false,
      loaded: false,
      calendarClass: "calendar",
      bodyClass: "body",
      cellClass: "cell"
    };
  }

  getData = () => {
    const address = `${serverAddress}getCycles`;
    fetchHelper.fetch(address, { method: "GET" }, data => {
      this.setState({
        data,
        filtered: data,
        loaded: true
      });
    });
  };

  componentDidMount() {
    this.getData();
  }

  createPopOver = () => {
    if (this.state.target != null && this.state.data != null) {
      let data = this.state.data.filter(
        day => day.date == this.state.target.id
      );
      return (
        <Popover
          id="popover-basic"
          className="mealPopover"
          title={data[0].date}
        >
          {foodOrder.map(key => {
            const meal = data[0].cycle.Meal.Food.filter(food => {
              return food.type == key;
            });
            return (
              <Row>
                <Col className="mealPopoverData">
                  {key === "Vegetable" ? (
                    meal.map((vege, i) => {
                      return `${vege.name}${i !== meal.length - 1 ? ", " : ""}`;
                    })
                  ) : (
                    meal[0].name
                  )}
                </Col>
              </Row>
            );
          })}
        </Popover>
      );
    }
    return <span />;
  };

  addData(d) {
    return d.cycle.Meal.Food.map(food => {
      return (
        <Row className="calendarMealContainer">
          {["Meat", "Alternative", "Vegetarian"].includes(food.type) && (
            <Col className="calendarMeal">{food.name}</Col>
          )}
        </Row>
      );
    });
  }
}

const foodOrder = [
  "Meat",
  "Vegetarian",
  "Alternative",
  "Soup",
  "Dessert",
  "Vegetable"
];
// addData(d) {
//     return d.cycle.Meal.Food.map(food => {
//       return (
//         <Row className="calendarMealContainer">
//           {["Meat", "Alternative", "Vegetarian"].includes(food.type) && (
//             <Col className="calendarMeal">{food.name}</Col>
//           )}
//         </Row>
//       );
//     });
//   }
export default Calendar;
