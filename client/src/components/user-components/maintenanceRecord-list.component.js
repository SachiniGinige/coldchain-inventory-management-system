import React, { Component } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

const Record = props => (
    <tr>
        {/* <td>{props.record.recordId}</td> */}
        <td>{props.record.date.toString().substring(0,10)}</td>
        <td>{props.record.status}</td>
        <td>{props.record.description}</td>
        <td>{props.record.itemId}</td>
        <td>{props.record.maintenanceAgentId}</td>
        <td>{new Date(props.record.updatedDate).toLocaleString('en',{ timeZone: 'Asia/Colombo' })}</td>
    </tr>
)

export default class MaintenaceRecordListUser extends Component{
    
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

    requestList() {
        return this.state.records.filter((val)=>{
            if(this.state.searchTerm==='')
                {return val;}                        
            if(val.date.includes(this.state.searchTerm))
                {return val;} // eslint-disable-next-line
            if(val.itemId==(this.state.searchTerm))
                {return val;}
            // else if(val.recordId==(this.state.searchTerm))
            //     {return val;} // eslint-disable-next-line            
            // else if(val.maintenanceAgent.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            //     {return val;}
            return null;
        }).map( currentrecord => {
            return <Record record={currentrecord}  key={currentrecord.recordId}/>
        })
    }

    render() {
        return(
            <div className="RecordList">
                <h3>Maintenance Records</h3>
                <div className="searchbarContainer" >
                    <div className="row">
                        <div className="col searchbarCol"></div>
                        <div className="col-md-auto searchbarCol">
                            <input type="text" className="form-control searchbar" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..."/><br/>
                        </div>
                    </div>
                </div>
                <div className="table-responsive" >
                    <Table className="table table-light table-bordered table-hover">
                        <thead>
                            <tr>
                                {/* <th>Request ID</th> */}
                                <th>Sent Date</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Item ID</th>
                                <th>Maintenance Agent</th>
                                <th>Updated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.requestList()}
                        </tbody>
                    </Table>
                </div>    
                <br/><br/>
                {sessionStorage.getItem("designation")==="MOH" ? 
                        (<span className="btnContainer"><a className="btn btn-outline-primary" href="./reqmaintenance-add">Add Maintenance Request </a></span>)
                        : (<span className="btnContainer"><a className="btn btn-outline-primary" href="./reqmaintenance"> Maintenance Requests </a></span>)}
                <br/>
            </div>
        );
    }
}