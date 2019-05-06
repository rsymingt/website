import React from "react";
import { Route, Switch } from "react-router-dom";

// import HomePage from "./pages/HomePage/";
// import ProjectBoard from "./pages/ProjectBoard/";

class Routes extends React.Component {
  render() {
    const {links} = this.props;

    return (
      <Switch>
        {links && links.map((link, index) => {
          let Component = link.component;
          return(
            <Route key={link.name} exact path={link.path}
            render={(props) => <Component {...props} />}
            />
          )
        })}

        {/* <Route path="/project-board"
        render={(props) => <ProjectBoard {...props}/>}
        /> */}

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
