import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Menu from "./Menu";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route path="/:roomName" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
