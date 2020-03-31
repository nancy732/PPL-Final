import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import Cookies from "js-cookie";
import "../styles.css";
import { userEmailAuthentication } from "../redux/index";
import { loginAuthentication } from "../redux/index";
import { connect } from "react-redux";

function Login(props) {
  var show = localStorage.getItem("checkLogin");
  let history = useHistory();
  if (show == "true") {
    history.push("/profile");
  }
  const [email, setEmail] = useState();
  const [psw, setPSW] = useState();
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [Class, setClass] = useState("buttonTrue");
  const [result, setResult] = useState();

  useEffect(() => {
    props.loginAuthentication(false);
    if (navigator.cookieEnabled) {
      setEmail(Cookies.get("email"));
      setPSW(Cookies.get("password"));
    }
    if (Cookies.get("email") !== "" && Cookies.get("password") !== "") {
      document.getElementById("remember").checked = true;
    }
  }, []);

  const changeState = e => {
    setEmail(e.target.value);
    setResult("");
    localStorage.setItem("email", email);
  };

  const changePSWState = e => {
    setPSW(e.target.value);
    setResult("");
    localStorage.setItem("email", email);
  };
  const handleCheckClick = e => {
    if (e.target.checked && email !== "" && psw !== "") {
      Cookies.set("email", email);
      Cookies.set("password", psw);
    } else {
      Cookies.remove("email");
      Cookies.remove("password");
      setEmail("");
      setPSW("");
    }
  };

  const submit = e => {
    e.preventDefault();
    const user = {
      email: email,
      psw: psw
    };

    axios
      .post("http://localhost:8081/userRouter/users", user)
      .then(data => {
        props.userEmailAuthentication(user.email);
        setResult(data.data);
        setClass("buttonFalse");
        setActive(true);

        if (data.data == "verify your email") {
          localStorage.setItem("checkLogin", true);
          localStorage.setItem("email", email);

          history.push("/explore");
        }
      })

      .catch(err => console.log(err));
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <title>Login Account</title>
      <div className="content_rgt">
        <div className="login_sec">
          <form className="modal-content" onSubmit={submit}>
            <h1>Log In</h1>

            <div name="result" className="response">
              {result}
            </div>

            <ul>
              <li>
                <span>Email</span>
                <input
                  style={{ color: "black" }}
                  type="text"
                  onChange={changeState}
                  value={email}
                  name="email"
                  className={active ? "buttonTrue" : "buttonFalse"}
                  placeholder="Enter your email"
                  required
                />
              </li>
              <li>
                <span>Password</span>
                <input
                  style={{ color: "black" }}
                  type="password"
                  onChange={changePSWState}
                  value={psw}
                  name="psw"
                  className={active1 ? "buttonTrue" : "buttonFalse"}
                  placeholder="Enter your password"
                  required
                />
              </li>
              <li>
                <input
                  id="remember"
                  name="rememberMe"
                  type="checkbox"
                  onClick={handleCheckClick}
                />
                Remember Me
              </li>
              <div>
                <input type="submit" defaultValue="Log In" />
                <Link to="/forgot">Forgot Password</Link>
              </div>
            </ul>
          </form>
          <div className="addtnal_acnt">
            I do not have any account yet.
            <Link to="/register">Create My Account Now !</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  console.log(state);
  return {
    setEmail: state.userAuthenticationReducer.userEmailReducer.setEmail,
    checkLogin: state.userAuthenticationReducer.checkLoggedInReducer.checkLogin
  };
};

export default connect(mapStateToProps, {
  userEmailAuthentication,
  loginAuthentication
})(Login);
