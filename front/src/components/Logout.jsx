import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Logout = ({ history }) => {
  useEffect(() => {
    const fetchLogout = async () => {
      await axios
        .get("/api/logout")
        .then((res) => {
          setTimeout(() => {
            history.push("/");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchLogout();
  }, []);

  return <div>Loading...</div>;
};

export default withRouter(Logout);
