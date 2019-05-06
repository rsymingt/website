
import React from "react";
import {withRouter} from "react-router-dom";

import {
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Navbar as MDBNavbar
} from "mdbreact";

class MyNavbar extends React.Component{

  state = {
    collapseID: "",
    transparent: true,
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  updatePage = (path) => {
    this.setState({
      transparent: path === "/" ? true : false,
    })
  }

  componentDidMount(){
    this.setState({
      transparent: this.props.location.pathname === "/" ? true : false,
    })
  }

  render(){
    const {links} = this.props;
    const {transparent} = this.state;

    // const overlay = (
    //   <div
    //     id="sidenav-overlay"
    //     style={{ backgroundColor: "transparent" }}
    //     onClick={this.toggleCollapse("mainNavbarCollapse")}
    //   />
    // );

    return(
      <div>
      <MDBNavbar
      dark transparent={transparent} scrolling
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
                        onClick={() => {
                          this.closeCollapse("mainNavbarCollapse");
                          this.updatePage(link.path);
                        }}
                      >
                        {link.name}
                      </NavLink>
                    </NavItem>
                );
            })}
          </NavbarNav>
        </Collapse>
      </MDBNavbar>
      </div>
    )
  }
}

export default withRouter(MyNavbar);
