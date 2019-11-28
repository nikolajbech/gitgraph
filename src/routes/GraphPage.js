import React from 'react';
import {ForceGraph2D } from 'react-force-graph';
import '../styles/GraphPage.css'
import Node from '../components/Node'

export default class GraphPage extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef()
    this.state = {     
      nodes: []
    };
  }

  handleFileChange = async (nodes) => {
    //console.log("Was updated", nodes)
    this.setState({nodes: []})
    nodes.forEach((node) => {
      //console.log(node.filename)
      this.analyseFileAndReturnNode(node.text, node.filename)
    })
  }

  analyseFileAndReturnNode(wordsIn, fileName) {
    const node = new Node(fileName)
    /* console.log("filename:" + fileName);  */
    let words = wordsIn.replace(/\"/g, '\'').replace(/ /g, ',').replace(/\n/g, ',').split(',')

    /* console.log(words) */
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
    /* console.log(node.dependecies); */
    const newArray = []
    this.state.nodes.forEach((el) => { newArray.push(el) })
    newArray.push(node)
    this.setState({ nodes: newArray })
    return node
  }

  createTree(nodesFromFiles) {

    const availableNodes = []
    nodesFromFiles.forEach((node) => availableNodes.push(node.getNode()))
    console.log("avail:" + availableNodes)

    //Create links:
    const linksArray = []
    nodesFromFiles.forEach((node) => {
      const nodeName = node.getNode()
      node.getLinks().forEach((link) => {
       /*  console.log(link, node.nodes, availableNodes.includes(link)) */
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
      /* console.log("node name"+ node.getNode().replace(/\.[^/.]+$/, "")); */
      nodesNameToReturn.push({
        "name": node.getNode(),
        "id": node.nodes,
        "val" : node.getValue()   
      })
    })

    return {
      nodes: nodesNameToReturn,
      links: linksArray,
    }
  }


  render() {
    let gData = this.createTree(this.state.nodes)
    return (
      <div>
        {<ForceGraph2D
            graphData={gData}  
            linkWidth={2}
            nodeAutoColorBy={n => n.name.split('.')[1]}            
          />}
      </div>
    )
  }
}