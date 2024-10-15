import React from 'react';
import { useState } from 'react';
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [postWindow,setPostWindow] = useState(false);
    return (
      <AppContext.Provider 
      value={{ 
        user, 
        setUser,
        postWindow,
        setPostWindow
        }}>
        {children}
      </AppContext.Provider>
    );
  };
  
export {AppContext,AppProvider};
