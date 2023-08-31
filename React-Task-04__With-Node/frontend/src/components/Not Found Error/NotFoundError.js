import React, { useEffect, useState } from 'react';
import './NotFoundError.css';

const NotFoundError = ({errorMessage}) => {
  const [isErrorMessage, setIsErrorMessage] = useState(false)
  
  useEffect(() => {
    if (errorMessage) {
      setIsErrorMessage(true)
    }
  }, [isErrorMessage, errorMessage])

  return (
    <div className="not-found-container">
      <h1 className='not-found-title'>404 Error</h1>
      {!isErrorMessage && <p className='not-found-content'>Oops! You entered a wrong URL!.</p>}
      {isErrorMessage && <p className='not-found-content'>{errorMessage}</p>}
    </div>
  );
};

export default NotFoundError;
