import React from "react";
import User from "./user";
import Timeline from "./timeline";
import Explore from "./explore";
import Header from "./header";
import Footer from "./footer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import SinglePost from "./singlePost";

function App(props) {
  console.log("props redux", props);
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route path="/explore" render={props => <Explore {...props} />} />
          <Route path="/timeline" render={props => <Timeline {...props} />} />
          <Route
            path="/singlePost"
            render={props => <SinglePost {...props} />}
          />
          <Route path="/" render={props => <User {...props} />} />
          <Redirect from="*" to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
