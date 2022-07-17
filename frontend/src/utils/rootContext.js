import React, { createContext, useState } from "react";
import Socket from "./socketClass";

const RootContext = createContext({});

const socket = new Socket();

const RootProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});

  return (
    <RootContext.Provider
      value={{
        socket,
        isAdmin,
        setIsAdmin,
        roomInfo,
        setRoomInfo,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootContext;
export { RootProvider };
