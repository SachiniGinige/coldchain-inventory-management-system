import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Table from 'react-bootstrap/Table';

const User = props => (
    <tr>
        <td>{props.user.userId}</td>
        <td>{props.user.name}</td>
        <td>{props.user.designation}</td>
        <td>{props.user.email}</td>
        <td>{props.user.contactNo}</td>
        <td>{props.user.location}</td>
        <td>
            <Link to={"./user-edit/"+props.user.userId}>edit</Link>
             |<a href="./users" onClick={() => {props.deleteUser(props.user.userId)}}> delete</a>
        </td>
    </tr>
)

export default class UserList extends Component{
    
    constructor(props){
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        this.onChangeDesignation = this.onChangeDesignation.bind(this);
        
        this.state = { 
            users: [],
            designation: '',
            searchTerm: '' 
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/users/get-table/')
        // axios.get('http://localhost:8080/users/')
            .then(response => {
                this.setState({
                    users: response.data
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
    onChangeDesignation(e){
        this.setState({
            designation: e.target.value
        });
    }

    deleteUser(id) {

        alert("Are you sure you want to delete User No. "+id+"?");

        axios.delete(`http://localhost:3001/users/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el.userId !==id)
        })
    }
    
    userList() {
        return this.state.users.filter((val)=>{
            if(this.state.searchTerm===''){
                if((val.designation===this.state.designation)||(this.state.designation===''))
                    {return val; }}
            else if(val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                if((val.designation===this.state.designation)||(this.state.designation===''))
                    {return val; }}
            else if(val.designation.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                if((val.designation===this.state.designation)||(this.state.designation===''))
                    {return val; }}
            else if(val.location.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                if((val.designation===this.state.designation)||(this.state.designation===''))
                    {return val; }} // eslint-disable-next-line
            else if(val.userId==(this.state.searchTerm)){
                if((val.designation===this.state.designation)||(this.state.designation===''))
                    {return val; }}
            return null;
        }).map( currentuser => {
            return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser.id}/>
        })
    }

    render() {
        return(
            <div className="UserList">
                <h3>Users</h3>
                <div className="searchbarContainer" >
                    <div className="row">
                        <div className="col-md-auto searchbarCol">
                            <div className="filterDiv">
                                <label className="form-label filter-label" htmlFor="filter1">Designation </label>
                                <select className="filter-select" id="filter1" value={this.state.designation} onChange={this.onChangeDesignation}>
                                    <option value="Epidemiologist">
                                        Epidemiologist  
                                    </option>
                                    <option value="RE">
                                        RE
                                    </option>
                                    <option value="MOH">
                                        MOH
                                    </option>
                                    <option value="">
                                        - - - - - - - - - - - - -
                                    </option>
                                </select><br/>
                            </div>
                        </div>
                        <div className="col searchbarCol"></div>
                        <div className="col-md-auto searchbarCol">
                            <br/>
                            <input type="text" className="form-control searchbar" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..."/><br/>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    {/* table of all users */}
                    <Table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>Designation</th>
                                <th>Email</th>
                                <th>Contact No.</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.userList()}
                        </tbody>
                    </Table>
                </div>
                <br/><br/><br/>
                <a className="btn btn-outline-primary" href="./user-add"> Add User</a>
            </div>
        );
    }
}