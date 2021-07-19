import React, { Component } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

const Request = props => (
    <tr>
        <td>{props.request.requestId}</td>
        <td>{new Date(props.request.date).toLocaleString('en',{ timeZone: 'Asia/Colombo' })}</td>
        <td>{props.request.status}</td>
        <td>{props.request.description}</td>
        <td>{props.request.itemId}</td>
        <td>{props.request.sender}</td>
    </tr>
)

export default class MaintenaceRequestListUser extends Component{
    
    constructor(props){
        super(props);

        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            requests: [] ,
            searchTerm: ''
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/reqmaintenance/get-table/')
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
    
    requestList() {
        return this.state.requests.filter((val)=>{
            if(sessionStorage.getItem("username")===val.receiver){
                if(this.state.searchTerm==='')
                    {return val;}                        
                if(val.date.includes(this.state.searchTerm))
                    {return val;} // eslint-disable-next-line
                if(val.requestId==(this.state.searchTerm))
                    {return val;} // eslint-disable-next-line
                if(val.itemId==(this.state.searchTerm))
                    {return val;}
                if(val.sender.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                    {return val;}
                return null;
            }
            return null;
            
        }).map( currentrequest => {
            return <Request request={currentrequest} key={currentrequest.id}/>
        })
    }

    render() {
        return(
            <div className="RequestList">
                <h3>My Maintenance Requests</h3>
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
                                <th>Sent Date/Time</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Item ID</th>
                                <th>Sender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.requestList()}
                        </tbody>
                    </Table>
                </div>    
                <br/><br/><br/>
                <a className="btn btn-outline-primary" href="./reqmaintenance-add"> Add Maintenance Request</a>
            </div>
        );
    }
}