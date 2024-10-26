import React from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        username: "Guest",
        userType: "guest", // Possible values: 'guest', 'player', 'master', etc.
      });
    
      const updateUser = (newUserInfo) => {
        setUser(newUserInfo);
      };
    
      return (
        <UserContext.Provider value={{ user, updateUser }}>
          {children}
        </UserContext.Provider>
      );
};