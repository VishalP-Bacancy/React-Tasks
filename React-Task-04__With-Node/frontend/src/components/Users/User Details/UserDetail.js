import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContextData } from "../../../context/UsersContext";
import axios from 'axios'
import './UserDetail.css';

const UserDetail = () => {
  
  const [user, setUser] = useState({})
  const { id } = useParams()
  const { users } = useContextData();

  const navigate = useNavigate();
  const isUserAvailable = Object.keys(user).length > 0;
  console.log(id)

  useEffect(() => {
    (async () => {
      const fetchData = async () => {
        const users = await axios.get(`http://localhost:8080/user`);
        console.log(users.data)
        const data = users.data.filter((user) => user._id === id);
        setUser(data[0]);
      };
  
      await fetchData();
  })();
  }, [users, id]);

    

  return (
    <div>
      {isUserAvailable && (
        <div>
          <div className='userDetail'>
            <h1 className='userDetail-title'>User Details:</h1>
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexDirection: 'column',
              }}
            >
              <h5>Username: {user.username}</h5>
              <h6>Age: {user.age}</h6>
            </div>
          </div>
          <br />
          <button className='back-button' onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
