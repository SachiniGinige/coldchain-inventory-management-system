import React, { Component } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

const Model = props => (
    <tr>
        <td>{props.eqmodel.modelId}</td>
        <td>{props.eqmodel.model}</td>
        <td>{props.eqmodel.eqtype}</td>
        <td>{props.eqmodel.agent}</td>
    </tr>
)

export default class ModelListUser extends Component{
    
    constructor(props){
        super(props);

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
            return <Model eqmodel={currenteqmodel} key={currenteqmodel.id}/>
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