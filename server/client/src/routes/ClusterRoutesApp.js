import React from "react";
import { Map, TileLayer } from "react-leaflet";
import "react-leaflet-markercluster/dist/styles.min.css";
import { TimelineSlider } from "routes/TimelineSliderApp.js";
import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.js";
import "leaflet-sidebar.css";

var points1 = turf.featureCollection([]);
var points2 = turf.featureCollection([]);

const clustered_coordinates_1 = [
  [-45.853438, 170.530441],
  [-45.853692, 170.523196],
  [-45.846447, 170.516527],
  [-45.859428, 170.517111],
  [-45.852676, 170.518627],
  [-45.838147, 170.529178],
  [-45.852883, 170.532678],
  [-45.852871, 170.506762],
  [-45.81641, 170.621788],
  [-45.860848, 170.503739],
  [-45.860895, 170.504558],
  [-45.860875, 170.504548],
  [-45.848919, 170.532465],
  [-45.848307, 170.51397],
  [-45.860266, 170.50394],
  [-45.850169, 170.525989],
  [-45.851626, 170.522611],
  [-45.84477, 170.536721],
  [-45.853355, 170.526732],
  [-45.856733, 170.50366],
  [-45.854436, 170.503579],
  [-45.843289, 170.516284],
  [-45.859765, 170.507854],
  [-45.847334, 170.5168],
  [-45.854934, 170.522177],
  [-45.855775, 170.505235],
  [-45.857491, 170.503988],
  [-45.849477, 170.533192],
  [-45.847706, 170.533924],
  [-45.845078, 170.538899],
  [-45.857604, 170.503352],
  [-45.863148, 170.510464],
  [-45.842823, 170.5158],
  [-45.847374, 170.512204],
  [-45.851654, 170.535516],
  [-45.847971, 170.533311],
  [-45.847843, 170.512273],
  [-45.806919, 170.62198],
  [-45.856411, 170.513799],
  [-45.844476, 170.515351],
  [-45.850596, 170.515292]
];

const clustered_coordinates_2 = [
  [-45.871776, 170.349661],
  [-45.874903, 170.343586],
  [-45.880285, 170.359564],
  [-45.882473, 170.359651],
  [-45.881983, 170.360087],
  [-45.878232, 170.347856],
  [-45.882856, 170.353414],
  [-45.873158, 170.334187],
  [-45.872378, 170.352228],
  [-45.868969, 170.342194],
  [-45.876764, 170.358831],
  [-45.879318, 170.361529],
  [-45.876411, 170.345508],
  [-45.878522, 170.344499],
  [-45.883744, 170.354285],
  [-45.871796, 170.35054],
  [-45.883222, 170.347015],
  [-45.880587, 170.360922],
  [-45.882544, 170.361006],
  [-45.883772, 170.358084],
  [-45.875461, 170.337393],
  [-45.869635, 170.343951],
  [-45.87357, 170.349807],
  [-45.875942, 170.346267],
  [-45.8824, 170.360809],
  [-45.872201, 170.345611],
  [-45.877849, 170.359103],
  [-45.881958, 170.360426],
  [-45.882719, 170.361091],
  [-45.874903, 170.343586],
  [-45.871512, 170.343983],
  [-45.87166, 170.345687],
  [-45.874567, 170.331449],
  [-45.871113, 170.346278],
  [-45.882244, 170.359686],
  [-45.871887, 170.332788],
  [-45.878441, 170.345802],
  [-45.877478, 170.361398],
  [-45.878599, 170.362292],
  [-45.871151, 170.340184],
  [-45.8786, 170.362301],
  [-45.871824, 170.353423],
  [-45.87501, 170.34567],
  [-45.876382, 170.346779],
  [-45.877648, 170.359902],
  [-45.875837, 170.346164],
  [-45.87694, 170.345493],
  [-45.883922, 170.35746],
  [-45.881257, 170.350837],
  [-45.877393, 170.347184]
];

const data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        title: "21st May 2019",
        content: "Welcome to the first day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.480968, -45.857316, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "21st May 2019",
        content: "Welcome to the first day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.489565, -45.854098, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "21st May 2019",
        content: "Welcome to the first day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.477697, -45.875422, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "21st May 2019",
        content: "Welcome to the first day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.517111, -45.859428, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "22nd May 2019",
        content: "Welcome to the second day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.530441, -45.853438, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "23rd May 2019",
        content: "Welcome to the third day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.50098, -45.900141, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "24th May 2019",
        content: "Welcome to the fourth day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.456664, -45.866382, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "25th May 2019",
        content: "Welcome to the fifth day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.486937, -45.903188, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "26th May 2019",
        content: "Welcome to the sixth day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.509533, -45.905685, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "26th May 2019",
        content: "Welcome to the sixth day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.510958, -45.900795, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "26th May 2019",
        content: "Welcome to the sixth day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.529178, -45.838147, 1]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "27th May 2019",
        content: "Welcome to the seventh day"
      },
      geometry: {
        type: "Point",
        coordinates: [170.518627, -45.852676, 1]
      }
    }
  ]
};

class ClusterRoutesApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      customerData: [],
      clusterData: [],
      deliveryData: [],
      collapsed: false,
      selected: "home"
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    /*const customerAddress = "http://localhost:3001/api/getCustomers";
        fetchHelper.fetch(customerAddress, { method: "GET" }, data => {
            this.setState({
                customerData: data
            });
        });*/
    /*const clusterAddress = "http://localhost:3001/api/getClusters";
        fetchHelper.fetch(clusterAddress, { method: "GET" }, data => {
            this.setState({
                clusterData: data
            });
            console.log(this.state.clusterData);
        });*/
    /*const deliveryAddress = "http://localhost:3001/api/getDeliveries";
        fetchHelper.fetch(deliveryAddress, { method: "GET" }, data => {
            this.setState({
                deliveryData: data
            });
        });*/
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

  onClose() {
    this.setState({ collapsed: true });
  }
  onOpen(id) {
    this.setState({
      collapsed: false,
      selected: id
    });
  }

  createPolygons = () => {
    clustered_coordinates_1.forEach(function(address, index) {
      points1.features.push(turf.point([address[1], address[0]]));
      points1.features[index].properties.content = "Welcome to the first day";
      points1.features[index].properties.title = "21st May 2019";
    });

    clustered_coordinates_2.forEach(function(address, index) {
      points2.features.push(turf.point([address[1], address[0]]));
      points2.features[index].properties.content = "Welcome to the first day";
      points2.features[index].properties.title = "21st May 2019";
    });

    const options = { concavity: 1 };
    const hull1 = turf.convex(points1, options);
    const hull2 = turf.convex(points2, options);

    console.log("Hull: ", hull1);

    const map = this.refs.map.leafletElement;

    L.geoJSON(hull1, {
      properties: {
        name: "Coors Field",
        amenity: "Baseball Stadium",
        popupContent: "This is where the Rockies play!"
      },
      style: {
        fillColor: "#D8BFD8",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7
      }
    }).addTo(map);

    L.geoJSON(hull2, {
      style: {
        fillColor: "#FFA07A",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7
      }
    }).addTo(map);
  };

  getDataAddMarkers = (options, exclamation) => {
    const { label, value, map } = options;

    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    var filteredData = points2.features.filter(function(i, n) {
      return i.properties.title === label;
    });

    //console.log(data);
    //console.log("Filtered data:", filteredData);
    let markerArray = [];

    L.geoJson(filteredData, {
      onEachFeature: function onEachFeature(feature, layer) {
        let content = `${feature.properties.content}`;
        var popup = L.popup().setContent(content);
        layer.bindPopup(popup);
        markerArray.push(layer);
      }
    }).addTo(map);

    const markerGroup = L.featureGroup(markerArray);

    //map.fitBounds(markerGroup.getBounds()).setZoom(13);

    markerGroup.addTo(map);
  };

  render() {
    const position = [-45.8739282, 170.503488];

    // Boundary box: 170.160217, -45.982304 , 170.789293 , -45.683075
    const bounds = [[-45.982304, 170.160217], [-45.683075, 170.789293]];
    const timelineItems = [
      "21st May 2019",
      "22nd May 2019",
      "23rd May 2019",
      "24th May 2019",
      "25th May 2019",
      "26th May 2019",
      "27th May 2019"
    ];
    return (
      <React.Fragment>
        {/*<Sidebar id="sidebar" collapsed={this.state.collapsed} selected={this.state.selected}
                    onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                    <Tab id="home" header="Home" icon="fa fa-home">
                        <p>No place like home!</p>
                    </Tab>
                    <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
                        <p>Settings dialogue.</p>
                    </Tab>
        </Sidebar>*/}
        <Map
          className="sidebar-map"
          //maxBounds={bounds}
          center={position}
          zoom={13}
          minZoom={1}
          maxZoom={18}
          //maxBoundsViscosity={0.9}
          style={{ height: "100%" }}
          ref="map"
          whenReady={this.createPolygons}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

          <TimelineSlider
            timelineItems={timelineItems}
            //extraChangeMapParams={greeting: "Hello world!"}
            changeMap={this.getDataAddMarkers}
          />
        </Map>
      </React.Fragment>
    );
  }
}

const leafletControlStyles = {
  position: "relative",
  top: "20px"
};

export default ClusterRoutesApp;
