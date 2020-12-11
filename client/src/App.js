import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Header from "./components/header/header";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import HomePage from "./components/home/home";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Instructions from "./components/Instructions/Instructions";
import TestScreen from "./components/TestScreen/TestScreen";
import Result from "./components/Result/Result";
import AuthContext from "./context/AuthContext";
import CategoryContext from "./context/CategoryContext";
import Queries from "./components/Queries/Queries";
import CategorySession from "./components/CategorySession/CategorySession";

import "./global.styles.scss";

function App() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user != null) {
      login(user);
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [history]);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear("user");
  };

  const setCategory = (category) => {
    setCurrentSelectedCategory(category);
  };

  useEffect(() => {
    if (user !== null) {
      fetch("http://localhost:5000/category", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => setCategories(result.category))
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <CategoryContext.Provider
      value={{ categories, currentSelectedCategory, setCategory }}
    >
      <AuthContext.Provider value={{ user, login, logout }}>
        <div>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (user) {
                  return <HomePage></HomePage>;
                } else {
                  history.push("/login");
                }
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/category/:cid" component={CategorySession} />
            <Route exact path="/instruction/:cid" component={Instructions} />
            <Route exact path="/testmode" component={TestScreen} />
            <Route exact path="/result" component={Result} />
            <Route exact path="/query/:cid" component={Queries} />
            <Redirect to="/" />
          </Switch>
        </div>
      </AuthContext.Provider>
    </CategoryContext.Provider>
  );
}

export default App;
