import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Table from 'react-bootstrap/Table';

const Request = props => (
    <tr>
        <td>{props.request.requestId}</td>
        <td>{props.request.date}</td>
        <td>{props.request.status}</td>
        <td>{props.request.description}</td>
        <td>{props.request.itemId}</td>
        <td>{props.request.sender}</td>
        <td>{props.request.receiver}</td>
        <td>
            <Link to={"./reqmaintenance-edit/"+props.request.requestId}>edit</Link>
             |<a href="./reqmaintenance" onClick={() => {props.deleteAgent(props.request.requestId)}}> delete</a>
        </td>
    </tr>
)

export default class MaintenaceRequestList extends Component{
    
    constructor(props){
        super(props);

        this.deleteRequest = this.deleteRequest.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            requests: [] ,
            searchTerm: ''
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/reqmaintenance/get/')
            .then(response => {
                this.setState({
                    requests: response.data
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

    deleteRequest(id) {

        alert("Are you sure you want to delete Maintenance Request No. "+id+"?");

        axios.delete(`http://localhost:3001/reqmaintenance/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            agents: this.state.requests.filter(el => el.requestId !==id)
        })
    }
    
    requestList() {
        return this.state.requests.filter((val)=>{
            if(this.state.searchTerm==='')
                {return val;}                        
            else if(val.date.includes(this.state.searchTerm))
                {return val;} // eslint-disable-next-line
            else if(val.requestId==(this.state.searchTerm))
                {return val;} // eslint-disable-next-line
            else if(val.itemId==(this.state.searchTerm))
                    {return val;}
            // else if(val.sender.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            //     {return val;}
            // else if(val.receiver.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
            //     {return val;} 
            return null;
        }).map( currentrequest => {
            return <Request request={currentrequest} deleteRequest={this.deleteRequest} key={currentrequest.id}/>
        })
    }

    render() {
        return(
            <div className="RequestList">
                <h3>Maintenance Requests</h3>
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
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Sent Date</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Item ID</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.requestList()}
                        </tbody>
                    </Table>
                </div>    
                <br/><br/><br/>
                <a className="btn btn-outline-primary" href="./agent-add"> Add Maintenance Request</a>
            </div>
        );
    }
}