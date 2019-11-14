import React from 'react';
import '../styles/Home.css';

const logo = 'https://firebasestorage.googleapis.com/v0/b/gitgraphpro.appspot.com/o/logo.png?alt=media&token=8d0d85d5-8d86-4c38-834f-f1b8d61d347d'

export default class Home extends React.Component {

  render() {
    return (
      <div className={"bg"}>
        <div className={"signin"}>
          <img
          src={logo}
          style={{width: 300, height: 80, marginTop: 30}}/>
          <input type="text" name="name" />
          <input type="text" name="token" />
        <div className={"fetch"}>

        </div>
        </div>
      </div>
    )
  }
}