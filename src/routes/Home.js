import React from 'react'
import { Button, Intent, Spinner } from "@blueprintjs/core";
import '../styles/Home.css'

export default class Home extends React.Component {

  onDrag = event => {
    event.preventDefault()
  }

  onDrop = event => {
    event.preventDefault()
    let files = event.dataTransfer.files
    console.log("files", files)
    this.setState({ files })
  }

  renderDragAndDropArea() {
    return (
      <div class='dragAndDrop' onDragOver={this.onDrag} onDrop={this.onDrop}>
        <p>Drop your repo here</p>
      </div>
    )
  }

  handleFileChange = async (e) => {
    const files = e.target.files
    console.log(e.target.files)
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.onload = event => console.log(event.target.result) // desired file content
      reader.onerror = error => console.log(error) // desired file content
      reader.readAsText(files[i])
    }

  }

  render() {
    return (
      <div>
        {this.renderDragAndDropArea()}
        <input directory="" webkitdirectory="" type="file" onChange={this.handleFileChange} />
      </div>
    )
  }
}