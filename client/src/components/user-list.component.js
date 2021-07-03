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
        
        this.state = { users: [] };
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

    deleteUser(id) {

        alert("Are you sure you want to delete User No. "+id+"?");

        axios.delete(`http://localhost:3001/users/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el.userId !==id)
        })
    }
    
    userList() {
        return this.state.users.map( currentuser => {
            return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser.id}/>
        })
    }

    render() {
        return(
            <div className="UserList">
                <h3>Users</h3><br/>
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