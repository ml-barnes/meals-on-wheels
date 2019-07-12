import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-markercluster/dist/react-leaflet-markercluster";
import fetchHelper from "fetchHelper/fetchHelper";
import serverAddress from "serverAddress";

class DisplayMapApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      filtered: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const address = `${serverAddress}getCustomers`;
    fetchHelper.fetch(address, { method: "GET" }, data => {
      this.setState({
        data,
        filtered: data
      });
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

  adjustFocus = e => {
    this.refs.map.leafletElement.setView(e.target.getLatLng());
  };

  render() {
    const position = [-45.8739282, 170.503488];

    // Boundary box: 170.160217, -45.982304 , 170.789293 , -45.683075
    const bounds = [[-45.982304, 170.160217], [-45.683075, 170.789293]];

    return (
      <React.Fragment>
        <Map
          className="markercluster-map"
          maxBounds={bounds}
          center={position}
          zoom={13}
          minZoom={12}
          maxZoom={18}
          maxBoundsViscosity={0.9}
          style={{ height: "100%" }}
          ref="map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

          <MarkerClusterGroup>
            {this.state.filtered.map(customer => (
              <Marker
                position={[
                  customer.detailData.latitude,
                  customer.detailData.longitude
                ]}
                onClick={this.adjustFocus}
              >
                <Popup>
                  <span>{customer.id}</span>
                  <br />
                  <span>
                    {customer.detailData.firstName}{" "}
                    {customer.detailData.lastName}
                  </span>
                  <br />
                  <span>{customer.detailData.address}</span>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

          {/*{clustered.map(address =>
                        (

                            <Marker position={address.features[0].geometry.coordinates} />
                        )
                        )}*/}
        </Map>
      </React.Fragment>
    );
  }
}

export default DisplayMapApp;
