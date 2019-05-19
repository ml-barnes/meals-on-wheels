import React from "react";
import Papa from "papaparse";
import csv_file from "./csv/client-records-2019.csv";

class CustomerFileReaderApp extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    Papa.parse(csv_file, {
      download: true,
      header: true,
      delimiter: ",",
      complete: function(results) {
        results.data.forEach(function(customer) {
          delete customer.customer_number;
          delete customer.village;
          delete customer.postcode;
          delete customer.town_city;
          delete customer.suburb;
          delete customer.status;
          delete customer.postcode;
          delete customer.street_number;
          delete customer.street_name;
        });

        for (var i = 0; i < results.data.length; i++) {
          let detail_data_container = {
            detailData: {
              title: results.data[i].title,
              firstName: results.data[i].firstName,
              lastName: results.data[i].lastName,
              latitude: results.data[i].latitude,
              longitude: results.data[i].longitude,
              phone: results.data[i].phone,
              email: results.data[i].email,
              address: results.data[i].address,
              notes: results.data[i].notes
            }
          };

          fetch("http://localhost:3001/api/createCustomer", {
            body: JSON.stringify(detail_data_container),
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
      }
    });
  }

  render() {
    return <div />;
  }
}

export default CustomerFileReaderApp;
