import React, { Component } from "react";
import axios from "axios";

export default class AddModel extends Component{
    constructor(props){
        super(props);

        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEqType=this.onChangeEqType.bind(this);
        this.onChangeSupplyAgent=this.onChangeSupplyAgent.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            name: '',  
            eqtype:'',
            eqtypes: [],
            supplyAgent:'',
            agents: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/eqtypes/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        eqtypes: response.data.map(eqtype=> eqtype),
                        eqtype: response.data[0].equipmentId
                    })
                }
            })
        axios.get('http://localhost:3001/agents/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        agents: response.data.map(agent=> agent),
                        supplyAgent: response.data[0].agentId
                    })
                }
            })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangeEqType(e){
        this.setState({
            eqtype: e.target.value
        });
    }
    onChangeSupplyAgent(e){
        this.setState({
            supplyAgent: e.target.value
        });
    }
    
    onSubmit(e){
        e.preventDefault();

        const eqmodel = {
            name:  this.state.name,
            eqtype:  this.state.eqtype,
            supplyAgent:  this.state.supplyAgent
        }

        console.log(eqmodel);

        axios.post('http://localhost:3001/models/add', eqmodel)
            .then(res => console.log(res.data));
        
        // alert("Equipment Model added");        
        window.location = './model';    
    }

    render() {
        return(
            // create equipment model form
            <div className="form" id="addModelForm">
                <h3>Add New Equipment Model</h3><br/>
                
                <label className="form-label">Model Name: </label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} required/>
                <br/> 
                <label className="form-label">Equipment Type: </label>
                <select className="form-control" value={this.state.eqtype} onChange={this.onChangeEqType}>
                            {
                                this.state.eqtypes.map(function(eqtype) {
                                    return <option value={eqtype.equipmentId}>
                                        {eqtype.name}
                                    </option>;
                                })
                            }
                </select><br/> 
                <label className="form-label">Supply Agent: </label>
                <select className="form-control" value={this.state.supplyAgent} onChange={this.onChangeSupplyAgent}>
                            {
                                this.state.agents.map(function(agent) {
                                    return <option value={agent.agentId}>
                                        {agent.name}
                                    </option>;
                                })
                            }
                </select><br/>                
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add Model</button>
                <br/><br/><br/>                
            </div>
        );
    }
}
