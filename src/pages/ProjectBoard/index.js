
import React from "react";

import {Route, Link} from "react-router-dom";

import $ from "jquery";

import {
  Container,
  Button,
  Input, TextArea,
  Modal, ModalBody, ModalFooter, ModalHeader,
  ListGroup, ListGroupItem,
} from "mdbreact"

class ProjectForm extends React.Component{
  state = {
    name: "",
    description: "",
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(state => ({
      [name]: value,
    }))
  }

  submit = (event) => {
    const {name, description, footer} = this.state;
    const {onSubmit, toggle} = this.props;

    // CHANGE TO DYNAMIC VALIDATION
    if(!name.length && !description.length)
    {
      toggle(() =>
        onSubmit({
          title:"Please ",
          description: "TEST",
          footer: (
            <Button onClick={() => toggle(() => onSubmit({
              title: name,
              description: <ProjectForm {...this.props}/>,
              footer: null,
            }))}>Close</Button>
          ),
        })
      );
      event.preventDefault();
      return;
    }


    $.ajax({
      url: "/api/v1/projects/push",
      type: "GET",
      data: {
        name: name,
        description: description,
      },
      error: function(err){
        console.log("err: "+err);
      },
      success:function(data){
        if(onSubmit)
        {
          toggle(() => onSubmit({
            title: `Successfully Submitted "${name}"`,
            description: (
              <div>
                <h2 className="h2-responsive">Success!</h2>
              </div>
            ),
            footer: <Button onClick={() => toggle(null)}>Close</Button>
          }));
        }
      }
    })

    event.preventDefault();
  }

  render(){
    const {name, description} = this.state;

    return(
      <Container>
        <form onSubmit={this.submit}>
          <Input
          name="name"
          label="Project Name"
          type="text"
          validate
          error="please enter a name"
          success="good job"
          onChange={this.handleInputChange}
          value={name}
          />
          <Input
          name="description"
          type="textarea"
          rows="5"
          onChange={this.handleInputChange}
          value={description}
          />
          <Button
          type="submit"
          >
            Create Project
          </Button>
        </form>
      </Container>
    )
  }
}

const AddButton = (props) => {
  const {onClick, toggle, ...rest} = props;

  return(
    <Button
    {...rest}
    onClick={() => {
      props.onClick({
        title: "nothing",
        description: <ProjectForm onSubmit={props.onSubmit} toggle={toggle} />
      })
    }}
    >
      Add
    </Button>
  )
}

class ProjectList extends React.Component{

  render(){
    const {props} = this;
    const {projects, children, onClick, currentProj, ...rest} = props;

    if(!projects) return null;

    return(
      <Container fluid {...rest}>
        <ListGroup>
          {projects && projects.map((project, index) => (
            <ListGroupItem
            onClick={(e) => onClick(index)}
            active={currentProj == index}
            index={index}
            href="#"
            key={index}
            >
              <h1 className="h1-responsive">{project.name}</h1>
              <p>{project.description}</p>
            </ListGroupItem>
          ))}
          {children}
        </ListGroup>
      </Container>
    )
  }
}

class Project extends React.Component{

  state = {
    project: null
  }

  getProject = async() => {
    try{
      return await $.ajax({
        url: "/api/v1/projects",
        type: "GET",
        data: {
          id: this.props.id
        }
      })
    }catch(error)
    {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props)
    {
      this.getProject()
      .then(data => this.setState({
        project: data,
      }))
    }
  }

  componentDidMount(){
    this.getProject()
    .then(data => this.setState({
      project: data,
    }))
  }

  render(){
    const {project} = this.state;
    const {id, ...rest} = this.props;

    if(!project) return null;

    return(
      <Container fluid {...rest} >
        <div>
          <h1 className="h1-responsive text-center">{project.name}</h1>
          <hr/>
          <p>{project.description}</p>
        </div>
      </Container>
    )
  }
}

export default class ProjectBoard extends React.Component{

  constructor(props){
    super(props);

    // this.pList = React.createRef();
  }

  state={
    modal: false,
    title: null,
    description: null,
    footer: null,
    projects: null,
    currentProj: 0,
  }

  getProjects = async() => {
    try{
        return await $.ajax({
        url: "/api/v1/projects",
        type: "GET",
      });
    }catch(error)
    {
      console.log(error);
    }
  }

  toggle = (cb) => {
    this.setState({
      modal: !this.state.modal,
    })

    if(cb)
      setTimeout(() => cb(), 250);
  }

  showModal = (modalData) => {
    const {title, description, footer} = modalData;

    this.setState({
      title: title,
      description: description,
      footer: footer,
      modal: true,
    })
  }

  submit = (modalData) => {
    this.showModal(modalData);
    this.getProjects()
    .then(data => {
      this.setState({
        projects: data,
      })
    })
  }

  setProject = (index) => {
    this.setState({
      currentProj: index,
    })
  }

  componentDidMount(){
    this.getProjects()
    .then(data => this.setState({projects: data}));
  }

  render(){
    const {modal, title, description, footer, projects, currentProj} = this.state;

    return(
      <div className="d-flex white" style={{
        paddingTop: 64,
        maxHeight: "100vh",
        height: "100vh",
        overflow: "none",
      }}>
        {/*<Link to="/project-board/test">TEST</Link>*/}
        <Route exact path="/project-board/test" render={(props) => <div/>} />

        <ProjectList style={{
          maxHeight: "100%",
          overflowY: "auto",
          wordBreak: "break-all"
        }}
        className="flex-1 p-0 m-0"
        projects={projects}
        onClick={this.setProject}
        currentProj={currentProj}
        >

          <ListGroupItem className="d-flex flex-column p-0">
            <AddButton
            style={{
              borderRadius: 0
            }}
            toggle={this.toggle}
            onSubmit={this.submit}
            onClick={(modalData) => this.showModal(modalData)}
            className="m-0"
            />
          </ListGroupItem>

        </ProjectList>

        <Project style={{
          maxHeight: "100%",
          overflowY: "auto",
        }} className="p-0 m-0" style={{
          flex: "2"
        }} id={currentProj}/>

        <Modal
        isOpen={modal}
        >
          <ModalHeader>
            {title}
          </ModalHeader>

          <ModalBody>
            {description}
          </ModalBody>

          <ModalFooter>
            {footer}
            {/*<Button
            onClick={this.toggle}
            >
              Close
            </Button>*/}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
