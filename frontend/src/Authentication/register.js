import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "../styles.css";

function Register(props) {
  var show = localStorage.getItem("checkLogin");
  let history = useHistory();
  if (show == "true") {
    history.push("/explore");
  }

  const [form, setState] = useState({
    Username: "",
    email: "",
    psw: "",
    repeat: "",
    PhoneNumber: ""
  });

  const handleChange = e => {
    setState({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [Class, setClass] = useState("buttonTrue");
  const [result, setResult] = useState();

  const submit = e => {
    e.preventDefault();

    const user = form;

    axios
      .post("http://localhost:8081/userRouter/user", user)
      .then(data => {
        console.log("data register", data.data);

        setResult(data.data);
        setClass("buttonFalse");
        if (data.data == "enter valid Password") {
          setActive1(true);
        } else if (data.data == "email already exist") {
          setActive(true);
        } else if (data.data == "successful") {
          history.push("/explore");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <title>Create An Account</title>
      <div className="content_rgt">
        <div className="register_sec">
          <form className="modal-content" onSubmit={submit}>
            <h1>Create An Account</h1>
            <div name="result" className="response">
              {result}
            </div>

            <ul>
              <li>
                <span>Username</span>
                <input
                  type="text"
                  style={{ color: "black" }}
                  name="Username"
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
              </li>
              <li>
                <span>Email</span>
                <input
                  type="email"
                  style={{ color: "black" }}
                  name="email"
                  className={active ? "buttonTrue" : "buttonFalse"}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </li>
              <li>
                <span>Password</span>
                <input
                  type="password"
                  style={{ color: "black" }}
                  pattern="[a-z0-9].{6,}"
                  name="psw"
                  className={active1 ? "buttonTrue" : "buttonFalse"}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </li>
              <li>
                <span>Confirm Password</span>
                <input
                  style={{ color: "black" }}
                  type="password"
                  name="repeat"
                  pattern="[a-z0-9].{6,}"
                  className={active1 ? "buttonTrue" : "buttonFalse"}
                  onChange={handleChange}
                  placeholder="Confirm your Password"
                  required
                />
              </li>
              <li>
                <span>PhoneNumber</span>
                <input
                  type="text"
                  style={{ color: "black" }}
                  pattern="[0-9]{10}"
                  name="PhoneNumber"
                  onChange={handleChange}
                  placeholder="Enter your Phone Number"
                  required
                />
              </li>
              <li>
                <input type="checkbox" required />I agree to Term &amp;
                Conditions
              </li>
              <li>
                <input type="submit" />
              </li>
            </ul>
          </form>
          <div className="addtnal_acnt">
            I already have an account.
            <Link to="/login">Login My Account !</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
