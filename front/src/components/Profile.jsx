import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Profile = ({ history }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [isUser, setIsUser] = useState(null);

  const handleDeleteAccount = async (e) => {
    await axios
      .get("/api/delete")
      .then((res) => {
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = async()=>{
    await axios
      .get("/api/currentUser")
      .then(async (res) => {
        setUserEmail(res.data.user);
        const data = res.data;
        setIsUser(data.isUser);
      })
      .catch(async (err) => {
        console.log(err);
        setUserEmail(null);
        setIsUser(err.response.data.isUser);
      });
  }

  useEffect(() => {
    fetchData();
  });

  console.log(isUser);

  if (isUser === false) {
    history.push("/login");
    return <div></div>;
  }else if(isUser === true){
    return (
        <div>
        <p>{userEmail ? `Welcome ${userEmail}` : ""}</p>
        <button onClick={(e) => handleDeleteAccount(e.target.this)}>
            Delete Account
        </button>
        </div>
    );
  }else {
    return <div>Loading...</div>;
  }
};

export default withRouter(Profile);
