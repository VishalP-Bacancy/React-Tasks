import React from 'react';
import './Pagination.css';
import { Link } from 'react-router-dom';

const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate, pageParam }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const isPageAvailable = pageNumbers.includes(+pageParam)

  return (
    <div>
    {isPageAvailable && 
    <nav>     
     <ul className='pagination'>
       {currentPage > 1 && (
         <li className='page-item'>
           <button className='page-link'>
             <Link
               to={`/user?page=${currentPage - 1}`}
               onClick={() => paginate(currentPage - 1)} 
             >
                  Previous
             </Link>
           </button>
         </li>
       )}
       {pageNumbers.map((pageNumber) => (
         <li key={pageNumber} className={pageNumber === currentPage ? 'page-item active' : 'page-item'}>
           <button className='page-link'>
             <Link
               to={`/user?page=${pageNumber}`}
               onClick={() => paginate(pageNumber)} 
             >
               {pageNumber}
             </Link>
           </button>
         </li>
       ))}
       {currentPage < pageNumbers.length && (
         <li className='page-item'>
           <button className='page-link'>
             <Link
               to={`/user?page=${currentPage + 1}`}
               onClick={() => paginate(currentPage + 1)} 
             >
               Next
             </Link>
           </button>
         </li>
        )}
      </ul>
     </nav>
    }
   </div>
  );
};

export default Pagination;
