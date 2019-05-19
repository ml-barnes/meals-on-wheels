import React from "react";

import fetchHelper from "../../fetchHelper/fetchHelper";
import dateFns from "date-fns";
import "./style.css";
import Popover from "react-bootstrap/Popover";

import Overlay from "react-bootstrap/Overlay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import moment from "moment";

const types = {
  dishType: "Dish Type",
  quantity: "Quantity"
};

const format = {
  __old: { style: { color: "red" }, display: " -" },
  __new: { style: { color: "green" }, display: " +" }
};

class Extras extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentMonth: new Date(),
      selectedDate: new Date(),
      show: false,
      loaded: false,
      calendarClass: "smallCalendar",
      bodyClass: "smallBody",
      cellClass: "smallCell"
    };
  }
  handleClick = ({ target }) => {
    if (this.state.target !== target) {
      this.setState({ target, show: true });
    } else {
      this.setState({ target: null, show: false });
    }
  };

  getData = () => {
    const address =
      "http://localhost:3001/api/getExtras?id=" + this.props.CustomerId;

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

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header calendarRow flex-middle">
        <div className="calendarCol calendarCol-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="calendarCol calendarCol-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="calendarCol calendarCol-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendarCol calendarCol-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days calendarRow">{days}</div>;
  }

  shouldShowPopover = () => {
    let result = false;

    if (this.state.target != null) {
      let selectedDate = this.state.target.id;

      if (this.state.data != null) {
        result = this.state.data.filter(extra => {
          return extra.date == selectedDate;
        });
      }
    }

    return result.length > 0;
  };

  hasData = calendarDay => {
    if (calendarDay != null && this.state.data != null) {
      let data = this.state.data.filter(
        day => day.date == moment(calendarDay).format("DD/MM/YY")
      );

      return data.length > 0;
    }
  };

  createPopOver = () => {
    if (this.state.target != null && this.state.data != null) {
      let data = this.state.data.filter(
        day => day.date == this.state.target.id
      );
      const style = { marginBottom: "0", pointerEvents: "none" };
      return (
        <Popover id="popover-basic" title="Customer Extras">
          {Object.keys(data[0].difference).map((key, index) => {
            return (
              <React.Fragment>
                <p style={{ marginBottom: "0px" }}>
                  <b>{types[key]}</b>
                </p>
                {Object.keys(data[0].difference[key]).map((difKey, index) => {
                  if (key == "extras") {
                    let extra = this.state.data[0].difference.extras[difKey];
                    return (
                      <p style={style}>
                        {extra[0]}
                        {extra[1].label}
                        {extra[1].quantity}
                      </p>
                    );
                  } else {
                    return (
                      <span style={format[difKey].style}>
                        {format[difKey].display}{" "}
                        {data[0].difference[key][difKey]}
                      </span>
                    );
                  }
                })}
              </React.Fragment>
            );
          })}
        </Popover>
      );
    }
    return <span />;
  };

  addData(d) {
    const style = { marginBottom: "0", pointerEvents: "none" };
    return Object.keys(d.difference).map(key => {
      if (key == "extras") {
        return this.state.data[0].difference.extras.map(extra => {
          return <p style={style}>{extra[1].label}</p>;
        });
      } else {
        return <p style={style}>{key}</p>;
      }
    });
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            id={moment(day).format("DD/MM/YY")}
            className={`calendarCol ${this.state.cellClass} ${dateFns.isSunday(
              day
            ) || !this.hasData(day)
              ? "disabled"
              : dateFns.isSameDay(day, selectedDate) ? "selected" : ""}`}
            key={day}
            onClick={e => {
              this.onDateClick(dateFns.parse(cloneDay));
              this.handleClick(e);
            }}
          >
            <span
              style={noClick}
              id={moment(day).format("DD/MM/YY")}
              className="number"
            >
              {formattedDate}
            </span>
            <span
              style={noClick}
              className="bg"
              id={moment(day).format("DD/MM/YY")}
            >
              {formattedDate}
            </span>
            {this.state.data != null &&
              this.state.data.map(d => {
                const date = moment(d.date, "DD/MM/YY");
                let dayMoment = moment(day);
                if (dayMoment.isSame(date)) {
                  return this.addData(d);
                }
              })}
          </div>
        );

        day = dateFns.addDays(day, 1);
      }

      rows.push(
        <div className="calendarRow" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return (
      <div className={this.state.bodyClass}>
        {rows}
        {this.setUpPopover()}
      </div>
    );
  }

  setUpPopover() {
    if (this.shouldShowPopover()) {
      return (
        <Overlay
          show={this.state.show && this.shouldShowPopover()}
          target={this.state.target}
          placement="right"
          container={this}
        >
          {this.createPopOver()}
        </Overlay>
      );
    }
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      selectedDate: null,
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      selectedDate: null,
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loaded ? (
          <div className={this.state.calendarClass}>
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
        ) : (
          <Row
            style={{
              textAlign: "center",
              marginTop: "2%",
              alignContent: "center",
              height: "50%"
            }}
          >
            <Col>
              <Spinner
                animation="border"
                role="status"
                style={{
                  padding: "15px",
                  marginBottom: "15px"
                }}
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

const noClick = {
  pointerEvents: "none"
};
export default Extras;
