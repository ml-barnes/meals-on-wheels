import React, { Component } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Button, Icon } from "semantic-ui-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => {
  return {
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? "lightgreen" : "#e0e0e0",
    borderRadius: "5px",

    ...draggableStyle
  };
};

const getListStyle = isDraggingOver => ({
  padding: grid,
  width: "100%"
});

class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.onDragEnd = this.props.onDragEnd.bind(this);
  }

  getDayStyle = () => {
    return {
      ...getItemStyle(false, null),
      ...{ background: "none", paddingRight: "0", color: "black" }
    };
  };

  showButton = isDragging => {
    if (isDragging) {
      return {
        visibility: "hidden"
      };
    } else {
      return {
        background: "none"
      };
    }
  };

  createMealRow = (meal, index, snapshot) => {
    return (
      <Row key={index}>
        <Col
          sm="auto"
          style={{
            alignSelf: "center",
            textAlign: "center",
            paddingRight: "8px",
            paddingLeft: "20px"
          }}
        >
          <div style={{ textAlign: "center", width: "20px" }}>
            <p>{days[index]}</p>
          </div>
        </Col>
        <Col>
          <Draggable
            key={meal.day + 1}
            draggableId={meal.day + 1}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <Row>
                  {Object.keys(meal).map((key, i) => {
                    if (key != "day" && key != "id") {
                      return <Col key={i}>{meal[key]}</Col>;
                    }
                  })}
                </Row>
              </div>
            )}
          </Draggable>
        </Col>
        <Col
          sm="auto"
          style={{
            alignSelf: "center",
            textAlign: "center"
          }}
        >
          <div>
            <Button
              id={index}
              style={this.showButton(snapshot.isDraggingOver)}
              onClick={this.handleReplaceClick}
              icon
              size="mini"
            >
              <Icon name="edit" style={{ pointerEvents: "none" }} />
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    let day = 1;
    return (
      <Row>
        <Col style={noPadLeft}>
          <Row>
            <Col
              sm={"auto"}
              style={{
                visibility: "hidden",
                paddingRight: "8px",
                paddingLeft: "20px"
              }}
            >
              <div style={{ width: "20px" }} />
            </Col>
            <Col>
              <div style={{ ...getListStyle(false), ...{ paddingBottom: 0 } }}>
                <div style={{ ...getItemStyle(false), ...{ margin: "0" } }}>
                  <Row>
                    {Object.keys(this.props.meals[1]).map((key, i) => {
                      if (key != "day" && key != "id") {
                        return (
                          <Col key={i} style={{ color: "black" }}>
                            {key}
                          </Col>
                        );
                      }
                    })}
                  </Row>
                </div>
              </div>
            </Col>
            <Col
              sm={"auto"}
              style={{
                visibility: "hidden"
              }}
            >
              <Button size="mini" />
            </Col>
          </Row>

          <DragDropContext
            onDragEnd={this.props.onDragEnd}
            onDragStart={() => this.setState({ show: false, target: null })}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.props.meals.map((meal, index) => {
                    //if (index % 7 != 0) {
                    return this.createMealRow(meal, index, snapshot);
                    //}
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
        {this.state.show && (
          <Overlay
            rootClose={true}
            show={this.state.show}
            target={this.state.target}
            placement="left"
            container={this}
            transition
            onHide={() => this.setState({ show: false, target: null })}
          >
            <Popover
              id="popover-basic"
              title="Excluded Meals"
              style={{ maxWidth: "100%" }}
            >
              {this.props.excluded.map((meal, excludedIndex) => {
                let mealData = `${meal.Meat ? meal.Meat : "No Meat"},
                 ${meal.Alternative ? meal.Alternative : "No Alternative"},
                   ${meal.Vegetarian ? meal.Vegetarian : "No Vegetarian"}`;

                return (
                  <React.Fragment key={excludedIndex}>
                    <div
                      style={{
                        background: "#bdbdbd",
                        color: "black",
                        borderRadius: "5px",
                        padding: "10px"
                      }}
                    >
                      {mealData}
                      {"   "}
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 200, hide: 200 }}
                        overlay={<Tooltip>Add to menu</Tooltip>}
                      >
                        <Button
                          id={excludedIndex}
                          icon
                          style={{ background: "none" }}
                          onClick={e => {
                            console.log(this.state.target);
                            this.setState(
                              {
                                target: null,
                                show: false
                              },
                              this.props.replaceMeal(e, this.state.target.id)
                            );
                          }}
                        >
                          <Icon
                            id={excludedIndex}
                            style={{ pointerEvents: "none" }}
                            name="plus circle"
                          />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </React.Fragment>
                );
              })}
            </Popover>
          </Overlay>
        )}
      </Row>
    );
  }

  handleReplaceClick = ({ target }) => {
    if (this.state.target !== target) {
      this.setState({ target, show: true });
    } else {
      this.setState({ target: null, show: false });
    }
  };
}

const textColor = {
  color: "black"
};

const noPadRight = {
  paddingRight: "0"
};
const noPadLeft = {
  paddingLeft: "0"
};

const days = [
  1,
  2,
  3,
  4,
  5,
  6,
  8,
  9,
  10,
  11,
  12,
  13,
  15,
  16,
  18,
  19,
  20,
  22,
  23,
  24,
  25,
  26,
  27,
  29,
  30,
  31,
  32,
  33,
  34,
  36
];

export default DragDrop;
