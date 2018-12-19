import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage/";
import ProjectBoard from "./pages/ProjectBoard/";

class Routes extends React.Component {
  render() {

    return (
      <Switch>
        <Route exact path="/"
        render={(props) => <HomePage {...props} />}
        />
        <Route path="/project-board"
        render={(props) => <ProjectBoard {...props}/>}
        />
        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
