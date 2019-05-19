import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink, DropdownLink } from "../nav/navComponents.jsx";

//import SimpleMap from "../map/map.jsx";

import CustomerDetailsForm from "./customers/Details/CustomerDetailsForm";
import MealDetailsFrom from "./customers/MealDetails/MealDetailsForm";
import ConfirmForm from "./customers/Confirm/ConfirmForm";
import RestrictionsForm from "./customers/Restrictions/RestrictionsForm";
import IngredientApp from "./ingredients/IngredientApp";
import DisplayCustomersApp from "./customers/DisplayCustomersApp";
import CustomerForm from "./customers/CustomerForm";
import EditCustomerForm from "./customers/EditCustomerForm";
import CustomerExtraForm from "./customers/CustomerExtraForm";
import RestoreCustomersApp from "./customers/RestoreCustomersApp";
import DriverDetailsApp from "./drivers/DriverDetailsApp";
import DisplayDriversApp from "./drivers/DisplayDriversApp";
import DisplayRoutesApp from "./routes/DisplayRoutesApp";

import Extras from "./extras/Extras";
import CustomExtra from "./extras/CustomExtra";
import Menu from "./menu/Menu";

import DisplayMapApp from "./routes/DisplayMapApp";
import CustomerFileReaderApp from "../scripts/ReadCustomersApp";

import DriverFileReaderApp from "../scripts/ReadDriversApp.js";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Food() {
  return <h2>Food</h2>;
}

function Customers() {
  return <h2>Customers</h2>;
}

function CustomersDisplay() {
  return <h2>CustomersDisplay</h2>;
}

function CustomersEdit() {
  return <h2>CustomersEdit</h2>;
}

function CustomersDelete() {
  return <h2>CustomersDelete</h2>;
}

class HeaderApp extends React.Component {
  render() {
    return (
      <Router>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Navbar bg="primary" variant="dark" expand="lg">
            <Link
              className="navbar-brand "
              to="/home"
              style={{ marginRight: "3%" }}
            >
              Meals on Wheels
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title="Customers" id="basic-nav-dropdown">
                  <DropdownLink name="Display" path="/customers/display" />
                  <DropdownLink name="Add" path="/customers/add" />
                </NavDropdown>

                <NavDropdown title="Drivers" id="basic-nav-dropdown">
                  <DropdownLink name="Display" path="/drivers/display" />
                  <DropdownLink name="Add" path="/drivers/add" />
                </NavDropdown>

                <NavDropdown title="Routes" id="basic-nav-dropdown">
                  <DropdownLink name="Display" path="/routes/display" />
                  <DropdownLink name="Map" path="/routes/map" />
                  <DropdownLink name="Add" path="/routes/add" />
                  <DropdownLink name="Edit" path="/routes/edit" />
                  <DropdownLink name="Delete" path="/routes/delete" />
                </NavDropdown>

                <NavLink name="Menu" path="/menu" />
                <NavLink name="Food" path="/food" />
                <NavLink name="Ingredients" path="/ingredients" />
                <NavLink name="Extras" path="/extras" />
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route path="/customers/display" component={DisplayCustomersApp} />
          <Route path="/customers/edit/:id" component={EditCustomerForm} />
          <Route path="/customers/extra/:id" component={CustomerExtraForm} />
          <Route path="/customers/add" component={CustomerForm} />
          <Route path="/customers/meals" component={MealDetailsFrom} />
          <Route path="/customers/restrictions" component={RestrictionsForm} />
          <Route path="/customers/confirm" component={ConfirmForm} />
          <Route path="/drivers/display" component={DisplayDriversApp} />
          <Route path="/drivers/add" component={DriverDetailsApp} />

          <Route path="/routes/display" component={DisplayRoutesApp} />

          <Route path="/extras" component={CustomExtra} />

          <Route path="/routes/map" component={DisplayMapApp} />
          {
            //<Route path="/extras" component={Extras} />
          }

          <Route path="/menu" component={Menu} />
          <Route path="/food" component={Food} />
          <Route path="/ingredients" component={IngredientApp} />
          <Route path="/readCustomers" component={CustomerFileReaderApp} />
          <Route path="/readDrivers" component={DriverFileReaderApp} />
        </div>
      </Router>
    );
  }
}

{
  /*<Form inline>
<FormControl type="text" placeholder="Search" className="mr-sm-2" />
<Button variant="outline-success">Search</Button>
</Form>*/
}

export default HeaderApp;
