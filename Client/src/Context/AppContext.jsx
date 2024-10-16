import React from 'react';
import { useState } from 'react';
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [postWindow,setPostWindow] = useState(false);
    const [posts,setPosts] = useState();

    return (
      <AppContext.Provider 
      value={{ 
        user, 
        setUser,
        postWindow,
        setPostWindow,
        posts,
        setPosts
        }}>
        {children}
      </AppContext.Provider>
    );
  };
  
export {AppContext,AppProvider};
