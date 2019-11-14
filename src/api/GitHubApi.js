class GitHubApi {
  getReposByUsername = async (username, token) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.github.com/users/${username}/repos`
      fetch(url, {header: {"headers":{"Authorization": `Bearer ${token}`}}})
      .then(response => response.json())
      .then(data => {resolve(data)})
    })
  }
    
  getFilesByUsernameAndRepoName = async (username, reponame, path, token) => {
    return new Promise( async (resolve, reject) => {
      const rawFiles = []
      const url = `https://api.github.com/repos/${username}/${reponame}/contents/${path}`
      await fetch(url, {header: {"headers":{"Authorization": `Bearer ${token}`}}})
      .then(response => response.json())
      .then(data => {
        data.forEach( async (obj) => {
          if (obj.type === "file") {
            if (obj.name.endsWith(".js")){
              const file = await this.getFileByRawURL(obj.download_url, token)
              console.log(file)
              rawFiles.push(file)
            }
          } else if (obj.type === "dir") {
            const newPath = path + obj.name + "/"
            const getrawFiles = await this.getFilesByUsernameAndRepoName(username, reponame, newPath)
            rawFiles.concat(getrawFiles)
            resolve(rawFiles)
          }
        })
      })
    })
  }

  getFileByRawURL = async (rawURL, token) => {
    return new Promise( async (resolve, reject) => {
      fetch(rawURL,{header: {"headers":{"Authorization": `Bearer ${token}`}}})
      .then(function (response){return response.text()})
      .then(function (response){resolve(response)})
    })
  }

}

const gitHubApi = new GitHubApi()
export default gitHubApi