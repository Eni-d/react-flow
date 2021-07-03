import React, { Component } from 'react'
import './App.css'
import Folder from './components/Folder'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Documents: [
          "Document1.jpg",
          "Document2.jpg",
          "Document3.jpg"
      ],

      Desktop: [
        "Screenshot1.jpg",
        "videopal.mp4"
      ],

      Applications: [
        "Webstorm.dmg",
        "Pycharm.dmg",
        "FileZila.dmg",
        "Mattermost.dmg",
      ],
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="mt-5">FOLDERS</h1>
        <Folder data={ this.state }/>
    </div>
    )
  }
}

export default App

