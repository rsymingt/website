import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import Routes from "./Routes";

const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Project Board",
        path: "/projects",
    }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: ""
    };
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    return (
      <Router>
        <div className="flyout">
          <Navbar
          dark transparent scrolling
          fixed="top"
          id="navbar"
          color="unique-color-dark"
          expand="md"
          >
            <NavbarBrand href="/">
                Ryan Symington
            </NavbarBrand>
            <NavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <Collapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <NavbarNav right>
                {links && links.map((link, index) => {

                    return(
                        <NavItem key={link.name}>
                          <NavLink
                            exact
                            to={link.path}
                            onClick={this.closeCollapse("mainNavbarCollapse")}
                          >
                            {link.name}
                          </NavLink>
                        </NavItem>
                    );
                })}
              </NavbarNav>
            </Collapse>
          </Navbar>
          {this.state.collapseID && overlay}
          <main>
            <Routes/>
          </main>

        </div>
      </Router>
    );
  }
}

export default App;
