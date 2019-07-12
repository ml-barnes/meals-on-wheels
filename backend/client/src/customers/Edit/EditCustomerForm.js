import CustomerForm from "customers/CreateBase/CustomerForm";
import fetchHelper from "fetchHelper/fetchHelper";
import * as dataHelper from "customers/DataHelper/customerDataHelper";
import serverAddress from "serverAddress";

class EditCustomerForm extends CustomerForm {
  submit = () => {
    var stateCopy = JSON.parse(JSON.stringify(this.state));
    delete stateCopy.stepState;
    const postData = { id: this.props.match.params.id, data: stateCopy };
    this.handleSubmit(
      postData,
      `${serverAddress}updateCustomer`,
      "Customer updated",
      "Error updating customer"
    );
  };

  componentDidMount() {
    let { stepState } = this.state;

    stepState.stepData = [
      { key: "0", icon: "address card", title: "Edit Customer details" },
      { key: "1", icon: "utensils", title: "Edit Meal details" },
      { key: "2", icon: "exclamation triangle", title: "Edit Restrictions" },
      { key: "3", icon: "info circle", title: "Confirm Edit" }
    ];

    stepState.loaded = false;

    this.setState({ stepState });

    this.getData();
  }

  getData = () => {
    const address = `${serverAddress}findCustomer?id=`;
    fetchHelper.fetch(
      address + this.props.match.params.id,
      { method: "GET" },
      data => {
        if (data instanceof Error) {
          window.location.replace("/");
          return;
        }
        let { stepState } = this.state;
        stepState.loaded = true;
        this.setState({
          mealData:
            data.mealData.length > 1
              ? data.mealData
              : dataHelper.getDefaultMealData(),
          detailData: data.detailData ? data.detailData : [],
          restrictionData:
            data.restrictionData.length > 1
              ? data.restrictionData
              : dataHelper.getDefaultRestrictionData(),
          stepState
        });
      }
    );
  };
}

export default EditCustomerForm;
