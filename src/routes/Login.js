import React from 'react'

import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FIREBASE_API_KEY } from '../config';

import { FBButton } from '../components/FBButton';
import { FBImage } from '../components/FBImage';

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: "gitgraphpro.firebaseapp.com"
})

export default class Login extends React.Component {
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
          <FBButton fb={firebase} />
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <FBImage fb={firebase} />
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