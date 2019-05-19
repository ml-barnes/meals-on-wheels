import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
    baseDivStyle,
    baseContainerStyle,
    baseRowStyle,
    baseButtonColumnStyle
} from "../../styles/baseStyles";

import Container from "react-bootstrap/Container";
import {
    FaEdit,
    FaTrashAlt,
    FaRegCalendarAlt,
    FaEyeSlash,
} from "react-icons/fa";
import { Icon, Button } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fetchHelper from "../../fetchHelper/fetchHelper";
import Modal from "react-bootstrap/Modal";
import { Typeahead } from "react-bootstrap-typeahead";
import "../../../../node_modules/react-bootstrap-typeahead/css/Typeahead.css";
import ReactButton from "react-bootstrap/Button"
import DayPicker from 'react-day-picker';

class DisplayDriversApp extends React.Component {


    constructor() {
        super();
        this.state = {
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
            data: [],
            filtered: [],
            buttons: {},
            emptyList: false,
            show: false,
            newList: [],

            // react bootstrap typeahead
            multiple: false,
            highlightOnlyResult: true,
            minLength: 2,
            selectHintOnEnter: true,
            labelKey: "detailData.lastName"
        };
        this.handleShow = () => {
            this.setState({ show: true });
        };

        this.handleHide = () => {
            this.setState({ show: false });
        };

        this.updateSearchParameter = this.updateSearchParameter.bind(this);
    }

    getEditData = () => {
        const address = "http://localhost:3001/api/find?id=";
        fetchHelper.fetch(address + this.props.match.params.id, data => {
            this.setState({
                detailData: data.detailData,
            });
        });
    };

