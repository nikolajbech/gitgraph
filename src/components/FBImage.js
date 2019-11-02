import React, { Component } from 'react';
import firebase from 'firebase'

export class FBImage extends Component{
    render(){
       return <img
       alt="profile picture"
       src={firebase.auth().currentUser.photoURL}
     />
    }
}