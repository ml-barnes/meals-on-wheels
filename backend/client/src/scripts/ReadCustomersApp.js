import React from "react";
//import Papa from "papaparse";
//import csv_file from "scripts/csv/client-records-2019.csv";

class CustomerFileReaderApp extends React.Component {
  componentDidMount() {
    // Papa.parse(csv_file, {
    //   download: true,
    //   header: true,
    //   delimiter: ",",
    //   complete: function(results) {
    //     results.data.forEach(function(customer) {
    //       delete customer.customer_number;
    //       delete customer.village;
    //       delete customer.postcode;
    //       delete customer.town_city;
    //       delete customer.suburb;
    //       delete customer.status;
    //       delete customer.postcode;
    //       delete customer.street_number;
    //       delete customer.street_name;
    //     });
    //     for (var i = 0; i < results.data.length; i++) {
    //       let detail_data_container = {
    //         detailData: {
    //           title: results.data[i].title,
    //           firstName: results.data[i].firstName,
    //           lastName: results.data[i].lastName,
    //           latitude: results.data[i].latitude,
    //           longitude: results.data[i].longitude,
    //           phone: results.data[i].phone,
    //           email: results.data[i].email,
    //           address: results.data[i].address,
    //           notes: results.data[i].notes
    //         },
    //         mealData: getDefaultMealData(),
    //         restrictionData: getDefaultRestrictionData()
    //       };
    //       fetch(`${serverAddress}createCustomer`, {
    //         body: JSON.stringify(detail_data_container),
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: window.localStorage.token
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

const DEFAULT_MEAL = 4;

const getDefaultMealData = () => {
  const days = [
    ["Monday", 0],
    ["Tuesday", 1],
    ["Wednesday", 2],
    ["Thursday", 3],
    ["Friday", 4],
    ["Saturday", 5]
  ];

  return days.map(day => {
    return {
      key: day[1],
      quantity: 1,
      display: day[0],
      extras: [],
      dishType: DEFAULT_MEAL
    };
  });
};

const getDefaultRestrictionData = () => {
  const restrictions = [
    [0, "Meal Options"],
    [1, "Meat Restrictions"],
    [2, "Vegetable Restrictions"],
    [3, "Fruit Restrictions"],
    [4, "Sandwich Restrictions"],
    [5, "Dessert Restrictions"],
    [6, "Soup Restrictions"]
  ];

  return restrictions.map(restriction => {
    return {
      key: restriction[0],
      display: restriction[1],
      restrictionOptions: []
    };
  });
};

export default CustomerFileReaderApp;
