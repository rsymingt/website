import React from "react";
// import ReactDOM from 'react-dom';

import "./style.css";
import "./style.sass";

import $ from "jquery";
import smoothScroll from "./components/smoothScroll";

import {
    skills,
    experiences,
    schoolExperiences,
    // projects,
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
  Modal, ModalBody, ModalHeader, ModalFooter,
  MDBIcon, MDBBtn,
} from "mdbreact";

import {
    // BrowserView,
    // MobileView,
    // isBrowser,
    isMobile
} from "react-device-detect";

const getRef = (refs) => {
    let ref = React.createRef();
    refs.push(ref);
    return ref;
}

class HomePage extends React.Component {

    state = {
        refs: [],
        projects: null,
    }

    checkAnimations = () =>
    {
        const refs = this.state.refs;
        let delay = 0;
        for(let key in refs)
        {
            let ref = refs[key];
            let obj = ref.current;

            let objTop = $(obj.elemRef.current).offset().top;
            let objHeight = $(obj.elemRef.current).height();
            let windowTop = $(window).scrollTop();
            let windowHeight = $(window).height();


            if( (objTop > windowTop || (objTop + objHeight) > windowTop) &&
                ( (objTop < (windowTop + windowHeight)) || ( (objTop + objHeight) < (windowTop + windowHeight) ) ) 
            )
            {
                setTimeout(function(){
                    obj.setState({isVisible: true, revealed: true});
                }, ((obj.props.delay === 0 || obj.props.delay === null) ? delay : 0));
                delay += (obj.props.delay === 0 || obj.props.delay === null) ? 250 : 0;
            }
        }
    }

    addProjects = (json) => {
        let projects = [];
        for(var key in json)
        {
            let obj = json[key];
            let project = {
                name: obj.name,
                subname: "",
                language: obj.language,
                description: obj.description,
                link: obj.clone_url,
            }
            projects.push(project);
        }

        this.setState({
            projects: projects,
        })
    }

    componentWillUpdate()
    {
        this.state.refs.splice(0,this.state.refs.length)
    }

    componentDidUpdate()
    {
        this.checkAnimations();
    }

    componentDidMount(){
        this.checkAnimations();
    }

    componentWillMount(){
        let $this = this;
        $.ajax({
            url: "https://api.github.com/users/rsymingt/repos",
            method: "GET",
            dataType: "json",
            success: json =>
            {
                $this.addProjects(json);
            },
            error: function(err)
            {
                console.log(err);
            },
        })
    }

    handleModal = (ref, experience) => 
    {
        ref.current.handleLoad(experience);
    }

