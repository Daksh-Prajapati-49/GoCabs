import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page after 10 seconds
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 10000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div>
      <p>NotFound</p>
      <p>Redirecting to the home page in 10 seconds...</p>
    </div>
  );
};

export default NotFound;
