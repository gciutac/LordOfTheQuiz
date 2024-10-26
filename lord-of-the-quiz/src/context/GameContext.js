import React from "react";

export const GameContext = React.createContext();

export const GamerProvider = ({ children }) => {
    const [game, setGame] = React.useState({
        gameId: "",
        gameKey: "", 
      });
    
      const updateGame = (newGameInfo) => {
        setGame(newGameInfo);
      };
    
      return (
        <GameContext.Provider value={{ game, updateGame }}>
          {children}
        </GameContext.Provider>
      );
};