import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Icon } from "semantic-ui-react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Snackbar from "@material-ui/core/Snackbar";
import Modal from "react-bootstrap/Modal";
import * as styles from "menu/DragDropStyles";

const grid = 4;

class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      open: false,
      showModal: false,
      modalData: null
    };
    this.onDragEnd = this.props.onDragEnd.bind(this);
  }

  render() {
    return (
      <Row>
        {this.props.meals ? (
          <Col style={styles.noPadLeft}>
            {this.createHeaderRow()}
            {this.createDragDrop()}
            {this.createButtons()}
            {this.createSnackBar()}
            {this.createModal()}
          </Col>
        ) : (
          <Col>
            <h4 style={{ textAlign: "center", marginBottom: "2%" }}>
              Error getting data
            </h4>
          </Col>
        )}
      </Row>
    );
  }

  createHeaderRow = () => {
    return (
      <Row>
        <Col sm={"auto"} style={styles.headerColStyle}>
          <div style={{ width: "20px" }} />
        </Col>
        <Col>
          <div style={{ ...getListStyle(false), ...{ paddingBottom: 0 } }}>
            <div style={{ ...getItemStyle(false), ...{ margin: "0" } }}>
              <Row>
                {this.props.meals.length > 0 &&
                  Object.keys(this.props.meals[1]).map((key, i) => {
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
        <Col sm={"1"} style={styles.invisible} />
      </Row>
    );
  };

  createDragDrop = () => {
    return (
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
                return this.createMealRow(meal, index, snapshot);
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  createButtons = () => {
    return (
      this.state.show && (
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
            style={styles.maxWidth}
          >
            {this.props.excluded.map((meal, excludedIndex) => {
              let mealData = `${meal.Meat ? meal.Meat : "No Meat"},
                 ${meal.Alternative ? meal.Alternative : "No Alternative"},
                   ${meal.Vegetarian ? meal.Vegetarian : "No Vegetarian"}`;

              return (
                <React.Fragment key={excludedIndex}>
                  <div style={styles.excludeMealStyle}>
                    <Row>
                      <Col sm="9" style={styles.alignCenter}>
                        {mealData}
                      </Col>
                      <Col sm="3" style={styles.alignCenter}>
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 200, hide: 200 }}
                          overlay={<Tooltip>Add to menu</Tooltip>}
                        >
                          <Button
                            id={excludedIndex}
                            icon
                            size="mini"
                            name="plus circle"
                            style={styles.noBackground}
                            onClick={this.replaceMeal}
                          >
                            <Icon
                              id={excludedIndex}
                              style={styles.pointerEvents}
                              name="plus circle"
                            />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 200, hide: 200 }}
                          overlay={<Tooltip>Delete meal</Tooltip>}
                        >
                          <Button
                            style={styles.noBackground}
                            icon
                            size="mini"
                            onClick={() => {
                              this.setState(
                                {
                                  modalData: {
                                    type: "excluded",
                                    index: excludedIndex
                                  },
                                  show: false,
                                  target: null
                                },
                                this.setState({ showModal: true })
                              );
                            }}
                          >
                            <Icon name="delete" style={styles.pointerEvents} />
                          </Button>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  </div>
                </React.Fragment>
              );
            })}
            {this.props.excluded.length == 0 && "There are no exlcuded meals"}
          </Popover>
        </Overlay>
      )
    );
  };

  createSnackBar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        className="warning-snackbar"
        open={this.state.open}
        autoHideDuration={1500}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">Please create a meal before deleting</span>
        }
      />
    );
  };
  createModal = () => {
    return (
      <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
        <Modal.Body>Are you sure you want to delete the meal?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            Cancel
          </Button>
          <Button
            id="modal"
            color="red"
            onClick={() => {
              this.handleCloseModal();
              this.handleDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  createMealRow = (meal, index, snapshot) => {
    const foodOrder = [
      "Meat",
      "Alternative",
      "Vegetarian",
      "Dessert",
      "Soup",
      "Vegetables"
    ];
    console.log(index);
    return (
      <Row key={index}>
        <Col sm="auto" style={styles.mealCol}>
          <div style={styles.dayDiv}>
            <p>{index + 1}</p>
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
                  {foodOrder.map((key, i) => {
                    if (key != "day" && key != "id") {
                      return <Col key={i}>{meal[key]}</Col>;
                    }
                  })}
                </Row>
              </div>
            )}
          </Draggable>
        </Col>
        <Col sm="1" style={styles.center}>
          <div>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Add to menu</Tooltip>}
            >
              <Button
                id={index}
                style={this.showButton(snapshot.isDraggingOver)}
                onClick={this.handleReplaceClick}
                icon
                size="mini"
              >
                <Icon name="plus circle" style={styles.pointerEvents} />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Delete meal</Tooltip>}
            >
              <Button
                id={index}
                style={this.showButton(snapshot.isDraggingOver)}
                onClick={
                  this.props.excluded.length != 0 ? (
                    () => {
                      this.setState(
                        { modalData: { type: "meal", index: index } },
                        this.setState({ showModal: true })
                      );
                    }
                  ) : (
                    () => {
                      this.setState({ open: true });
                    }
                  )
                }
                icon
                size="mini"
              >
                <Icon name="delete" style={styles.pointerEvents} />
              </Button>
            </OverlayTrigger>
          </div>
        </Col>
      </Row>
    );
  };

  replaceMeal = e => {
    this.setState(
      {
        target: null,
        show: false
      },
      this.props.replaceMeal(e.target.id, this.state.target.id)
    );
  };

  getDayStyle = () => {
    return {
      ...getItemStyle(false, null),
      ...styles.dayStyle
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

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleDelete = () => {
    let id = this.state.modalData.index;
    let type = this.state.modalData.type;
    this.setState(
      {
        target: null,
        show: false
      },
      type === "meal"
        ? this.props.deleteMeal(id)
        : this.props.deleteExcluded(id)
    );
  };

  handleReplaceClick = ({ target }) => {
    if (this.state.target !== target) {
      this.setState({ target, show: true });
    } else {
      this.setState({ target: null, show: false });
    }
  };
}

const getListStyle = isDraggingOver => ({
  padding: grid,
  width: "100%"
});

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

export default DragDrop;
