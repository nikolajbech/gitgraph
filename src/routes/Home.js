import React from 'react';
import { Button, Intent, Spinner } from "@blueprintjs/core";
import '../styles/Home.css';

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

  handleFileChange = async (e) => {
    const denpendencyObject = {}
    const files = e.target.files
    for (let i = 0; i < files.length; i++) {

      if (files[i].name.endsWith('.js')) {
        const fileName = files[i].name
        denpendencyObject[fileName] = []

        const reader = new FileReader()
        reader.onload = event => {
          const text = event.target.result.replace('\"', '\'')
          const textSplitted = text.split(' ').join(',').split('\n').join(',').split(',')
          let lookForDependency = false

          for (let j = 0; j < textSplitted.length; j++) {
            if (textSplitted[j] === 'import') lookForDependency = true
            if (lookForDependency) {
              if (textSplitted[j].startsWith('\'')) {
                const dependency = textSplitted[j].substring(
                  textSplitted[j].indexOf("\'") + 1,
                  textSplitted[j].lastIndexOf("\'")
                )
                if (dependency.length > 2) denpendencyObject[fileName].push(dependency)
                lookForDependency = false
              }
            }
          }
        }
        reader.onerror = error => console.log(error) // desired file content
        reader.readAsText(files[i])
      }
    }
    console.log(denpendencyObject.toString())
  }

  render() {
    return (
      <div>
        <input style={{ color: '#333' }} directory="" webkitdirectory="" type="file" onChange={this.handleFileChange} />
      </div>
    )
  }
}