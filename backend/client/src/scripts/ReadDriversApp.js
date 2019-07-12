import React from "react";
//import Papa from "papaparse";
// import csv_file from "./csv/drivers.csv";

class DriverFileReaderApp extends React.Component {
  componentDidMount() {
    // Papa.parse(csv_file, {
    //   download: true,
    //   header: true,
    //   delimiter: ",",
    //   complete: function(results) {
    //     for (var i = 0; i < results.data.length; i++) {
    //       let detail_data_container = {
    //         detailData: {
    //           driverType: results.data[i].type,
    //           lastName: results.data[i].last_name,
    //           firstName: results.data[i].first_name,
    //           phoneNumber: results.data[i].home,
    //           mobileNumber: results.data[i].mobile,
    //           notes: results.data[i].notes
    //         }
    //       };
    //       fetch(`${serverAddress}createDriver`, {
    //         body: JSON.stringify(detail_data_container),
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       });
    //     }
    //   }
    // });
  }

  render() {
    return <div />;
  }
}

export default DriverFileReaderApp;
