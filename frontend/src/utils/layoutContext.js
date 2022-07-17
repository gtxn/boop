import React, { createContext } from "react";

const LayoutContext = createContext();

const LayoutProvider = ({ children, value }) => {
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default LayoutContext;
export { LayoutProvider };
