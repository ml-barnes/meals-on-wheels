import React from "react";
import { Button } from "semantic-ui-react";

class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Button
          variant="primary"
          type="submit"
          color="blue"
          fluid
          onClick={this.props.handleSubmit}
        >
          Next
        </Button>
      </React.Fragment>
    );
  }
}
export default ConfirmForm;
