import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/header/header";
import HomePage from "./components/home/home";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
