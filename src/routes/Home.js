import React from 'react';
import '../styles/Home.css';

const logo = 'https://firebasestorage.googleapis.com/v0/b/gitgraphpro.appspot.com/o/logoHigh.png?alt=media&token=e9a1bcc9-819e-43c3-9435-b3c9770c912d'


export default class Home extends React.Component {

  render() {
    const link = <a href={'https://github.com/settings/tokens'} target="_blank">your token.</a>
    return (
      <div className={"bg"}>
        <div className={"signin"}>
          <img
            src={logo}
            style={{width: 300, height: 80, marginTop: 30, marginBottom: 20}}/>
          <p style={{paddingLeft: 20, paddingRight: 20, fontSize: 12}}>
            GitGraph® is a tool for developers to visualize git repositories for react projects. Log in with your GitHub username and {link}</p>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={this.props.nameValue}
            onChange={this.props.nameHandleChange}
            style={{marginBottom: 20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#707070', outline: 'none', fontSize: 17, width: '100%', padding: 20 }} />
          <input
            type="text"
            name="token"
            placeholder="GitHub Token"
            value={this.props.tokenValue}
            onChange={this.props.tokenHandleChange}
            style={{marginBottom: 20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#707070', outline: 'none', fontSize: 17, width: '100%', padding: 20 }} />
        <a style={{textDecoration: 'none'}} onClick={this.props.handleSubmit}>
          <div className={"fetch"}>
            <p style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>Fetch Repos</p>
          </div>
        </a>
        </div>
      </div>
    )
  }
}