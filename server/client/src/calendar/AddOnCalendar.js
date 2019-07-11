import React from "react";
import fetchHelper from "fetchHelper/fetchHelper";
import dateFns from "date-fns";
import "calendar/style.css";
import Popover from "react-bootstrap/Popover";
import {
  FaLongArrowAltRight,
  FaPlusCircle,
  FaMinusCircle
} from "react-icons/fa";
import Overlay from "react-bootstrap/Overlay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

const types = {
  dishType: "Dish Type",
  quantity: "Main Quantity"
};

const dishTypes = [
  "Small Plate",
  "Large Plate",
  "Tinfoil",
  "Frozen",
  "Default"
];

class AddOnCalendar extends React.Component {
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
    if (
      calendarDay != null &&
      this.state.data != null &&
      this.state.data.length > 0
    ) {
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
      const differences = data[0].difference;

      return (
        <Popover id="extra-popover" className={"extraPopover"}>
          {Object.keys(differences).map((key, index) => {
            if (key === "extras") {
              return this.getExtras(data, key);
            } else {
              data = data[0].difference;
              return this.getMealExtra(data, key);
            }
          })}
        </Popover>
      );
    }
    return <span />;
  };

  getExtras = (all_data, key) => {
    let data = all_data[0].difference;
    return (
      <Container className="extraContainer">
        <Row>
          <Col>
            <b>Extras</b>
          </Col>
        </Row>

        {data.extras.map((extra, index) => {
          if (extra[0] === "~") {
            let originals = all_data[0].originalExtras;
            return (
              <Row>
                <Col>
                  <span>
                    {extra[1].label ? (
                      // If there is a label, then only label has changed
                      `${extra[1].label.__old}:
                      ${originals[index].quantity}`
                    ) : (
                      // No label means quantity has changed
                      // Have to find label that matches old quantity
                      `${originals.filter(e => {
                        return e.quantity === extra[1].quantity.__old;
                      })[0].label}:  
                      ${extra[1].quantity.__old}`
                    )}
                  </span>{" "}
                  <FaLongArrowAltRight />{" "}
                  <span>
                    {extra[1].label ? (
                      `${extra[1].label.__new}:
                      ${originals[index].quantity}`
                    ) : (
                      `${originals.filter(e => {
                        return e.quantity === extra[1].quantity.__old;
                      })[0].label}: 
                      ${extra[1].quantity.__new}`
                    )}
                  </span>
                </Col>
              </Row>
            );
          } else if (extra[0] === "+") {
            return (
              <Row>
                <Col>
                  <FaPlusCircle className={"centerIcon"} />{" "}
                  <span>
                    {extra[1].label}: {extra[1].quantity}
                  </span>
                </Col>
              </Row>
            );
          } else if (extra[0] === "-") {
            return (
              <Row>
                <Col>
                  <FaMinusCircle className={"centerIcon"} />{" "}
                  <span>
                    {extra[1].label}: {extra[1].quantity}
                  </span>
                </Col>
              </Row>
            );
          }
        })}
      </Container>
    );
  };

  getMealExtra = (data, key) => {
    console.log("data", data);
    console.log("key", key);
    return (
      <Container>
        <Row>
          <Col>
            <p>
              <b>{types[key]}</b>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {key !== "quantity" ? (
              dishTypes[data[key].__old]
            ) : (
              data[key].__old
            )}{" "}
            <FaLongArrowAltRight />{" "}
            {key !== "quantity" ? dishTypes[data[key].__new] : data[key].__new}
          </Col>
        </Row>
      </Container>
    );
  };

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
              this.state.data.length > 0 &&
              this.state.data.map(data => {
                const date = moment(data.date, "DD/MM/YY");
                let dayMoment = moment(day);
                if (dayMoment.isSame(date)) {
                  return this.addData(data);
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

  addData(data) {
    console.log(data.difference);
    let count = 0;
    // If there are extras need to loop through and count them
    // Else increment count per difference
    Object.keys(data.difference).map(key => {
      if (key == "extras") {
        data.difference[key].map(extra => count++);
      } else {
        count++;
      }
    });

    return (
      <p style={extraStyle}>
        {count} {count == 1 ? "Add On" : "Add Ons"}
      </p>
    );
  }

  setUpPopover() {
    if (this.shouldShowPopover()) {
      return (
        <Overlay
          id="extraPopoverOverlay"
          show={this.state.show && this.shouldShowPopover()}
          target={this.state.target}
          placement="top"
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

const extraStyle = {
  marginBottom: "0",
  pointerEvents: "none",
  margin: "5%",
  background: "#53cbf1",
  borderRadius: "5px",
  padding: "3%",
  display: "inline-block",
  paddingLeft: "15%",
  paddingRight: "15%",
  color: "white"
};
export default AddOnCalendar;
