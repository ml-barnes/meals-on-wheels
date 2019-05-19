import React from "react"
import Table from "react-bootstrap/Table"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class DisplayRoutesApp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeDropdown: 1,
            data: [],
            filtered: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        fetch("http://localhost:3001/api/driversList")
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(data => {
                this.setState({
                    data,
                    filtered: data
                });
                console.log(this.state.filtered);
            });
    };

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }

    parseJSON(response) {
        //console.log("Parse");
        return response.json();
    }


    handleSelect = (eventKey) => {
        console.log(eventKey);
    }

    render() {
        const position = [-45.8739282, 170.503488];

        return (

            <React.Fragment>
                {this.header()}

                {this.state.filtered.map(driver => (
                                <h3>{driver.detailData.lastName} {driver.detailData.firstName}</h3>
                            ))}
                            
                <Map className="markercluster-map" center={position} zoom={16} minZoom={16} maxZoom={16} zoomControl={false} style={{width: "50%", align: "right"}} dragging={false} ref="map">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                   

                </Map>

                {this.state.filtered.map(driver =>
                    (
                        <React.Fragment>



                            <span>{driver.detailData.lastName} {driver.detailData.firstName}</span>
                            <span>Area: Waverley</span>
                            <span>Number of assigned customers: 4</span>
                            
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Customer Name</th>
                                        <th>Customer Address</th>
                                        <th>Customer Phone Number</th>
                                        <th>Items to deliver</th>
                                        <th>Notes/Instructions</th>
                                        <th>Settings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                    </tr>
                                </tbody>
                            </Table>



                        </React.Fragment>
                    )
                )}

            {/*<Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Standard meals</th>
                                        <th>Special meals</th>
                                        <th>Desserts standard</th>
                                        <th>Notes/Instructions</th>
                                        <th>Settings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                        <td>Table cell</td>
                                    </tr>
                                </tbody>
                            </Table>
                            */}
            </React.Fragment>
        )
    }

    header = () => {
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
                    {/*<h2>Meal Delivery Schedules</h2>*/}

                        <DropdownButton
                            onSelect={this.handleSelect}
                            title="Dropdown right"
                            id="dropdown-menu-align-right"
                        >
                            <Dropdown.Item eventKey="0">Show all</Dropdown.Item>
                            <Dropdown.Divider />
                            {this.state.filtered.map(driver =>
                                <Dropdown.Item eventKey={driver.ID}>{driver.detailData.lastName} {driver.detailData.firstName}</Dropdown.Item>
                            )}

                        </DropdownButton>;
        


                    <DropdownButton
                        alignRight
                        title="Date"
                        id="dropdown-menu-align-right"
                        class="pull-right"
                    >
                        <Dropdown.Item eventKey="1">Show all</Dropdown.Item>
                        <Dropdown.Divider />
                        {this.state.filtered.map(driver =>
                            <Dropdown.Item eventKey="4"></Dropdown.Item>
                        )}

                        </DropdownButton>


                </Col>
            </Row>




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


export default DisplayRoutesApp;