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

        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            locations: [] ,
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
            return <Location location={currentlocation} key={currentlocation.id}/>
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
                                <th>Additional Contact No. 2</th>
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