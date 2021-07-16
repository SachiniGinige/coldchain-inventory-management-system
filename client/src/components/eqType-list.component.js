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
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            types: [] ,
            searchTerm: ''
        };
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
    onChangeSearchTerm(e){
        this.setState({
            searchTerm: e.target.value
        });
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
        return this.state.types.filter((val)=>{
            if(this.state.searchTerm==='')
                {return val;}                        
            else if(val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;} 
            return null;
        }).map( currenttype => {
            return <EqType type={currenttype} deleteEqType={this.deleteEqType} key={currenttype.id}/>
        })
    }

    render() {
        return(
            <div className="EqTypeList">
                <h3>Equipment Types</h3>
                <div className="searchbarContainer" >
                    <div className="row">
                        <div className="col searchbarCol"></div>
                        <div className="col-md-auto searchbarCol">
                            <input type="text" className="form-control searchbar" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..."/><br/>
                        </div>
                    </div>
                </div>
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