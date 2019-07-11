import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "semantic-ui-react";
import { Input } from "semantic-ui-react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: "",
        password: ""
      },
      authenticated: false
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    const { login } = this.state;
    login[name] = value;
    this.setState({
      login
    });
  };

  onSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3001/api/authenticateUser", {
      method: "POST",
      body: JSON.stringify(this.state.login),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(res => {
            window.localStorage.setItem("token", res.token);
            window.location.replace("/");
          });
          this.setState({ authenticated: true });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

  render() {
    return (
      <Row className="loginContainer">
        <Col className="loginColContainer">
          <Row>
            <Col>
              <h3>Meals on Wheels</h3>
            </Col>
          </Row>

          <Row className="loginRow">
            <Col className="loginCol">
              <form onSubmit={this.onSubmit}>
                <Row>
                  <Col>
                    <Input
                      className="loginSpace"
                      name="email"
                      placeholder="Enter username"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="loginButtonCol">
                    <Button type="submit">Login</Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
