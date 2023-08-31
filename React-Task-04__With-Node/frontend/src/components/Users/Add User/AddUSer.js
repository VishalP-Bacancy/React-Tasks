import React, { useEffect, useState } from 'react';
import './AddUser.css'; // Import the associated CSS file
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { useContextData } from '../../../context/UsersContext';
import { isEmpty } from 'lodash';


const ErrorModal = ({ error, setError }) => {
  return (
     <div className='error-modal'>
      <h2>{error?.title}</h2><br />{error?.message}<button className='error-button' onClick={()=>setError(null)}>Close</button>
     </div>
   )
}



const AddUser = () => {
  const { id } = useParams()
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [error, setError] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const {  addUser, editUser } = useContextData();

  const navigate = useNavigate()



  useEffect(() => {
    setIsEdit(!isEmpty(id));
    if (isEdit) {
      (async () => {
        const fetchData = async () => {
            const user = await axios.get(`http://localhost:8080/user/${id}`);
            setUserName(user.data.username)
            setUserAge(user.data.age)
        };
    
        await fetchData();
    })();
    }
  }, [id, isEdit])
  
  /**   another way ----->>
   *   
   useEffect(() => {
    setIsEdit(!isEmpty(id));
    if (isEdit) {
      axios.get(`http://localhost:8080/user/${id}`)
        .then(response => {
          setUserName(response.data.username);
          setUserAge(response.data.age);
        })
        .catch(error => {
          setError({
            title: 'Error',
            message: 'Failed to fetch user data',
          });
        });
    }
  }, [id, isEdit]);
   */

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setUserAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName.trim().length === 0 || userAge === '') {
      setError({
          title: "Invalid Input",
          message: `Please enter a valid Username and Age⚠`
      })
      return;
  }
  if (+userAge < 1) {
      setError({
          title: "Invalid Age",
          message: `Enter a valid age! (> 0) 😒`
      })
      return;
    }
    
    if (isEdit) {
      editUser(id, {userName, userAge})
    } else {
      addUser({userName, userAge})
    }
    
    navigate(-1)
  };


  

  return (
    <>
      {error && (<ErrorModal error={error} setError={setError}/>)}
      <div className="add-user">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={userName} onChange={handleNameChange} />
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" value={userAge} onChange={handleAgeChange} />
        </div>
        <button type="submit" className='add-btn'>{isEdit? 'Update': 'Add User'}</button>
        <button className='backButton'>
        <Link
          to={'/user'}
              style={{ textDecoration: 'none', color: 'white' }}
              onClick={() => navigate(-1)}
          > 
            Back
          </Link>  
        </button>
      </form>
      </div>
    </>
  );
};

export default AddUser;
