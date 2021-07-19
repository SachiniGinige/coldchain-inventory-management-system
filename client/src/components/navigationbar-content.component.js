import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

import logo from './img/epidLogo.jpg';
import myAccountIcon from './img/myAccountIcon.png';

import './css/Navigbar.css' ;

export default class NavigbarContent extends Component{
  constructor(props){
    super(props);

    this.onLogout=this.onLogout.bind(this);
  }
  onLogout(e){
    e.preventDefault();

    sessionStorage.removeItem(sessionStorage.getItem("username"));
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("designation");
    sessionStorage.setItem("loggedIn", false);   
    window.location="../home";    
  }

  render(){
    return (
      <div className="Navigbar" id="NavigbarContent">
        <Navbar expand="lg">
          <Navbar.Brand href="../home/homepage">
            <img src={logo} className="Navigbar-logo" alt="EpidLogo"/>
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
            <Nav className="mr-auto">              
            </Nav>
            <Form inline> 
              {/* <Button variant="outline-light">  */}
              <img src={myAccountIcon} id="myAccountIcon" alt=""/>
              <NavDropdown title="My Account" id="myAccountDropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
              {/* </Button>        */}
              {/* <Button id="myAccount" variant="outline-light">My Account</Button>               */}
            </Form>
          {/* </Navbar.Collapse> */}
        </Navbar>
      </div>
    );
  }
}
