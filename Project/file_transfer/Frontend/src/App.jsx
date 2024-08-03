import React, { useState } from 'react';
import Auth from './Components/Auth';
import FileTransfer from './Components/FileTransfer';

const App = () => {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div>
      {!token ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <FileTransfer token={token} />
      )}
    </div>
  );
};

export default App;
