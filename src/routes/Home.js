import React from 'react';
import '../styles/Home.css';

const logo = 'https://firebasestorage.googleapis.com/v0/b/gitgraphpro.appspot.com/o/logoHigh.png?alt=media&token=e9a1bcc9-819e-43c3-9435-b3c9770c912d'

export default class Home extends React.Component {

  render() {
    return (
      <div className={"bg"}>
        <div className={"signin"}>
          <img
          src={logo}
          style={{width: 300, height: 80, marginTop: 30, marginBottom: 20}}/>
          <input type="text" name="name" placeholder="Username" style={{marginBottom: 20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#707070', outline: 'none', fontSize: 17, width: '100%', padding: 20 }} />
          <input type="text" name="token" placeholder="GitHub Token" style={{marginBottom: 20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#707070', outline: 'none', fontSize: 17, width: '100%', padding: 20 }} />
        <a style={{textDecoration: 'none'}} onClick={() => console.log("clicked")}>
          <div className={"fetch"}>
            <p style={{color: 'white', fontSize: 24}}>Fetch Repos</p>
          </div>
        </a>
        </div>
      </div>
    )
  }
}