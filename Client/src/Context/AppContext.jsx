import React from 'react';
import { useState } from 'react';
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
  
    return (
      <AppContext.Provider 
      value={{ 
        user, 
        setUser
        }}>
        {children}
      </AppContext.Provider>
    );
  };
  
export {AppContext,AppProvider};
