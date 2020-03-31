import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userEmailAuthentication } from "../redux/index";

function Forgot(props) {
  let history = useHistory();

  const [email, setEmail] = useState();

  const [result, setResult] = useState();

  const changeState = e => {
    setEmail(e.target.value);
    setResult("");
  };
  const submit = e => {
    e.preventDefault();

    const user = { email: email };

    axios
      .post("http://localhost:8081/userRouter/forgot", user)
      .then(data => {
        props.userEmailAuthentication(user.email);
        setResult(data.data);
        if (data.data == "change password") {
          history.push("/reset");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <title>Forgot Password</title>
      <div className="content_rgt">
        <div className="register_sec">
          <h1>Forgot Password</h1>
          <form className="modal-content" onSubmit={submit}>
            <div name="result" className="response">
              {result}
            </div>

            <ul>
              <li>
                <span>Enter E-mail ID</span>
                <input
                  type="text"
                  onChange={changeState}
                  name="email"
                  placeholder="User@gmail.com"
                  required
                />
              </li>
              <li>
                <input type="submit" defaultValue="Submit" />
                {/* {click ? <Redirect to="/reset"></Redirect> : null} */}
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
export default connect(mapStateToProps, { userEmailAuthentication })(Forgot);
