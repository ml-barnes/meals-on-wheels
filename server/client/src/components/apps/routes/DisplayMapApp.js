import React from "react"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster';

class DisplayMapApp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            filtered: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        fetch("http://localhost:3001/api/customersList")
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

    adjustFocus = (e) => {
        this.refs.map.leafletElement.setView(e.target.getLatLng());
    }

    render() {
        const position = [-45.8739282, 170.503488];



        return (
            <React.Fragment>
                <Map className="markercluster-map" center={position} zoom={13} maxZoom={18} style={{ height: "100%" }} ref="map">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <MarkerClusterGroup>
                        {this.state.filtered.map(customer =>
                            (

                                <Marker position={[customer.detailData.latitude, customer.detailData.longitude]} onClick={this.adjustFocus}>
                                    <Popup>
                                        <span>{customer.id}</span>
                                        <br></br>
                                        <span>{customer.detailData.firstName} {customer.detailData.lastName}</span>
                                        <br></br>
                                        <span>{customer.detailData.address}</span>
                                    </Popup>
                                </Marker>
                            )
                        )}
                    </MarkerClusterGroup>

                </Map>
            </React.Fragment>
        )
    }
}


export default DisplayMapApp;