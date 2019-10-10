import React from 'react'
import { Button, Intent, Spinner } from "@blueprintjs/core";
import '../styles/Home.css'

export default class Home extends React.Component {
  render() {
    return(
      <div>
        <h1>Home</h1>
        <Button intent="success" text="button content" />

      </div>
    )
  }
}