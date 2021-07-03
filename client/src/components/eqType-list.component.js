import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Table from 'react-bootstrap/Table';

const EqType = props => (
    <tr>
        <td>{props.type.equipmentId}</td>
        <td>{props.type.name}</td>
        <td>
            <Link to={"./eqtype-edit/"+props.type.equipmentId}>edit</Link>
             |<a href="./eqtype" onClick={() => {props.deleteEqType(props.type.equipmentId)}}> delete</a>
        </td>
    </tr>
)

export default class EqTypeList extends Component{
    
    constructor(props){
        super(props);

        this.deleteEqType = this.deleteEqType.bind(this);
        
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

    deleteEqType(id) {

        alert("Are you sure you want to delete Equipment Type No. "+id+"?");

        axios.delete(`http://localhost:3001/eqtypes/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            types: this.state.types.filter(el => el.equipmentId !==id)
        })
    }
    
    eqTypeList() {
        return this.state.types.map( currenttype => {
            return <EqType type={currenttype} deleteEqType={this.deleteEqType} key={currenttype.id}/>
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
                                <th>Actions</th>
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