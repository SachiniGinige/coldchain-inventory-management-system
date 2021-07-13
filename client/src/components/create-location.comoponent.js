import React, { Component } from "react";
import axios from "axios";

export default class AddLocation extends Component{
    constructor(props){
        super(props);

        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeLevel=this.onChangeLevel.bind(this);
        this.onChangeDistrict=this.onChangeDistrict.bind(this);
        this.onChangeAddress=this.onChangeAddress.bind(this);
        this.onChangeContactPerson=this.onChangeContactPerson.bind(this);
        this.onChangeContactNo1=this.onChangeContactNo1.bind(this);
        this.onChangeContactNo2=this.onChangeContactNo2.bind(this);
        this.onChangeStatus=this.onChangeStatus.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            name: '',
            level: '',
            address: '',
            contactPerson: '',
            contactNo1: '',
            contactNo2: '',
            status: 'functional',
            suffix: '',

            district: '',
            districts: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/locations/get-districts/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        districts: response.data.map(district=> district),
                        district: response.data[0].locationId
                    })
                }
            })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangeLevel(e){
        this.setState({
            level: e.target.value
        });
        if(e.target.value==="District"){this.setState({suffix:' RMSD'});}
        else if(e.target.value==="Divisional"){
            this.setState({suffix:' MOH Office'});
        }
    }
    onChangeDistrict(e){
        this.setState({
            address: e.target.value
        });
    }
    onChangeAddress(e){
        this.setState({
            address: e.target.value
        });
    }
    onChangeContactPerson(e){
        this.setState({
            contactPerson: e.target.value
        });
    }
    onChangeContactNo1(e){
        this.setState({
            contactNo1: e.target.value
        });
    }
    onChangeContactNo2(e){
        this.setState({
            contactNo2: e.target.value
        });
    }
    onChangeStatus(e){
        this.setState({
            status: e.target.value
        });
    }
    

    onSubmit(e){
        e.preventDefault();

        const location = {
            name:  this.state.name+this.state.suffix,
            level:  this.state.level,
            address:  this.state.address,
            contactPerson: this.state.contactPerson,
            contactNo1:  this.state.contactNo1,
            contactNo2:  this.state.contactNo2,
            status:  this.state.status
        }
        // console.log(location);

        axios.post('http://localhost:3001/locations/add', location)
            .then(res => console.log(res.data));

        alert("Location added"); 

        if(this.state.level==="Divisional"){
            const divisionalLocation = {
                name:  this.state.name+this.state.suffix,
                district:  this.state.district
            }
            axios.post('http://localhost:3001/divisional-locations/add', divisionalLocation)
                .then(res => console.log(res.data));
        }
        
               
        window.location = './locations';    
    }

    render() {
        return(
            <div>
                {/* // create location form */}
                <div className="form" id="addLocationForm">
                    <h3>Add New Location</h3><br/>
                    
                    <label className="form-label">Name: </label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} placeholder="eg: Colombo"/>
                    <br/>                 
                    <label className="form-label">Location Level: </label>
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            id="level1" 
                            value="Central" 
                            checked={this.state.level === "Central"}
                            onChange={this.onChangeLevel}
                        />
                        <label className="form-check-label" for="level1">
                            Central Level
                        </label>
                        <br/>
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            id="level2" 
                            value="District" 
                            checked={this.state.level === "District"}
                            onChange={this.onChangeLevel}
                        />
                        <label className="form-check-label" for="level2">
                            District Level
                        </label>
                        <br/>
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            id="level3" 
                            value="Divisional" 
                            checked={this.state.level === "Divisional"}
                            onChange={this.onChangeLevel}
                        />
                        <label className="form-check-label" for="level3">
                            Divisional Level
                        </label>
                        <br/><br/>
                    </div>  

                    {this.state.level==="Divisional"? 
                        (<div><label className="form-label">District: </label>
                        <select className="form-control" value={this.state.district} onChange={this.onChangeDistrict}>
                                {
                                    this.state.districts.map(function(district) {
                                        return <option value={district.locationId}>
                                            {district.name}
                                        </option>;
                                    })
                                }
                    </select><br/></div>) 
                        : null}

                    <label className="form-label">Address: </label>
                    <input type="text" className="form-control" value={this.state.address} onChange={this.onChangeAddress} />
                    <br/>                             
                    <label className="form-label">Contact Person: </label>
                    <input type="email" className="form-control" value={this.state.contactPerson} onChange={this.onChangeContactPerson} />
                    <br/>
                    <label className="form-label">Contact Number 1: </label>
                    <input type="text" className="form-control" value={this.state.contactNo1} onChange={this.onChangeContactNo1} />
                    <br/>
                    <label className="form-label">Contact Number 2: </label>
                    <input type="text" className="form-control" value={this.state.contactNo2} onChange={this.onChangeContactNo2} />
                    <br/>
                    <label className="form-label">Status: </label>
                    <select className="form-control" value={this.state.status} onChange={this.onChangeStatus} >
                        <option value="functional">functional</option>
                        <option value="temporarily non-functional">temporarily non-functional</option>
                        <option value="terminated">terminated</option>
                    </select>
                    <br/>
                    
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add Location</button>
                    <br/><br/><br/>    
                </div>
            </div>
        );
    }
}
