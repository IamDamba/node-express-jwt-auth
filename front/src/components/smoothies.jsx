import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Pagination from '../components/Pagination';

const Smoothies = ({ history }) => {
  const [isGood, setIsGood] = useState(null);
  const [smoothies, setSmoothies] = useState([]);
  const [page, setPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(3);

  const paginate = (pageNumber)=> setCurrentPage(pageNumber)

  const fetchDataSmoothies = async () => {
    await axios
      .get(`/api/smoothies/fetch?page=${currentPage}&limit=${limit}`)
      .then(async (res) => {
        setSmoothies(res.data.results);
        setPage(res.data.count);
      })
      .catch(async (err) => {
        console.log(err);
      });
  };
  const fetchToken = async () => {
    await axios
    .get("/api/smoothies")
    .then(async (res) => {
      const data = res.data;
      setIsGood(data.isGood);
    })
    .catch(async (err) => {
      const data = await err.response.data;
      await console.log(data.err);
      setIsGood(data.isGood);
    });
  };
  
  useEffect(() => {
    fetchToken();
    if(isGood){
      fetchDataSmoothies();
    }
  }, [currentPage, isGood]);

  if (isGood === false) {
    history.push("/login");
    return <div></div>;
  } else if (isGood === true) {
    return (
      <main>
        {smoothies.map((smoothie, index)=>(
            <p key={index}>{smoothie.name}</p>
        ))}
        <div>
          {currentPage > 1 ?
            <button onClick={()=> setCurrentPage(currentPage - 1)} >{'<'}</button>
            : null
          }
          <Pagination
          totalPosts={page}
          paginate={paginate}/>
          {currentPage < page ?
            <button onClick={()=> setCurrentPage(currentPage + 1)} >{'>'}</button>
            : null
          }
        </div>
      </main>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default withRouter(Smoothies);
