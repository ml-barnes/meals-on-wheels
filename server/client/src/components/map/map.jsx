import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Geolocation from "react-geolocation";
import GoogleMapReact from "google-map-react";
import Button from "react-bootstrap/Button";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  state = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handleChangeLocation = () => {
    const newLat = this.state.center.lat - 1;
    this.setState({
      center: {
        lat: newLat,
        lng: 30.33
      }
    });
  };

  render() {
    return (
      <div style={{ flex: "1", width: "100%" }}>
        <Button
          style={{ position: "absolute", zIndex: "1", margin: "10px" }}
          onClick={() => this.handleChangeLocation()}
        >
          Change Location
        </Button>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB3D_5wU2Ve1P-fU5939rpAPoC5Bolcw-I" }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {/*<AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={"Kreyser Avrora"}
          />*/}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

// {
//   /*<Button onClick={() => this.handleChangeLocation()}>
//           Change Location
// </Button>*/
// }

// const mapStyles = {
//   width: "100%",
//   flex: "1"
// };

// export class MapContainer extends Component {
//   constructor() {
//     super();
//     //this.getLatLong();
//   }

//   state = {
//     currentLatitude: -45.86492,
//     currentLongitude: 170.52015
//   };

//   //   getLatLong = () => {
//   //     navigator.geolocation.getCurrentPosition(
//   //       position => {
//   //         const currentLatitude = JSON.stringify(position.coords.latitude);
//   //         const currentLongitude = JSON.stringify(position.coords.longitude);
//   //         this.setState({
//   //           currentLatitude,
//   //           currentLongitude
//   //         });
//   //       },
//   //       error => alert(error.message),
//   //       {
//   //         enableHighAccuracy: true,
//   //         timeout: 20000,
//   //         maximumAge: 1000
//   //       }
//   //     );
//   //   };

//   render() {
//     return (
//       <div style={{ flex: "1" }} />
//       //   <Map
//       //     google={this.props.google}
//       //     zoom={14}
//       //     style={mapStyles}
//       //     initialCenter={{
//       //       lat: this.state.currentLatitude,
//       //       lng: this.state.currentLongitude
//       //     }}
//       //   />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyB3D_5wU2Ve1P-fU5939rpAPoC5Bolcw-I"
// })(MapContainer);

// import React, { Component } from "react";
// import { Map, GoogleApiWrapper } from "google-maps-react";
// import Geolocation from "react-geolocation";

// const mapStyles = {
//   width: "100%",
//   height: "100%"
// };

// export class MapContainer extends Component {
//   state = {
//     currentLongitude: -45.8628592, //Initial Longitude
//     currentLatitude: 170.5120163 //Initial Latitude
//   };

//   render() {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => {
//     //     const currentLongitude = JSON.stringify(position.coords.longitude);
//     //     const currentLatitude = JSON.stringify(position.coords.latitude);
//     //     console.log(currentLatitude, currentLongitude);
//     //     this.setState({
//     //       currentLatitude,
//     //       currentLongitude
//     //     });
//     //   },
//     //   error => alert(error.message),
//     //   {
//     //     enableHighAccuracy: true,
//     //     timeout: 20000,
//     //     maximumAge: 1000
//     //   }
//     // );
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{
//           lat: this.state.currentLatitude,
//           lng: this.state.currentLatitude
//         }}
//       />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyB3D_5wU2Ve1P-fU5939rpAPoC5Bolcw-I"
// })(MapContainer);
