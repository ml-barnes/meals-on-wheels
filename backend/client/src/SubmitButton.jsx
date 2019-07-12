import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "semantic-ui-react";
import Snackbar from "@material-ui/core/Snackbar";

class SubmitButton extends React.Component {
  render() {
    return (
      <Row style={{ justifyContent: "center" }}>
        <Col sm={this.props.width} style={{ marginTop: "1%", padding: "0" }}>
          <Button
            style={{ ...{ marginRight: "0" }, ...this.props.style }}
            variant="primary"
            type="submit"
            color="blue"
            fluid
            onClick={this.props.onClick}
            disabled={this.props.disabled}
          >
            Submit
          </Button>
        </Col>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.open}
          autoHideDuration={1500}
          onClose={this.props.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.props.snackMessage}</span>}
          className={this.props.snackClass}
        />
      </Row>
    );
  }
}

export default SubmitButton;
