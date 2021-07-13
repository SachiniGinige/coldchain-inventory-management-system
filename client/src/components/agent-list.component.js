import React, { Component } from "react";
import {Link} from 'react-router-dom';
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
        <td>
            <Link to={"./agent-edit/"+props.agent.agentId}>edit</Link>
             |<a href="./agents" onClick={() => {props.deleteAgent(props.agent.agentId)}}> delete</a>
        </td>
    </tr>
)

export default class AgentList extends Component{
    
    constructor(props){
        super(props);

        this.deleteAgent = this.deleteAgent.bind(this);
        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            agents: [] ,
            searchTerm: ''
        };
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
    onChangeSearchTerm(e){
        this.setState({
            searchTerm: e.target.value
        });
    }

    deleteAgent(id) {

        alert("Are you sure you want to delete Agent No. "+id+"?");

        axios.delete(`http://localhost:3001/agents/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            agents: this.state.agents.filter(el => el.agentId !==id)
        })
    }
    
    agentList() {
        return this.state.agents.filter((val)=>{
            if(this.state.searchTerm==='')
                {return val;}
            else if(val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;}
            return null;
        }).map( currentagent => {
            return <Agent agent={currentagent} deleteAgent={this.deleteAgent} key={currentagent.id}/>
        })
    }

    render() {
        return(
            <div className="AgentList">
                <h3>Agents</h3>
                <div className="searchbarContainer" >
                    <input type="text" className="form-control searchbar" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..."/><br/>
                </div>
                <div className="table-responsive">
                    <Table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Agent ID</th>
                                <th>Agent Name</th>
                                <th>Contact Person</th>
                                <th>Contact No. </th>
                                <th>Email Address</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.agentList()}
                        </tbody>
                    </Table>
                </div>    
                <br/><br/><br/>
                <a className="btn btn-outline-primary" href="./agent-add"> Add Agent</a>
            </div>
        );
    }
}