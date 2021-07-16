import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Table from 'react-bootstrap/Table';

const Model = props => (
    <tr>
        <td>{props.eqmodel.modelId}</td>
        <td>{props.eqmodel.model}</td>
        <td>{props.eqmodel.eqtype}</td>
        <td>{props.eqmodel.agent}</td>
        <td>
            <Link to={"./model-edit/"+props.eqmodel.modelId}>edit</Link>
             |<a href="./model" onClick={() => {props.deleteModel(props.eqmodel.modelId)}}> delete</a>
        </td>
    </tr>
)

export default class ModelList extends Component{
    
    constructor(props){
        super(props);

        this.deleteModel = this.deleteModel.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            eqmodels: [] ,
            searchTerm: ''
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/models/get-table')
            .then(response => {
                console.log(response);
                this.setState({
                    eqmodels: response.data
                })    
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    onChangeSearchTerm(e){
        this.setState({
            searchTerm: e.target.value
        });
    }

    deleteModel(id) {

        alert("Are you sure you want to delete Model No. "+id+"?");

        axios.delete(`http://localhost:3001/models/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            eqmodels: this.state.eqmodels.filter(el => el.modelId !==id)
        })
    }
    
    modelList() {
        return this.state.eqmodels.filter((val)=>{
            if(this.state.searchTerm==='')
                {return val;}                        
            else if(val.model.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;}
            else if(val.eqtype.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;} 
            else if(val.agent.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;} 
            return null;
        }).map( currenteqmodel => {
            return <Model eqmodel={currenteqmodel} deleteModel={this.deleteModel} key={currenteqmodel.id}/>
        })
    }

    render() {
        return(
            <div className="ModelList">
                <h3>Equipment Models</h3>
                <div className="searchbarContainer" >
                    <div className="row">
                        <div className="col searchbarCol"></div>
                        <div className="col-md-auto searchbarCol">
                            <input type="text" className="form-control searchbar" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..."/><br/>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    {/* table of all equipment models */}
                    <Table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Model ID</th>
                                <th>Model Name</th>
                                <th>Equipment Type</th>
                                <th>Supply Agent</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.modelList()}
                        </tbody>
                    </Table>
                </div>
                <br/><br/>
            </div>
        );
    }
}