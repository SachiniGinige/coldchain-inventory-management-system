import React, { Component } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

const Agent = props => (
    <tr>
        <td>{props.agent.agentId}</td>
        <td>{props.agent.name}</td>
        <td>{props.agent.contactPerson}</td>
        <td>{props.agent.contactNo}</td>
        <td>{props.agent.email}</td>
        <td>{props.agent.address}</td>
    </tr>
)

export default class AgentListUser extends Component{
    
    constructor(props){
        super(props);
        
        this.state = { agents: [] };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/agents/get/')
            .then(response => {
                this.setState({
                    agents: response.data
                })    
            })
            .catch((error) =>{
                console.log(error);
            })
    }
    
    agentList() {
        return this.state.agents.map( currentagent => {
            return <Agent agent={currentagent} key={currentagent.id}/>
        })
    }

    render() {
        return(
            <div className="AgentList">
                <h3>Agents</h3><br/>
                <div className="table-responsive">
                    <Table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Agent ID</th>
                                <th>Agent Name</th>
                                <th>Contact Person</th>
                                <th>Contact No. </th>
                                <th>Email Address</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.agentList()}
                        </tbody>
                    </Table>
                </div>    
            </div>
        );
    }
}