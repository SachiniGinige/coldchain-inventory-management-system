import React, { Component } from "react";
import axios from "axios";

export default class AddUser extends Component{
    constructor(props){
        super(props);

        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeDesignation=this.onChangeDesignation.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeContactNo=this.onChangeContactNo.bind(this);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onChangeLocation=this.onChangeLocation.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            name: '',
            designation: '',
            email: '',
            contactNo: '',
            username: '',
            password: '',
            location: '',
            locations: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/locations/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        locations: response.data.map(location=> location),
                        location: response.data[0].locationId
                    })
                }
            })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
        if(!e.target.value){
            console.log("Required field")
        }
        else if(!e.target.value.match(/^[a-zA-Z]+$/)){
            console.log("Invalid Name: "+e.target.value);
        }
    }
    onChangeDesignation(e){
        this.setState({
            designation: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangeContactNo(e){
        this.setState({
            contactNo: e.target.value
        });
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
    onChangeLocation(e){
        this.setState({
            location: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            name:  this.state.name,
            designation: this.state.designation,
            email:  this.state.email,
            contactNo:  this.state.contactNo,
            username:  this.state.username,
            password:  this.state.password,
            location:  this.state.location
        }

        console.log(user);

        axios.post('http://localhost:3001/users/add', user)
            .then(res => console.log(res.data));
        
        alert("User added");        
        window.location = './users';    
    }

    render() {
        return(
            // create user form
            <div className="form" id="addUserForm">
                <h3>Add New User</h3><br/>
                
                <label className="form-label">Name: </label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                <br/>
                
                <label className="form-label">Designation: </label>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        id="designation1" 
                        value="Epidemiologist" 
                        checked={this.state.designation === "Epidemiologist"}
                        onChange={this.onChangeDesignation}
                    />
                    <label className="form-check-label" for="designation1">
                        Epidemiologist
                    </label>
                    <br/>
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        id="designation2" 
                        value="RE" 
                        checked={this.state.designation === "RE"}
                        onChange={this.onChangeDesignation}
                    />
                    <label className="form-check-label" for="designation2">
                        Regional Epidemiologist
                    </label>
                    <br/>
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        id="designation3" 
                        value="MOH" 
                        checked={this.state.designation === "MOH"}
                        onChange={this.onChangeDesignation}
                    />
                    <label className="form-check-label" for="designation3">
                        Medical Officer of Health
                    </label>
                    <br/><br/>
                </div>
                
                <label className="form-label">Email: </label>
                <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                <br/>
                <label className="form-label">Contact Number: </label>
                <input type="text" className="form-control" value={this.state.contactNo} onChange={this.onChangeContactNo} />
                <br/>
                <label className="form-label">Username: </label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                <br/>
                <label className="form-label">Password: </label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                <br/>
                <label className="form-label">Location: </label>
                <select className="form-control" value={this.state.location} onChange={this.onChangeLocation}>
                            {
                                this.state.locations.map(function(location) {
                                    return <option value={location.locationId}>
                                        {location.name}
                                    </option>;
                                })
                            }
                </select>

                <br/>

                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add User</button>
                <br/><br/><br/>
                
            </div>
        );
    }
}
