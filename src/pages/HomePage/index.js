import React from "react";

import "./style.css";
import "./style.sass";
import smoothScroll from "./components/smoothScroll";
import $ from "jquery";

import {
    skills,
    experiences,
    schoolExperiences,
    projects,
    interests,
    courses,
} from "./resources/";

import {
    Banner,
    Section,
    Content,
    Anchor,
    Project,
    Experience,
    List,
    Arrow,
    ImageLoader,
} from "./components/";

import {
  Container,
  Col,
  Row,
  Animation,
  Card, CardImage, CardBody, CardText,
  // Navbar, NavbarBrand, NavbarToggler, Collapse, NavbarNav, NavItem
  Modal, ModalBody, ModalHeader, ModalFooter,
} from "mdbreact";

// const NavLink = require("react-router-dom").NavLink;
// const NavLink = (props) => (
//     <a className="text-white" {...props} />
// )

class HomePage extends React.Component {

    state = {
        modal: {
            isopen: false,
            obj: null
        }
    }

    toggleModal = () => {
        this.setState({
            modal:{
                isopen: !this.state.modal.isopen,
                obj: this.state.modal.obj,
            }
        })
    }

    modal = (array, index) => {
        this.setState({
            modal: {
                isopen: true,
                obj: array[index],
            }
        })
    }

    componentDidMount(){
      $(window).trigger("scroll");
    }

