
import React from "react";

import classNames from "classnames";
import smoothScroll from "./smoothScroll";
import $ from "jquery";
import BlurImageLoader from "react-blur-image-loader";

import {
  Container,
  Col,
  Row,
  Fa,
  View,
  Animation,
  Card, CardImage,
  // Modal, ModalBody, ModalHeader, ModalFooter,
  Mask, Waves

} from "mdbreact";

import LazyLoad from "react-lazyload";

const Banner = (props) => {

    return(
        <div style={{
            height: "100vh",
        }} {...props}/>
    );
}

const Section = (props) => {
    let className = classNames(props.className, {
        'd-flex': true,
        'justify-content-center': true,
    });

    return(
        <Container style={{minHeight: "100vh"}} fluid {...props} className={className} />
    );
}

const Content = (props) => {

    return(
        <content {...props} />
    );
}

const Anchor = (props) => {

    return(
        <a {...props} style={{
            display: "block",
            position: "relative",
            top: "-40px",
            visibility: "hidden",
        }}>
        </a>
    );
}

const Project = (props) => {

    return(
        <Row>
            <Col md="4">
                <h2 className="h2-responsive">
                    <a rel="noopener noreferrer" target="_blank" href={props.link}>
                        {props.name}
                    </a>
                </h2>
                <h5 className="h5-responsive">
                    &nbsp;{(props.subname && props.language) ? (
                        props.subname+" - "+props.language
                    ) : (
                        props.subname || props.language
                    )}
                </h5>
            </Col>
            <Col md="8">
                <div className="pt-4">
                    <p>
                        {props.description}
                    </p>
                </div>
            </Col>
        </Row>
    );
}

const _loaded = {};

class ImageLoader extends React.Component {

  //initial state: image loaded stage
  state = {
    loaded: _loaded[this.props.src]
  };

  //define our loading and loaded image classes
  static defaultProps = {
    className: "",
    loadingClassName: "img-loading",
    loadedClassName: "img-loaded"
  };

  //image onLoad handler to update state to loaded
  onLoad = () => {
    _loaded[this.props.src] = true;
    this.setState(() => ({ loaded: true }));
  };


  render() {

    let { className, loadedClassName, loadingClassName, ...props } = this.props;
    const {preview} = props;
    const {loaded} = this.state;

    className = `${className} ${loaded
      ? loadedClassName
      : loadingClassName}`;

    return (
      (!loaded) ? (
          <div className="position-relative">
            {preview ?
              <img
             src={this.props.preview}
             onClick={this.props.onClick}
             className={className}
             style={{
               position: "absolute",
               top:0,
               right:0,
               left:0,
               bottom:0,
             }}
             /> :
             <div className="d-flex align-items-center justify-content-center" style={{
               position: "absolute",
               top:0,
               right:0,
               left:0,
               bottom:0,
             }}>
              <div className="loader">
              </div>
            </div>}
             <img
              src={this.props.src}
              style={{opacity: 0}}
              onClick={this.props.onClick}
              className={className}
              onLoad={this.onLoad} />
            </div>
      ) :
        <img
         src={this.props.src}
         onClick={this.props.onClick}
         className={className}
         onLoad={this.onLoad} />

    );
  }
}

class ExperienceImage extends React.Component {
    state = {
        cursorPos: {},
    }

    handleClick = (e) => {
        // Get Cursor Position
        const {index, onModalClick} = this.props;
        let cursorPos = {
          top: e.clientY,
          left: e.clientX,
          time: Date.now()
        };
        this.setState({
            cursorPos: cursorPos,
        })
         onModalClick(index);
      }

    render(){

      const {preview, ...props} = this.props;

        return(
            <Card onClick={this.handleClick}>
                <View hover>
                    <LazyLoad>
                        {/*<CardImage
                        src={props.src}
                        className="img-fluid"
                        waves={false}
                        />*/}
                        {/*<BlurImageLoader
                        src={props.src}
                        />*/}
                        <ImageLoader src={props.src} preview={preview} className="mx-auto img-fluid"/>
                    </LazyLoad>
                    <a href="#!"><Mask overlay="grey-light"/></a>
                    <Waves cursorPos={this.state.cursorPos}/>
                </View>
            </Card>
        );
    }
};

