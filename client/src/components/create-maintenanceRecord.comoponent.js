import React, { Component } from "react";
import axios from "axios";

export default class AddMaintenaceRecord extends Component{
    constructor(props){
        super(props);

        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeStatus=this.onChangeStatus.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeItem=this.onChangeItem.bind(this);
        this.onChangeMaintenanceAgent=this.onChangeMaintenanceAgent.bind(this);

        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            date: '',
            status: '',
            description: '',
            itemId: '',
            maintenanceAgent: '',
            updatedDate: '',
            agents: [],

            itemEq: '' ,
            itemModel: '',
            itemLoc: '' ,

            dateErr:'',
            itemErr: '',
            statusErr: '',
            descriptionErr: '',
            magentErr: '',
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/agents/get/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        agents: response.data.map(agent=> agent),
                        maintenanceAgent: response.data[0].agentId
                    })
                }
            })
    }

    onChangeItem(e){
        this.setState({
            itemId: e.target.value
        });
        this.validateItem(e.target.value);
        
        axios.get(`http://localhost:3001/eqitems/get/${e.target.value}`)
        .then(response => {    
            if(response.data===""){
                this.setState({
                    itemEq: '',
                    itemModel: '',
                    itemLoc: '', 
                    maintenanceAgent: 1               
                }) 
            }
            else{
                this.setState({
                    itemEq: response.data.equipmentId,
                    itemModel: response.data.modelId,
                    itemLoc: response.data.locationId,  
                    maintenanceAgent: response.data.maintenanceAgentId              
                }) 
            }  
        })
            
    }
    onChangeDate(e){
        this.setState({
            date: e.target.value
        });
        this.validateDate(e.target.value);
    }
    onChangeStatus(e){
        this.setState({
            status: e.target.value
        });
        this.validateStatus(e.target.value);
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
        this.validateDescription(e.target.value);
    }
    onChangeMaintenanceAgent(e){
        this.setState({
            maintenanceAgent: e.target.value
        });
        this.validateMaintenanceAgent(e.target.value);
    }

    validateItem(val){
        if(!val){
            this.setState({
                itemErr: '*Required field'
            });
            return false;
        }
        else if(!val.trim().match(/^[0-9]*$/)){
            this.setState({
                itemErr: '*Enter an existing Item ID'
            });
            return false;
        }
        else{
            this.setState({
                itemErr: ''
            });
            return true;
        }
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
    validateStatus(val){
        if(!val){
            this.setState({
                statusErr: '*Required field'
            });
            return false;
        }
        else{
            this.setState({
                statusErr: ''
            });
            return true;
        }
    }
    validateDescription(val){
        if(!val){
            this.setState({
                descriptionErr: '*Required field'
            });
            return false;
        }
        else{
            this.setState({
                descriptionErr: ''
            });
            return true;
        }
    }
    validateMaintenanceAgent(val){
        if(!val){
            this.setState({
                magentErr: '*Required field'
            });
            return false;
        }
        else{
            this.setState({
                magentErr: ''
            });
            return true;
        }
    }


    validateForm(){

        this.validateItem(this.state.itemId);
        this.validateDate(this.state.date);
        this.validateStatus(this.state.status);
        this.validateDescription(this.state.description);
        this.validateMaintenanceAgent(this.state.maintenanceAgent);
        if((this.validateItem(this.state.itemId)&&this.validateDate(this.state.date)&&this.validateStatus(this.state.status)&&this.validateDescription(this.state.description)
                    &&this.validateMaintenanceAgent(this.state.maintenanceAgent))===false){
            alert('Please check form input');
            return false;
        } 
        return true;
    }

    onSubmit(e){
        e.preventDefault();

        const isValid = this.validateForm();

        if(isValid){
            const mrecord = {
                date:  this.state.date,
                status: this.state.status,
                description:  this.state.description,
                itemId:  this.state.itemId,
                maintenanceAgent:  this.state.maintenanceAgent,
                updatedDate:  new Date().toISOString().substring(0,19).replace('T',' '),
            }

            console.log(mrecord);

            axios.post('http://localhost:3001/maintenancerec/add', mrecord)
                .then(res => console.log(res.data));
            
            alert("Added maintenance record");   
                 
            // clear form  
            this.setState({
                itemId: '',
                date: '',
                status: '',
                description: '',
                maintenanceAgent: '',
            }) 
            window.location = './maintenancerec';
        } 
    }

    render() {
        return(
            // add maintenance record form
            <div className="form" id="addMainteanceRecordForm">
                <h3>Add Maintenace Record</h3><br/>

                <label className="form-label">Item ID: </label>
                <input type="text" className="form-control" required value={this.state.itemId} onChange={this.onChangeItem} />
                <div class="formError">{this.state.itemErr}</div><br/>
                <div className="row formRow">
                    <div className="col">
                        <label className="form-label">Equipment ID: </label>
                        <input type="text" className="form-control" disabled value={this.state.itemEq} /><br/>
                    </div>
                    <div className="col">
                        <label className="form-label">Model ID: </label>
                        <input type="text" className="form-control" disabled value={this.state.itemModel} /><br/>
                    </div>
                    <div className="col">
                        <label className="form-label">Location ID: </label>
                        <input type="text" className="form-control" disabled value={this.state.itemLoc} /><br/>
                    </div>
                </div>

                <label className="form-label">Date: </label>
                <input type="date" className="form-control" value={this.state.date} onChange={this.onChangeDate}/>
                <div class="formError">{this.state.dateErr}</div><br/> 

                <label className="form-label">Status: </label>
                <input type="text" className="form-control" value={this.state.status} onChange={this.onChangeStatus}/>
                {this.state.statusErr ? (<div class="formError">{this.state.statusErr}</div>) : null} <br/>
                                
                <label className="form-label">Description: </label>
                <textarea className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                <div class="formError">{this.state.descriptionErr}</div><br/>                                 

                <label className="form-label">Maintenance Agent: </label>
                <select className="form-control" value={this.state.maintenanceAgent} onChange={this.onChangeMaintenanceAgent}>
                            {
                                this.state.agents.map(function(agent) {
                                    return <option value={agent.agentId}>
                                        {agent.name}
                                    </option>;
                                })
                            }
                </select><br/>

                <div class="formError">{this.state.errorMsg}</div><br/><br/>

                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Send Maintenance Request</button>
                <br/><br/><br/>                
            </div>
        );
    }
}
