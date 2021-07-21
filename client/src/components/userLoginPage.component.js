import React, { Component } from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';

import homeImage from './img/homeScreenPic.png';

import './css/Homepage.css' ;

var uname, uid, udesignation;

export default class UserLoginPage extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onLogin=this.onLogin.bind(this);

        this.state = {
            username: '',
            password: '' 
        }
    }
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onLogin(e){
        e.preventDefault();

        const user = {
            username:  this.state.username,
            password:  this.state.password
        }

        axios.post('http://localhost:3001/users/login/', user)
            .then(res => {
                if(res.data.username===this.state.username && res.data.password===this.state.password){
                    //set loggedin to true
                    alert("Welcome "+this.state.username+"!");
                    window.location="../user/equipment";

                    sessionStorage.removeItem(sessionStorage.getItem("username"));
                    sessionStorage.removeItem("username");

                    uname=this.state.username;
                    uid=res.data.userId;
                    udesignation=res.data.designation;

                    sessionStorage.setItem(uname,uid);
                    sessionStorage.setItem("username",uname);
                    sessionStorage.setItem("designation",udesignation);
                    sessionStorage.setItem("loggedIn",true);
                }
                                    
                if(res.data.message==="Invalid credentials")
                    alert(res.data.message);
                    // window.confirm(res.data.message);

                console.log(res.data);
            });        
    }

    render() {
        return (
            <div id="homepageContainer">            
                <div className="homepage" id="homepageContent"> 
                    <h3>User Login</h3><br/>
                    <div className="loginform">                                  
                        <label className="form-label">Username: </label>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                        <br/>
                        <label className="form-label">Password: </label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
                        <br/>                   
                    </div>
                    <Button className="loginBtn" variant="outline-info" onClick={this.onLogin}>Login</Button>
                    <Button className="loginBtn" variant="outline-info" href="./login-admin">Login as Admin</Button>
                </div>
                <div className="homepage" id="homepageImage">  
                    <img src={homeImage} className="center" id="homepageImg" alt=""></img>
                </div>
            </div>
        );
    }
}
