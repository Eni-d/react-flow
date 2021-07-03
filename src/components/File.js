import React, { Component } from 'react'

export class File extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <i className="fa fa-file-o text-primary ml-2 mr-2"></i>
                <h6>{ this.props.filename }</h6>
            </div>
        )
    }
}

export default File
