import Extras from "./Extras";
import React from "react";
import fetchHelper from "../../fetchHelper/fetchHelper";
import "./styleBig.css";
import Popover from "react-bootstrap/Popover";

class CustomExtra extends Extras {
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
    const address = "http://localhost:3001/api/getCycles";
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
        <Popover id="popover-basic" title="Customer Extras">
          {data[0].cycle.Meal.Food.map(food => {
            return food.name;
          })}
        </Popover>
      );
    }
    return <span />;
  };

  addData(d) {
    return d.cycle.Meal.Food.map(food => {
      return (
        <p
          style={{
            marginBottom: "0px",
            pointerEvents: "none"
          }}
        >
          {food.name}
        </p>
      );
    });
  }
}

export default CustomExtra;
