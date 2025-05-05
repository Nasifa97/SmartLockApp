import React, { createContext, useState } from 'react';

export const LogsContext = createContext();

export const LogsProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (action, errorMessage = null) => {
    const newLog = {
      id: Date.now().toString(),
      action,
      time: new Date().toLocaleString(),
      error: errorMessage ? true : false,
      errorMessage,
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  return (
    <LogsContext.Provider value={{ logs, addLog }}>
      {children}
    </LogsContext.Provider>
  );
};
