import React from "react";
import CustomerForm from "customers/CreateBase/CustomerForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "semantic-ui-react";
import fetchHelper from "fetchHelper/fetchHelper";
import MealDay from "customers/MealDetails/MealDay";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DatePicker from "react-date-picker";
import Spinner from "react-bootstrap/Spinner";
import SubmitButton from "SubmitButton";
import "react-day-picker/lib/style.css";
import "customers/AddOn/datePickerStyle.css";
import "styles/baseStyle.css";

class CustomerAddOnForm extends CustomerForm {
  constructor(props) {
    super(props);
    let today = this.getDate();
    this.state = {
      mealData: [],
      loaded: false,
      range: false,
      date: today,
      dates: [
        today,
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)
      ]
    };
  }

  handleNumberChange = e => {
    const node = e.target;
    if (node.valueAsNumber <= node.max && node.valueAsNumber >= node.min) {
      const { mealData } = this.state;
      mealData[node.parentNode.id].extras.filter(extra => {
        return extra.label === node.id;
      })[0].quantity =
        node.value;
      this.setState({ mealData });
    }
  };

  getDate = () => {
    //If day is sunday, get next day

    let today = moment();
    if (today.weekday() == 0) {
      today = today.add(1, "d");
    }
    today = today.toDate();
    return today;
  };

  componentDidMount() {
    this.onChange(this.state.date);
    this.getData();
  }

  // When range state is changed, then dates should be reset
  handleClick = () => {
    console.log("1. Button Clicked");
    this.setState(this.resetDates(), () =>
      this.setState(this.changeRange(), () => this.changeDates())
    );
  };

  submit = () => {
    let mealData = this.state.mealData;
    let days = [];
    this.state.days.map(filteredDay => {
      days.push({
        CustomerId: this.props.match.params.id,
        mealData: mealData.filter(mealDay => mealDay.date == filteredDay[0])[0]
      });
    });
    this.handleSubmit(
      days,
      "http://localhost:3001/api/createExtra",
      "Extra created",
      "Error creating extra"
    );
  };

  resetDates = () => {
    console.log("2. Reset Dates");

    let today = this.getDate();
    return {
      date: today,
      dates: [
        today,
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)
      ]
    };
  };

  changeRange = () => {
    return { range: !this.state.range };
  };

  changeDates = () => {
    !this.state.range
      ? this.onChange(this.state.date)
      : this.onChange(this.state.dates);
  };

  getData = () => {
    const address = "http://localhost:3001/api/findCustomer?id=";
    fetchHelper.fetch(
      address + this.props.match.params.id,
      { method: "GET" },
      data => {
        if (data instanceof Error) {
          window.location.replace("/");
          return;
        } else {
          this.setState(
            {
              mealData: data.mealData,
              detailData: data.detailData,
              restrictionData: data.restrictionData
            },
            () =>
              this.setState({
                loaded: true
              })
          );
        }
      }
    );
  };

  onChange = dates => {
    if (dates.length != null) {
      this.setDaysArray(dates);
    } else {
      const days = [[moment(dates).format(), moment(dates).weekday()]];

      this.setState({ dates: [dates], days, date: dates });
    }
  };

  setDaysArray = dates => {
    let start = moment(dates[0]);
    let end = moment(dates[1]);
    let days = [];

    do {
      start.weekday() != 0 && days.push([start.format(), start.weekday()]);
      start = start.add(1, "d");
    } while (!start.isSame(end, "d"));

    end.weekday() != 0 && days.push([end.format(), end.weekday()]);
    this.setState({ dates, days });
  };

  render() {
    return (
      <React.Fragment>
        {this.header()}
        {this.state.loaded ? this.state.mealData !== null &&
        this.state.mealData.length > 0 ? (
          <Container fluid className="baseContainer">
            <Row className="baseRow">
              <Col sm="1" className="baseButtonColumn" />
              <Col className="baseDiv">
                {this.state.days.map(day => {
                  var data = this.state.mealData[day[1] - 1];
                  data.date = day[0];
                  return (
                    <React.Fragment key={data.key}>
                      <MealDay
                        day={data}
                        handleMealSelectChange={this.handleMealSelectChange}
                        handleNumberChange={this.handleNumberChange}
                        handleQuantityChange={this.handleQuantityChange}
                        handleDishChange={this.handleDishChange}
                      />
                    </React.Fragment>
                  );
                })}
              </Col>
              <Col sm="1" className="baseButtonColumn" />
            </Row>

            <SubmitButton
              width="10"
              onClick={this.submit}
              disabled={this.state.isSubmitting}
              open={this.state.openSnackbar}
              handleClose={this.handleClose}
              snackMessage={this.state.snackMessage}
              snackClass={this.state.snackClass}
            />
          </Container>
        ) : (
          <h4 className="baseCenterError">Error getting customer data</h4>
        ) : (
          <Container fluid className="baseContainer">
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
          </Container>
        )}
      </React.Fragment>
    );
  }

  header = () => {
    return (
      <Row className="baseHeader">
        <Col
          sm="auto"
          style={{
            margin: "1%",
            textAlign: "left"
          }}
        >
          <h2>Customer Add On</h2>
        </Col>

        <Col sm={"1"} />

        <Col sm style={marginStyle}>
          <Button
            fluid
            toggle
            active={this.state.range}
            onClick={this.handleClick}
          >
            {this.state.range ? "Date Range" : "Single Date"}
          </Button>
        </Col>
        <Col sm style={marginStyle}>
          {this.state.range ? (
            <DateRangePicker
              showLeadingZeros={true}
              clearIcon={null}
              onChange={this.onChange}
              value={this.state.dates}
            />
          ) : (
            <DatePicker
              name="date"
              placeholder="Date"
              clearIcon={null}
              showLeadingZeros={true}
              value={this.state.date}
              onChange={this.onChange}
            />
          )}
        </Col>

        <Col sm style={marginStyle} />
        <Col sm={1} />
      </Row>
    );
  };
}

const marginStyle = {
  margin: "1%"
};

export default CustomerAddOnForm;
