import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Table from 'react-bootstrap/Table';
import editIcon from './img/edit.png';
import deleteIcon from './img/delete.png';

const Record = props => (
    <tr>
        {/* <td>{props.record.recordId}</td> */}
        <td>{props.record.date.toString().substring(0,10)}</td>
        <td>{props.record.status}</td>
        <td>{props.record.description}</td>
        <td>{props.record.itemId}</td>
        <td>{props.record.maintenanceAgentId}</td>
        <td>{new Date(props.record.updatedDate).toLocaleString('en',{ timeZone: 'Asia/Colombo' })}</td>
        <td>
            <Link to={"./maintenancerec-edit/"+props.record.recordId}><img src={editIcon} className="shortcutIcon" alt=""/></Link>
             |<a href="./maintenancerec" onClick={() => {props.deleteRecord(props.record.recordId)}}><img src={deleteIcon} className="shortcutIcon" alt="" /></a>
        </td>
    </tr>
)

export default class MaintenaceRecordList extends Component{
    
    constructor(props){
        super(props);

        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            records: [] ,
            searchTerm: ''
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/maintenancerec/get/')
            .then(response => {
                this.setState({
                records: response.data
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
    
    deleteRecord(id) {

        alert("Are you sure you want to delete Maintenance Record Entry No. "+id+"?");

        axios.delete(`http://localhost:3001/maintenancerec/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            records: this.state.records.filter(el => el.userId !==id)
        })
    }

    requestList() {
        return this.state.records.filter((val)=>{
            if(this.state.searchTerm==='')
                {return val;}                        
            else if(val.date.includes(this.state.searchTerm))
                {return val;} // eslint-disable-next-line
            else if(val.recordId==(this.state.searchTerm))
                {return val;} // eslint-disable-next-line
            else if(val.itemId==(this.state.searchTerm))
                    {return val;}
            // else if(val.maintenanceAgent.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            //     {return val;}
            return null;
        }).map( currentrecord => {
            return <Record record={currentrecord} deleteRecord={this.deleteRecord} key={currentrecord.recordId}/>
        })
    }

    render() {
        return(
            <div className="RequestList">
                <h3>Maintenance Records</h3>
                <div className="searchbarContainer" >
                    <div className="row">
                        <div className="col searchbarCol"></div>
                        <div className="col-md-auto searchbarCol">
                            <input type="text" className="form-control searchbar" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..."/><br/>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <Table className="table table-striped table-bordered table-hover">
                        <thead style={{textAlign: "center"}}>
                            <tr>
                                {/* <th>Request ID</th> */}
                                <th>Sent Date</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Item ID</th>
                                <th>Maintenance Agent</th>
                                <th>Updated Date</th>
                                <th style={{ minWidth: 80 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.requestList()}
                        </tbody>
                    </Table>
                </div>    
                <br/><br/><br/>
                <a className="btn btn-outline-primary" href="./maintenancerec-add"> Add Maintenance Record Entry</a>
            </div>
        );
    }
}