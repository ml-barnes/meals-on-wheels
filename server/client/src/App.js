import React, { Component } from "react";
import HeaderApp from "HeaderApp";
import "App-css.css";
import { AuthConsumer, AuthProvider } from "react-check-auth";
import Login from "login";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AuthProvider
          authUrl={"http://localhost:3001/api/checkToken"}
          reqOptions={{
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: window.localStorage.token
            }
          }}
        >
          <AuthConsumer>
            {({ isLoading, userInfo, error, refreshAuth }) => {
              if (isLoading) {
                return (
                  <Row>
                    <Col>Loading...</Col>
                  </Row>
                );
              } else {
                if (!userInfo) {
                  return <Login />;
                } else {
                  return <HeaderApp refreshAuth={refreshAuth} />;
                }
              }
            }}
          </AuthConsumer>
        </AuthProvider>
      </React.Fragment>
    );
  }
}

export default App;
