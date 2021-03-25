import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Logout from "./components/Logout";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/smoothies" component={App} />
      <Route exact path="/login" component={App} />
      <Route exact path="/signup" component={App} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/profile" component={App} />
      <Route
        path="*"
        component={() => {
          return "404 error";
        }}
      />
    </Switch>
  </Router>,
  document.getElementById('root')
);