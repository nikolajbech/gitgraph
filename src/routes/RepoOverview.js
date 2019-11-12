import React from 'react'
import { Button, Card, Spinner, Elevation } from "@blueprintjs/core";
import '../styles/RepoOverview.css'

export default class RepoOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      username: "nikolajbech",
      header: {"headers":
        {
          "Authorization": "Bearer *insert token here!*"
        }
      }
    }
  }

  componentDidMount = async () => {
    //this.getReposByUsername(this.state.username)
    //this.getFilesByUsernameAndRepoName("nikolajbech","gitgraph","")
    this.getFileByRawURL("https://raw.githubusercontent.com/nikolajbech/gitgraph/develop/src/index.js")
  }

  getReposByUsername(username){
    const url = `https://api.github.com/users/${username}/repos`
    fetch(url, this.state.header)
    .then(response => response.json())
    .then(data => {this.setState({repos: data})})
  }

  getFilesByUsernameAndRepoName = async (username, reponame, path) => {
    const fileRawsUrls = []
    const url = `https://api.github.com/repos/${username}/${reponame}/contents/${path}`
    fetch(url, this.state.header)
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
    fetch(rawURL)
    .then(response => response.json())
    .then(data => {console.log(data)})
  }
  
  renderCard(name){
    return(
      <a className="card"
      onClick={() => this.getFilesByUsernameAndRepoName("nikolajbech",name,"")}
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