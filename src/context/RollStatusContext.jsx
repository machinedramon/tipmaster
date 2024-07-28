/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const RollStatusContext = createContext(null);

export const useRollStatus = () => useContext(RollStatusContext);

export const RollStatusProvider = ({ children }) => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setGameData(data);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      ws.close();
    };
  }, []);

  const value = {
    gameData,
    setGameData,
  };

  return (
    <RollStatusContext.Provider value={value}>
      {children}
    </RollStatusContext.Provider>
  );
};
