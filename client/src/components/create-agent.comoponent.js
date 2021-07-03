import React, { Component } from "react";
import axios from "axios";

export default class AddAgent extends Component{
    constructor(props){
        super(props);

        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeContactPerson=this.onChangeContactPerson.bind(this);
        this.onChangeContactNo=this.onChangeContactNo.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeAddress=this.onChangeAddress.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            name: '',
            contactPerson: '',
            contactNo: '',
            email: '',
            address: '',  
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangeContactPerson(e){
        this.setState({
            contactPerson: e.target.value
        });
    }
    onChangeContactNo(e){
        this.setState({
            contactNo: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }
    
    onSubmit(e){
        e.preventDefault();

        const agent = {
            name:  this.state.name,
            contactPerson:  this.state.contactPerson,
            contactNo:  this.state.contactNo,
            email:  this.state.email,
            address:  this.state.address,
        }

        console.log(agent);

        axios.post('http://localhost:3001/agents/add', agent)
            .then(res => console.log(res.data));
        
        // alert("Agent added");        
        window.location = './agents';    
    }

    render() {
        return(
            // create equipment type form
            <div className="form" id="addAgentForm">
                <h3>Add New Agent</h3><br/>
                
                <label className="form-label">Agent Name: </label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} required/>
                <br/>
                <label className="form-label">Contact Person: </label>
                <input type="text" className="form-control" value={this.state.contactPerson} onChange={this.onChangeContactPerson} required/>
                <br/>
                <label className="form-label">Contact No: </label>
                <input type="text" className="form-control" value={this.state.contactNo} onChange={this.onChangeContactNo} required/>
                <br/>
                <label className="form-label">Email Address: </label>
                <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required/>
                <br/>
                <label className="form-label">Address: </label>
                <input type="text" className="form-control" value={this.state.address} onChange={this.onChangeAddress} required/>
                <br/>                
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add Agent</button>
                <br/><br/><br/>                
            </div>
        );
    }
}
