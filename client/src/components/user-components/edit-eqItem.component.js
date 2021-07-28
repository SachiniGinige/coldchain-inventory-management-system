import React, { Component } from "react";
import axios from "axios";

export default class EditItemUser extends Component{
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
            agents: [], 

            dateErr:'',
            prodYrErr:'',
            shelfLifeErr:''
        }
    }


    componentDidMount(){
        axios.get(`http://localhost:3001/eqitems/get/${this.props.match.params.id}`)
            .then(response => { 
                console.log(this.props.match);
                console.log(response);    
           
                this.setState({
                    dateProcured: response.data.dateProcured.substring(0,10),
                    productionYear: String(response.data.productionYear),
                    shelfLife: response.data.shelfLife,
                    manufacturer: response.data.manufacturer,
                    functionalStatus: response.data.currentFunctionalStatus,
                    eqtype: response.data.equipmentId,
                    model: response.data.modelId,
                    location: response.data.locationId,
                    supplyAgent: response.data.supplyAgentId,
                    maintenanceAgent: response.data.maintenanceAgentId
                })   
            })
            .catch(function(error){
                console.log(error);
            })

        axios.get('http://localhost:3001/eqtypes/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        eqtypes: response.data.map(eqtype=> eqtype)
                    })
                }
            })
        axios.get('http://localhost:3001/models/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        models: response.data.map(model=> model)
                    })
                }
            })
        axios.get('http://localhost:3001/locations/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        locations: response.data.map(location=> location)
                    })
                }
            })
        axios.get('http://localhost:3001/agents/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        agents: response.data.map(agent=> agent)
                    })
                }
            })
    }

    onChangeDateProcured(e){
        this.setState({
            dateProcured: e.target.value
        });
        this.validateDate(e.target.value);
    }
    onChangeProductionYear(e){
        this.setState({
            productionYear: e.target.value
        });
        this.validateProdYr(e.target.value);
    }
    onChangeShelfLife(e){
        this.setState({
            shelfLife: e.target.value
        });
        this.validateShelfLife(e.target.value);
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
    validateDate(val){
        if(!val){
            this.setState({
                dateErr: '*Required field'
            });
            return false;
        }
        else{
            this.setState({
                dateErr: ''
            });
            return true;
        }
    }
    validateProdYr(val){
        if(!val){
            this.setState({
                prodYrErr: '*Required field'
            });
            return false;
        }
        if(!val.match(/^[1-2][0-9]{3}$/)){
            this.setState({
                prodYrErr: '*Enter a valid year'
            });
            return false;
        }
        else{
            this.setState({
                prodYrErr: ''
            });
            return true;
        }
    }
    validateShelfLife(val){
        if(!val){
            this.setState({
                shelfLifeErr: '*Required field'
            });
            return false;
        }
        if(!val.match(/^[0-9]{1,2}$/)){
            this.setState({
                shelfLifeErr: '*Enter a valid number of yrs'
            });
            return false;
        }
        else{
            this.setState({
                shelfLifeErr: ''
            });
            return true;
        }
    }

    validateForm(){
        this.validateDate(this.state.dateProcured);
        this.validateProdYr(this.state.productionYear);
        this.validateShelfLife(this.state.shelfLife);
        if((this.validateDate(this.state.dateProcured)&&this.validateProdYr(this.state.productionYear)&&this.validateShelfLife(this.state.shelfLife))===false){
            alert('Please check form input');
            return false;
        } 
        return true;
    }

    onSubmit(e){
        e.preventDefault();
        
        const isValid = this.validateForm();

        if(isValid){
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

            axios.put(`http://localhost:3001/eqitems/update/${this.props.match.params.id}`, eqitem)
                .then(res => console.log(res.data));
            
            // alert("Item edited");        
            window.location = '../equipment';
        }
    }

    render() {
        return(
            // edit item form
            <div className="form" id="editUserForm">
                <h3>Edit Item</h3><br/>
                
                <label className="form-label">Procured Date: </label>
                <input type="date" className="form-control" value={this.state.dateProcured} onChange={this.onChangeDateProcured} />
                <div class="formError">{this.state.dateErr}</div><br/>
                <label className="form-label">Production Year: </label>
                <input type="text" className="form-control" value={this.state.productionYear} onChange={this.onChangeProductionYear} />
                <div class="formError">{this.state.prodYrErr}</div><br/>
                <label className="form-label">Shelf life: </label>
                <input type="text" className="form-control" value={this.state.shelfLife} onChange={this.onChangeShelfLife} />
                <div class="formError">{this.state.shelfLifeErr}</div><br/>
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
                <select className="form-control" value={this.state.model} onChange={this.onChangeModel}>
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

                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Edit Item</button>
                <br/><br/><br/>
                
            </div>
        );
    }
}
