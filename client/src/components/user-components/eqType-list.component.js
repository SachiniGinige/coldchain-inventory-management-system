import React, { Component } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

const EqType = props => (
    <tr>
        <td>{props.type.equipmentId}</td>
        <td>{props.type.name}</td>
    </tr>
)

export default class EqTypeListUser extends Component{
    
    constructor(props){
        super(props);

        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        
        this.state = { 
            types: [] ,
            searchTerm: '' 
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/eqtypes/get')
            .then(response => {
                console.log(response);
                this.setState({
                    types: response.data
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
    
    eqTypeList() {
        return this.state.types.filter((val)=>{
            if(this.state.searchTerm==='')
                {return val;}                        
            else if(val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
                {return val;} 
            return null;
        }).map( currenttype => {
            return <EqType type={currenttype} key={currenttype.id}/>
        })
    }

    render() {
        return(
            <div className="EqTypeList">
                <h3>Equipment Types</h3>
                <div className="searchbarContainer" >
                    <div className="row">
                        <div className="col searchbarCol"></div>
                        <div className="col-md-auto searchbarCol">
                            <input type="text" className="form-control searchbar" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..."/><br/>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    {/* table of all equipment types */}
                    <Table className="table table-striped table-bordered table-hover">
                        <thead style={{textAlign: "center"}}>
                            <tr>
                                <th>Equipment ID</th>
                                <th>Equipment Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.eqTypeList()}
                        </tbody>
                    </Table>
                </div>
                <br/><br/>
            </div>
        );
    }
}