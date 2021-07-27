import React, { Component } from "react";
import axios from "axios";

export default class EditLocation extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);
        this.onChangeAddrBuilding = this.onChangeAddrBuilding.bind(this);
        this.onChangeAddrCity = this.onChangeAddrCity.bind(this);
        this.onChangeAddrStreet = this.onChangeAddrStreet.bind(this);
        this.onChangeContactPerson = this.onChangeContactPerson.bind(this);
        this.onChangeContactNo1 = this.onChangeContactNo1.bind(this);
        this.onChangeContactNo2 = this.onChangeContactNo2.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            level: '',
            address: '',
            addrBuilding: '',
            addrStreet: '',
            addrCity: '',
            contactPerson: '',
            contactNo1: '',
            contactNo2: '',
            status: '',
            suffix: '',

            district: '',
            districts: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/locations/get/${this.props.match.params.id}`)
            .then(response => {
                console.log(this.props.match);
                console.log(response);
                this.setState({
                    name: response.data.name,
                    level: response.data.level,
                    addrBuilding: response.data.buildingName,
                    addrStreet: response.data.street,
                    addrCity: response.data.city,
                    contactPerson: response.data.contactPerson,
                    contactNo1: response.data.contactNo1,
                    contactNo2: response.data.contactNo2,
                    status: response.data.status
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(`http://localhost:3001/divisional-locations/get/${this.props.match.params.id}`)
            .then(response => {
                console.log(this.props.match);
                console.log(response);
                this.setState({
                    district: response.data.district
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:3001/locations/get-districts/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        districts: response.data.map(district => district),
                        // district: response.data[0].locationId
                    })
                }
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeLevel(e) {
        this.setState({
            level: e.target.value
        });
        if (e.target.value === "District") { this.setState({ suffix: ' RMSD' }); }
        else if (e.target.value === "Divisional") { this.setState({ suffix: ' MOH Office' }); }
    }
    onChangeDistrict(e) {
        this.setState({
            district: e.target.value
        });
    }
    onChangeAddrBuilding(e) {
        this.setState({
            addrBuilding: e.target.value
        });
    }
    onChangeAddrStreet(e) {
        this.setState({
            addrStreet: e.target.value
        });
    }
    onChangeAddrCity(e) {
        this.setState({
            addrCity: e.target.value
        });
    }
    onChangeContactPerson(e) {
        this.setState({
            contactPerson: e.target.value
        });
    }
    onChangeContactNo1(e) {
        this.setState({
            contactNo1: e.target.value
        });
    }
    onChangeContactNo2(e) {
        this.setState({
            contactNo2: e.target.value
        });
    }
    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const location = {
            name: this.state.name + this.state.suffix,
            level: this.state.level,
            addrBuilding: this.state.addrBuilding,
            addrStreet: this.state.addrStreet,
            addrCity: this.state.addrCity,
            address: this.state.addrStreet + ", " + this.state.addrCity,
            contactPerson: this.state.contactPerson,
            contactNo1: this.state.contactNo1,
            contactNo2: this.state.contactNo2,
            status: this.state.status
        }
        console.log(location);

        axios.put(`http://localhost:3001/locations/update/${this.props.match.params.id}`, location)
            .then(res => console.log(res.data));

        alert("Location edited");

        if (this.state.level === "Divisional") {
            const divisionalLocation = {
                district: this.state.district
            }
            console.log(divisionalLocation);

            axios.put(`http://localhost:3001/divisional-locations/update/${this.props.match.params.id}`, divisionalLocation)
                .then(res => console.log(res.data));

            // IF DIVISIONAL LOCATION NOT ADDED
            // const divisionalLocation = {
            //     name:  this.state.name+this.state.suffix,
            //     district:  this.state.district
            // }
            // axios.post('http://localhost:3001/divisional-locations/add', divisionalLocation)
            //     .then(res => console.log(res.data));
        }

        window.location = '../locations';

    }

    render() {
        return (
            // edit location form
            <div className="form" id="addLocationForm">
                <h3>Edit Location</h3><br />

                <label className="form-label">Name: </label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                <br />
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
                    <br />
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
                    <br />
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
                    <br /><br />
                </div>

                {this.state.level === "Divisional" ?
                    (<div><label className="form-label">District: </label>
                        <select className="form-control" value={this.state.district} onChange={this.onChangeDistrict}>
                            {
                                this.state.districts.map(function (district) {
                                    return <option value={district.locationId}>
                                        {district.name}
                                    </option>;
                                })
                            }
                        </select><br /></div>)
                    : null}

                <label className="form-label">Address: </label>
                {/* <input type="text" className="form-control" value={this.state.address} onChange={this.onChangeAddress} /> */}
                <div className="row formRow">
                    <div className="col-md-auto">
                        <label className="form-label">Building Name (Optional): </label>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={this.state.addrBuilding} onChange={this.onChangeAddrBuilding} placeholder="e.g.: Epidemiology Unit, Familiy Health Bureau" />
                    </div>
                </div>
                <br />
                <div className="row formRow">
                    <div className="col-md-auto">
                        <label className="form-label">Street: </label>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={this.state.addrStreet} onChange={this.onChangeAddrStreet} placeholder="e.g.: 231, De Saram Pl" />
                    </div>
                </div>
                <br />
                <div className="row formRow">
                    <div className="col-md-auto">
                        <label className="form-label">City: </label>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" value={this.state.addrCity} onChange={this.onChangeAddrCity} placeholder="e.g.: Maradana" />
                    </div>
                </div>
                <br /><br/>
                <label className="form-label">Contact Person: </label>
                <input type="email" className="form-control" value={this.state.contactPerson} onChange={this.onChangeContactPerson} />
                <br />
                <label className="form-label">Contact Number 1: </label>
                <input type="text" className="form-control" value={this.state.contactNo1} onChange={this.onChangeContactNo1} />
                <br />
                <label className="form-label">Contact Number 2: </label>
                <input type="text" className="form-control" value={this.state.contactNo2} onChange={this.onChangeContactNo2} />
                <br />
                <label className="form-label">Status: </label>
                <select className="form-control" value={this.state.status} onChange={this.onChangeStatus}>
                    <option value="functional">functional</option>
                    <option value="temporarily non-functional">temporarily non-functional</option>
                    <option value="terminated">terminated</option>
                </select>
                <br />

                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Edit Location</button>
                <br /><br /><br />
            </div>
        );
    }
}
