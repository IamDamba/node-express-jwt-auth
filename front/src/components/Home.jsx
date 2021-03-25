import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "../styles/home.css";

const Home = () => {
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
    <main className="home">
      <div className="content">
        <h1>Smoothie Recipes</h1>
        <h2>By Eater For Eater</h2>
        <Link to="/smoothies">View Recipes</Link>
        {userEmail ? <Link to="/profile">View Profile</Link> : null}
      </div>
    </main>
  );
};

export default Home;
