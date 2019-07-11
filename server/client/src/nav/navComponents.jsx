import React from "react";
import { Link } from "react-router-dom";

export const NavLink = props => {
  return (
    <React.Fragment>
      <Link className="nav-link" to={props.path}>
        {props.name}
      </Link>
    </React.Fragment>
  );
};

export const DropdownLink = props => {
  return (
    <React.Fragment>
      <Link className="dropdown-item" to={props.path}>
        {props.name}
      </Link>
    </React.Fragment>
  );
};
