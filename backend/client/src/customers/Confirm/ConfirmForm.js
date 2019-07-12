import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const excludeList = [
  "firstName",
  "lastName",
  "longitude",
  "latitude",
  "title",
  "notes"
];

class ConfirmForm extends React.Component {
  render() {
    let restrictionsCount = 0;
    return (
      <React.Fragment>
        <Row style={jBetween}>
          <Col lg style={colStyle}>
            <div>
              <h4 style={bold}>Customer Details</h4>
              <br />
              <Row>
                <Col lg="auto" style={{ width: "100%" }}>
                  <Row style={dataRow}>
                    <Col sm="4">
                      <span style={bold}>Title</span>
                    </Col>
                    <Col>
                      <p>{this.props.CustomerData.detailData.title}</p>
                    </Col>
                  </Row>
                  <Row style={dataRow}>
                    <Col sm="4">
                      <span style={bold}>Name</span>
                    </Col>
                    <Col>
                      <p>
                        {this.props.CustomerData.detailData.firstName}{" "}
                        {this.props.CustomerData.detailData.lastName}
                      </p>
                    </Col>
                  </Row>
                  {Object.keys(this.props.CustomerData.detailData).map(key => {
                    return (
                      !excludeList.includes(key) && (
                        <Row style={dataRow}>
                          <Col sm="4">
                            <span style={bold}>
                              {key.charAt(0).toUpperCase()}
                              {key.substring(1)}
                            </span>
                          </Col>
                          <Col>
                            <p>{this.props.CustomerData.detailData[key]}</p>
                          </Col>
                        </Row>
                      )
                    );
                  })}
                  <Row style={dataRow}>
                    <Col sm="4">
                      <span style={bold}>Notes</span>
                    </Col>
                  </Row>
                  <Row style={dataRow}>
                    <Col sm="12">
                      <span>{this.props.CustomerData.detailData.notes}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm="auto" style={gap} />
          <Col lg style={colStyle}>
            <div>
              <h4 style={bold}>Meal Details</h4>
              <br />
              <Row>
                <Col lg="auto" style={{ width: "100%" }}>
                  {this.props.CustomerData.mealData.map(mealDay => {
                    return (
                      <Row style={dataRow}>
                        <Col sm="4">
                          <span style={bold}>{(mealDay.quantity > 0 || mealDay.extras.length > 0) && mealDay.display}</span>
                        </Col>
                        <Col>
                          <p>                            
                            {mealDay.quantity > 0 &&
                            `${mealDay.quantity} 
                             ${mealDay.quantity == 1 ? "Main" : "Mains"}`}
                            {mealDay.extras.length > 0 &&
                            `${mealDay.quantity > 0 ? ", " : ""}
                             ${mealDay.extras.length} 
                             ${mealDay.extras.length === 1 ? " Extra": " Extras"}`}
                          </p>
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm="auto" style={gap} />
          <Col lg style={colStyle}>
            <div>
              <h4 style={bold}>Restriction Details</h4>
              <br />
              <Row>
                <Col lg="auto" style={{ width: "100%" }}>
                  {this.props.CustomerData.restrictionData.map(restriction => {
                    restriction.restrictionOptions.length > 0 &&
                      restrictionsCount++;
                    return (
                      restriction.restrictionOptions.length > 0 && (
                        <Row style={dataRow}>
                          <Col sm="5">
                            <span style={bold}>{restriction.display}</span>
                          </Col>
                          <Col>
                            <p>{restriction.restrictionOptions.length}</p>
                          </Col>
                        </Row>
                      )
                    );
                  })}
                  {restrictionsCount === 0 && <p>No restrictions</p>}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const dataRow = { marginBottom: "8px" };
const jBetween = {
  justifyContent: "space-between",
  marginLeft: "10px",
  marginRight: "10px",
  paddingTop: "4%",
  paddingBottom: "4%"
};
const bold = { fontWeight: "bold" };
const gap = { width: "20px" };
const colStyle = {
  border: "1px solid #e9e9e9",
  borderRadius: "5px",
  padding: "5px",
  background: "#c3c3c366 none repeat scroll 0% 0%",
  marginBottom: "20px",
  textAlign: "left",
  paddingLeft: "10px",
  boxShadow: "1px 2px 8px gray",
  fontSize: "14px"
};
export default ConfirmForm;
