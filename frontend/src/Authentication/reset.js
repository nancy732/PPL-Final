import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

function Reset(props) {
  const [psw, setPSW] = useState();
  const [repeat, setRepeat] = useState();
  const [result, setResult] = useState();
  let history = useHistory();
  const handleChange = e => {
    setPSW(e.target.value);
  };
  const handleRepeat = e => {
    setRepeat(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("reset email called");

    const user = {
      email: props.setEmail,
      psw: psw,
      repeat: repeat
    };

    axios
      .post("http://localhost:8081/userRouter/reset", user)
      .then(data => {
        setResult(data.data);
        if (data.data == "password changed") {
          history.push("/login");
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <meta charSet="utf-8" />
      <div className="content_rgt">
        <div className="register_sec">
          <h1>Reset Password</h1>
          <div name="result" className="response">
            {result}
          </div>

          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <span>Enter New Password</span>
                <input
                  onChange={handleChange}
                  pattern="[a-z0-9].{6,}"
                  type="text"
                  placeholder="Enter your new password"
                  name="psw"
                  required
                />
              </li>
              <li>
                <span>Confirm Password</span>
                <input
                  onChange={handleRepeat}
                  type="text"
                  placeholder="Enter your password again"
                  name="repeat"
                  required
                />
              </li>
              <li>
                <input type="submit" defaultValue="Submit" />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  console.log("state", state);
  return {
    setEmail: state.userAuthenticationReducer.userEmailReducer.setEmail
  };
};

export default connect(mapStateToProps)(Reset);
