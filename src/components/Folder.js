import React, { Component } from 'react'
import File from './File'

export class Folder extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                {Object.keys(this.props.data).map((folder) => (
                    <div className="dropdown mb-3">

                        <i className="fa fa-folder fa-2x text-primary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"></i>
                        <h4 className="d-inline">{folder}</h4>
                        
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {this.props.data[folder].map((file) => (
                                <File key={ file } filename={ file }/>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        )
    }
}

export default Folder
