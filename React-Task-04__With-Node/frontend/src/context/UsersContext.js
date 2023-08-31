import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const UsersData = createContext([]);

const UsersContext = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUserData = async () => {
    axios.get('http://localhost:8080/user')
    .then(response => setUsers(response.data))
    .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    getUserData();
  }, []);


  const addUser = async (data) => {
    console.log('Add user in user context', data)
    const res = await axios.post(`http://localhost:8080/user/add`, data) 
    if (res.status === 201) {
      getUserData();
    }
  };

  const deleteUser = async (id) => {
    const res = await axios.delete(`http://localhost:8080/user/delete/${id}`);
    if (res.status === 200) {
      getUserData();
    }
  };

  const editUser = async (id, data) => {
    const res = await axios.patch(`http://localhost:8080/user/edit/${id}`, data);
    if (res.status === 200) {
      getUserData();
    }
  };

  return (
    <UsersData.Provider value={{ users, addUser, deleteUser, editUser }}>{/**used in index.js so that App.js is its child and every*/}
      {children}                                                        {/**component can use it as other components are child of App.js*/}
    </UsersData.Provider>
  );
};

export function useContextData() {
  const contextValue = useContext(UsersData);   //written here so that need not to import it in every file
  return contextValue;
}

export default UsersContext;