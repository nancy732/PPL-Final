import React, { useState, useEffect } from "react";
import Comments from "../comment/comment";
import axios from "axios";
import { connect } from "react-redux";
import { loginAuthentication } from "../redux/index";
import { useHistory, useLocation } from "react-router-dom";
function SinglePost(props) {
  var show = localStorage.getItem("checkLogin");
  let history = useHistory();
  let location = useLocation();
  if (show == "false") {
    history.push("/login");
  }

  const [like, setLike] = useState();

  const [comment, setComment] = useState();
  const [commentSubmit, setCommentSubmit] = useState(false);
  const [commentLength, setCommentLength] = useState();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [res, setRes] = useState([]);
  const [mail, setMail] = useState([]);

  useEffect(() => {
    props.loginAuthentication(true);
    setLike(location.state.like.length);
    setCommentLength(location.state.comment.length);
    const user = {
      _id: location.state._id,
      email: email,
      comment: comment
    };

    axios
      .post("http://localhost:8081/postRouter/manageComment", user)
      .then(data => {
        setCommentSubmit(true);
        setCommentLength(data.data[0].comment.length);
        setRes(data.data[0].comment);
        setMail(data.data[0].commentMail);
      })
      .catch(err => console.log(err));
  }, []);

  const handlelikes = e => {
    e.preventDefault();
    const user = {
      _id: location.state._id,
      email: email
    };
    axios
      .post("http://localhost:8081/postRouter/manageLikes", user)
      .then(data => {
        setLike(data.data[0].like.length);
      })
      .catch(err => console.log(err));
  };

  const commentChange = e => {
    setComment(e.target.value);
  };
  const handleCommentSubmit = e => {
    e.preventDefault();
    const user = {
      _id: location.state._id,
      comment: comment,
      email: email
    };

    axios
      .post("http://localhost:8081/postRouter/manageComments", user)
      .then(data => {
        setCommentSubmit(true);
        setComment("");
        setCommentLength(data.data[0].comment.length);
        setRes(data.data[0].comment);
        setMail(data.data[0].commentMail);
      })
      .catch(err => console.log(err));
  };

  const createComment = () => {
    const result = res.map((res, index) => {
      console.log("mail", res, mail[index]);
      let mailResponse = mail[index];
      return (
        <div>
          <li>
            <Comments res={res} mailResponse={mailResponse} />
            <input type="button" defaultValue="Reply" className="orng_btn" />
          </li>
        </div>
      );
    });
    return result;
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <title>Singal Post</title>
      <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
      <link
        href="/css/bootstrap-responsive.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="container">
        <div className="contnt_2">
          <div className="div_a">
            <div className="div_title">{location.state.PostName}</div>
            <div className="btm_rgt">
              <div className="btm_arc">{location.state.category}</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft">
                <img src="/images/img_6.png" />
                {location.state.email}
              </div>
              <div className="div_top_rgt">
                <span className="span_date">
                  {new Date(location.state.date).toLocaleDateString()}
                </span>
                <span className="span_time">
                  {new Date(location.state.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="div_image">
              <img
                src={`http://localhost:8081/profile/${location.state.fileName}`}
                alt="pet"
              />
            </div>
          </div>
        </div>

        <div className="div_btm">
          <div className="btm_list">
            <ul>
              <li>
                <a>
                  <span className="btn_icon">
                    <img src="/images/icon_001.png" alt="share" />
                  </span>
                  Share
                </a>
              </li>
              <li>
                <a>
                  <span className="btn_icon">
                    <img src="/images/icon_002.png" alt="share" />
                  </span>
                  Flag
                </a>
              </li>
              <li>
                <a>
                  <span className="btn_icon">
                    <img src="/images/icon_004.png" alt="share" />
                  </span>
                  {commentLength} Comments
                </a>
              </li>
              <li>
                <a onClick={handlelikes}>
                  <span className="btn_icon">
                    <img src="/images/icon_003.png" alt="share" />
                  </span>
                  Likes
                </a>
              </li>
              <div className="like_count" style={{ marginRight: "10px" }}>
                <span className="lft_cnt" />
                <span className="mid_cnt">{like}</span>
                <span className="rit_cnt" />
              </div>
            </ul>
          </div>
        </div>
        <div className="contnt_3">
          <ul>
            {commentSubmit ? createComment() : null}
            <li>
              <div className="cmnt_div1">
                <input
                  type="text"
                  onChange={commentChange}
                  name="comment"
                  placeholder="Enter your Comment"
                  className="cmnt_bx1"
                />
                <input
                  onClick={handleCommentSubmit}
                  type="submit"
                  className="sub_bttn1"
                  defaultValue="Submit Comment"
                />
              </div>
            </li>
          </ul>
          <div className="view_div">
            <a href="/#">View more</a>
          </div>
        </div>
      </div>

      <div className="clear" />
    </div>
  );
}

const mapStateToProps = state => {
  console.log("state", state);
  return {
    checkLogin: state.userAuthenticationReducer.checkLoggedInReducer.checkLogin
  };
};

export default connect(mapStateToProps, { loginAuthentication })(SinglePost);
