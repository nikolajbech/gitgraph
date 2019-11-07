import React from 'react';
import { ForceGraph3D } from 'react-force-graph';
import '../styles/GraphPage.css'
import Node from '../components/Node'


export default class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef()
    this.state = {
      gData: {
        "nodes": [
          {
            "id": "id1",
            "name": "App.js",
            "val": 10
          },
          {
            "id": "id2",
            "name": "Component2.js",
            "val": 10
          }
        ],
        "links": [
          {
            "source": "id1",
            "target": "id2"
          }
        ]
      },
      nodes: []
    };
  }

  handleFileChange = async (e) => {
    const filelist = e.target.files
    for (let i = 0; i < filelist.length; i++) {
      if (filelist[i].name.endsWith('.js')) {
        const reader = new FileReader()
        reader.onload = event => this.analyseFileAndReturnNode(event, filelist[i].name)
        reader.onerror = error => console.log(error)
        await reader.readAsText(filelist[i])
      }
    }
  }

  analyseFileAndReturnNode(event, fileName) {
    const node = new Node(fileName.split(".")[0])
    let words = event.target.result
      .replace(/\"/g, '\'')
      .replace(/ /g, ',')
      .replace(/\n/g, ',')
      .split(',')

    let lookForDependency = false
    words.forEach((word) => {
      if (word === 'import') lookForDependency = true
      if (lookForDependency) {
        if (word.startsWith('\'')) {
          let dependency = word.substring(word.indexOf("\'") + 1, word.lastIndexOf("\'"))
          dependency = dependency.substring(dependency.lastIndexOf("/") + 1)

          if (dependency.length > 2) node.addDependency(dependency)
          lookForDependency = false
        }
      }
    })
    const newArray = []
    this.state.nodes.forEach((el) => { newArray.push(el) })
    newArray.push(node)
    this.setState({ nodes: newArray })
    return node
  }

  createTree(nodesFromFiles) {

    const availableNodes = []
    nodesFromFiles.forEach((node) => availableNodes.push(node.nodes))
    console.log(availableNodes)

    //Create links:
    const linksArray = []
    nodesFromFiles.forEach((node) => {
      const nodeName = node.nodes
      node.getLinks().forEach((link) => {
        console.log(link, node.nodes, availableNodes.includes(link))
        if (availableNodes.includes(link)) {
          linksArray.push({
            "source": nodeName,
            "target": link
          })
        }
      })
    })

    //Create nodes:
    const nodesNameToReturn = []
    nodesFromFiles.forEach((node) => {
      nodesNameToReturn.push({
        "name": node.nodes,
        "id": node.nodes
      })
    })

    return {
      nodes: nodesNameToReturn,
      links: linksArray,
    }
  }

  render() {
    let gData = this.state.gData

    return (
      <div>
        <div>
          <button onClick={() => {
            const gData = this.createTree(this.state.nodes)
            console.log(gData)
            this.setState({ gData })
          }}>Update graph</button>
          <input style={{ color: '#333' }} directory="" webkitdirectory="" type="file" onChange={this.handleFileChange} />
        </div>
        {
          <ForceGraph3D
            graphData={gData}
            linkWidth={2}
          />
        }
      </div>
    )
  }
}