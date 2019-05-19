import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import CreatableSelect from "react-select/lib/Creatable";
import fetchHelper from "../../fetchHelper/fetchHelper";
import { Icon, Button } from "semantic-ui-react";
import SubmitButton from "../SubmitButton";
import {
  baseDivStyle,
  baseContainerStyle,
  baseRowStyle,
  baseButtonColumnStyle,
  baseHeaderStyle
} from "../../styles/baseStyles";
import Table from "react-bootstrap/Table";
import DragDrop from "./DragDrop";
import DD from "./DD";

type State = {
  options: [{ [string]: string }],
  value: string | void
};

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, "")
});

const defaultOptions = [
  createOption("One"),
  createOption("Two"),
  createOption("Three")
];

const selectNames = [
  "Meat",
  "Alternative",
  "Vegetarian",
  "Soup",
  "Dessert",
  "Fruit",
  "Sandwich",
  "Vegetable"
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);

  console.log(endIndex);
  console.log(startIndex);

  // if (endIndex % 7 == 0) {
  //   console.log("END INDEX", endIndex);
  //   endIndex += 1;
  // }

  // console.log(startIndex);
  // Get the day out of end index
  //let meal2 = result[endIndex].day;

  // Get object that id being moved
  const [removed] = result.splice(startIndex, 1);
  //console.log([removed]);

  result.splice(endIndex, 0, removed);

  // result[startIndex].day;

  // The meal being moved is now the day where it is being placed
  // result[startIndex].day = result[endIndex].day;

  // for (let i = startIndex + 1; i < endIndex; i++) {
  //   result[i].day--;
  //   if (result[i].day % 7 == 0) {
  //     result[i].day--;
  //   }
  // }
  // result[endIndex].day = meal2;

  return result;
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.Meat = React.createRef();
    this.Alternative = React.createRef();
    this.VegeterianOptions = React.createRef();
    this.Soup = React.createRef();
    this.Dessert = React.createRef();
    this.Fruit = React.createRef();
    this.Sandwich = React.createRef();
    this.Vegetable = React.createRef();

    this.state = {
      currentButton: "Create",
      loaded: false,
      isLoading: false,
      MeatValues: [],
      AlternativeValues: [],
      VegetarianValues: [],
      SoupValues: [],
      DessertValues: [],
      FruitValues: [],
      SandwichValues: [],
      VegetableValues: [],
      meals: [],
      excluded: []
    };
  }

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

  getData = () => {
    let foodData = [];
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

  componentDidMount = () => {
    this.getData();
  };

  handleChange = (newValue, actionMeta) => {
    this.setState({ [actionMeta.name + "Values"]: newValue });
  };

  handleClick = button => {
    this.setState({ currentButton: button.target.id });
  };

  handleCreate = (inputValue, select) => {
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
  render() {
    return (
      <React.Fragment>
        {this.header()}
        {this.state.loaded && (
          <Container fluid style={baseContainerStyle}>
            <Row style={{ marginTop: "2%" }}>
              <Col sm="1" style={baseButtonColumnStyle} />
              <Col style={baseDivStyle}>
                {this.state.currentButton == "Create" ? (
                  this.addMeals()
                ) : (
                  this.displayMenu()
                )}
              </Col>
              <Col sm="1" style={baseButtonColumnStyle} />
            </Row>

            {this.state.currentButton == "Create" && (
              <SubmitButton
                handleSubmit={() => {
                  console.log();
                }}
              />
            )}
          </Container>
        )}
      </React.Fragment>
    );
  }

  displayMenu = () => {
    return (
      <React.Fragment>
        <DragDrop
          meals={this.state.meals}
          excluded={this.state.excluded}
          onDragEnd={this.onDragEnd}
          replaceMeal={this.replaceMeal}
        />
        {/*<DD meals={this.state.meals} />*/}
      </React.Fragment>
    );
  };

  replaceMeal = (e, mealIndex) => {
    const { meals, excluded } = this.state;
    let temp = meals[mealIndex];
    meals[mealIndex] = excluded[e.target.id];
    meals[mealIndex].day = temp.day; //excluded[e.target.id];
    delete temp.day;
    excluded[e.target.id] = temp;
    this.setState({
      excluded,
      meals
    });
  };

  addMeals = () => {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <Form
        /*noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}*/
        >
          {selectNames.map(name => {
            let optionName = name + "Options";
            let valueName = name + "Values";
            return (
              <Form.Row key={name}>
                <Form.Group as={Col}>
                  <Form.Label>{name}</Form.Label>
                  <CreatableSelect
                    key={name}
                    name={name}
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={this.handleChange}
                    onCreateOption={e =>
                      this.handleCreate(e, this[name].current.props)}
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
      <Row style={baseHeaderStyle}>
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
