import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Table from 'react-bootstrap/Table';

const Item = props => (
    <tr>
        <td>{props.item.itemId}</td>
        <td>{props.item.dateProcured.substring(0,10)}</td>
        <td>{props.item.productionYear}</td>
        <td>{props.item.shelfLife}</td>
        <td>{props.item.maufacturer}</td>
        <td>{props.item.currentFunctionalStatus}</td>
        <td>{props.item.equipment}</td>
        <td>{props.item.model}</td>
        <td>{props.item.location}</td>
        <td>{props.item.supplyAgent}</td>
        <td>{props.item.maintenanceAgent}</td>
        <td>
            <Link to={"./eqitem-edit/"+props.item.itemId}>edit</Link>
             |<a href="./equipment" onClick={() => {props.deleteItem(props.item.itemId)}}> delete</a>
        </td>
    </tr>
)

export default class ItemList extends Component{
    
    constructor(props){
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        
        this.state = { items: [] };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/eqitems/get-table/')
            .then(response => {
                this.setState({
                    items: response.data
                })    
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteItem(id) {

        alert("Are you sure you want to delete Item No. "+id+"?");
        axios.delete(`http://localhost:3001/eqitems/delete/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            items: this.state.items.filter(el => el.itemId !==id)
        })
    }
    
    itemList() {
        return this.state.items.map( currentitem => {
            return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem.id}/>
        })
    }

    render() {
        return(
            <div className="ItemList">
                <h3>Equipment Items</h3><br/>
                <div className="table-responsive">
                    {/* table of all equipment items */}
                    <Table className="table table-sm table-striped table-bordered table-hover">
                        <thead >
                            <tr>
                                <th>Item ID</th>
                                <th>Procured Date</th>
                                <th>Production Year</th>
                                <th>Shelf Life</th>
                                <th>Manufacturer</th>
                                <th>Current Functional Status</th>
                                <th>Equipment Type</th>
                                <th>Model</th>
                                <th>Location</th>
                                <th>Supply Agent</th>
                                <th>Maintenance Agent</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.itemList()}
                        </tbody>
                    </Table>
                </div>
                <br/><br/>
                <span className="btnContainer"><a className="btn btn-outline-primary" href="./eqitem-add"> Add Item </a></span>
                <span className="btnContainer"><a className="btn btn-outline-primary" href="./eqtype"> Equipment Types </a></span>
                <span className="btnContainer"><a className="btn btn-outline-primary" href="./model"> Equipment Models </a></span>
            </div>
        );
    }
}