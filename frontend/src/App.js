import React from "react";
import User from "./Authentication/user";
import Timeline from "./Post/timeline";
import Explore from "./Post/explore";
import Header from "./header/header";
import Footer from "./footer/footer";
import SinglePost from "./Post/singlePost";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/timeline">
            <Timeline />
          </Route>
          <Route path="/singlePost">
            <SinglePost />
          </Route>
          <Route path="/">
            <User />
          </Route>

          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
