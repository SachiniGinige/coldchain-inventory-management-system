import React, { Component } from "react";
import axios from "axios";

export default class EditAgent extends Component{
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

    componentDidMount(){
        axios.get(`http://localhost:3001/agents/get/${this.props.match.params.id}`)
            .then(response => { 
                console.log(this.props.match);
                console.log(response);               
                this.setState({
                    name: response.data.name,
                    contactPerson: response.data.contactPerson,
                    contactNo: response.data.contactNo,
                    email: response.data.email,
                    address: response.data.address
                })    
            })
            .catch(function(error){
                console.log(error);
            })
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
            contactPerson: this.state.contactPerson,
            contactNo:  this.state.contactNo,
            email:  this.state.email,
            address:  this.state.address
        }

        console.log(agent);

        axios.put(`http://localhost:3001/agents/update/${this.props.match.params.id}`, agent)
            .then(res => console.log(res.data));
        
        alert("Agent edited");        
        window.location = '../agents';
        
    }

    render() {
        return(
            // edit agent form
            <div className="form" id="Edit Agent Form">
                <h3>Edit Agent</h3><br/>
                
                <label className="form-label">Name: </label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                <br/>                                  
                <label className="form-label">Contact Person: </label>
                <input type="email" className="form-control" value={this.state.contactPerson} onChange={this.onChangeContactPerson} />
                <br/>
                <label className="form-label">Contact Number: </label>
                <input type="text" className="form-control" value={this.state.contactNo} onChange={this.onChangeContactNo} />
                <br/>
                <label className="form-label">Email Address: </label>
                <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required/>
                <br/>
                <label className="form-label">Address: </label>
                <input type="text" className="form-control" value={this.state.address} onChange={this.onChangeAddress} required/>
                <br/>       
                
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Edit Agent</button>
                <br/><br/><br/>    
            </div>
        );
    }
}
