import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DriverStepper from "../../nav/DriverStepper"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class DriverPersonalDetailApp extends React.Component {
  constructor() {
    super();
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
      driverDaysData: {
        driverID: "",
        selectedDays: [],

      },
      detailData: {
        title: "",
        driverType: "",
        firstName: "",
        lastName: "",
        address: "",
        emailAddress: "",
        phoneNumber: "",
        mobileNumber: "",
        notes: ""
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const detailData = this.state;
    delete detailData.selectedDays;
    //console.log(JSON.stringify(detailData));
    fetch("http://localhost:3001/api/createDriver", {
      body: JSON.stringify(detailData),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const selectedDeliveryDays = this.state.driverDaysData.selectedDays;
    console.log(selectedDeliveryDays);
    fetch("http://localhost:3001/api/createDriverDays", {
      body: JSON.stringify(selectedDeliveryDays),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  handleDayClick(day, { selected }, modifiers = {}, event) {

    const { selectedDays } = this.state;

    if (modifiers.disabled) {
      return;
    }

    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }

    //console.log(selectedDays);
    //console.log(modifiers.selected);
    //this.setState({ selectedDays: modifiers.selected ? undefined : day });
    //console.log(selectedDays[0]);

    this.setState({ selectedDays });

    const { detailData: prevdetailData } = this.state;
    const detailData = { ...prevdetailData, event };
    console.log(detailData);

    this.setState({ ...this.state, detailData });

    console.log(this.state.selectedDays);
  }

  handleChange = (event) => {
    const { detailData: prevdetailData } = this.state;
    const detailData = { ...prevdetailData, [event.target.id]: event.target.value };
    console.log(detailData);
    this.setState({ ...this.state, detailData });
  };



  render() {
    return (
      <div>
        <DriverStepper currentStep={0} />
        <br />
        <br />
        <Container>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Title</Form.Label>
                <Form.Control id="title" as="select" onChange={this.handleChange}>
                  <option selected={true} disabled="disabled">Choose...</option>
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Miss</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="firstName"
                  type="firstName"
                  placeholder="Enter first name..."
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="lastName" type="lastName" placeholder="Enter last name..." onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>

              <Form.Group as={Col}>
                <Form.Label>Driver Type</Form.Label>
                <Form.Control id="driverType" as="select" onChange={this.handleChange}>
                  <option selected={true} disabled="disabled">Choose...</option>
                  <option>Staff</option>
                  <option>Volunteer</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Email Address</Form.Label>
                <Form.Control id="emailAddress" placeholder="bob@example.com" onChange={this.handleChange} />
              </Form.Group>

            </Form.Row>

            <Form.Row>

              <Form.Group as={Col}>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control id="phoneNumber" onChange={this.handleChange} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control id="mobileNumber" onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} >
                <Form.Label>Address</Form.Label>
                <Form.Control id="address" placeholder="1234 George St" onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>



            <Form.Row>




              <Form.Group as={Col} >
                <Form.Label>Personal notes</Form.Label>
                <Form.Control
                  id="notes"
                  as="textarea"
                  rows="3"
                  placeholder="Enter some notes here..."
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Available delivery days</Form.Label>
                <br></br>

                <DayPicker

                  format="M/D/YYYY"
                  selectedDays={this.state.selectedDays}
                  onDayClick={this.handleDayClick}
                  numberOfMonths={4}

                  disabledDays={[
                    { daysOfWeek: [0] },
                    { before: new Date() }

                  ]}
                />


              </Form.Group>
            </Form.Row>



            <Button variant="primary" type="submit" onClick={this.handleSubmit} block>
              Submit
              </Button>

          </Form>
        </Container>
      </div >
    );
  }
}

export default DriverPersonalDetailApp;
