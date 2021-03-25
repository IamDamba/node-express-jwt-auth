import React from "react";
import { Link } from "react-router-dom";


const Pagination = ({ totalPosts, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <=totalPosts; i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <Link onClick={() => paginate(number)} to="#" className="page-link">
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
