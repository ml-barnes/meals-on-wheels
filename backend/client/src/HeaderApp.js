import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink, DropdownLink } from "nav/navComponents.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import DisplayCustomersApp from "customers/Display/DisplayCustomersApp";
import CustomerForm from "customers/CreateBase/CustomerForm";
import EditCustomerForm from "customers/Edit/EditCustomerForm";
import CustomerAddOnForm from "customers/AddOn/CustomerAddOnForm";
import DriverDetailsApp from "drivers/DriverDetailsApp";
import DisplayDriversApp from "drivers/DisplayDriversApp";
import DisplayRoutesApp from "routes/DisplayRoutesApp";
import ClusterRoutesApp from "routes/ClusterRoutesApp";
import Calendar from "calendar/Calendar";
import Menu from "menu/Menu";
import DisplayMapApp from "routes/DisplayMapApp";
import CustomerFileReaderApp from "scripts/ReadCustomersApp";
import GenerateClustersApp from "routes/GenerateClustersApp.js";
import DriverFileReaderApp from "scripts/ReadDriversApp.js";

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
                  <DropdownLink
                    name="Generate Clusters"
                    path="/routes/generateClusters"
                  />
                  <DropdownLink name="Clusters" path="/routes/clusters" />
                  <DropdownLink name="Display" path="/routes/display" />
                  <DropdownLink name="Map" path="/routes/map" />
                </NavDropdown>

                <NavLink name="Menu" path="/menu" />
                <NavLink name="Food" path="/food" />
                <NavLink name="Ingredients" path="/ingredients" />
                <NavLink name="Meal Calendar" path="/calendar" />
              </Nav>
            </Navbar.Collapse>
            <OverlayTrigger
              key={"logOutOverlay"}
              placement={"left"}
              overlay={<Tooltip id={`tooltip-logout`}>Logout</Tooltip>}
            >
              <Button
                inverted
                icon="logout"
                onClick={() => {
                  {
                    window.localStorage.token = null;
                    window.location.replace("/");
                  }
                }}
              />
            </OverlayTrigger>
          </Navbar>

          <Route path="/customers/display" component={DisplayCustomersApp} />
          <Route path="/customers/edit/:id" component={EditCustomerForm} />
          <Route path="/customers/extra/:id" component={CustomerAddOnForm} />
          <Route path="/customers/add" component={CustomerForm} />
          <Route path="/drivers/display" component={DisplayDriversApp} />
          <Route path="/drivers/add" component={DriverDetailsApp} />
          <Route
            path="/routes/generateClusters"
            component={GenerateClustersApp}
          />

          <Route path="/routes/display" component={DisplayRoutesApp} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/routes/clusters" component={ClusterRoutesApp} />
          <Route path="/routes/map" component={DisplayMapApp} />
          <Route path="/menu" component={Menu} />
          <Route path="/readCustomers" component={CustomerFileReaderApp} />
          <Route path="/readDrivers" component={DriverFileReaderApp} />
        </div>
      </Router>
    );
  }
}

export default HeaderApp;
