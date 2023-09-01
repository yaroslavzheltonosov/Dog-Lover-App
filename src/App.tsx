import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import FavoriteDogs from "./components/FavoriteDogs";
import { User, DogContextProperties } from "./types";

const defaultUser: User = {
  loggedIn: false,
  email: "",
  name: "",
  selectedDogs: [],
  favoriteDogs: [],
  currentPage: 0,
  nextQueryParams: "",
  prevQueryParams: "",
};

export const DogContext = React.createContext<DogContextProperties>({
  stateContext: defaultUser,
  setStateContext: () => {},
});

export const handleClearContext = (context: DogContextProperties, customMessage?: string) => {
  context.setStateContext((prevState: User) => ({
    ...prevState,
    loggedIn: false,
    email: '',
    name: '',
    currentPage: 0,
    nextQueryParams: '',
    prevQueryParams: '',
    favoriteDogs: [],
    selectedDogs: [],
  }));

  alert(customMessage || "Dog search failed. For security reasons you have been logged out. Please try again or contact support.");
};

const App = () => {
  const getLocalStorageValues = localStorage.getItem("dogContext") || '';
  const getUserData = (getLocalStorageValues?.length > 1 && JSON.parse(getLocalStorageValues)) || defaultUser;
  const [stateContext, setStateContext] = useState<User>(getUserData);

  useEffect(() => {
    localStorage.setItem("dogContext", JSON.stringify(stateContext));
  }, [stateContext]);

  return (
    <DogContext.Provider value={{ stateContext, setStateContext }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorite" element={<FavoriteDogs />} />
        </Routes>
      </Router>
    </DogContext.Provider>
  );
};

export default App;
