import React from 'react'
import { Button, Card, Spinner, Elevation } from "@blueprintjs/core";
import '../styles/RepoOverview.css'

export default class RepoOverview extends React.Component {

  renderCard(name){
    return(
      <a className="card">
        <p style={{color: '#303030'}}>{name}</p>
      </a>
    )
  }

  render() {
    return (
      <div className="box">
        <div className="grid">
          {this.renderCard("Repo 1")}
          {this.renderCard("Repo 2")}
          {this.renderCard("Repo 3")}
          {this.renderCard("Repo 4")}
          {this.renderCard("Repo 5")}
          {this.renderCard("Repo 6")}
        </div>
      </div>
    )
  }
}