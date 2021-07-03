import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Table from 'react-bootstrap/Table';

const Location = props => (
    <tr>
        <td>{props.location.locationId}</td>
        <td>{props.location.name}</td>
        {/* <td>{props.location.level}</td> */}
        <td>{props.location.address}</td>
        <td>{props.location.contactPerson}</td>
        <td>{props.location.contactNo1}</td>
        <td>{props.location.contactNo2}</td>
        <td>{props.location.status}</td>
        <td>
            <Link to={"./location-edit/"+props.location.locationId}>edit</Link>
             |<a href="./locations" onClick={() => {props.deleteLocation(props.location.locationId)}}> delete</a>
        </td>
    </tr>
)

export default class LocationList extends Component{
    
    constructor(props){
        super(props);

        this.deleteLocation = this.deleteLocation.bind(this);
        
        this.state = { locations: [] };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/locations/get/')
            .then(response => {
                this.setState({
                    locations: response.data
                })    
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteLocation(id) {

        alert("Are you sure you want to delete Location No. "+id+"?");

        axios.delete(`http://localhost:3001/locations/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            locations: this.state.locations.filter(el => el.locationId !==id)
        })
    }
    
    locationList() {
        return this.state.locations.map( currentlocation => {
            return <Location location={currentlocation} deleteLocation={this.deleteLocation} key={currentlocation.id}/>
        })
    }

    render() {
        return(
            <div className="LocationList">
                <h3>Locations</h3><br/>
                <div className="table-responsive">
                    <Table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Location ID</th>
                                <th>Location Name</th>
                                <th>Address</th>
                                <th>Contact Person</th>
                                <th>Contact No. 1</th>
                                <th>Contact No. 2</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.locationList()}
                        </tbody>
                    </Table>
                </div>
                <br/><br/><br/>
                <a className="btn btn-outline-primary" href="./location-add"> Add Location</a>
            </div>
        );
    }
}