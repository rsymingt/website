import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage/";

class Routes extends React.Component {
  render() {

    return (
      <Switch>
        <Route path="/"
        render={(props) => <HomePage {...props} />}
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
