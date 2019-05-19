import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "semantic-ui-react";

class SubmitButton extends React.Component {
  render() {
    return (
      <Row style={{ justifyContent: "center" }}>
        <Col sm="10" style={{ marginTop: "1%", padding: "0" }}>
          <Button
            style={{ marginRight: "0" }}
            variant="primary"
            type="submit"
            color="blue"
            fluid
            onClick={this.props.onClick}
          >
            Submit
          </Button>
        </Col>
      </Row>
    );
  }
}

export default SubmitButton;
