import React, { Component } from "react";

export default class Example extends Component  {
    state = {
        show: false
    }
  
    handleClose = () => {this.setState({show:false})}
    handleShow = () => {this.setState({show:true})}
  
    render(){
        return (       
            <div>
                <br/><br/><br/>
                {/* Button trigger modal */}                
                {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handleShow}>
                Launch demo modal
                </button> */}

                {/* Modal  */}
                {/* <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Invalid credentials
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div> */}
                {/* </div> */}
            </div> 
        );
    }
}