  render() {
    var skillsDelay = 0;

    const ref = React.createRef();
    const refs = this.state.refs

    const {projects} = this.state;

    return (
      <div>
        <Anchor id="top"/>
        <Arrow/>
        <Banner
        className="unique-color-dark d-flex flex-column align-items-center justify-content-center"
        >
            <Row>
                <Col md="12">
                    <Animation ref={getRef(refs)} reveal type="fadeIn" duration="1000ms" delay="0">
                    <h2 className="h2-responsive text-white text-center">Hello my name is</h2>
                    </Animation>
                    <Animation ref={getRef(refs)} reveal type="fadeIn" duration="1000ms" delay="100ms">
                        <h1 className="h1-responsive text-white text-center"><strong>Ryan Symington</strong></h1>
                    </Animation>
                    <Animation ref={getRef(refs)} reveal type="fadeIn" duration="1000ms" delay="200ms">
                        <h4 className="h4-responsive text-white text-center pt-4">Software/Web Developer</h4>
                    </Animation>
                    <Container className="d-flex mt-4">
                    <Animation ref={getRef(refs)} reveal type="fadeInUp" duration="500ms" delay="400ms">
                        <MDBBtn target="_blank" rounded floating color="blue" href="https://github.com/rsymingt">
                        <MDBIcon className="pr-1" style={{
                            fontSize: "16px",
                        }} icon="github-square" />
                        Github
                        </MDBBtn>
                    </Animation>
                    <Animation ref={getRef(refs)} reveal type="fadeInUp" duration="500ms" delay="450ms">
                        <MDBBtn target="_blank" rounded floating color="blue" href="https://www.linkedin.com/in/ryan-symington-4a8881119/">
                        <MDBIcon className="pr-1" style={{
                            fontSize: "16px",
                        }} icon="linkedin-square" />
                        LinkedIn
                        </MDBBtn>
                    </Animation>
                    </Container>
                    <Animation ref={getRef(refs)} reveal type="fadeInUp" duration="500ms" delay="300ms">
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

        <Anchor id="about-me"/>
        <Section className="grey lighten-3 py-4">
            <Content>
                <Animation ref={getRef(refs)} reveal type="fadeIn" duration="1000ms">
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
                    <Animation ref={getRef(refs)} reveal type={isMobile ? "fadeInUp" : "rollIn"} duration="1000ms">
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
                    <Animation ref={getRef(refs)} reveal type={isMobile ? "fadeInUp" : "fadeInRight"} delay="0" duration="1000ms">
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
                    <Animation ref={getRef(refs)} reveal type={isMobile ? "fadeInUp" : "fadeInUp"} delay="250ms" duration="1000ms">
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
                <Animation ref={getRef(refs)} reveal type="fadeIn" duration="1000ms">
                    <h2 className="h2-responsive text-center">Experience</h2>
                    <hr/>
                </Animation>
                {experiences && experiences.map((obj, index) =>{
                    return(
                        <Animation ref={getRef(refs)} key={obj.name} reveal type={isMobile ? "fadeIn" : "fadeInUp"} duration="500ms">
                            {/* <Experience index={index} onModalClick={(i) => this.modal(experiences, i)} {...obj} /> */}
                            <Experience index={index} onModalClick={(i) => this.handleModal(ref, experiences[i])} {...obj} />
                        </Animation>
                    );
                })}
                <hr className="m-4 p-0"/>
                {schoolExperiences && schoolExperiences.map((school, index) => {
                    return(
                        <Animation ref={getRef(refs)} key={school.name} reveal type={isMobile ? "fadeIn" : "fadeInUp"} duration="500ms">
                            {/* <Experience index={index} onModalClick={(i) => this.modal(schoolExperiences, i)} {...school} /> */}
                            <Experience index={index} onModalClick={(i) => this.handleModal(ref, schoolExperiences[i])} {...school} />
                        </Animation>
                    );
                })}
            </Content>
        </Section>

        <Anchor id="skills" />
        <Section className="grey lighten-3 py-4">
            <Content>
                <Animation ref={getRef(refs)} reveal type="fadeIn">
                    <h2 className="h2-responsive text-center">Technical Skills</h2>
                    <hr/>
                </Animation>
                <Row className="pt-4">
                    <Col md="6" className="display-flex flex-col">
                        <Animation ref={getRef(refs)} reveal type="fadeIn">
                            <h4 className="h4-responsive">Experienced</h4>
                        </Animation>
                        <List refs={[getRef, refs]} className="flex-1 bg-white" startDelay={skillsDelay} increment={50}
                        show={skills.experienced}/>
                    </Col>
                    <Col md="6" className="display-flex flex-col">
                        <Animation ref={getRef(refs)} reveal type="fadeIn">
                            <h4 className="h4-responsive">Knowledgable</h4>
                        </Animation>
                        <List refs={[getRef, refs]} className="flex-1 bg-white" startDelay={skillsDelay} increment={50}
                        show={skills.knowledgable}/>
                    </Col>
                </Row>
                <Anchor id="course-list"/>
                <Row className="pt-4">
                    <Col md="6" className="display-flex flex-col">
                        <Animation ref={getRef(refs)} reveal type="fadeIn">
                            <h4 className="h4-responsive">Interests</h4>
                        </Animation>
                        <List refs={[getRef, refs]} className="flex-1 bg-white" startDelay={skillsDelay} increment={50}
                        show={interests}/>
                    </Col>
                    <Col md="6" className="display-flex flex-col">
                        <Animation ref={getRef(refs)} reveal type="fadeIn">
                            <h4 className="h4-responsive">Courses Completed</h4>
                        </Animation>
                        {courses &&
                            <List refs={[getRef, refs]} className="flex-1 bg-white" startDelay={skillsDelay} increment={50}
                            anchor="course-list" show={courses.show} more={courses.more} 
                            moreHandle={() => this.checkAnimations()}
                            />}
                    </Col>
                </Row>
            </Content>
        </Section>

        <Anchor id="projects" />
        <Section className="white py-4">
            <Content>
                <Animation ref={getRef(refs)} reveal type="fadeIn">
                    <h2 className="h2-responsive text-center">Personal Projects</h2>
                    <hr/>
                </Animation>
                {projects && projects.map((project, index) => {

                    return(
                        <Animation ref={getRef(refs)} key={project.name} type="fadeInUp" reveal
                            // delay={(index+1)*100+"ms"}
                         >
                            <Project {...project} />
                        </Animation>
                    );
                })}
            </Content>
        </Section>

        <MyModal ref={ref}/>
      </div>
    );
  }
}

class MyModal extends React.Component 
{
    state = {
        modal: false,
        data: null,
    }

    handleLoad = (experience) => 
    {
        this.setState({
            data: experience,
            modal: true,
        })
    }

    handleToggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    render()
    {
        const {data, modal} = this.state;
        const {
            name,
            description,
            link,
            picture,
            preview,
        } = data?data:{};

        if(data === null)
        {
            return(
                null
            )
        }

        return(
            <Modal
                centered
                size="lg"
                isOpen={modal}
                toggle={this.handleToggle}
            >
                <ModalHeader>
                    {name}
                </ModalHeader>

                <ModalBody className="d-flex flex-column align-items-center">
                    {/*<img className="img-fluid" src={picture} {...obj} alt={name}/>*/}
                    <ImageLoader src={picture} preview={preview} alt={name} className="mx-auto img-fluid"/>

                    {description}
                </ModalBody>

                <ModalFooter>
                    <button onClick={this.handleToggle} className="btn btn-success">Close</button>
                    <a rel="noopener noreferrer" target="_blank" href={link} className="btn btn-primary">Take Me There!</a>
                </ModalFooter>
            </Modal>
        )
    }
    
}

export default HomePage;