    handleEditSubmit = () => {
        var stateCopy = this.state;
        delete stateCopy.stepState;
        const postData = { id: this.props.match.params.id, data: stateCopy };

        console.log(postData);
        fetch("http://localhost:3001/api/updateCustomer", {
            body: JSON.stringify(postData),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    componentDidMount() {
        this.getData();
    }

    updateSearchParameter() {
        //alert(document.querySelector('#search-parameter').value);
        //alert(typeof (document.querySelector('#search-parameter').value));
        const searchParameter = document.querySelector("#search-parameter").value;
        //alert(searchParameter);
        this.setState({ labelKey: searchParameter });
        console.log(document.querySelector("#search-parameter").value);

        // https://stackoverflow.com/questions/13207927/switch-statement-multiple-cases-in-javascript
        /*
    
        switch(searchParameter)
        {
          case "last_name":
          case "first_name":
            this.setState({ 
              minLength: 2
              labelKey: searchParameter, 
            });
            break;
    
          case "address":
            this.setState({ 
                minLength: 5
                labelKey: searchParameter, 
              });
            break;
    
          case "phone":
            this.setState({ 
              minLength: 5
              labelKey: searchParameter, 
            });
          break;
              
          case "id":
            this.setState({ 
              minLength: 1
              labelKey: searchParameter, 
            });
          break;
        }
        */
    }

    getData = () => {
        const address = "http://localhost:3001/api/driversList";
        fetchHelper.fetch(address, data => {
            this.setState({
                data,
                filtered: data
            });
        });
    };

    componentWillUnmount() { }

    handleSearch = e => {
        var currentList = [];
        var newList = [];
        if (e.target.value !== "") {
            currentList = this.state.data;
            newList = currentList.filter(item => {
                const lc =
                    item.detailData.firstName.toLowerCase() +
                    " " +
                    item.detailData.lastName.toLowerCase();

                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.state.data;
        }

        this.setState({
            filtered: newList
        });

        this.setState({
            emptyList: newList.length == 0
        });

        console.log(this.state.filtered);
    };

    handleButtonClick = e => {
        var { buttons } = this.state;
        if (buttons[e.target.parentNode.id] != null) {
            buttons[e.target.parentNode.id] = !buttons[e.target.parentNode.id];
        } else {
            buttons[e.target.parentNode.id] = true;
        }
        this.setState({
            buttons
        });
    };

    render() {


        return (
            <React.Fragment>
                {this.header()}

                <Container fluid style={baseContainerStyle}>
                    <Row style={{ marginTop: "2%" }}>
                        <Col sm="1" style={baseButtonColumnStyle} />
                        <Col style={baseDivStyle}>
                            <div style={{ margin: "0 20px 20px 20px" }}>
                                {this.state.emptyList && <h4>No matches</h4>}
                                {this.state.filtered.map(driver => {
                                    return (
                                        <React.Fragment>
                                            {this.detailsRow(driver)}

                                            {this.state.buttons[driver.id] && (
                                                <React.Fragment>
                                                    <Row key={driver.id} style={driverInnerBackStyle}>
                                                        <Col sm="12" style={{ padding: "0px" }}>
                                                            {/* ---------------- NOTES ---------------*/}
                                                            <Row style={driverInnerRowStyle}>
                                                                <Col style={{ flexGrow: "0" }}>
                                                                    <p style={boldStyle}>Notes:</p>
                                                                </Col>
                                                                <Col>
                                                                    <p>{driver.detailData.notes}</p>
                                                                </Col>
                                                            </Row>


                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <br />
                                                        </Col>
                                                    </Row>
                                                </React.Fragment>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col sm="1" style={baseButtonColumnStyle} />
                    </Row>
                </Container>
            </React.Fragment>
        );
    }

    header = () => {
        const {
            multiple,
            highlightOnlyResult,
            minLength,
            selectHintOnEnter,
            labelKey,
            filtered
        } = this.state;
        return (
            <Row
                style={{
                    border: "1px solid #ececed",
                    alignItems: "center",
                    textAlign: "center"
                }}
            >
                <Col
                    sm="auto"
                    style={{
                        margin: "1%",
                        textAlign: "left"
                    }}
                >
                    <h2>Drivers List</h2>
                </Col>

                <Col sm={"1"} />

                <Col sm style={marginStyle}>
                    <Link to={{ pathname: "/drivers/add", query: { thing: "thing" } }}>
                        <Button fluid>New Driver</Button>
                    </Link>
                </Col>
                <Col sm style={marginStyle}>
                    <Button variant="primary" onClick={this.handleShow} fluid>
                        Restore{" "}
                    </Button>


                </Col>

                <Col sm style={marginStyle}>
                    <Form.Control
                        id="search-parameter"
                        as="select"
                        onChange={this.updateSearchParameter}
                    //onChange={this.handleSearch}
                    >
                        <option value="lastName">Last Name</option>
                        <option value="firstName">First Name</option>
                        <option value="address">Address</option>
                        <option value="phone">Phone Number</option>
                        <option value="id">ID</option>
                    </Form.Control>
                </Col>
                <Col sm style={marginStyle}>
                    <Typeahead
                        id="typeahead-search"
                        type="search"
                        placeholder="Search..."
                        onKeyDown={this.handleSearch}
                        onSelect={this.handleSearch}

                        minLength={0}
                        labelKey={labelKey}
                        multiple={multiple}
                        options={this.state.filtered}
                    />

                </Col>
                <Col sm={1} />
            </Row>
        );
    };

    detailsRow = driver => {
        const { detailData } = this.state;
        return (
            <Row key={driver.id} style={detailRowStyle}>
                <Col md="auto">{this.createButton(driver.id)}</Col>

                <Col>
                    <Row>
                        <Col md={1} lg="1">
                            <p>{driver.detailData.title}</p>
                        </Col>
                        <Col md={10} lg="2">
                            <p>
                                {driver.detailData.firstName} {driver.detailData.lastName}
                            </p>
                        </Col>
                        <Col md={10} lg="1">
                            <p>
                                {driver.detailData.driverType}
                            </p>
                        </Col>
                        <Col md={4} lg="3">
                            <p>{driver.detailData.address}</p>
                        </Col>
                        <Col md={4} lg="2">
                            <p>{driver.detailData.phoneNumber}</p>
                        </Col>
                        <Col md={4} lg="2">
                            <p>{driver.detailData.emailAddress}</p>
                        </Col>
                        <Col md={4} lg="1">
                            <p>{driver.detailData.notes}</p>
                        </Col>
                    </Row>
                </Col>

                <Col md="auto">

                    <FaRegCalendarAlt />{" "}

                    <FaTrashAlt />{" "}

                    <FaEdit onClick={this.handleShow} onClick={this.getEditData} />{" "}

                    <FaEyeSlash />{" "}

                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        dialogClassName="mw-100 w-75"
                        aria-labelledby="example-custom-modal-styling-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Edit Driver
                </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control id="title" as="select" onChange={this.handleChange} value={detailData.title}>
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
                                            value={detailData.firstName}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control id="lastName" type="lastName" placeholder="Enter last name..." onChange={this.handleChange} value={detailData.lastName} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>

                                    <Form.Group as={Col}>
                                        <Form.Label>Driver Type</Form.Label>
                                        <Form.Control id="driverType" as="select" onChange={this.handleChange} value={detailData.driverType}>
                                            <option selected={true} disabled="disabled">Choose...</option>
                                            <option>Staff</option>
                                            <option>Volunteer</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control id="emailAddress" placeholder="bob@example.com" onChange={this.handleChange} value={detailData.emailAddress} />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>

                                    <Form.Group as={Col}>
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control id="phoneNumber" onChange={this.handleChange} value={detailData.phoneNumber} />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control id="mobileNumber" onChange={this.handleChange} value={detailData.mobileNumber} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} >
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control id="address" placeholder="1234 George St" onChange={this.handleChange} value={detailData.address} />
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



                                <ReactButton variant="primary" type="submit" onClick={this.handleSubmit}>
                                    Submit
                            </ReactButton>

                                <ReactButton variant="primary" type="submit">
                                    Cancel
                            </ReactButton>


                            </Form>

                            {/*<ReactButton variant="primary" onClick={this.handleHide}>Submit</ReactButton>*/}

                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        );
    };

    restrictions = res => {
        return (
            <React.Fragment>
                {res.restrictionOptions.length != 0 && (
                    <Row
                        style={{
                            background: "#dce8f3",
                            borderRadius: "5px",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            alignItems: "center",
                            margin: "10px",
                            marginLeft: "20px"
                        }}
                    >
                        <Col sm={2}>
                            <Row style={{ alignItems: "center" }}>
                                <Col xs md="auto" style={{ flexGrow: "0" }}>
                                    <b>{res.display}:</b>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{ alignItems: "center" }}>
                                {res.restrictionOptions.map(option => {
                                    return (
                                        <Col sm="auto" style={dayStyle}>
                                            {option.label}
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                    </Row>
                )}
            </React.Fragment>
        );
    };

    createButton = id => {
        const downArrow = "arrow alternate circle down";
        const rightArrow = "arrow alternate circle right";
        return (
            <Button
                id={id}
                variant="primary"
                color="black"
                onClick={this.handleButtonClick}
                circular
                icon
            >
                <Icon name={this.state.buttons[id] ? downArrow : rightArrow} />
            </Button>
        );
    };
}

const boldStyle = {
    fontWeight: "bold"
};
const dataStyle = {
    marginTop: "10px"
};

const marginStyle = {
    margin: "1%"
};

const dayStyle = {
    display: "inline-block",
    background: "#ffffff",
    color: "black",
    borderRadius: "5px",
    padding: "5px",
    marginLeft: "4px",
    marginRight: "4px",
    marginTop: "2px",
    marginBottom: "2px",
    textAlign: "center"
};

const detailRowStyle = {
    background: "#e0e0e0",
    borderRadius: "5px",
    paddingTop: "10px",
    paddingBottom: "10px",
    alignItems: "center",
    marginBottom: "10px",
    boxShadow: "1px 1px 2px grey"
};

const driverInnerBackStyle = {
    marginLeft: "2px",
    background: "#c8c8c8",
    borderRadius: "5px",
    boxShadow: "1px 1px 2px grey"
};

const driverInnerRowStyle = {
    background: "#f8f9fa",
    borderRadius: "5px",
    paddingTop: "10px",
    paddingBottom: "10px",
    margin: "10px"
};
const innerTitleStyle = {
    alignSelf: "center",
    flexGrow: "0"
};

const mealDayStyle = {
    background: "#dce8f3",
    borderRadius: "5px",
    paddingTop: "10px",
    paddingBottom: "10px",
    alignItems: "center",
    margin: "10px",
    marginLeft: "20px"
};

const numberStyle = {
    color: "white",
    background: "black",
    borderRadius: "5px",
    paddingRight: "5px",
    paddingLeft: "5px",
    fontWeight: "bold"
};

export default DisplayDriversApp;
