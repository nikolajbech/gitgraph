import React, { Component } from 'react';
import firebase from 'firebase';

export class FBButton extends Component{
    render(){
       return <button Intent="success" onClick={(firebase) => firebase.auth().signout()}>Sign out!</button>
    }
}