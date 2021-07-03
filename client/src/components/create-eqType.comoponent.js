import React, { Component } from "react";
import axios from "axios";

export default class AddEqType extends Component{
    constructor(props){
        super(props);

        this.onChangeName=this.onChangeName.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            name: '',  
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
    
    onSubmit(e){
        e.preventDefault();

        const eqtype = {
            name:  this.state.name,
        }

        console.log(eqtype);

        axios.post('http://localhost:3001/eqtypes/add', eqtype)
            .then(res => console.log(res.data));
        
        // alert("Equipment Type added");        
        window.location = './eqtype';    
    }

    render() {
        return(
            // create equipment type form
            <div className="form" id="addEqTypeForm">
                <h3>Add New Equipment Type</h3><br/>
                
                <label className="form-label">Equipment Type: </label>
                <input type="text" required className="form-control" value={this.state.name} onChange={this.onChangeName}/>
                <br/>                
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add Equipment Type</button>
                <br/><br/><br/>                
            </div>
        );
    }
}
