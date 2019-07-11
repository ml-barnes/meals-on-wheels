import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/lib/Creatable";
import fetchHelper from "fetchHelper/fetchHelper";
import { Button } from "semantic-ui-react";
import SubmitButton from "SubmitButton";
import "styles/baseStyle.css";
import DragDrop from "menu/DragDrop";

const createOption = label => ({
  label,
  value: label.toLowerCase().replace(/\W/g, "")
});

const selectNames = [
  "Meat",
  "Alternative",
  "Vegetarian",
  "Soup",
  "Dessert",
  "Vegetable"
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.Meat = React.createRef();
    this.Alternative = React.createRef();
    this.Vegetarian = React.createRef();
    this.Soup = React.createRef();
    this.Dessert = React.createRef();
    this.Vegetable = React.createRef();

    this.state = {
      currentButton: "Create",
      loaded: false,
      isLoading: false,
      isSubmitting: false,
      open: false,
      snackMessage: "Meals Updated",
      snackClass: "success-snackbar",
      MeatValues: [],
      AlternativeValues: [],
      VegetarianValues: [],
      SoupValues: [],
      DessertValues: [],
      VegetableValues: [],
      meals: [],
      excluded: [],
      errors: []
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <React.Fragment>
        {this.header()}
        {this.state.loaded && (
          <Container fluid className="baseContainer">
            <Row className="baseRow">
              <Col sm="1" className="baseButtonColumn" />
              <Col className="baseDiv">
                {this.state.currentButton == "Create" ? (
                  this.addMeals()
                ) : (
                  this.displayMenu()
                )}
              </Col>
              <Col sm="1" className="baseButtonColumn" />
            </Row>
            <SubmitButton
              style={{
                marginBottom:
                  this.state.currentButton != "Create" ? "40px" : "0px"
              }}
              onClick={() => {
                this.state.currentButton == "Create"
                  ? this.createMeal()
                  : this.updateMeals();
              }}
              width="10"
              disabled={this.state.isSubmitting}
              open={this.state.open}
              handleClose={this.handleClose}
              snackMessage={this.state.snackMessage}
              snackClass={this.state.snackClass}
            />
          </Container>
        )}
      </React.Fragment>
    );
  }

  getData = () => {
    const address = "http://localhost:3001/api/getFood";
    fetchHelper.fetch(
      address,
      { method: "GET" },
      data => {
        selectNames.map(name => {
          let options = name + "Options";
          this.setState({
            [options]: data.filter(food => food.type == name).map(object => {
              return createOption(object.name);
            })
          });
        });
      },
      fetchHelper.fetch(
        "http://localhost:3001/api/getAllCycles",
        { method: "GET" },
        data => {
          console.log(data);
          this.setState(
            {
              meals: data.Cycles,
              excluded: data.ExcludedMeals
            },
            this.setState({ loaded: true })
          );
        }
      )
    );
  };

  handleCreateFood = (inputValue, select) => {
    const address = "http://localhost:3001/api/createFood";
    const optionsName = select.name + "Options";
    const valuesName = select.name + "Values";
    const options = this.state[optionsName];
    const values = this.state[valuesName];
    const newOption = createOption(inputValue);
    this.setState({ isLoading: true });

    fetchHelper.fetch(
      address,
      {
        body: JSON.stringify({ name: inputValue, type: select.name }),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      },
      () => {
        if (select.isMulti) {
          this.setState(
            {
              [optionsName]: [...options, newOption],
              [valuesName]: [...values, newOption]
            },
            () => {
              this.setState({ isLoading: false });
            }
          );
        } else {
          this.setState(
            {
              [optionsName]: [...options, newOption],
              [valuesName]: [newOption]
            },
            () => {
              this.setState({ isLoading: false });
            }
          );
        }
      }
    );
  };

  addMealToState = (data, id) => {
    let meal = { day: null, Vegetables: "", id: id };
    data.map(food => {
      if (food.type === "Vegetable") {
        meal["Vegetables"] += `${food.name}, `;
      } else {
        meal[food.type] = food.name;
      }
    });
    meal.Vegetables = meal.Vegetables.slice(0, -2);
    let { excluded } = this.state;
    excluded.push(meal);
    this.setState({ excluded });
  };

  createMeal = () => {
    let { errors } = this.state;
    errors = [];
    let invalid = false;
    Object.keys(this.state).map(key => {
      if (key.includes("Values")) {
        if (this.state[key] === null) {
          errors.push(key.replace("Values", ""));
          invalid = true;
        } else if (key === "VegetableValues") {
          if (this.state.VegetableValues.length != 3) {
            errors.push(key.replace("Values", ""));
            invalid = true;
          }
        }
        this.setState({ errors });
      }
    });

    if (invalid === true) {
      return;
    }

    const address = "http://localhost:3001/api/createMeal";
    let mealData = this.getMealData();
    this.mealReqest(
      address,
      mealData,
      "Error creating Meal",
      "Meal created",
      res => res.Food[0].length === 8, // 8 is number of food items
      this.addMealToState
    );
    Object.keys(this.state).map(key => {
      key.includes("Values") && this.setState({ [key]: null });
    });
  };

  updateMeals = () => {
    const address = "http://localhost:3001/api/updateCycles";
    this.mealReqest(
      address,
      this.state.meals,
      "Error updating Meals",
      "Meal Updated",
      res => res.filter(res => res[0] != 1).length == 0
    );
  };

  deleteMeal = mealIndex => {
    // Do regular swap then delete first excluded meal
    const address = "http://localhost:3001/api/deleteMeal";
    const id = this.state.meals[mealIndex].id;
    this.replaceMeal(0, mealIndex, () => {
      const { excluded } = this.state;
      excluded.pop();
      this.setState(
        {
          excluded
        },
        this.mealReqest(
          address,
          { id: id },
          "Error deleting Meal",
          "Meal deleted",
          res => res.length == 0
        )
      );
    });
  };

  deleteExcluded = mealID => {
    // Do regular swap then delete first excluded meal
    const address = "http://localhost:3001/api/deleteMeal";
    const id = this.state.excluded[mealID].id;
    const { excluded } = this.state;
    delete this.state.excluded[mealID];
    this.setState(
      { excluded },
      this.mealReqest(
        address,
        { id: id },
        "Error deleting Meal",
        "Meal deleted",
        res => res.length == 0
      )
    );
  };

  mealReqest = (address, body, message, success, check, callback = null) => {
    this.setState(
      { isSubmitting: true },
      fetchHelper.fetch(
        address,
        {
          body: JSON.stringify(body),
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        },
        res => {
          let className = "warning-snackbar";
          if (res instanceof Error == false && check(res)) {
            message = success;
            className = "success-snackbar";
          }

          this.setState(
            {
              snackMessage: message,
              snackClass: className
            },
            () =>
              this.setState(
                { isSubmitting: false, open: true },
                callback != null ? callback(body, res.Meal.id) : null
              )
          );
        }
      )
    );
  };

  getMealData = () => {
    let mealData = [];
    Object.keys(this.state).map(key => {
      if (key.includes("Values")) {
        if (!key.includes("Vegetable")) {
          mealData.push({
            type: key.replace("Values", ""),
            name: this.state[key].label
          });
        } else {
          this.state[key].map(veg => {
            mealData.push({
              type: "Vegetable",
              name: veg.label
            });
          });
        }
      }
    });
    return mealData;
  };

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.meals,
      result.source.index,
      result.destination.index
    );

    this.setState({ meals: items });
  };

  handleChange = (newValue, actionMeta) => {
    let { errors } = this.state;
    const index = errors.indexOf(actionMeta.name);

    index != -1 && delete errors[index];
    console.log(index);
    this.setState({ errors });

    this.setState({ [actionMeta.name + "Values"]: newValue });
  };

  handleClick = button => {
    this.setState({ currentButton: button.target.id });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  displayMenu = () => {
    return (
      <React.Fragment>
        <DragDrop
          meals={this.state.meals}
          excluded={this.state.excluded}
          onDragEnd={this.onDragEnd}
          replaceMeal={this.replaceMeal}
          deleteMeal={this.deleteMeal}
          deleteExcluded={this.deleteExcluded}
        />
      </React.Fragment>
    );
  };

  replaceMeal = (excludedID, mealIndex, callback = () => {}) => {
    const { meals, excluded } = this.state;
    let temp = meals[mealIndex];
    meals[mealIndex] = excluded[excludedID];
    meals[mealIndex].day = temp.day;
    delete temp.day;
    excluded[excludedID] = temp;
    this.setState(
      {
        excluded,
        meals
      },
      callback
    );
  };

  inErrors = name => {
    return this.state.errors.includes(name);
  };

  addMeals = () => {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <Form>
          {selectNames.map(name => {
            let optionName = name + "Options";
            let valueName = name + "Values";
            return (
              <Form.Row key={name}>
                <Form.Group as={Col}>
                  <Form.Label>
                    <span>{name}</span>
                    <span style={{ color: "red" }}>
                      {name === "Vegetable" &&
                        this.inErrors(name) &&
                        " - You must have 3 Vegetables"}
                    </span>
                  </Form.Label>
                  <CreatableSelect
                    key={name}
                    name={name}
                    id={name}
                    isClearable
                    className={this.inErrors(name) && "red"}
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={this.handleChange}
                    onCreateOption={e =>
                      this.handleCreateFood(e, this[name].current.props)}
                    options={this.state[optionName]}
                    value={this.state[valueName]}
                    ref={this[name]}
                    isMulti={name === "Vegetable"}
                    placeholder={"Enter here to create..."}
                  />
                </Form.Group>
              </Form.Row>
            );
          })}
        </Form>
      </React.Fragment>
    );
  };

  header = () => {
    return (
      <Row className="baseHeader">
        <Col
          sm="auto"
          style={{
            margin: "1%",
            textAlign: "left"
          }}
        >
          <h2>Menu</h2>
        </Col>
        <Col sm>
          <div style={{ textAlign: "right" }}>
            <Button.Group size="large" style={{ paddingRight: "2%" }}>
              <Button
                id="Create"
                toggle
                active={this.state.currentButton == "Create"}
                onClick={this.handleClick}
              >
                Create Meal
              </Button>
              <Button.Or />
              <Button
                id="View"
                toggle
                active={this.state.currentButton == "View"}
                onClick={this.handleClick}
              >
                View menu
              </Button>
            </Button.Group>
          </div>
        </Col>
      </Row>
    );
  };
}

export default Menu;
