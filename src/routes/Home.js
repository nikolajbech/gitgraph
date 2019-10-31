import React from 'react';
import { Button, Intent, Spinner } from "@blueprintjs/core";
import '../styles/Home.css';
import { FBButton } from '../Components/FBButton';

export default class Home extends React.Component {
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FIREBASE_API_KEY } from '../config';

  onDrag = event => {
    event.preventDefault()
  }
firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: "gitgraphpro.firebaseapp.com"
})

  onDrop = event => {
    event.preventDefault()
    let files = event.dataTransfer.files
    console.log("files", files)
    this.setState({ files })
  }

  handleFileChange = async (e) => {
    const denpendencyObject = {}
    const files = e.target.files
    //console.log(e.target.files)
    for (let i = 0; i < files.length; i++) {

      if (files[i].name.endsWith('.js')) {
        const fileName = files[i].name
        denpendencyObject[fileName] = []

        const reader = new FileReader()
        reader.onload = event => {
          const text = event.target.result.replace('\"', '\'')
          //console.log(text)
          const textSplitted = text.split(' ').join(',').split('\n').join(',').split(',')

          let lookForDependency = false

          for (let j = 0; j < textSplitted.length; j++) {
            if (textSplitted[j] === 'import') {
              lookForDependency = true
            }

            if (lookForDependency) {
              if (textSplitted[j].startsWith('\'')) {
                const dependency = textSplitted[j].substring(
                  textSplitted[j].indexOf("\'") + 1,
                  textSplitted[j].lastIndexOf("\'")
                )

                if (dependency.length > 2) {
                  console.log(fileName, 'uses', dependency)
                  denpendencyObject[fileName].push(dependency)
                }

                lookForDependency = false
              }
            }
          }

        }
        reader.onerror = error => console.log(error) // desired file content
        reader.readAsText(files[i])
      }
    }

    console.log(denpendencyObject.toString())

  }

  render() {
    return (
      <div>
        <input style={{ color: '#333' }} directory="" webkitdirectory="" type="file" onChange={this.handleFileChange} />
      {this.state.isSignedIn ? (
        <span>
          <div>Signed In!</div>
          <FBButton fb={firebase} />
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