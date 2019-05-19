import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  baseDivStyle,
  baseContainerStyle,
  baseRowStyle,
  baseButtonColumnStyle,
  baseHeaderStyle
} from "../../styles/baseStyles";

import Container from "react-bootstrap/Container";
import {
  FaTrashAlt,
  FaEdit,
  FaTrash,
  FaRecycle,
  FaRegCalendarAlt
} from "react-icons/fa";
import { Icon, Button } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fetchHelper from "../../fetchHelper/fetchHelper";
import Modal from "react-bootstrap/Modal";
import { Typeahead } from "react-bootstrap-typeahead";
import "../../../../node_modules/react-bootstrap-typeahead/css/Typeahead.css";
import Extras from "../extras/Extras";
class DisplayCustomersApp extends React.Component {
  state = {
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
  constructor() {
    super();

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };

    this.updateSearchParameter = this.updateSearchParameter.bind(this);
  }

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
    const address = "http://localhost:3001/api/getCustomers";
    fetchHelper.fetch(address, { method: "GET" }, data => {
      this.setState({
        data,
        filtered: data
      });
    });
  };

  componentWillUnmount() {}

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

    if (buttons[e.target.id] != null) {
      buttons[e.target.id] = !buttons[e.target.id];
    } else {
      buttons[e.target.id] = true;
    }

    if (!isNaN(e.target.id)) {
      Object.keys(buttons).map((key, index) => {
        if (key != e.target.id) {
          buttons[key] = false;
        }
      });
    }

    this.setState({
      buttons
    });
  };

  checkRestrictions = restrictions => {
    var showRestrictions = false;
    restrictions.forEach(type => {
      if (type.restrictionOptions.length > 0) {
        showRestrictions = true;
      }
    });
    return showRestrictions;
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
                {this.state.filtered.map(customer => {
                  return (
                    <React.Fragment>
                      {this.detailsRow(customer)}

                      {this.state.buttons[customer.id] && (
                        <React.Fragment>
                          <Row key={customer.id} style={customerInnerBackStyle}>
                            <Col sm="12" style={{ padding: "0px" }}>
                              {/* ---------------- NOTES ---------------*/}
                              <Row style={customerInnerRowStyle}>
                                <Col style={{ flexGrow: "0" }}>
                                  <p style={boldStyle}>Notes:</p>
                                </Col>
                                <Col>
                                  <p>{customer.detailData.notes}</p>
                                </Col>
                              </Row>
                              {/* ---------------- MEALS ---------------*/}
                              <Row style={customerInnerRowStyle}>
                                <Col style={innerTitleStyle}>
                                  {this.createButton(customer.id + "-meals")}
                                </Col>
                                <Col style={innerTitleStyle}>
                                  <p style={boldStyle}>Meals</p>
                                </Col>
                              </Row>
                              {this.state.buttons[customer.id + "-meals"] &&
                                customer.mealData.map(day => {
                                  return (
                                    <React.Fragment>
                                      {this.day(day)}
                                    </React.Fragment>
                                  );
                                })}
                              {/* ---------------- Restrictions ---------------*/}

                              {this.checkRestrictions(
                                customer.restrictionData
                              ) && (
                                <Row style={customerInnerRowStyle}>
                                  <Col style={innerTitleStyle}>
                                    {this.createButton(customer.id + "-res")}
                                  </Col>
                                  <Col style={innerTitleStyle}>
                                    <p style={boldStyle}>Restrictions:</p>
                                  </Col>
                                </Row>
                              )}
                              {this.checkRestrictions(
                                customer.restrictionData
                              ) &&
                                this.state.buttons[customer.id + "-res"] &&
                                customer.restrictionData.map(res => {
                                  return (
                                    <React.Fragment>
                                      {this.restrictions(res)}
                                    </React.Fragment>
                                  );
                                })}

                              {customer.Extras.length > 0 && (
                                <Row style={customerInnerRowStyle}>
                                  <Col style={innerTitleStyle}>
                                    {this.createButton(customer.id + "-extras")}
                                  </Col>
                                  <Col style={innerTitleStyle}>
                                    <p style={boldStyle}>Extras</p>
                                  </Col>
                                </Row>
                              )}
                              {this.state.buttons[customer.id + "-extras"] && (
                                <Row id="extraRow">
                                  <Col style={extraRowStyle} id="extraCol">
                                    <Extras CustomerId={customer.id} />
                                  </Col>
                                </Row>
                              )}
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
      <Row style={baseHeaderStyle}>
        <Col
          sm="auto"
          style={{
            margin: "1%",
            textAlign: "left"
          }}
        >
          <h2>Customers List</h2>
        </Col>

        <Col sm={"1"} />

        <Col sm style={marginStyle}>
          <Link to={{ pathname: "/customers/add", query: { thing: "thing" } }}>
            <Button fluid>New Customer</Button>
          </Link>
        </Col>
        <Col sm style={marginStyle}>
          <Button variant="primary" onClick={this.handleShow} fluid>
            Restore{" "}
          </Button>

          <Modal
            // used for applying an invisible scrollbar on the modal popup
            style={{
              maxHeight: "calc(100vh - 210px)",
              overflowY: "auto"
            }}
            show={this.state.show}
            onHide={this.handleHide}
            dialogClassName="mw-100 w-75"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Restore Customers
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid style={{ padding: 0, flexGrow: 1 }}>
                <Row style={{ marginTop: "2%" }}>
                  <Col>
                    <div style={{ margin: "20px" }}>
                      {this.state.filtered.map(customer => {
                        return (
                          <React.Fragment>
                            <Row
                              key={customer.id}
                              style={{
                                background: "#e0e0e0",
                                borderRadius: "5px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                alignItems: "center",
                                marginBottom: "10px",
                                boxShadow: "1px 1px 2px grey"
                              }}
                            >
                              <Col xs="1" align="center">
                                <p>{customer.title}</p>
                              </Col>
                              <Col xs="3" align="center">
                                <p>
                                  {customer.firstName} {customer.lastName}
                                </p>
                              </Col>
                              <Col xs="3" align="center">
                                <p>{customer.address}</p>
                              </Col>
                              <Col xs="2" align="center">
                                <p>{customer.phone}</p>
                              </Col>
                              <Col xs="2" align="center">
                                <p>{customer.email}</p>
                              </Col>

                              <Col
                                xs="1"
                                align="center"
                                style={{ padding: "1%" }}
                              >
                                <a class="deleteCustomer" href="#">
                                  <FaTrash />
                                </a>
                                <a class="restoreCustomer" href="#">
                                  <FaRecycle />
                                  {/*<i a="/" class="fas fa-trash"></i>*/}
                                </a>
                              </Col>
                            </Row>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </Col>

                  {/*<Col sm="1" style={buttonColumn} />*/}
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
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
            //onKeyDown={console.log(this.state.filtered)}
            //onKeyDown={console.log(this.state.filtered[0])}
            minLength={0}
            labelKey={labelKey}
            multiple={multiple}
            options={this.state.filtered}
          />
          {/*<Form.Control
            type="search"
            placeholder="Search..."
            onChange={this.handleSearch}
          />*/}
        </Col>
        <Col sm={1} />
      </Row>
    );
  };

  day = day => {
    const dishTypes = ["Small", "Large", "Tinfoil", "Frozen", "Standard"];
    return (
      <React.Fragment>
        <Row style={mealDayStyle}>
          <Col sm={2}>
            <Row style={{ alignItems: "center" }}>
              <Col xs style={{ flexGrow: "0" }}>
                <b>{day.display}:</b>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row style={{ alignItems: "center" }}>
              <Col sm="auto" style={dayStyle}>
                <span>{dishTypes[day.dishType]} Main: </span>
                <span style={numberStyle}>{day.quantity}</span>
              </Col>

              {day.extras.map(extra => {
                return (
                  <Col sm="auto" style={dayStyle}>
                    <span>{extra.label}: </span>{" "}
                    <span style={numberStyle}>{extra.quantity}</span>
                  </Col>
                );
              })}
              <Col sm={1} />
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  detailsRow = customer => {
    return (
      <Row key={customer.id} style={detailRowStyle}>
        <Col md="auto">{this.createButton(customer.id)}</Col>

        <Col>
          <Row>
            <Col md={1} lg="1">
              <p>{customer.detailData.title}</p>
            </Col>
            <Col md={10} lg="2">
              <p>
                {customer.detailData.firstName} {customer.detailData.lastName}
              </p>
            </Col>
            <Col md={4} lg="3">
              <p>{customer.detailData.address}</p>
            </Col>
            <Col md={4} lg="2">
              <p>{customer.detailData.phone}</p>
            </Col>
            <Col md={4} lg="2">
              <p>{customer.detailData.email}</p>
            </Col>
          </Row>
        </Col>

        <Col md="auto">
          <Link
            to={{
              pathname: "/customers/extra/" + customer.id
            }}
          >
            <FaRegCalendarAlt />{" "}
          </Link>
          <FaTrashAlt />{" "}
          <Link
            to={{
              pathname: "/customers/edit/" + customer.id
            }}
          >
            <FaEdit />
          </Link>
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
        <Icon
          style={{ pointerEvents: "none" }}
          name={this.state.buttons[id] ? downArrow : rightArrow}
        />
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

const customerInnerBackStyle = {
  marginLeft: "2px",
  background: "#c8c8c8",
  borderRadius: "5px",
  boxShadow: "1px 1px 2px grey"
};

const customerInnerRowStyle = {
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

const extraRowStyle = {
  marginLeft: "30px",
  marginRight: "30px",
  marginBottom: "10px",
  borderRadius: "5px",
  padding: "0px"
};

export default DisplayCustomersApp;
