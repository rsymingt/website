import React, { Component } from "react";
// import {
//   NavbarBrand,
//   NavbarNav,
//   NavbarToggler,
//   Collapse,
//   NavItem,
//   NavLink
// } from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";

import Routes from "./Routes";

import HomePage from "./pages/HomePage/";
// import ProjectBoard from "./pages/ProjectBoard/";

const links = [
    {
        name: "Home",
        path: "/",
        component: HomePage
    },
    // {
    //     name: "Project Board",
    //     path: "/project-board",
    //     component: ProjectBoard
    // }
]

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Router>
        <div className="flyout">
        <Navbar links={links}
        />
          <main>
            <Routes links={links}/>
          </main>

        </div>
      </Router>
    );
  }
}

export default App;