const Experience = (props) => {

    const {
        name,
        title,
        address,
        phone,
        type,
        datestart,
        dateend,
        description,
        picture,
        preview,
        link,
    } = props;

    return(
        <Row className="mt-4">
            <Col md="4" className="d-flex flex-column justify-content-center">
                <ExperienceImage key={picture} src={picture} {...props} />
            </Col>
            <Col md="8">
                <h2 className="h2-responsive"><a rel="noopener noreferrer" href={link} target="_blank" >{name}</a></h2>
                <h5 className="h5-responsive">&nbsp;{title} -- {type && (type+" --")} {datestart ? (datestart+" to "+dateend) : dateend}</h5>
                {address && <h6 className="h6-responsive">&nbsp;&nbsp;{address}</h6>}
                {phone && <h6 className="h6-responsive">&nbsp;&nbsp;{phone}</h6>}
                <div className="pt-4">
                    <p>
                        {description}
                    </p>
                </div>
            </Col>
        </Row>
    );
}

class List extends React.Component{
    state = {
        collapse: false,
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse,
        })
    }

    render(){
        const {props} = this;
        const {show, more, anchor} = props;
        const {collapse} = this.state;

        var {startDelay, increment} = props;

        if(!startDelay) startDelay = 0;
        if(!increment) increment = 0;

        return(
            <div style={{
                width: "fit-content"
            }}>
                <ul>
                    {show && show.map((item) => {
                        startDelay += increment;
                        return(
                            <li key={item}>
                                <Animation reveal type="fadeIn" delay={startDelay+"ms"}>
                                    {item}
                                </Animation>
                            </li>
                        );
                    })}
                    {more && !collapse &&
                        <a className="float-right" href={anchor ? "#"+anchor : "#!"} onClick={(e) => {
                            this.toggle();
                            if(anchor)
                                smoothScroll(e);
                        }}>show more</a>
                    }
                    {collapse && more && more.map((item, index) => (
                        <li key={item}>
                            <Animation type="fadeIn" delay={index*increment+"ms"}>
                                {item}
                            </Animation>
                        </li>
                    ))}
                    {collapse &&
                        <a className="float-right" href={anchor? "#"+anchor : "#!"}
                        onClick={(e) => {
                            this.toggle();
                            if(anchor)
                                smoothScroll(e);
                        }}>show less</a>
                    }
                </ul>
            </div>
        );
    }
}

class Arrow extends React.Component{
    state = {
        show: false,
        first: true,
    }

    show = () => {
        let show = $(window).scrollTop() ? true : false;
        this.setState({
            show: show,
            first: this.state.first&&(show?false:true)
        })
    }

    componentWillMount(){
        window.addEventListener("scroll", this.show);
    }

    render(){
        const {show, first} = this.state;

        if(first) return null;

        return(
            <div style={{
                position: "fixed",
                bottom: "15px",
                right: "15px",
                width: "50px",
                height: "50px",
                zIndex: "1",
            }} className="arrow">
                <Animation type={show?"fadeInUp":"fadeOutDown"} duration="500ms">
                    <a className="btn btn-primary d-flex justify-content-center align-items-center"
                    style={{
                        lineHeight: "1!important",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        margin: 0,
                        padding: 0,
                    }}
                    href="#top" onClick={(e) => smoothScroll(e)}
                    >
                        <Fa icon="arrow-up"/>
                    </a>
                </Animation>
            </div>
        )
    }
}

export{
    Banner,
    Section,
    Content,
    Anchor,
    Project,
    ExperienceImage,
    Experience,
    List,
    Arrow,
    ImageLoader,
}
