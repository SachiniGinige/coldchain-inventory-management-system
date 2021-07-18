import React, { Component } from "react";
import axios from "axios";

export default class AddMaintenaceRequest extends Component{
    constructor(props){
        super(props);

        this.onChangeStatus=this.onChangeStatus.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeItem=this.onChangeItem.bind(this);
        this.onChangeReceiver=this.onChangeReceiver.bind(this);
        this.onChangeSearchTerm=this.onChangeSearchTerm.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            itemId: '',
            status: '',
            description: '',
            receiver: '',
            users: [] ,
            searchTerm: '',

            itemErr: '',
            statusErr: '',
            descriptionErr: '',
            receiverErr: '',
            // errorMsg:''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/users/get-table/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        users: response.data.filter((val)=>{                       
                            if(!(val.designation==="MOH"))
                                {return val;} 
                            return null;
                        }).map(user=> user),
                        receiver: response.data[0].userId
                    })
                }
            })
    }

    onChangeItem(e){
        this.setState({
            itemId: e.target.value
        });
        this.validateItem(e.target.value);
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
    onChangeReceiver(e){
        this.setState({
            receiver: e.target.value
        });
        this.validateReceiver(e.target.value);
    }
    onChangeSearchTerm(e){
        this.setState({
            searchTerm: e.target.value
        });
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
    validateReceiver(val){
        if(!val){
            this.setState({
                receiverErr: '*Required field'
            });
            return false;
        }
        else{
            this.setState({
                receiverErr: ''
            });
            return true;
        }
    }


    validateForm(){

        this.validateItem(this.state.itemId);
        this.validateStatus(this.state.status);
        this.validateDescription(this.state.description);
        this.validateReceiver(this.state.receiver);
        if((this.validateItem(this.state.itemId)&&this.validateStatus(this.state.status)&&this.validateDescription(this.state.description)
                    &&this.validateReceiver(this.state.receiver))===false){
            alert('Please check form input');
            return false;
        } 
        return true;
    }

    onSubmit(e){
        e.preventDefault();

        const isValid = this.validateForm();

        if(isValid){
            const mrequest = {
                date:  new Date().toISOString().substring(0,19).replace('T',' '),
                status: this.state.status,
                description:  this.state.description,
                itemId:  this.state.itemId,
                receiver:  this.state.receiver,
                sender:  sessionStorage.getItem(sessionStorage.getItem("username")),
            }

            console.log(mrequest);

            axios.post('http://localhost:3001/reqmaintenance/add', mrequest)
                .then(res => console.log(res.data));
            
            alert("Sent maintenance request");   
                 
            // clear form  
            this.setState({
                itemId: '',
                status: '',
                description: '',
                receiver: '',
                searchTerm: ''
            }) 
            window.location = './reqmaintenance';
        } 
    }

    render() {
        return(
            // create user form
            <div className="form" id="addUserForm">
                <h3>Add Maintenace Request</h3><br/>

                <label className="form-label">Item ID: </label>
                <input type="text" className="form-control" required value={this.state.itemId} onChange={this.onChangeItem} />
                <div class="formError">{this.state.itemErr}</div><br/>
                
                <label className="form-label">Status: </label>
                <input type="text" className="form-control" value={this.state.status} onChange={this.onChangeStatus}/>
                {this.state.statusErr ? (<div class="formError">{this.state.statusErr}</div>) : null} <br/>
                                
                <label className="form-label">Description: </label>
                <input type="textarea" className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                <div class="formError">{this.state.descriptionErr}</div><br/>                                 

                <div className="row">
                    <div className="col">
                <label className="form-label">TO (Receiver): </label><br/>
                <select className="form-control select2" value={this.state.receiver} onChange={this.onChangeReceiver}>
                            {
                                this.state.users.filter((val)=>{
                                    if(this.state.searchTerm==='')
                                        {return val;}                        
                                    if(val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                                        {return val;} 
                                    if(val.location.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                                        {return val;} 
                                    return null;
                                }).map(function(user) {
                                    return <option value={user.userId}>
                                        {user.name}
                                        - {user.location}
                                    </option>;
                                })
                            }                            
                </select><br/>
                <div class="formError">{this.state.receiverErr}</div><br/>
                    </div>
                    <div className="col">
                <input type="text" className="form-control select2-search" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search Users by Name/Location..."/><br/>               
                    </div>
                </div>

                <label className="form-label">FROM (Sender ID): </label>
                <input type="text" className="form-control" disabled value={sessionStorage.getItem(sessionStorage.getItem("username"))}  />

                <div class="formError">{this.state.errorMsg}</div><br/><br/>

                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Send Maintenance Request</button>
                <br/><br/><br/>                
            </div>
        );
    }
}
