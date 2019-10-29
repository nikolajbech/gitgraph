import React from 'react'
import { Button, Intent, Spinner } from "@blueprintjs/core";
import '../styles/Home.css'

import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyCTEYl4ZF6SXsQ3rqu1OUTQnlcYRsGBG8M",
  authDomain: "gitgraphpro.firebaseapp.com"
})

export default class Home extends React.Component {
  state={isSignedIn: false}
  uiConfig = {
    signInFlow: "popup", 
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user})
      console.log("user",user)
    })
  }

  render() {
    return(
      <div>
      {this.state.isSignedIn ? (
        <span>
          <div>Signed In!</div>
          <button Intent="success" onClick={() => firebase.auth().signOut()}>Sign out!</button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <img
            alt="profile picture"
            src={firebase.auth().currentUser.photoURL}
          />
        </span>
      ) : (
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
      </div>
    )
  }
}