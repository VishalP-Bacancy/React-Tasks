import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import UsersList from './components/Users/Users List/UsersList';
import UserDetail from './components/Users/User Details/UserDetail';
import NotFoundError from './components/Not Found Error/NotFoundError';
import AddUser from './components/Users/Add User/AddUSer';
import { useState } from 'react';
import { usersList } from './usersList';

function App() {

  const [users, setUsers] = useState(usersList)
  const [search, setSearch] = useState('')

  const addUser = (userName, age) => {
    setUsers([...users, {username: userName, age: age, id: users.length + 1}])    
  }

  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== +userId))
  }

  const editUser = (editedUsers) => {
    setUsers(editedUsers)
  }


  
  return (
    <div>
     <BrowserRouter>
      <Header setSearch={setSearch}/>
       <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/user' element={<UsersList users={users} search={search}/>} />
          <Route path='/user/:id' element={<UserDetail users={users}/>} />
          <Route path='/user/add' element={<AddUser addUser={addUser} />} />
          <Route path='/user/edit/:id' element={<AddUser editUser = {editUser} users = {users} isEdit = {true}/>}/>
          <Route path='/user/delete/:id' element={<UsersList deleteUser={deleteUser} users={users} search={search} />} />
          <Route path='*' element={<NotFoundError />}/>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
