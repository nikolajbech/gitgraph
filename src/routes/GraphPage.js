import React from 'react';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
import '../styles/GraphPage.css'
import Vertex from '../components/Vertex';


export default class GraphPage extends React.Component { 

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
    let data= [];
    let counter = 0;
    
    
    //console.log(e.target.files)
    for (let i = 0; i < files.length; i++) {

      if (files[i].name.endsWith('.js')) {
        

        const fileName = files[i].name;
        denpendencyObject[fileName] = [];
       

        const reader = new FileReader();
        reader.onload = event => {
          const text = event.target.result.replace('\"', '\'')
          //console.log(text)
          const textSplitted = text.split(' ').join(',').split('\n').join(',').split(',')

          let lookForDependency = false

          for (let j = 0; j < textSplitted.length; j++) {
            if (textSplitted[j] === 'import') {
              lookForDependency = true
            }

            if (lookForDependency) {
              if (textSplitted[j].startsWith('\'')) {
                  const dependency = textSplitted[j].substring(
                  textSplitted[j].indexOf("\'") + 1,
                  textSplitted[j].lastIndexOf("\'")
                )                           
                
               
                if (dependency.length > 2 ) {
                  console.log(fileName, 'uses', dependency)

                  denpendencyObject[fileName].push(dependency)
                }      
                   

                lookForDependency = false
              }
            }
          } 
        }  
        reader.onerror = error => console.log(error) // desired file content
        reader.readAsText(files[i])
        // add a new node to the of data
        let v = new Vertex(files[i], denpendencyObject);
        v.name = fileName.toString().replace(".js","");
        v.id = counter;
        data.push(v);
        counter++;
      }
    }    

    console.log(data);        

  }

  genDependencyTree (files, reverse = false){  
   
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      console.log(element);
      
    };

    return {    

      nodes: [...Array(files.length).keys()].map(i => ({id:i})),
      links: [...Array(files.length).keys()]
        .filter(id=> id)
        .map(id =>({ 
          [reverse ? 'target' : 'source']: id,
          [reverse ? 'source' : 'target']: Math.round(Math.random() * (id-1))
        }))
    };
  }

 

  
  genRandomTree(N = 300, reverse = false) {
    return {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
        links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id-1))
      }))
    };
  }


  render() {       
    const myData = {
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
    }

    const GROUPS = 12;
    const gData = this.genRandomTree();

    return (
      <div>    
        <div className="dragAndDrop">
          <input style={{ color: '#333' }} directory="" webkitdirectory="" type="file" onChange={this.handleFileChange} />
        </div>
        <ForceGraph3D
          graphData={gData}
          nodeAutoColorBy={d => d.id%GROUPS}
          linkAutoColorBy={d => gData.nodes[d.source].id%GROUPS}
          linkWidth={2}
        />
      </div>
    )
  }
}