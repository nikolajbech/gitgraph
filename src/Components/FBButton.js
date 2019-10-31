import React, { Component } from 'react';

export class FBButton extends Component{
    render(){
       return <button Intent="success" onClick={(firebase) => firebase.auth().signout()}>Sign out!</button>
    }
}