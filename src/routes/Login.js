import React from 'react'
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';

export default class Login extends React.Component {

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
        <ForceGraph3D
          backgroundColor={"#eeeeee"}
          graphData={gData}
          nodeAutoColorBy={d => d.id%GROUPS}
          linkAutoColorBy={d => gData.nodes[d.source].id%GROUPS}
          linkWidth={2}
        />
      </div>
    )
  }
}