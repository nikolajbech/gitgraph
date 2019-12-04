import React from 'react'
import '../styles/RepoOverview.css'

export default class RepoOverview extends React.Component {
  
  renderCard(name){
    return(
      <a
        className="card"
        key={name}
        onClick={() => this.props.onCardClicked(name)}
      >
        <p style={{color: '#303030'}}>{name}</p>
      </a>
    )
  }

  render() {
    return (
      <div className="box">
        <div className="grid">
          {this.props.repos && this.props.repos.map((repo) => {
            return(
              this.renderCard(repo.name)
            )
          })}
        </div>
      </div>
    )
  }
}