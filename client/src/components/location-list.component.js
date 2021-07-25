import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Table from 'react-bootstrap/Table';
import editIcon from './img/edit.png';
import deleteIcon from './img/delete.png';

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
        <td style={{textAlign: "center"}}>
            <Link to={"./location-edit/"+props.location.locationId}><img src={editIcon} className="shortcutIcon" alt=""/></Link>
             |<a href="./locations" onClick={() => {props.deleteLocation(props.location.locationId,props.location.level)}}><img src={deleteIcon} className="shortcutIcon" alt=""/></a>
        </td>
    </tr>
)

export default class LocationList extends Component{
    
    constructor(props){
        super(props);

        this.deleteLocation = this.deleteLocation.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            locations: [],
            searchTerm: ''
        };
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

    onChangeSearchTerm(e){
        this.setState({
            searchTerm: e.target.value
        });
    }

    deleteLocation(id,level) {

        alert("Are you sure you want to delete Location No. "+id+"?");

        axios.delete(`http://localhost:3001/locations/delete/${id}`)
            .then(res => console.log(res.data));

        if(level==="Divisional"){
            axios.delete(`http://localhost:3001/divisional-locations/delete/${id}`)
                .then(res => console.log(res.data));
        }
        
        this.setState({
            locations: this.state.locations.filter(el => el.locationId !==id)
        })
    }
    
    locationList() {
        return this.state.locations.filter((val)=>{
            if(this.state.searchTerm==='')
                {return val;}
            else if(val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;}
            else if(val.address.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;}
            else if(val.contactPerson.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;}
            else if(val.status.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;}
            return null;
        }).map( currentlocation => {
            return <Location location={currentlocation} deleteLocation={this.deleteLocation} key={currentlocation.id}/>
        })
    }

    render() {
        return(
            <div className="LocationList">
                <h3>Locations</h3>
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
                                <th>Location ID</th>
                                <th>Location Name</th>
                                <th>Address</th>
                                <th>Contact Person</th>
                                <th>Contact No.</th>
                                <th>Additional Contact No.</th>
                                <th>Status</th>
                                <th style={{ minWidth: 100 }}>Actions</th>
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