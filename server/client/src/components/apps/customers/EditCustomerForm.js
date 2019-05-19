import CustomerForm from "./CustomerForm";
import fetchHelper from "../../fetchHelper/fetchHelper";

class EditCustomerForm extends CustomerForm {
  handleSubmit = () => {
    var stateCopy = this.state;
    console.log(stateCopy);
    delete stateCopy.stepState;
    const postData = { id: this.props.match.params.id, data: stateCopy };

    console.log(postData);
    fetch("http://localhost:3001/api/updateCustomer", {
      body: JSON.stringify(postData),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  componentDidMount() {
    this.state.stepState = {
      stepSize: 4,
      stepData: [
        { key: "0", icon: "address card", title: "Edit Customer details" },
        { key: "1", icon: "utensils", title: "Edit Meal details" },
        { key: "2", icon: "exclamation triangle", title: "Edit Restrictions" },
        { key: "3", icon: "info circle", title: "Confirm Edit" }
      ],
      currentStep: 0
    };
    this.getData();
  }

  getData = () => {
    const address = "http://localhost:3001/api/findCustomer?id=";
    fetchHelper.fetch(
      address + this.props.match.params.id,
      { method: "GET" },
      data => {
        this.setState({
          mealData: data.mealData,
          detailData: data.detailData,
          restrictionData: data.restrictionData
        });
      }
    );
  };
}

export default EditCustomerForm;
