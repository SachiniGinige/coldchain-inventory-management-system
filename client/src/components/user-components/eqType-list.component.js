import React, { Component } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

const EqType = props => (
    <tr>
        <td>{props.type.equipmentId}</td>
        <td>{props.type.name}</td>
    </tr>
)

export default class EqTypeListUser extends Component{
    
    constructor(props){
        super(props);
        
        this.state = { types: [] };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/eqtypes/get')
            .then(response => {
                console.log(response);
                this.setState({
                    types: response.data
                })    
            })
            .catch((error) =>{
                console.log(error);
            })
    }
    
    eqTypeList() {
        return this.state.types.map( currenttype => {
            return <EqType type={currenttype} key={currenttype.id}/>
        })
    }

    render() {
        return(
            <div className="EqTypeList">
                <h3>Equipment Types</h3><br/>
                <div className="table-responsive">
                    {/* table of all equipment types */}
                    <Table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Equipment ID</th>
                                <th>Equipment Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.eqTypeList()}
                        </tbody>
                    </Table>
                </div>
                <br/><br/>
            </div>
        );
    }
}