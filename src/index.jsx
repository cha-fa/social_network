import Navbar from "components/Navbar";
import Auth from "pages/Auth/Auth";
import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import Registration from "pages/Registration/Registration";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import store from "./redux/store";

const App = () => {
  return (
    <container>
      <Provider store={store}>
        <h1>New twitter</h1>
        <p>{useSelector((state) => state.isLoggedIn)} WSSSH</p>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Auth} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </Router>
      </Provider>
    </container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
