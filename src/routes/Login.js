import React from 'react'
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';

export default class Login extends React.Component {
  render() {   

    return (
<<<<<<< HEAD
      <div> Welcome   </div>
=======
      <div>
        <ForceGraph3D
          backgroundColor={"#eeeeee"}
          graphData={gData}
          nodeAutoColorBy={d => d.id%GROUPS}
          linkAutoColorBy={d => gData.nodes[d.source].id%GROUPS}
          linkWidth={2}
        />
      </div>
>>>>>>> upload-and-read-files
    )
  }
}