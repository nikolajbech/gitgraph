import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Home from './routes/Home'
import RepoOverview from './routes/RepoOverview'
import GraphPage from './routes/GraphPage'
import gitHubApi from './api/GitHubApi'

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: "Home",
      nameValue: 'nikolajbech',
      tokenValue: '96cc711d856507f2ec65cf313bf9697d46bc062a',
      repos: null
    }
  }
  
  nameHandleChange(event) {
    this.setState({nameValue: event.target.value});
  }

  tokenHandleChange(event) {
    this.setState({tokenValue: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let repos = null
    try{
      repos = await gitHubApi.getReposByUsername(this.state.nameValue, this.state.tokenValue)
      console.log(repos)
      this.setState({repos, currentPage: 'RepoOverview'})
    } catch(e) {
      console.log(e)
    }
  }

  onCardClicked(name) {
    console.log(name)
  }

  renderPage(){
    switch(this.state.currentPage){
      case("Home"): return (
        <Home
        nameHandleChange={this.nameHandleChange.bind(this)}
        tokenHandleChange={this.tokenHandleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        nameValue={this.state.nameValue}
        tokenValue={this.state.tokenValue}
        />
      )
      case("RepoOverview"): return <RepoOverview
        repos={this.state.repos}
        onCardClicked={this.onCardClicked.bind(this)}
      />
      case("GraphPage"): return <GraphPage/>
    }
  }

  render() {
    return(
      <div>
        {this.renderPage()}
      </div>
    )
  }
}


ReactDOM.render(<Nav />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