  render() {
      var skillsDelay = 0;

      const obj = this.state.modal.obj;

      const {
          name,
          description,
          link,
          picture,
          preview,
      } = obj?obj:{};

      const isopen = this.state.modal.isopen;

    return (
      <div>
        <Anchor id="top"/>
        <Arrow/>
        <Banner
        className="unique-color-dark d-flex flex-column align-items-center justify-content-center"
        >
            <Row>
                <Col md="12">
                    <Animation type="fadeIn" duration="1000ms" delay="0">
                        <h2 className="h2-responsive text-white text-center">Hey, I'm</h2>
                    </Animation>
                    <Animation type="fadeIn" duration="1000ms" delay="100ms">
                        <h1 className="h1-responsive text-white text-center"><strong>Ryan Symington</strong></h1>
                    </Animation>
                    <Animation type="fadeIn" duration="1000ms" delay="200ms">
                        <h4 className="h4-responsive text-white text-center pt-4">Software/Web Developer</h4>
                    </Animation>
                    <Animation type="fadeInUp" duration="500ms" delay="300ms">
                        <Row className="justify-content-center pt-4">
                            <a
                            onClick={(e) => smoothScroll(e)}
                            className="btn btn-primary"
                            href="#about-me"
                            >
                                Learn More
                            </a>
                        </Row>
                    </Animation>
                </Col>
            </Row>
        </Banner>

        {/*<Navbar
        dark
        id="navbar-2"
        color="unique-color-dark"
        expand="md"
        className="sticky-top"
        >
          <NavbarBrand href="/">
            <img
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMyAyMC40NjM0OCI+PHRpdGxlPmxvZ288L3RpdGxlPjxwYXRoIGQ9Ik0xOC45MTA3LDYuNjMyNTdoMHEtLjM2NzIxLS4xMjYtLjc0MDQyLS4yMzMzLjA2MTg3LS4yNTE0MS4xMTQ0MS0uNTA1Yy41NjA0NS0yLjcyMDY0LjE5NC00LjkxMjM3LTEuMDU3MzktNS42MzM4Ni0xLjE5OTgtLjY5Mi0zLjE2MjEuMDI5NTItNS4xNDM5NCwxLjc1NDE0cS0uMjkyOTMuMjU1NS0uNTcyNjcuNTI1NTQtLjE4NzI3LS4xNzk1MS0uMzgxMS0uMzUyQzkuMDUyNTcuMzQzOSw2Ljk3MDY2LS40MzMxNiw1LjcyMDU4LjI5MDQ2LDQuNTIxOTEuOTg0MzYsNC4xNjY4NiwzLjA0NDg5LDQuNjcxNDQsNS42MjMyMnEuMDc1My4zODMuMTcuNzYxNzljLS4yOTQ1OC4wODM2Ny0uNTc5MDguMTcyODQtLjg1MTI3LjI2NzcxQzEuNTU1MTQsNy41MDE2NSwwLDguODMyMjUsMCwxMC4yMTIzMWMwLDEuNDI1NDYsMS42NjkzNSwyLjg1NTIsNC4yMDU3NSwzLjcyMnEuMzA4NS4xMDQ5NC42MjE5My4xOTQ0Mi0uMTAxNzkuNDA4LS4xODA2OC44MjExNGMtLjQ4MTA2LDIuNTMzNTQtLjEwNTM1LDQuNTQ1MjEsMS4wOTAxNyw1LjIzNDg0LDEuMjM0ODEuNzEyLDMuMzA3MjUtLjAxOTg1LDUuMzI1MzMtMS43ODM4N3EuMjM5MjYtLjIwOTE3LjQ3OTk0LS40NDIzOC4zMDI5LjI5MjI1LjYyMTczLjU2NzI3YzEuOTU0NzcsMS42ODIwNywzLjg4NTMxLDIuMzYxMzIsNS4wNzk4MiwxLjY2OTg2LDEuMjMzNjktLjcxNDE2LDEuNjM0NTQtMi44NzUyNSwxLjExNC01LjUwNDU5cS0uMDU5NTUtLjMwMTI0LS4xMzc5Mi0uNjE0ODEuMjE4MzQtLjA2NDQzLjQyNzcyLS4xMzM1NUMyMS4yODQ1NCwxMy4wNjkxNSwyMywxMS42NTY4MSwyMywxMC4yMTIzMiwyMyw4LjgyNzI2LDIxLjM5NDc4LDcuNDg3NzEsMTguOTEwNyw2LjYzMjU3Wk0xMi43Mjg0LDIuNzU1ODFDMTQuNDI2NDYsMS4yNzgsMTYuMDEzNDYuNjk0NTcsMTYuNzM2NTcsMS4xMTE2aDBjLjc3MDE0LjQ0NDIxLDEuMDY5NzEsMi4yMzU0LjU4NTgsNC41ODQ0MXEtLjA0NzU4LjIyOTUzLS4xMDM0Mi40NTcyNGEyMy41Mzc1MiwyMy41Mzc1MiwwLDAsMC0zLjA3NTI3LS40ODU4NEEyMy4wODEyOCwyMy4wODEyOCwwLDAsMCwxMi4xOTk1LDMuMjQwOTRRMTIuNDU3ODgsMi45OTE4NCwxMi43Mjg0LDIuNzU1ODFaTTYuNzkxMTEsMTEuMzkxMjRxLjMxMi42MDI2NS42NTIwNywxLjE5MDEzLjM0NjkyLjU5OTExLjcyMjEsMS4xODExN2EyMC45MjE2OCwyMC45MjE2OCwwLDAsMS0yLjExOTY3LS4zNDA4QzYuMjQ4NjcsMTIuNzY2LDYuNDk4ODcsMTIuMDg0NDMsNi43OTExMSwxMS4zOTEyNFpNNi43OSw5LjA4MDQxYy0uMjg2MTMtLjY3ODYzLS41MzA5My0xLjM0NTg2LS43MzA4NS0xLjk5MDE5LjY1NjI0LS4xNDY4OCwxLjM1Ni0uMjY2ODksMi4wODUxNi0uMzU4cS0uMzY2MTEuNTcxLS43MDUxLDEuMTU4NzdRNy4xMDA3Niw4LjQ3OCw2Ljc5LDkuMDgwNDFabS41MjIyOCwxLjE1NTUycS40NTQxMS0uOTQ1MTcuOTc4My0xLjg1NDJ2LjAwMDJxLjUyMzY5LS45MDg1NywxLjExNTIxLTEuNzc1NDJjLjY4NC0uMDUxNzEsMS4zODUzNi0uMDc4NzksMi4wOTQzMi0uMDc4NzkuNzEyMTIsMCwxLjQxNDM3LjAyNzI4LDIuMDk4MTkuMDc5NHEuNTg1MTQuODY0ODcsMS4xMDgxOCwxLjc2OTQxLjUyNTY1LjkwNjM1Ljk5MTUzLDEuODQ1NDUtLjQ2MDgzLjk0ODE3LS45ODgyOCwxLjg2MTczaC0uMDAwMXEtLjUyMjYxLjkwNzg2LTEuMTAzNCwxLjc4MDNjLS42ODI0LjA0ODc2LTEuMzg3Ni4wNzM5LTIuMTA2MjMuMDczOS0uNzE1NjgsMC0xLjQxMTkzLS4wMjIyOS0yLjA4MjQxLS4wNjU3NXEtLjU5NTU1LS44Njk5NS0xLjEyNDA2LTEuNzgzMDVRNy43Njc4OSwxMS4xODE0OCw3LjMxMjI3LDEwLjIzNTkzWm04LjI0ODUzLDIuMzM4NjJxLjM0Ny0uNjAxODIuNjY3LTEuMjE4NjNoMGEyMC44NjY3MSwyMC44NjY3MSwwLDAsMSwuNzcyMzgsMi4wMjMyNywyMC44NTE2NCwyMC44NTE2NCwwLDAsMS0yLjE0NTUyLjM2NTczUTE1LjIxOTM1LDEzLjE2NjgyLDE1LjU2MDgsMTIuNTc0NTVabS42NTc2Ny0zLjQ5MzQzcS0uMzE4ODMtLjYwNS0uNjYxNjMtMS4xOTY4NGgwcS0uMzM3MjctLjU4MjU4LS42OTk0LTEuMTUwMjJjLjczMzkuMDkyNjMsMS40MzcuMjE1NzksMi4wOTcxNy4zNjY1NEEyMC45NTkwOSwyMC45NTkwOSwwLDAsMSwxNi4yMTg0Nyw5LjA4MTEyWk0xMS41MTEsMy45NDM1OWEyMS4wMTI4OCwyMS4wMTI4OCwwLDAsMSwxLjM1MzUsMS42MzM5M3EtMS4zNTg0My0uMDY0MTktMi43MTg0LS4wMDA2MUMxMC41OTMsNC45ODc2NSwxMS4wNTA3LDQuNDQwMjIsMTEuNTExLDMuOTQzNTlaTTYuMjEyODQsMS4xNDA4MWMuNzY5NTMtLjQ0NTQzLDIuNDcwOTUuMTg5NzMsNC4yNjQyOCwxLjc4Mi4xMTQ2MS4xMDE3OS4yMjk3NC4yMDgzNi4zNDUwNy4zMTg2QTIzLjU0NTQyLDIzLjU0NTQyLDAsMCwwLDguODYyOTQsNS42NjYwOGEyNC4wMDgsMjQuMDA4LDAsMCwwLTMuMDY5MTYuNDc3cS0uMDg4LS4zNTIyOC0uMTU4MDgtLjcwODY2di4wMDAxQzUuMjAzMzksMy4yMjUzNiw1LjQ5MDQ0LDEuNTU5LDYuMjEyODQsMS4xNDA4MVpNNS4wOTEzMiwxMy4xODIzM3EtLjI4Ni0uMDgxODctLjU2Nzc4LS4xNzc3M0E4LjMyMzcxLDguMzIzNzEsMCwwLDEsMS44NDEsMTEuNTc5NTVhMi4wMzA3MiwyLjAzMDcyLDAsMCwxLS44NTg0OS0xLjM2NzI0YzAtLjgzNzQyLDEuMjQ4NjUtMS45MDU3MSwzLjMzMTE3LTIuNjMxNzhxLjM5MjA4LS4xMzYxLjc5MTYyLS4yNDkwOGEyMy41NjQ1NSwyMy41NjQ1NSwwLDAsMCwxLjEyMSwyLjkwNDc4QTIzLjkyMjQ3LDIzLjkyMjQ3LDAsMCwwLDUuMDkxMzIsMTMuMTgyMzNaTTEwLjQxNTk0LDE3LjY2MWE4LjMyMTYxLDguMzIxNjEsMCwwLDEtMi41NzQ2NywxLjYxMTg0aC0uMDAwMWEyLjAzMDQyLDIuMDMwNDIsMCwwLDEtMS42MTMwNi4wNjA2N2MtLjcyNTU2LS40MTgzNi0xLjAyNzA2LTIuMDMzNzYtLjYxNTczLTQuMjAwMzVxLjA3MzM3LS4zODQwNy4xNjgtLjc2MzYzYTIzLjEwNDQ0LDIzLjEwNDQ0LDAsMCwwLDMuMDk5NS40NDg2OSwyMy45MDk1NCwyMy45MDk1NCwwLDAsMCwxLjk3NDMxLDIuNDM5MjlRMTAuNjQsMTcuNDY0NTksMTAuNDE1OTQsMTcuNjYxWm0xLjEyMjIzLTEuMTEwNTNjLS40NjU2OS0uNTAyNTMtLjkzMDE1LTEuMDU4MzEtMS4zODM4My0xLjY1NjEycS42NjA1MS4wMjYsMS4zNDU2Ni4wMjYwNi43MDMyNiwwLDEuMzg4NDEtLjAzMDg0QTIwLjg5NDI1LDIwLjg5NDI1LDAsMCwxLDExLjUzODE3LDE2LjU1MDQ1Wm01Ljk2NjUxLDEuMzY3YTIuMDMwMzksMi4wMzAzOSwwLDAsMS0uNzUzLDEuNDI3OGMtLjcyNDg1LjQxOTU4LTIuMjc1LS4xMjU4MS0zLjk0NjU5LTEuNTY0MzFxLS4yODc1LS4yNDczNS0uNTc4MzctLjUyNzI3YTIzLjA4OTE0LDIzLjA4OTE0LDAsMCwwLDEuOTI3OS0yLjQ0OCwyMi45MzY0NywyMi45MzY0NywwLDAsMCwzLjExNTA3LS40ODAxNHEuMDcwMjQuMjg0LjEyNDQ5LjU1NjM4aDBBOC4zMiw4LjMyLDAsMCwxLDE3LjUwNDY4LDE3LjkxNzQ5Wm0uODM0MTctNC45MDczOWgtLjAwMDFjLS4xMjU3MS4wNDE2My0uMjU0NzguMDgxODQtLjM4NjI5LjEyMDgyYTIzLjA2MTIxLDIzLjA2MTIxLDAsMCwwLTEuMTY0NjgtMi45MTM3MywyMy4wNTExMiwyMy4wNTExMiwwLDAsMCwxLjExOTM4LTIuODcxMjhjLjIzNTI0LjA2ODIuNDYzNjUuMTQuNjgzNzIuMjE1NzksMi4xMjg0Mi43MzI1OCwzLjQyNjY1LDEuODE1OTMsMy40MjY2NSwyLjY1MDYxQzIyLjAxNzUzLDExLjEwMTQ1LDIwLjYxNTM4LDEyLjI1NTc0LDE4LjMzODg1LDEzLjAxMDFaIiBmaWxsPSIjNjFkYWZiIi8+PHBhdGggZD0iTTExLjUsOC4xNTg1YTIuMDUzODYsMi4wNTM4NiwwLDEsMS0yLjA1MzgxLDIuMDUzODFBMi4wNTM4MSwyLjA1MzgxLDAsMCwxLDExLjUsOC4xNTg1IiBmaWxsPSIjNjFkYWZiIi8+PC9zdmc+"
              alt=""
              height="20"
            />{" "}
            MDB React
          </NavbarBrand>
          <NavbarToggler
          />
          <Collapse
            id="mainNavbarCollapse"
            navbar
          >
            <NavbarNav right>
              <NavItem>
                <NavLink
                  to="/"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/css"
                >
                  CSS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/components"
                >
                  Components
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/advanced"
                >
                  Advanced
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/navigation"
                >
                  Navigation
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/forms"
                >
                  Forms
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/tables"
                >
                  Tables
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/modals"
                >
                  Modals
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/addons"
                >
                  Addons
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>*/}

        <Anchor id="about-me"/>
        <Section className="grey lighten-3 py-4">
            <Content>
                <Animation reveal type="fadeIn" duration="1000ms">
                    <Container fluid>
                        <h2 className="h2-responsive text-center">About Me</h2>
                        <hr/>
                        <Row className="justify-content-center">
                            <Col md="12">
                                <p className="text-center lead">
                                I am a 4<sup>th</sup> year Computer Science student
                                minoring in Mathematics. I have a keen interest in learning
                                new and innovative programming practices, languages, and techniques.
                                I have some experience working in groups gathering
                                specifications and requirements, designing software,
                                prototyping software, and implementing tasks.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Animation>
                <Row className="d-flex justify-content-center">
                    <Animation reveal type="rollIn" duration="1000ms">
                        <Col style={{maxWidth: 400}} lg="4" className="my-4">
                            <Card className="hoverable">
                                <CardImage className="view green d-flex flex-column justify-content-center" style={{height: 240}} tag="div">
                                    <h2 className="text-white text-center h2-responsive">Experience</h2>
                                </CardImage>
                                <CardBody>
                                    <CardText>
                                        I have had great opportunities meeting new people, learning
                                        new skills, and working in teams.
                                    </CardText>
                                    <a className="btn btn-primary float-right"
                                    href="#experience"
                                    onClick={(e) => smoothScroll(e)}
                                    >
                                    Learn More
                                    </a>
                                </CardBody>
                            </Card>
                        </Col>
                    </Animation>
                    <Animation reveal type="fadeInRight"delay="0" duration="1000ms">
                        <Col style={{maxWidth: 400}} lg="4" className="my-4">
                            <Card className="hoverable">
                                <CardImage className="view orange d-flex flex-column justify-content-center" style={{height: 240}} tag="div">
                                    <h2 className="text-white text-center h2-responsive">Technical Skills</h2>
                                </CardImage>
                                <CardBody>
                                    <CardText>
                                        A listing of my technical skills, interests, and
                                        all of the courses I've completed to date.
                                    </CardText>
                                    <a className="btn btn-primary float-right"
                                    href="#skills"
                                    onClick={(e) => smoothScroll(e)}
                                    >
                                    Learn More
                                    </a>
                                </CardBody>
                            </Card>
                        </Col>
                    </Animation>
                    <Animation reveal type="fadeInUp" delay="250ms" duration="1000ms">
                        <Col style={{maxWidth: 400}} lg="4" className="my-4">
                            <Card className="hoverable">
                                <CardImage className="view red d-flex flex-column justify-content-center" style={{height: 240}} tag="div">
                                    <h2 className="text-white text-center h2-responsive">Personal Projects</h2>
                                </CardImage>
                                <CardBody>
                                    <CardText>
                                        To help me in my day-to-day life I have created
                                        several different software applications.
                                    </CardText>
                                    <a className="btn btn-primary float-right"
                                    href="#projects"
                                    onClick={(e) => smoothScroll(e)}
                                    >
                                    Learn More
                                    </a>
                                </CardBody>
                            </Card>
                        </Col>
                    </Animation>
                </Row>
            </Content>
        </Section>

        <Anchor id="experience" />
        <Section className="white py-4">
            <Content>
                <Animation reveal type="fadeIn" duration="1000ms">
                    <h2 className="h2-responsive text-center">Experience</h2>
                    <hr/>
                </Animation>
                {experiences && experiences.map((obj, index) =>{
                    return(
                        <Animation key={obj.name} reveal type="fadeInUp" duration="500ms">
                            <Experience index={index} onModalClick={(i) => this.modal(experiences, i)} {...obj} />
                        </Animation>
                    );
                })}
                <hr className="m-4 p-0"/>
                {schoolExperiences && schoolExperiences.map((school, index) => {
                    return(
                        <Animation key={school.name} reveal type="fadeInUp" duration="500ms">
                            <Experience index={index} onModalClick={(i) => this.modal(schoolExperiences, i)} {...school} />
                        </Animation>
                    );
                })}
            </Content>
        </Section>

        <Anchor id="skills" />
        <Section className="grey lighten-3 py-4">
            <Content>
                <Animation reveal type="fadeIn">
                    <h2 className="h2-responsive text-center">Technical Skills</h2>
                    <hr/>
                </Animation>
                <Row className="pt-4">
                    <Col md="6">
                        <Animation reveal type="fadeIn">
                            <h4 className="h4-responsive">Experienced</h4>
                        </Animation>
                        <List startDelay={skillsDelay} increment={50}
                        show={skills.experienced}/>
                    </Col>
                    <Col md="6">
                        <Animation reveal type="fadeIn">
                            <h4 className="h4-responsive">Knowledgable</h4>
                        </Animation>
                        <List startDelay={skillsDelay} increment={50}
                        show={skills.knowledgable}/>
                    </Col>
                </Row>
                <Row className="pt-4">
                    <Col md="12">
                        <Animation reveal type="fadeIn">
                            <h4 className="h4-responsive">Interests</h4>
                        </Animation>
                        <List startDelay={skillsDelay} increment={50}
                        show={interests}/>
                    </Col>
                </Row>
                <Anchor id="course-list"/>
                <Row className="pt-4">
                    <Col md="12">
                        <Animation reveal type="fadeIn">
                            <h4 className="h4-responsive">Courses Completed</h4>
                        </Animation>
                        {courses &&
                            <List startDelay={skillsDelay} increment={50}
                            anchor="course-list" show={courses.show} more={courses.more}/>}
                    </Col>
                </Row>
            </Content>
        </Section>

        <Anchor id="projects" />
        <Section className="white py-4">
            <Content>
                <Animation reveal type="fadeIn">
                    <h2 className="h2-responsive text-center">Personal Projects</h2>
                    <hr/>
                </Animation>
                {projects && projects.map((project, index) => {

                    return(
                        <Animation key={project.name} type="fadeInUp" reveal delay={(index+1)*100+"ms"}>
                            <Project {...project} />
                        </Animation>
                    );
                })}
            </Content>
        </Section>
        <Modal
        centered
        size="lg"
        isOpen={isopen}
        toggle={this.toggleModal}>
            <ModalHeader>
                {name}
            </ModalHeader>

            <ModalBody className="d-flex flex-column align-items-center">
                {/*<img className="img-fluid" src={picture} {...obj} alt={name}/>*/}
                <ImageLoader src={picture} preview={preview} alt={name} className="mx-auto img-fluid"/>

                {description}
            </ModalBody>

            <ModalFooter>
                <button onClick={this.toggleModal} className="btn btn-success">Close</button>
                <a rel="noopener noreferrer" target="_blank" href={link} className="btn btn-primary">Take Me There!</a>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HomePage;
