import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "styles/baseStyle.css";
import "customers/Style/customerStyle.css";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Container from "react-bootstrap/Container";
import * as dataHelper from "customers/DataHelper/customerDataHelper";
import { FaEdit, FaRegCalendarAlt } from "react-icons/fa";
import { Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import fetchHelper from "fetchHelper/fetchHelper";
import Modal from "react-bootstrap/Modal";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import AddOnCalendar from "calendar/AddOnCalendar";
import Spinner from "react-bootstrap/Spinner";

class DisplayCustomersApp extends React.Component {
  state = {
    currentAddOn: 0,
    data: [],
    filtered: [],
    buttons: {},
    emptyList: false,
    currentModal: null,
    disable: null,
    newList: [],
    multiple: false,
    highlightOnlyResult: true,
    minLength: 2,
    selectHintOnEnter: true,
    labelKey: "lastName",
    loading: true
  };
  constructor() {
    super();

    this.updateSearchParameter = this.updateSearchParameter.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const address = "http://localhost:3001/api/getCustomers";
    fetchHelper.fetch(
      address,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: window.localStorage.token
        }
      },
      data => {
        if (data instanceof Error) {
          console.log("error", data);
          return;
        }

        data.map(customer => {
          customer.mealData =
            customer.mealData.length > 1
              ? customer.mealData
              : dataHelper.getDefaultMealData();
          customer.restrictionData =
            customer.restrictionData.length > 1
              ? customer.restrictionData
              : dataHelper.getDefaultRestrictionData();
        });
        this.setState(
          {
            data,
            filtered: data
          },
          this.setState({ loading: false })
        );
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.header()}
        <Container fluid className="baseContainer">
          <Row className="baseRow">
            <Col sm="1" className="baseButtonColumn" />
            <Col className="baseDiv">
              {!this.state.loading ? (
                <div className="displayDiv">
                  {this.state.emptyList && <h4>No matches</h4>}
                  {this.state.filtered.length > 0 &&
                    this.state.filtered
                      .filter(customer => customer.active)
                      .map(customer => {
                        return (
                          <React.Fragment key={customer.id}>
                            {this.detailsRow(customer)}
                            {this.state.buttons[customer.id] && (
                              <React.Fragment>
                                <Row
                                  key={customer.id}
                                  className="customerInnerBack"
                                >
                                  <Col sm="12" className="noPadding">
                                    {this.notes(customer)}
                                    {this.meals(customer)}
                                    {this.restrictionRow(customer)}
                                    {this.addOns(customer)}
                                  </Col>
                                </Row>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        );
                      })}
                </div>
              ) : (
                <Col className="spinnerCol">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </Col>
              )}
            </Col>
            <Col sm="1" className="baseButtonColumn" />
          </Row>
          {this.createModal()}
        </Container>
      </React.Fragment>
    );
  }

  handleShow = e => {
    console.log(e.target);
    this.setState({ currentModal: e.target.id });
  };

  handleHide = e => {
    this.setState({ currentModal: null });
  };

  updateSearchParameter = e => {
    console.log(e.target);
    this.setState({ labelKey: e.target.options[e.target.selectedIndex].value });
  };

  handleButtonClick = e => {
    // If is has a "-", it means its not a main button.
    // Therefore we don't need to check for add ons
    if (e.target.id.includes("-") === false) {
      const address = "http://localhost:3001/api/getExtras?id=" + e.target.id;

      this.setState({ currentAddOn: 0 }, () => {
        fetchHelper.fetch(address, { method: "GET" }, data => {
          this.setState({ currentAddOn: data.length });
        });
      });
    }

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

  notes = customer => {
    return (
      <Row className="customerInnerRow">
        <Col className="noFlexGrow">
          <p className="bold">Notes:</p>
        </Col>
        <Col>
          <p>{customer.detailData.notes}</p>
        </Col>
      </Row>
    );
  };

  meals = customer => {
    return (
      <div>
        <Row className="customerInnerRow">
          <Col className="innerTitle">
            {this.createButton(customer.id + "-meals")}
          </Col>
          <Col className="innerTitle">
            <p className="bold">Meals</p>
          </Col>
        </Row>
        {this.state.buttons[customer.id + "-meals"] &&
          customer.mealData.map(day => {
            return <React.Fragment>{this.day(day)}</React.Fragment>;
          })}
      </div>
    );
  };

  restrictionRow = customer => {
    return (
      this.checkRestrictions(customer.restrictionData) && (
        <React.Fragment>
          <Row className="customerInnerRow">
            <Col className="innerTitle">
              {this.createButton(customer.id + "-res")}
            </Col>
            <Col className="innerTitle">
              <p className="bold">Restrictions</p>
            </Col>
          </Row>
          {this.state.buttons[customer.id + "-res"] &&
            customer.restrictionData.map((res, i) => {
              return (
                <React.Fragment key={i}>
                  {this.restrictions(res)}
                </React.Fragment>
              );
            })}
        </React.Fragment>
      )
    );
  };

  addOns = customer => {
    return this.state.currentAddOn > 0 ? (
      <React.Fragment>
        <Row className="customerInnerRow">
          <Col className="innerTitle">
            {this.createButton(customer.id + "-addOns")}
          </Col>
          <Col sm="auto" className="innerTitle">
            <p className="bold">Add Ons</p>
          </Col>
        </Row>

        {this.state.buttons[customer.id + "-addOns"] && (
          <Row id="extraRow">
            <Col className="addOnRow" id="extraCol">
              <AddOnCalendar CustomerId={customer.id} />
            </Col>
          </Row>
        )}
      </React.Fragment>
    ) : (
      <React.Fragment />
    );
  };

  header = () => {
    const { multiple } = this.state;

    const disabled =
      this.state.filtered.length > 0 &&
      this.state.filtered.filter(customer => {
        return !customer.active;
      });

    const active = this.state.filtered.filter(customer => {
      return customer.active;
    });

    console.log(active);

    return (
      <Row className="baseHeader">
        <Col sm="auto" className="headerStyle">
          <h2>Customers List</h2>
        </Col>

        <Col sm={"1"} />
        <Col sm className="headerMargin">
          <Link to={{ pathname: "/customers/add" }}>
            <Button fluid>New Customer</Button>
          </Link>
        </Col>
        <Col sm className="headerMargin">
          <Button
            id="restoreModal"
            variant="primary"
            onClick={this.handleShow}
            fluid
          >
            Restore{" "}
          </Button>
          <Modal
            // used for applying an invisible scrollbar on the modal popup
            className="modalOverflow"
            show={this.state.currentModal === "restoreModal"}
            onHide={this.handleHide}
            dialogClassName="mw-100 w-75"
            id="restoreModal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Restore Customers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {disabled.length > 0 ? (
                <Container fluid className="modalContainer">
                  <Row className="baseRow">
                    <Col>
                      {disabled.map(customer => {
                        return (
                          <React.Fragment key={customer.id}>
                            {this.detailsRow(customer)}
                            {this.state.buttons[customer.id] && (
                              <React.Fragment>
                                <Row
                                  key={customer.id}
                                  className="customerInnerBack"
                                >
                                  <Col sm="12" className="noPadding">
                                    {this.notes(customer)}
                                    {this.meals(customer)}
                                    {this.restrictionRow(customer)}
                                    {this.addOns(customer)}
                                  </Col>
                                </Row>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </Col>
                  </Row>
                </Container>
              ) : (
                "No customers to restore"
              )}
            </Modal.Body>
          </Modal>
        </Col>

        <Col sm>
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
          </Form.Control>
        </Col>
        <Col sm>
          <Typeahead
            maxResults={5}
            id="typeahead-search"
            type="search"
            placeholder="Search..."
            onKeyDown={this.handleSearch}
            onSelect={this.handleSearch}
            onChange={e => {
              this.handleSearch(document.getElementById("search-input"));
            }}
            inputProps={{ id: "search-input" }}
            minLength={0}
            labelKey={this.getLabelKey}
            multiple={multiple}
            options={active}
          />
        </Col>
        <Col sm={1} />
      </Row>
    );
  };

  getLabelKey = e => {
    return e.detailData[this.state.labelKey];
  };

  handleSearch = e => {
    let value;
    if (e.id) {
      value = e.value;
    } else {
      value = e.target.value;
    }

    if (value.length < 3) {
      return;
    }

    var currentList = [];
    var newList = [];
    if (value !== "") {
      currentList = this.state.data;
      newList = currentList.filter(item => {
        const lc = item.detailData[this.state.labelKey].toLowerCase();
        const filter = value.toLowerCase();
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
  };

  day = day => {
    const dishTypes = ["Small", "Large", "Tinfoil", "Frozen", "Standard"];
    return (
      <React.Fragment>
        <Row className="mealDayStyle">
          <Col sm={2}>
            <Row className="centerItems">
              <Col xs className="noFlexGrow">
                <b>{day.display}:</b>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="centerItems">
              <Col sm="auto" className="dayStyle">
                <span>{dishTypes[day.dishType]} Main: </span>
                <span className="numberStyle">{day.quantity}</span>
              </Col>

              {day.extras.map(extra => {
                return (
                  <Col sm="auto" className="dayStyle">
                    <span>{extra.label}: </span>{" "}
                    <span className="numberStyle">{extra.quantity}</span>
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
      <Row key={customer.id} className="headerRow">
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
          <Row>
            <Col>
              {[
                {
                  tip: "Create Add On",
                  item: (
                    <Link
                      className="ui circular button icon"
                      to={{
                        pathname: `/customers/extra/${customer.id}`
                      }}
                    >
                      <FaRegCalendarAlt className="largeIcon" />
                    </Link>
                  )
                },
                {
                  tip: "Edit Customer",
                  item: (
                    <Link
                      className="ui circular button icon"
                      to={{
                        pathname: `/customers/edit/${customer.id}`
                      }}
                    >
                      <FaEdit className="largeIcon" />
                    </Link>
                  )
                },
                {
                  tip: customer.active
                    ? "Disable Customer"
                    : "Restore Customer",
                  item: (
                    <Button
                      icon
                      circular
                      id={"disableModal"}
                      onClick={e => {
                        this.setState(
                          { disable: customer },
                          this.handleShow(e)
                        );
                      }}
                    >
                      <Icon
                        className="noPointerEvents"
                        name={customer.active ? "trash alternate" : "redo"}
                      />
                    </Button>
                  )
                }
              ].map(items => {
                return (
                  <Row className="iconCol">
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>{items.tip}</Tooltip>}
                    >
                      {items.item}
                    </OverlayTrigger>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  createModal = () => {
    return (
      this.state.disable && (
        <Modal
          id="disableModal"
          show={this.state.currentModal === "disableModal"}
          onHide={this.handleHide}
        >
          <Modal.Body>
            Are you sure you want to{" "}
            {this.state.disable.active ? "disable" : "restore"} this customer?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHide}>
              Cancel
            </Button>
            <Button
              id="modal"
              color={this.state.disable.active ? "red" : "green"}
              onClick={this.changeCustomer}
            >
              {this.state.disable.active ? "Disable" : "Restore"}
            </Button>
          </Modal.Footer>
        </Modal>
      )
    );
  };

  changeCustomer = () => {
    this.handleHide();

    let { filtered } = this.state;
    filtered.filter(
      customer => customer.id === this.state.disable.id
    )[0].active = !this.state.disable.active;

    const address = "http://localhost:3001/api/updateCustomerActive";
    fetchHelper.fetch(
      address,
      {
        method: "POST",
        body: JSON.stringify({ id: this.state.disable.id }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      },
      data => {
        if (data instanceof Error) {
          return;
        }
        this.setState({ filtered });
      }
    );
  };

  restrictions = res => {
    return (
      <React.Fragment>
        {res.restrictionOptions.length != 0 && (
          <Row className="restrictionRowStyle">
            <Col sm={2}>
              <Row className="centerItems">
                <Col xs md="auto" className="noFlexGrow">
                  <b>{res.display}:</b>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="centerItems">
                {res.restrictionOptions.map((option, i) => {
                  return (
                    <Col key={i} sm="auto" className="dayStyle">
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
          className="noPointerEvents"
          name={this.state.buttons[id] ? downArrow : rightArrow}
        />
      </Button>
    );
  };
}

export default DisplayCustomersApp;
