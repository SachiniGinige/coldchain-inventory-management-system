import React, { Component } from "react";
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
    </tr>
)

export default class UserListUser extends Component{
    
    constructor(props){
        super(props);
        
        this.state = { users: [] };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/users/get-table/')
            .then(response => {
                this.setState({
                    users: response.data
                })    
            })
            .catch((error) =>{
                console.log(error);
            })
    }
    
    userList() {
        return this.state.users.map( currentuser => {
            return <User user={currentuser} key={currentuser.id}/>
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.userList()}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}