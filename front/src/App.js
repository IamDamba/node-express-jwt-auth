import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import "./App.css";

import Home from "./components/Home";
import Smoothies from "./components/smoothies.jsx";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from './components/Profile';

function App() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(async ()=>{
    await axios.get('/api/currentUser')
    .then(async(res)=>{
      setUserEmail(res.data.user);
    })
    .catch(async(err)=>{
      console.log(err);
      setUserEmail(null);
    });
  });

  return (
    <div className="container">
      <header className="header">
        <nav>
          <div className="title">
            <Link to="/">Eat Smoothies</Link>
          </div>
          {
            userEmail ?
            <ul>
              <li>
              <p>{userEmail ? `Welcome ${userEmail}` : ''}</p>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>:
            <ul>
              <li>
              <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          }
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/smoothies" component={Smoothies} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profile} />
        <Route
          path="*"
          component={() => {
            return "404 error";
          }}
        />
      </Switch>
      <footer>
        <p>Copyright 2020 Eat Smoothies</p>
      </footer>
    </div>
  );
}

export default App;
