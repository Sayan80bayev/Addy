import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

function useTokenExpiration(token) {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // convert to milliseconds

    const checkTokenExpiration = () => {
      const currentTime = Date.now();
      setIsExpired(currentTime >= expirationTime);
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(intervalId);
  }, [token]);
  return isExpired;
}

export default useTokenExpiration;
