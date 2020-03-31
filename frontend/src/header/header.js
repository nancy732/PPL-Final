import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function Header() {
  const [click, setClick] = useState(false);
  const [clickMe, setClickMe] = useState(false);
  const [logout, setLogout] = useState(false);

  const clickFunction = () => {
    setClick(!click);
    setClickMe(!clickMe);
  };
  const exploreClick = () => {
    setClick(!click);
    setClickMe(!clickMe);
  };
  const handleLogout = e => {
    setLogout(window.confirm("Are You Sure ???"));
    localStorage.setItem("checkLogin", false);
  };
  return (
    <div>
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button
              type="button"
              className="btn btn-navbar"
              data-toggle="collapse"
              data-target=".nav-collapse"
            >
              {" "}
              <span className="icon-bar" /> <span className="icon-bar" />{" "}
              <span className="icon-bar" />{" "}
            </button>
            <a className="brand">PPL</a>
            <div className="pro_info pull-right">
              <div className="pro_icn">
                <img src="/images/pic_small.png" />
              </div>
              <div className="pro_txt">
                Me
                <b className="caret" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="header_lft">
          <div className="logo">
            <a>
              <img src="/images/logo.png" />
            </a>
          </div>
          <div className="navigatn">
            <ul>
              {localStorage.getItem("checkLogin") == "true" ? (
                <li>
                  <a onClick={handleLogout}>Logout </a>
                </li>
              ) : null}
              {logout ? <Redirect to="/login"></Redirect> : null}
              {localStorage.getItem("checkLogin") == "true" ? (
                <li>
                  <a onClick={exploreClick}>Explore</a>
                </li>
              ) : null}
              {clickMe ? <Redirect to="/explore"></Redirect> : null}
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="msg_box">
            <a href="#">
              <span className="msg_count">0</span>
            </a>
          </div>
          <div className="info_div">
            <div className="image_div">
              {" "}
              <img src="/images/pic.png" />{" "}
            </div>

            {localStorage.getItem("checkLogin") == "true" ? (
              <div onClick={clickFunction} className="info_div1">
                Me
              </div>
            ) : null}
            {click ? <Redirect to="/timeline"></Redirect> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
