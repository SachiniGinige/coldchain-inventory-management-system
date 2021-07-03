import React, { Component } from "react";
import axios from "axios";

export default class AddItem extends Component{
    constructor(props){
        super(props);

        this.onChangeDateProcured=this.onChangeDateProcured.bind(this);
        this.onChangeProductionYear=this.onChangeProductionYear.bind(this);
        this.onChangeShelfLife=this.onChangeShelfLife.bind(this);
        this.onChangeManufacturer=this.onChangeManufacturer.bind(this);
        this.onChangeFunctionalStatus=this.onChangeFunctionalStatus.bind(this);
        this.onChangeEqType=this.onChangeEqType.bind(this);
        this.onChangeModel=this.onChangeModel.bind(this);
        this.onChangeLocation=this.onChangeLocation.bind(this);
        this.onChangeSupplyAgent=this.onChangeSupplyAgent.bind(this);
        this.onChangeMaintenanceAgent=this.onChangeMaintenanceAgent.bind(this);

        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            dateProcured: '',
            productionYear: null,
            shelfLife: '',
            manufacturer: '',
            functionalStatus: '',
            eqtype: '',
            eqtypes: [],
            model: '',
            models: [],
            location: '',
            locations: [],
            supplyAgent: null,
            maintenanceAgent: null,
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
        axios.get('http://localhost:3001/models/getbyeq/'+1)
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        models: response.data.map(model=> model),
                        model: response.data[0].name
                    })
                }
            })
        axios.get('http://localhost:3001/locations/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        locations: response.data.map(location=> location),
                        location: response.data[0].locationId
                    })
                }
            })
        axios.get('http://localhost:3001/agents/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        agents: response.data.map(agent=> agent),
                        maintenanceAgent: response.data[0].agentId,
                        supplyAgent: response.data[0].agentId
                    })
                }
            })
    }

    onChangeDateProcured(e){
        this.setState({
            dateProcured: e.target.value
        });
    }
    onChangeProductionYear(e){
        this.setState({
            productionYear: e.target.value
        });
    }
    onChangeShelfLife(e){
        this.setState({
            shelfLife: e.target.value
        });
    }
    onChangeManufacturer(e){
        this.setState({
            manufacturer: e.target.value
        });
    }
    onChangeFunctionalStatus(e){
        this.setState({
            functionalStatus: e.target.value
        });
    }
    onChangeEqType(e){
        this.setState({
            eqtype: e.target.value
        });

        axios.get('http://localhost:3001/models/getbyeq/'+e.target.value)
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    models: response.data.map(model=> model),
                    model: response.data[0].name
                })
            }
        })
    }
    onChangeModel(e){
        this.setState({
            model: e.target.value
        });

        axios.get('http://localhost:3001/models/getagent/'+e.target.value)
        .then(response => {
                console.log("getbymodel agent: "+response.data.supplyAgentId);
                this.setState({
                    supplyAgent:response.data.supplyAgentId,
                    maintenanceAgent:response.data.supplyAgentId
                })             
        });
    }
    onChangeLocation(e){
        this.setState({
            location: e.target.value
        });
    }
    onChangeSupplyAgent(e){
        this.setState({
            supplyAgent: e.target.value
        });
    }
    onChangeMaintenanceAgent(e){
        this.setState({
            maintenanceAgent: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const eqitem = {
            dateProcured:  this.state.dateProcured,
            productionYear: this.state.productionYear,
            shelfLife:  this.state.shelfLife,
            manufacturer:  this.state.manufacturer,
            functionalStatus:  this.state.functionalStatus,
            eqtype:  this.state.eqtype,
            model:  this.state.model,
            location:  this.state.location,
            supplyAgent: this.state.supplyAgent,
            maintenanceAgent: this.state.maintenanceAgent
        }

        console.log(eqitem);

        axios.post('http://localhost:3001/eqitems/add', eqitem)
            .then(res => console.log(res.data));
        
        alert("Item added");        
        window.location = './equipment';    
    }

    render() {
        return(
            // create equipment item form
            <div className="form" id="addItemForm">
                <h3>Add New Item</h3><br/>
                
                <label className="form-label">Procured Date: </label>
                <input type="date" className="form-control" value={this.state.dateProcured} onChange={this.onChangeDateProcured} required/>
                <br/>
                <label className="form-label">Production Year: </label>
                <input type="text" className="form-control"  value={this.state.productionYear} onChange={this.onChangeProductionYear} />
                <br/>
                <label className="form-label">Shelf life: </label>
                <input type="text" className="form-control" value={this.state.shelfLife} onChange={this.onChangeShelfLife} />
                <br/>
                <label className="form-label">Manufacturer: </label>
                <input type="text" className="form-control" value={this.state.manufacturer} onChange={this.onChangeManufacturer} />
                <br/>
                <label className="form-label">Current Functional Status: </label>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        id="funcStatus1" 
                        value="functional" 
                        checked={this.state.functionalStatus === "functional"}
                        onChange={this.onChangeFunctionalStatus}
                    />
                    <label className="form-check-label" for="funcStatus1">
                        Functional
                    </label>
                    <br/>
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        id="funcStatus2" 
                        value="non-functional" 
                        checked={this.state.functionalStatus === "non-functional"}
                        onChange={this.onChangeFunctionalStatus}
                    />
                    <label className="form-check-label" for="funcStatus2">
                        Non-functional
                    </label>
                    <br/><br/>
                </div>
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
                </select>
                <br/>

                <label className="form-label">Model: </label>
                <select className="form-control" value={this.state.model} onChange={this.onChangeModel} >
                            {
                                this.state.models.map(function(model) {
                                    return <option value={model.name}>
                                        {model.name}
                                    </option>;
                                })
                            }
                </select>
                <br/>

                <label className="form-label">Location: </label>
                <select className="form-control" value={this.state.location} onChange={this.onChangeLocation}>
                            {
                                this.state.locations.map(function(location) {
                                    return <option value={location.locationId}>
                                        {location.name}
                                    </option>;
                                })
                            }
                </select>
                <br/>

                <label className="form-label">Supply Agent: </label>
                <select type="text" className="form-control" value={this.state.supplyAgent} onChange={this.onChangeSupplyAgent}>
                            {
                                this.state.agents.map(function(agent) {
                                    return <option value={agent.agentId}>
                                        {agent.name}
                                    </option>;
                                })
                            }
                </select>
                <br/>
                <label className="form-label">Maintenance Agent: </label>
                <select className="form-control" value={this.state.maintenanceAgent} onChange={this.onChangeMaintenanceAgent}>
                            {
                                this.state.agents.map(function(agent) {
                                    return <option value={agent.agentId}>
                                        {agent.name}
                                    </option>;
                                })
                            }
                </select>
                <br/>

                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add Item</button>
                <br/><br/><br/>
                
            </div>
        );
    }
}
