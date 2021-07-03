import React, { Component } from "react";
import axios from "axios";

export default class EditUser extends Component{
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
        axios.get(`http://localhost:3001/users/get/${this.props.match.params.id}`)
            .then(response => { 
                console.log(this.props.match);
                console.log(response);               
                this.setState({
                    //if res.json(result) or res.send(result) is used in server>index.js
                    // name: response.data[0].name,

                    //if res.json(result[0]) or res.send(result[0]) is used in server>index.js
                    name: response.data.name,
                    designation: response.data.designation,
                    email: response.data.email,
                    contactNo: response.data.contactNo,
                    username: response.data.username,
                    password: response.data.password,
                    location: response.data.locationId
                })    
            })
            .catch(function(error){
                console.log(error);
            })

        axios.get('http://localhost:3001/locations/get/')
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    locations: response.data.map(location=> location)
                })
            }
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
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

        axios.put(`http://localhost:3001/users/update/${this.props.match.params.id}`, user)
            .then(res => console.log(res.data));
        
        alert("User edited");        
        window.location = '../users';
        
    }

    render() {
        return(
            // edit user form
            <div className="form" id="editUserForm">
                <h3>Edit User</h3><br/>
                
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
                <input type="text" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
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

                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Edit User</button>
                <br/><br/><br/>
                
            </div>
        );
    }
}
