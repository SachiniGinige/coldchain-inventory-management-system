import React, { Component } from "react";
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
    </tr>
)

export default class LocationListUser extends Component{
    
    constructor(props){
        super(props);
        
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
    
    locationList() {
        return this.state.locations.map( currentlocation => {
            return <Location location={currentlocation} key={currentlocation.id}/>
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.locationList()}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}