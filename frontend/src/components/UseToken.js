import { useState } from 'react';

function UseToken() {
  function getToken() {
    const userToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    return userToken || '';
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    document.cookie = `access_token=${userToken}; path=/; secure; sameSite=strict;`;
    setToken(userToken);
  }

  function removeToken() {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setToken(null);
  }

  return {
    setToken: saveToken,
    // token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o", 
    token ,
    removeToken,
  };
}

export default UseToken;
