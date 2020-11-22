import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/header/header";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import HomePage from "./components/home/home";

import "./global.styles.scss";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
