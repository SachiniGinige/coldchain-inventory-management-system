import React, { Component } from "react";
import axios from "axios";

import Button from 'react-bootstrap/Button';

import homeImage from './img/homeScreenPic.png';

import './css/Homepage.css' ;

var uname, uid;

export default class AdminLoginPage extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onAdminLogin=this.onAdminLogin.bind(this);

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

    onAdminLogin(e){
        e.preventDefault();

        const admin = {
            username:  this.state.username,
            password:  this.state.password
        }

        axios.post('http://localhost:3001/admin/login/', admin)
            .then(res => {
                if(res.data.username===this.state.username && res.data.password===this.state.password){
                    //set loggedin to true
                    alert("Welcome "+this.state.username+"!");
                    window.location="../admin/equipment";

                    sessionStorage.removeItem(sessionStorage.getItem("username"));
                    sessionStorage.removeItem("username");

                    uname=this.state.username;
                    uid="ADMIN";

                    sessionStorage.setItem(uname,uid);
                    sessionStorage.setItem("username",uname);
                    sessionStorage.setItem("loggedIn",true);
                }
                                    
                if(res.data.message==="Invalid credentials")
                    alert(res.data.message);
                console.log(res.data);
            });
    }

    render() {
        return (
            <div id="homepageContainer">            
                <div className="homepage" id="homepageContent"> 
                    <h3>Admin Login</h3><br/>
                    <div className="loginform">                                  
                        <label className="form-label">Username: </label>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                        <br/>
                        <label className="form-label">Password: </label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
                        <br/><br/>                   
                    </div>
                    <Button className="loginBtn" variant="outline-info" onClick={this.onAdminLogin}>Login</Button>
                    <Button className="loginBtn" variant="outline-info" href="./login-user">Login as User</Button>
                </div>
                <div className="homepage" id="homepageImage">  
                    <img src={homeImage} className="center" id="homepageImg" alt=""></img>
                </div>
            </div>
        );
    }
}
