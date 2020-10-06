import React from "react";
import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

const NavItem = (props) => (
  <li className={classes.NavItem}>
    <NavLink
      exact={props.exact}
      activeClassName={classes.active}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavItem;
