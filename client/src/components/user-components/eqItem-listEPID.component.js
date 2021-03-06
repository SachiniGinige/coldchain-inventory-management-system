import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import generatePDF from "../itemReportGenerator";

import Table from 'react-bootstrap/Table';
import editIcon from '../img/edit.png';
// import deleteIcon from '../img/delete.png';
import downloadIcon from '../img/download.png';

const Item = props => (
    <tr>
        <td>{props.item.itemId}</td>
        <td>{props.item.dateProcured.substring(0, 10)}</td>
        <td>{props.item.productionYear}</td>
        <td>{props.item.shelfLife}</td>
        {/* <td>{props.item.maufacturer}</td> */}
        <td>{props.item.currentFunctionalStatus}</td>
        <td>{props.item.equipment}</td>
        <td>{props.item.model}</td>
        <td>{props.item.location}</td>
        <td>{props.item.supplyAgent}</td>
        <td>{props.item.maintenanceAgent}</td>
        <td>
            <Link to={"./eqitem-edit/" + props.item.itemId}><img src={editIcon} className="shortcutIcon" alt="" /></Link>
        </td>
    </tr>
)

export default class NationalItemList extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeFunctionalStatus = this.onChangeFunctionalStatus.bind(this);

        this.state = {
            items: [],
            location: '',
            locations: [],
            status: '',
            searchTerm: ''
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/eqitems/get-table/')
            .then(response => {
                this.setState({
                    items: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('http://localhost:3001/locations/get/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        locations: response.data.map(location => location),
                    })
                }
            })
    }

    onChangeSearchTerm(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }
    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }
    onChangeFunctionalStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    itemList() {
        return this.state.items.filter((val) => {
            if (this.state.searchTerm === '') {
                if ((val.location === this.state.location) || (this.state.location === ''))
                    if ((val.currentFunctionalStatus === this.state.status) || (this.state.status === '')) { return val; }
            }
            else if (val.location.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                if ((val.location === this.state.location) || (this.state.location === ''))
                    if ((val.currentFunctionalStatus === this.state.status) || (this.state.status === '')) { return val; }
            }
            else if (val.equipment.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                if ((val.location === this.state.location) || (this.state.location === ''))
                    if ((val.currentFunctionalStatus === this.state.status) || (this.state.status === '')) { return val; }
            }
            else if (val.model.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                if ((val.location === this.state.location) || (this.state.location === ''))
                    if ((val.currentFunctionalStatus === this.state.status) || (this.state.status === '')) { return val; }
            }
            else if (val.supplyAgent.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                if ((val.location === this.state.location) || (this.state.location === ''))
                    if ((val.currentFunctionalStatus === this.state.status) || (this.state.status === '')) { return val; }
            } // eslint-disable-next-line
            else if (val.itemId == (this.state.searchTerm.toLowerCase())) {
                if ((val.location === this.state.location) || (this.state.location === ''))
                    if ((val.currentFunctionalStatus === this.state.status) || (this.state.status === '')) { return val; }
            } // eslint-disable-next-line
            else if (val.productionYear == (this.state.searchTerm.toLowerCase())) {
                if ((val.location === this.state.location) || (this.state.location === ''))
                    if ((val.currentFunctionalStatus === this.state.status) || (this.state.status === '')) { return val; }
            }
            return null;
        }).map(currentitem => {
            return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem.id} />
        })
    }

    render() {
        return (
            <div className="ItemList">
                <h3>Equipment Items</h3>
                <div className=" container searchbarContainer">
                    <div className="row">
                        <div className="col-md-auto searchbarCol">
                            <div className="filterDiv">
                                <label className="form-label filter-label" htmlFor="filter1" >LOCATION
                                    {/* <img src={filterIcon} className="filterIcon" alt=""/> */}
                                </label>
                                <select className="filter-select" id="filter1" value={this.state.location} onChange={this.onChangeLocation}>
                                    {
                                        this.state.locations.map(function (location) {
                                            return <option value={location.name}>
                                                {location.name}
                                            </option>;
                                        })
                                    }
                                    <option value="">
                                        - - - - - - - - - - - - -
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-auto searchbarCol">
                            <div className="filterDiv">
                                <label className="form-label filter-label" htmlFor="filter2">Functional Status </label>
                                <select className="filter-select" id="filter2" value={this.state.status} onChange={this.onChangeFunctionalStatus}>
                                    <option value="functional">
                                        functional
                                    </option>
                                    <option value="non-functional">
                                        non-functional
                                    </option>
                                    <option value="">
                                        - - - - - - - - - - - - -
                                    </option>
                                </select><br />
                            </div>
                        </div>
                        <div className="col searchbarCol"></div>
                        <div className="col-md-auto searchbarCol">
                            <br />
                            <input type="text" className="form-control searchbar" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..." /><br />
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    {/* table of all equipment items */}
                    <Table className="table table-sm table-striped table-bordered table-hover">
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th>Item ID</th>
                                <th>Procured Date</th>
                                <th>Production Year</th>
                                <th>Shelf Life</th>
                                {/* <th>Manufacturer</th> */}
                                <th>Current Functional Status</th>
                                <th>Equipment Type</th>
                                <th>Model</th>
                                <th>Location</th>
                                <th>Supply Agent</th>
                                <th>Maintenance Agent</th>
                                <th style={{ minWidth: 80 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.itemList()}
                        </tbody>
                    </Table>
                </div>
                <br /><br />
                <div className="container">
                    <div classname="row">
                            <button className="btn btn-warning" onClick={() => generatePDF(this.state.items)} style={{color:"white"}}>
                                Generate Report
                                <img src={downloadIcon} style={{ height: 20, marginLeft: 8, marginBottom:3}} alt=""/>
                            </button>
                    </div>
                </div>
            </div>
        );
    }
}