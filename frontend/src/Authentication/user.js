import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Forgot from "./forgot";
import Reset from "./reset";

function User() {
  return (
    <div>
      <meta charSet="utf-8" />
      <title>User</title>
      <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
      <link
        href="css/bootstrap-responsive.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="container">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Register />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/forgot">
              <Forgot />
            </Route>
            <Route path="/reset">
              <Reset />
            </Route>
          </Switch>
          <div className="content_lft">
            <h1>Welcome from PPL!</h1>
            <p className="discrptn">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.{" "}
            </p>
            <img src="images/img_9.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
