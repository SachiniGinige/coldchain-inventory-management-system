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
            locations: [],

            nameErr: '',
            designationErr: '',
            emailErr: '',
            contactNoErr: '',
            usernameErr: '',
            passwordErr: '',
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
        this.validateName(e.target.value);
    }
    onChangeDesignation(e){
        this.setState({
            designation: e.target.value
        });
        this.validateDesignation(e.target.value);
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
        this.validateEmail(e.target.value);
    }
    onChangeContactNo(e){
        this.setState({
            contactNo: e.target.value
        });
        this.validateContactNo(e.target.value);
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
        this.validateUsername(e.target.value);
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
        this.validatePassword(e.target.value);
    }
    onChangeLocation(e){
        this.setState({
            location: e.target.value
        });
    }

    validateName(val){
        if(!val){
            this.setState({
                nameErr: '*Required field'
            });
            return false;
        }
        else if(!val.match(/^[a-zA-Z]+( [a-zA-Z]+)*$/)){
            this.setState({
                nameErr: '*Invalid format for Name'
            });
            return false;
        }
        else{
            this.setState({
                nameErr: ''
            });
            return true;
        }
    }
    
    validateDesignation(val){
        if(!val){
            this.setState({
                designationErr: '*Required field'
            });
            return false;
        }
        else{
            this.setState({
                designationErr: ''
            });
            return true;
        }
    }

    validateEmail(val){
        if(!val){
            this.setState({
                emailErr: '*Required field'
            });
            return false;
        }
        else if(!val.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            this.setState({
                emailErr: '*Enter a valid email address'
            });
            return false;
        }
        else{
            this.setState({
                emailErr: ''
            });
            return true;
        }
    }
    validateContactNo(val){
        if(!val){
            this.setState({
                contactNoErr: '*Required field'
            });
            return false;
        }
        else if(!((val.match(/^[0-9]{10}$/))||(val.match(/^\+[0-9]{11}$/)))){
            this.setState({
                contactNoErr: '*Enter a valid telephone number. Must contain 10 digits'
            });
            return false;
        }
        else{
            this.setState({
                contactNoErr: ''
            });
            return true;
        }
    }
    validateUsername(val){
        if(!val){
            this.setState({
                usernameErr: '*Required field'
            });
            return false;
        }
        else if((!val.match(/^[a-zA-Z0-9]{4,}$/))){
            this.setState({
                usernameErr: '*Must contain at least 4 characters'
            });
            return false;
        }
        else{
            this.setState({
                usernameErr: ''
            });
            return true;
        }
    }
    validatePassword(val){
        if(!val){
            this.setState({
                passwordErr: '*Required field'
            });
            return false;
        }
        else if((!val.match(/^.{6,}$/))){
            this.setState({
                passwordErr: '*Must contain at least 6 characters'
            });
            return false;
        }
        else{
            this.setState({
                passwordErr: ''
            });
            return true;
        }
    }



    validateForm(){
        // if(((this.state.nameErr)||(this.state.designationErr)||(this.state.emailErr)||(this.state.contactNoErr)||
        // (this.state.nameErr)||(this.state.usernameErr)||(this.state.passwordErr))||((!this.state.name))){
        //     console.log("Please check form input");
        //     return false;
        // }

        this.validateName(this.state.name);
        this.validateDesignation(this.state.designation);
        this.validateEmail(this.state.email);
        this.validateContactNo(this.state.contactNo);
        this.validateUsername(this.state.username);
        this.validatePassword(this.state.password);
        if((this.validateName(this.state.name)&&this.validateDesignation(this.state.designation)&&this.validateEmail(this.state.email)&&this.validateContactNo(this.state.contactNo)
                    &&this.validateUsername(this.state.username)&&this.validatePassword(this.state.password))===false){
            // this.setState({
            //     errorMsg: 'Please check form input'
            // });
            alert('Please check form input');
            return false;
        } 
        // this.setState({
        //     errorMsg: ''
        // });
        return true;
    }

    onSubmit(e){
        e.preventDefault();

        const isValid = this.validateForm();

        if(isValid){
        
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
    }

    render() {
        return(
            // edit user form
            <div className="form" id="editUserForm">
                <h3>Edit User</h3><br/>
                
                <label className="form-label">Name: </label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                <div class="formError">{this.state.nameErr}</div> <br/>
                
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
                    <div class="formError">{this.state.designationErr}</div> <br/><br/>
                </div>
                
                <label className="form-label">Email: </label>
                <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                <div class="formError">{this.state.emailErr}</div> <br/>
                <label className="form-label">Contact Number: </label>
                <input type="text" className="form-control" value={this.state.contactNo} onChange={this.onChangeContactNo} />
                <div class="formError">{this.state.contactNoErr}</div> <br/>
                <label className="form-label">Username: </label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                <div class="formError">{this.state.usernameErr}</div> <br/>
                <label className="form-label">Password: </label>
                <input type="text" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                <div class="formError">{this.state.passwordErr}</div> <br/>
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
