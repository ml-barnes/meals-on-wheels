import React from "react";
import fetchHelper from "fetchHelper/fetchHelper";
import KmeansLib from "kmeans-same-size";

class GenerateClustersApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filtered: []
    };
  }

  componentDidMount() {
    this.getData();
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

  generateClusters = () => {
    const coordinates = [];
    const clusters = {};

    const kmeans = new KmeansLib();
    const group_number = 10; // Groups Number
    const group_size = 8; // Group size

    this.state.filtered.forEach(function(customer, index) {
      coordinates.push({
        customerID: customer.id,
        x: parseFloat(customer.detailData.latitude),
        y: parseFloat(customer.detailData.longitude)
      });
    });

    kmeans.init({
      k: group_number,
      runs: group_size,
      equalSize: true,
      normalize: false
    });

    if (coordinates.length > 0) {
      kmeans.calc(coordinates);

      coordinates.map(data => {
        clusters[data.k]
          ? clusters[data.k].customers.push(data.customerID)
          : (clusters[data.k] = { customers: [data.customerID], driverID: "" });
      });

      console.log("Cluster data: ", clusters);
      this.createClusters(clusters);
    }
  };
  createClusters = clusters => {
    //console.log("Clusters:", JSON.stringify(clusters));
    fetch("http://localhost:3001/api/createCluster", {
      body: JSON.stringify({ date: new Date(), clusterData: clusters }),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    this.generateClusters();

    return (
      <React.Fragment>
        {/*{this.state.data.map(customer =>
                    (
                        <h1>{customer.detailData.firstName} {customer.detailData.lastName}</h1>
                    )
                    )}*/}
      </React.Fragment>
    );
  }
}

export default GenerateClustersApp;
