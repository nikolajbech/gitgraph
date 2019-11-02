import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Tab, Tabs } from "@blueprintjs/core";

import Home from './routes/Home'
import SignUp from './routes/SignUp'
import Login from './routes/Login'
import RepoOverview from './routes/RepoOverview'
import GraphPage from './routes/GraphPage'
import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
} from "@blueprintjs/core";

export default class Nav extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>GitGraph</Navbar.Heading>
              <Navbar.Divider />
              <Link to="/repooverview">
                <Button className="bp3-minimal" text="Projects" />
              </Link>
              <Link to="/login">
                <Button className="bp3-minimal" text="Account" />
              </Link>
              <Link to="/signup">
                <Button className="bp3-minimal" text="Settings" />
              </Link>
              <Link to="/graphpage">
                <Button className="bp3-minimal" text="GitGraph" />
              </Link>
            </Navbar.Group>
          </Navbar>
          <div className="body">
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/repooverview" component={RepoOverview} />
            <Route path="/graphpage" component={GraphPage} />
          </div>
        </div>
      </Router>
    )
  }
}


ReactDOM.render(<Nav />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
