import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { FormControl } from 'react-bootstrap';


const Header = ({ setSearch }) => {
const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setSearch(searchInput)
    setSearchInput('')
  }

  return (
    <header>
      <nav className="navbar">
        <div className="brand">
          <Link to={'/'}>Users List</Link>
        </div>
        <div className='searchBar'>
          <form className='searchBar-form' onSubmit={handleSubmit}>
            <div>
            <FormControl
              type='text'
              placeholder='Search'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            >
            </FormControl>
            </div>
            <button type='submit' className='searchButton' style={{padding: '10px'}}>Search</button>  
            <button className='search-reset-button' style={{padding: '10px'}} onClick={() => setSearchInput('')}>Reset</button>  
          </form>
        </div>
        <ul className="nav-links">
         <Link to={'/user'}>Users</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
