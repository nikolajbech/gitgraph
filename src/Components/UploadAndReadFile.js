import React from 'react';
import '../styles/Home.css';
import Node from './Node'

export default class UploadAndReadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleFileChange = async (e) => {
        const nodes = []
        const filelist = e.target.files

        for (let i = 0; i < filelist.length; i++) {
            if (filelist[i].name.endsWith('.js')) {
                const reader = new FileReader()
                reader.onload = event => { nodes.push(this.analyseFileAndReturnNode(event, filelist[i].name)) }
                reader.onerror = error => console.log(error)
                reader.readAsText(filelist[i])
            }
        }
        this.setState({ nodes })
        console.log(nodes)
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
                    const dependency = word.substring(word.indexOf("\'") + 1, word.lastIndexOf("\'"))
                    if (dependency.length > 2) node.addDependency(dependency)
                    lookForDependency = false
                }
            }
        })
        return node
    }

    getNodes() {
        return this.state.nodes
    }

    render() {
        return (
            <div>
                <input style={{ color: '#333' }} directory="" webkitdirectory="" type="file" onChange={this.handleFileChange} />
            </div>
        )
    }
}