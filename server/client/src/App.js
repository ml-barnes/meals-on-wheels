import React, { Component } from "react";
import HeaderApp from "./components/apps/HeaderApp.js";
import "./App.css";

class App extends Component {
  // getData = () => {
  //   fetch("http://localhost:3001/api/users")
  //     .then(this.checkStatus)
  //     .then(this.parseJSON)
  //     .then(data => {
  //       this.setState({
  //         data
  //       });
  //     });
  // };

  // checkStatus(response) {
  //   if (response.status >= 200 && response.status < 300) {
  //     return response;
  //   }
  //   const error = new Error(`HTTP Error ${response.statusText}`);
  //   error.status = response.statusText;
  //   error.response = response;
  //   console.log(error); // eslint-disable-line no-console
  //   throw error;
  // }

  // parseJSON(response) {
  //   console.log("Parse");
  //   return response.json();
  // }

  // displayData = () => {
  //   if (this.state != null) {
  //     return this.state.data[0].firstName + " " + this.state.data[0].lastName;
  //   } else {
  //     return "No data yet. Please click above.";
  //   }
  // };

  render() {
    return (
      <React.Fragment>
        <HeaderApp />
        {/*<h1 onClick={this.getData}>Click me</h1>
        <p>{this.displayData()}</p>*/}
      </React.Fragment>
    );
  }
}

export default App;
