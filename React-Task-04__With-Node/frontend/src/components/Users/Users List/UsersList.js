import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './UsersList.css';
import { useContextData } from "../../../context/UsersContext";
import { CloseCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { Modal } from 'antd';
import Pagination from '../../pagination/Pagination';

const UsersList = ({ usersPrev, deleteUserPrev, search }) => {
  const [sortBy, setSortBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(2)

  const { users, deleteUser } = useContextData();
  
  const { id } = useParams()

  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = searchParams.get('page');

  const url = new URL(window.location.href);

  // Get the search parameters from the URL
  const queryParams = url.search

  const navigate = useNavigate()


  let filterUser = users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))

  
  useEffect(() => {
    if (!isEmpty(id)) {
      setIsModalOpen(true);
    }
  }, [id]);

  // const handleOk = () => {
  //   deleteUser(id);
  //   setIsModalOpen(false);
  //   navigate(`/user/${queryParams}`);
  // };



  const handleOk = () => {
    deleteUser(id);
  
    // Check if the deleted user was the last user on the last page
    const remainingUsers = currentUsers.filter(user => user._id !== id);
    if (remainingUsers.length === 0 && currentPage > 1) {
      // Redirect to the previous page if the deleted user was the last on the last page
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      navigate(`/user?page=${previousPage}`, { replace: true });
    } else {
      setIsModalOpen(false);
      navigate(`/user?page=${currentPage}`, { replace: true });
    }
  };




  const handleCancel = () => {
    setIsModalOpen(false);
    navigate(`/user/${queryParams}`);
  };


  const sortUsers = () => {
    if (sortBy === 'username') {
      return [...filterUser].sort((a, b) => a.username.localeCompare(b.username));
    } else {
      return [...filterUser].sort((a, b) => a.age - b.age);
    }
  };

  //pagination

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortUsers().slice(indexOfFirstUser, indexOfLastUser)

  useEffect(() => {
    if (!pageParam) {
      setSearchParams({page:1})
    }
    if (!isNaN(pageParam)) {
      setCurrentPage(parseInt(pageParam));
    } else {
      setCurrentPage(1);
    }
  }, [pageParam, setSearchParams]);
  



  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log('Current Users from UsersList.js 81 ---->',currentUsers)
    navigate(`/user?page=${pageNumber}`, { replace: true });
  };
  

  return (
    <>
      {
        !isEmpty(id) && (
          <Modal
          title = "Delete User:- "
          closeIcon=<CloseCircleOutlined style={{color: 'red'}}/>
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          >
          <div className="delete__modal">
            <label style={{ color: "#BB2525", fontSize: '20px' }}>
               Are you sure you want to delete record? 🙄
            </label>
          </div>
          <br />
          </Modal>
        )
      }
      { filterUser.length > 0 &&
        <div className='userList'>
        <div className='add-sort-option'>
          <button className='addUser'>
            <Link
              to={'/user/add'}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Add User
            </Link>
          </button>
          <select name="cars" id="cars" onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="username">Username</option>
            <option value="age">Age</option>
          </select>
        </div>
        <div>
          <ul>
            {currentUsers?.map((user) => {
              return (
                <div key={user._id} className='userListItem'>
                  <li>
                    <span className='username'>{user.username}</span>
                    <span className='userAge'>Age: {user.age}</span>
                    <div className='button-container'>
                      <button className='button view-detail'>
                        <Link
                          to={`/user/${user._id}`}
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          View
                        </Link>
                      </button>
                      <button className='button'>
                        <Link
                          to={`/user/edit/${user._id}`}
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          Edit
                        </Link>
                      </button>
                      <button className='button delete'>
                        <Link
                          to={`/user/delete/${user._id}${queryParams}`}
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          Delete
                        </Link>
                      </button>
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        </div>
      }
    <div className='pagination'>
        {filterUser && filterUser.length > 0 &&
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={filterUser.length}
            currentPage={currentPage}
            paginate={handlePaginate} 
            pageParam = {pageParam}
            />}
    </div>
    </>
  );
};

export default UsersList;
