import React from 'react'
import { Button, Card, Spinner, Elevation } from "@blueprintjs/core";
import '../styles/RepoOverview.css'

export default class RepoOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      username: "nikolajbech"
    }
  }

  componentDidMount = async () => {
    //this.getReposByUsername(this.state.username)
    this.getFilesByUsernameAndRepoName("nikolajbech","gitgraph","")
  }

  getReposByUsername(username){
    const url = `https://api.github.com/users/${username}/repos`
    fetch(url)
    .then(response => response.json())
    .then(data => {this.setState({repos: data})})
  }

  getFilesByUsernameAndRepoName = async (username, reponame, path) => {
    const fileRawsUrls = []
    const url = `https://api.github.com/repos/${username}/${reponame}/contents/${path}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach((obj) => {
        if (obj.type === "file") {
          if (obj.name.endsWith(".js")){
            fileRawsUrls.push(obj.download_url)
            console.log(obj.download_url)
          }
        } else if (obj.type === "dir") {
          const newPath = path + obj.name + "/"
          const getFileRawsUrls = this.getFilesByUsernameAndRepoName(username, reponame, newPath)
          fileRawsUrls.concat(getFileRawsUrls)
        }
      })
    })
  }

  getFileByRawURL(rawURL){

  }
  
  renderCard(name){
    return(
      <a className="card"
      onClick={() => console.log(name)}
      >
        <p style={{color: '#303030'}}>{name}</p>
      </a>
    )
  }

  render() {
    return (
      <div className="box">
        <div className="grid">
          {this.state.repos.map((repo) => {
            return(
              this.renderCard(repo.name)
            )
          })}
        </div>
      </div>
    )
  }
}