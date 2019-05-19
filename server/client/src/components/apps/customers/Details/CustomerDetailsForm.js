import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import CustomerStepper from "../../../nav/CustomerStepper";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Modal from "react-bootstrap/Modal";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import "./styles.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Autosuggest from "react-autosuggest";

class CustomerDetailsForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      validated: false,
      data: [],

      addressButtonSubmission: false,
      // react bootstrap typeahead states
      multiple: false,
      highlightOnlyResult: true,
      minLength: 0,
      selectHintOnEnter: true,
      labelKey: "label",
      filtered: [],

      // leaflet map
      center: {
        lat: -45.8739282,
        lng: 170.503488
      },
      marker: {
        lat: -45.8739282,
        lng: 170.503488
      },

      zoom: 13,
      draggable: false,
      highlight: true
    };

    this.marker = React.createRef();

    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };
  }

  handleOnDragEnd = () => {
    this.updatePosition();

    this.toggleDraggable();

    this.toggleAddressButtonSubmission();
    this.toggleHighlight();
  };

  handleMoveMarkerClick = () => {
    this.toggleAddressButtonSubmission();
    this.toggleDraggable();
    //console.log(this.state.highlight);
    this.toggleHighlight();
    //console.log(this.state.highlight);
    this.updateHighlight();
  };

  toggleAddressButtonSubmission = () => {
    console.log("Address button", this.state.addressButtonSubmission);
    this.setState({
      addressButtonSubmission: !this.state.addressButtonSubmission
    });
    console.log("Address button", this.state.addressButtonSubmission);
  };

  toggleHighlight = () => {
    console.log("Highlight:", this.state.highlight);
    this.setState({ highlight: !this.state.highlight });

    console.log("Highlight:", this.state.highlight);
  };

  toggleDraggable = () => {
    console.log("Draggable", this.state.draggable);
    this.setState({ draggable: !this.state.draggable });

    console.log("Draggable", this.state.draggable);
  };

  updatePosition = () => {
    const marker = this.marker.current;

    if (marker != null) {
      console.log(this.state.marker);
      this.setState({
        marker: marker.leafletElement.getLatLng()
      });
    }
  };

  updateHighlight = () => {
    const marker = this.marker.current;
    this.state.highlight
      ? marker.leafletElement.enableTemporaryHighlight()
      : marker.leafletElement.disableTemporaryHighlight();
  };

  componentDidUpdate() {
    if (this.refs.map) {
      this.refs.map.leafletElement.invalidateSize();
    }
  }

  componentDidMount() {
    this.initialiseOSMAddressSearch();
  }

  initialiseOSMAddressSearch = () => {
    // setup
    const provider = new OpenStreetMapProvider();

    const form = document.querySelector("form");
    const input = form.querySelector(
      'input[class="rbt-input-main form-control rbt-input"]'
    );

    input.addEventListener("input", async event => {
      const results = await provider.search({ query: input.value });
      // https://wiki.openstreetmap.org/wiki/Bounding_Box, http://boundingbox.klokantech.com/
      // Boundary box: 170.160217, -45.982304 , 170.789293 , -45.683075
      // possibility of using leaflet's inbuilt contains method?? : https://stackoverflow.com/questions/18295825/determine-if-point-is-within-bounding-box
      for (var i = 0; i < results.length; i++) {
        if (
          results[i].raw.boundingbox[0] < -45.982304 ||
          results[i].raw.boundingbox[1] > -45.683075 ||
          results[i].raw.boundingbox[2] > 170.789293 ||
          results[i].raw.boundingbox[3] < 170.160217
        ) {
          results.splice(i);
        } else {
          results[i].label = results[i].label.replace(/,/g, "");
        }
      }

      //console.log(event);
      //console.log(results);

      if (results !== undefined && results.length != 0) {
        // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        this.setState({
          results,
          filtered: results,

          center: {
            lat: results[0].y,
            lng: results[0].x
          },


          marker: {
            lat: results[0].y,
            lng: results[0].x
          }


        });

      }


      //console.log(this.state.filtered);
    });
  };

  handleSubmit = () => {
    var jsonData = this.state;
    delete jsonData.validated;

    console.log(jsonData);

    fetch("http://localhost:3001/api/createCustomer", {
      body: JSON.stringify(this.state),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    const {
      multiple,
      highlightOnlyResult,
      minLength,
      selectHintOnEnter,
      labelKey,
      filtered
    } = this.state;

    const { validated } = this.state;
    const { detailData } = this.props;
    console.log(detailData);
    const { addressButtonSubmission } = this.state;

    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];
    const { highlight } = this.state;

    return (
      <React.Fragment>
        <Form
        /*noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}*/
        >
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                id="title"
                as="select"
                onChange={this.props.handleChange}
                value={detailData.title}
              >
                <option>Choose...</option>
                <option>Mr</option>
                <option>Mrs</option>
                <option>Miss</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                id="firstName"
                onChange={this.props.handleChange}
                type="firstName"
                placeholder="Enter first name..."
                value={detailData.firstName}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                id="lastName"
                onChange={this.props.handleChange}
                type="lastName"
                placeholder="Enter last name..."
                value={detailData.lastName}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Address</Form.Label>
              <Typeahead
                id="address"
                type="address"
                type="search"
                placeholder="Start typing an address here..."
                onKeyDown={this.handleAddressSearch}
                onSelect={this.handleAddressSearch}
                onChange={this.handleShow}
                //onChange={this.props.handleChange}
                minLength={0}
                labelKey={labelKey}
                multiple={multiple}
                options={filtered}

              />
              {/*<Form.Control
                id="address_search"
                placeholder="Search"
                type="text"
              />*/}
            </Form.Group>
          </Form.Row>

          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            dialogClassName="mw-100 w-75"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Address Confirmation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Map center={position} zoom={this.state.zoom} ref="map">
                <TileLayer
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={position}
                  draggable={this.state.draggable}
                  onDragEnd={this.handleOnDragEnd}
                  position={markerPosition}
                  ref={this.marker}
                >
                  <Popup>
                    <span>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </span>
                  </Popup>
                </Marker>
              </Map>
              <br></br>
              <ButtonGroup>
                <ButtonToolbar>
                  <Button
                    variant="secondary"
                    className="mr-3"
                    onClick={this.handleMoveMarkerClick}
                  >
                    Move Marker
                  </Button>

                  <Button
                    variant="primary"
                    onClick={this.handleHide}
                    disabled={addressButtonSubmission}
                  >
                    Confirm Address
                  </Button>
                </ButtonToolbar>
              </ButtonGroup>
            </Modal.Body>
          </Modal>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                placeholder="bob@example.com"
                id="email"
                onChange={this.props.handleChange}
                value={detailData.email}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                id="phone"
                onChange={this.props.handleChange}
                required
                value={detailData.phone}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Label>Personal notes</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              id="notes"
              onChange={this.props.handleChange}
              value={detailData.notes}
            />
          </Form.Group>
          <Form.Group
            style={{
              marginTop: "2%",
              marginBottom: "2%"
            }}
          >

          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}

const divStyle = {
  border: "2px solid #e0e1e2",
  background: "#f8f9fa",
  borderRadius: "5px",
  paddingTop: "20px"
};
export default CustomerDetailsForm;
