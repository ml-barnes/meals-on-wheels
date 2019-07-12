import React from "react";
import { restrictionData } from "customers/Restrictions/restrictionData";
import fetchHelper from "fetchHelper/fetchHelper";
import CreatableSelect from "react-select/lib/Creatable";
import serverAddress from "serverAddress";

class RestrictionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.Meal = React.createRef();
    this.Meat = React.createRef();
    this.Alternative = React.createRef();
    this.Vegeterian = React.createRef();
    this.Soup = React.createRef();
    this.Dessert = React.createRef();
    this.Vegetable = React.createRef();
    this.Fruit = React.createRef();
    this.Sandwich = React.createRef();
    this.state = {
      loaded: false,
      isLoading: false,
      isSubmitting: false,
      open: false,
      snackMessage: "Meals Updated",
      snackClass: "success-snackbar",
      MealValues: [],
      MeatValues: [],
      AlternativeValues: [],
      VegetarianValues: [],
      SoupValues: [],
      DessertValues: [],
      VegetableValues: [],
      FruitValues: [],
      SandwichValues: [],
      meals: [],
      excluded: [],
      errors: []
    };
  }
  getRestrictionData = index => {
    return restrictionData[index];
  };
  componentDidMount() {
    this.fillSelect();
    this.getData();
  }

  getData = () => {
    const address = `${serverAddress}getFood`;
    fetchHelper.fetch(address, { method: "GET" }, data => {
      [
        "Meal",
        "Meat",
        "Vegetarian",
        "Alternative",
        "Soup",
        "Dessert",
        "Sandwich",
        "Fruit",
        "Vegetable"
      ].map(name => {
        this.setState(
          {
            [name]: data.filter(food => food.type == name).map(object => {
              return { value: object.name, label: object.name };
            })
          },
          this.setState({ loaded: true })
        );
      });
    });
  };

  fillSelect = () => {
    this.props.restrictionData.map(data => {
      const name = data.display.split(" ")[0];
      this.setState({
        [name + "Values"]: data.restrictionOptions
      });
    });
  };

  handleRestrictionChange = (newData, select) => {
    const value = select.name + "Values";
    this.setState({ [value]: newData });
    this.props.handleRestrictionChange(newData, select);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loaded &&
          this.props.restrictionData.map(data => {
            const name = data.display.split(" ")[0];
            return (
              <div key={data.key} id={data.key} className="selectBottomMargin">
                <label htmlFor={data.key}>{data.display}</label>
                <CreatableSelect
                  isClearable
                  key={name}
                  name={name}
                  id={name}
                  defaultValue={data.restrictionOptions}
                  isMulti
                  options={this.state[name]}
                  value={this.state[name + "Values"]}
                  onChange={this.handleRestrictionChange}
                  onCreateOption={e =>
                    this.handleCreateFood(e, this[name].current.props)}
                  ref={this[name]}
                  isMulti
                  backspaceRemovesValue={false}
                />
              </div>
            );
          })}
      </React.Fragment>
    );
  }

  handleCreateFood = (inputValue, select) => {
    const address = `${serverAddress}createFood`;
    const optionsName = select.name;
    const valuesName = select.name + "Values";
    const options = this.state[optionsName];
    const values = this.state[valuesName];

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
        this.setState({
          [optionsName]: [...options, { value: inputValue, label: inputValue }],
          [valuesName]: [...values, { value: inputValue, label: inputValue }]
        });
      }
    );
  };
}

// ----- Styles ------

export default RestrictionsForm;
