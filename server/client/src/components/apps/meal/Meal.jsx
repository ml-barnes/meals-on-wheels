import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button, Segment } from "semantic-ui-react";
import Row from "react-bootstrap/Row";
import CustomerStepper from "../../nav/CustomerStepper.jsx";
import Container from "react-bootstrap/Container";
import { MDBFormInline, MDBInput } from "mdbreact";
import BarnesButtonRadio from "../../barnesButtonRadio.js";
import BarnesButtonSingle from "../../barnesButtonSingle.js";

class Meal extends React.Component {
  state = {
    dishChecked: "option1",
    frozenCheck: true
  };

  handleDishChange = clickedRadio => {
    this.setState({
      dishChecked: clickedRadio.target.value
    });
  };
  handleFrozenChange = clickedRadio => {
    this.setState({
      frozenCheck: !this.state.frozenCheck
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Meal</h1>
        <h3>Dish Type</h3>
        <BarnesButtonRadio
          name={"testradio"}
          options={[
            { key: "option1", text: "First option" },
            { key: "option2", text: "Second option" },
            { key: "option3", text: "Third option" }
          ]}
          checked={this.state.dishChecked}
          handleOptionChange={this.handleDishChange}
        />
        <h3>Frozen</h3>
        <BarnesButtonSingle
          name={"testradio"}
          options={[{ key: "option1", text: "First option" }]}
          checked={this.state.frozenCheck}
          handleOptionChange={this.handleFrozenChange}
        />
        <br />
        <h3>Main</h3>
        <Button primary type="submit">
          Next
        </Button>
        {/*<Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="title" placeholder="Enter your title..." />
              </Form.Group>
            </Form.Row>
          </Form>
          <Button primary type="submit">
            Next
          </Button>
        </Container>*/}
      </React.Fragment>
    );
  }
}

export default Meal;
