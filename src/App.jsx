import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import "./app.css";
import SecondLoader from "./components/SecondLoader";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [secondLoading, setSecondLoading] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
      setSecondLoading(true); // start second loading
      setTimeout(() => {
        setSecondLoading(false); // hide second loading after 3s
      }, 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
        </div>
      ) : secondLoading ? (
        <SecondLoader />
      ) : (
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      )}
    </>
  );
};

export default App;
