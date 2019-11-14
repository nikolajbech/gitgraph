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
      const fileRawsUrls = []
      const url = `https://api.github.com/repos/${username}/${reponame}/contents/${path}`
      await fetch(url, {header: {"headers":{"Authorization": `Bearer ${token}`}}})
      .then(response => response.json())
      .then(data => {
        data.forEach( async (obj) => {
          if (obj.type === "file") {
            if (obj.name.endsWith(".js")){
              fileRawsUrls.push(obj.download_url)
              console.log(obj.download_url)
            }
          } else if (obj.type === "dir") {
            const newPath = path + obj.name + "/"
            const getFileRawsUrls = await this.getFilesByUsernameAndRepoName(username, reponame, newPath)
            fileRawsUrls.concat(getFileRawsUrls)
            resolve(fileRawsUrls)
          }
        })
      })
    })
  }

  getFileByRawURL(rawURL, token){
    fetch(rawURL,{header: {"headers":{"Authorization": `Bearer ${token}`}}})
    .then(response => response.json())
    .then(data => {console.log(data)})
  }
}

const gitHubApi = new GitHubApi()
export default gitHubApi