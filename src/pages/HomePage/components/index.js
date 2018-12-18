
import React from "react";

import classNames from "classnames";
import smoothScroll from "./smoothScroll";
import $ from "jquery";

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
        const props = this.props;

        return(
            <Card onClick={this.handleClick}>
                <View hover className="d-flex justify-content-center">
                    <LazyLoad once>
                        <CardImage
                        src={props.src}
                        className="img-fluid"
                        waves={false}
                        />
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
}
