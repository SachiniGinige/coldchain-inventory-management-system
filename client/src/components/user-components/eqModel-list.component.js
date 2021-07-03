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
        
        this.state = { eqmodels: [] };
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
    
    modelList() {
        return this.state.eqmodels.map( currenteqmodel => {
            return <Model eqmodel={currenteqmodel} key={currenteqmodel.id}/>
        })
    }

    render() {
        return(
            <div className="ModelList">
                <h3>Equipment Models</h3><br/>
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