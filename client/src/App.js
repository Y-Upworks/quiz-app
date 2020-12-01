import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/header/header";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import HomePage from "./components/home/home";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Instructions from "./components/Instructions/Instructions";
import TestScreen from "./components/TestScreen/TestScreen";
import AuthContext from "./context/AuthContext";
import CategoryContext from "./context/CategoryContext";

import "./global.styles.scss";

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const setCategory = (category) => {
    setCurrentSelectedCategory(category);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/category", {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmEyYzk0MzJiZDE0NDA5MGVmY2Q1ZCIsImlhdCI6MTYwNjAzODU3MH0.2Kk0Pw7jt3o2kPMFzmMztL9vrU5ujJ9kSVShCHcSfB4`,
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((result) => setCategories(result.category))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, currentSelectedCategory, setCategory }}
    >
      <AuthContext.Provider value={{ user, login, logout }}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/admin" component={AdminPanel} />
              <Route exact path="/instructions" component={Instructions} />
              <Route exact path="/testmode" component={TestScreen} />
              <Redirect to="/" />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </CategoryContext.Provider>
  );
}

export default App;
