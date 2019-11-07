import React, { Component } from 'react';
import firebase from 'firebase'

export class FBButton extends Component{
    render(){
       return <button Intent="success" onClick={() => firebase.auth().signOut()}>Sign out!</button>
    }
}