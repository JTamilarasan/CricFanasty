import React, { createContext, useState, useEffect } from "react";

export const ViewportContext = createContext();

export const ViewportProvider = ({ children }) => {
  const [viewport, setViewport] = useState(
    window.innerWidth <= 768 ? "mobile" : "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      setViewport(window.innerWidth <= 768 ? "mobile" : "desktop");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ viewport }}>
      {children}
    </ViewportContext.Provider>
  );
};
