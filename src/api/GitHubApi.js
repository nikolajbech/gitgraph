class GitHubApi {
  getReposByUsername = async (username, token) => {
    return new Promise((resolve, reject) => {
      //console.log(token)
      const url = `https://api.github.com/users/${username}/repos`
      let headers = {"Content-Type": "application/json"};
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }
      fetch(url, {headers,})
      .then(response => response.json())
      .then(data => {resolve(data)})
    })
  }
  
  getFilesByUsernameAndRepoName = async (username, reponame, path, token, addNode, forceUpdate) => {
    return new Promise( async (resolve, reject) => {
      const rawFiles = []
      //console.log(token)
      let headers = {"Content-Type": "application/json"};

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }     

      const url = `https://api.github.com/repos/${username}/${reponame}/contents/${path}`
      fetch(url, {headers,})
      .then(response => response.json())
      .then(data => {
        data.forEach( async (obj) => {
          if (obj.type === "file") {           
              /* if (obj.name.endsWith(".js")){ */
            const name = obj.name/*    */;
              /*console.log(name) */
            const file = await this.getFileByRawURL(obj.download_url, token)
            //console.log(file)
            addNode(name, file)
            forceUpdate()
            rawFiles.push({[name]: file})
            /* } */
          } else if (obj.type === "dir") {
            const newPath = path + obj.name + "/"
            const getrawFiles = await this.getFilesByUsernameAndRepoName(username, reponame, newPath, token, addNode, forceUpdate)
            rawFiles.concat(getrawFiles)
          }
        })
      })
      console.log("raw output files: " + rawFiles);
      resolve(rawFiles)
    })
  }

  getFileByRawURL = async (rawURL, token) => {
    /*let headers = {};
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }*/
    return new Promise( async (resolve, reject) => {
      fetch(rawURL)
      .then(function (response){return response.text()})
      .then(function (response){resolve(response)})
    })
  }

}

const gitHubApi = new GitHubApi()
export default gitHubApi