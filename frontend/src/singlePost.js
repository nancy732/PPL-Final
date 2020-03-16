import React, { useState, useEffect } from "react";
import Comments from "./comment";
import axios from "axios";
import { connect } from "react-redux";
import { click } from "./redux/index";

function SinglePost(props) {
  var show = localStorage.getItem("checkLogin");

  if (show == "false") {
    props.history.push("/login");
  }

  const [like, setLike] = useState();

  const [comment, setComment] = useState();
  const [unlike, setUnlike] = useState();
  const [commentSubmit, setCommentSubmit] = useState(false);
  const [commentLength, setCommentLength] = useState();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [res, setRes] = useState([]);
  const [mail, setMail] = useState([]);

  useEffect(() => {
    props.click(true);
    setLike(props.location.state.like.length);
    setUnlike(props.location.state.unlike.length);
    setCommentLength(props.location.state.comment.length);
    const user = {
      _id: props.location.state._id,
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
      _id: props.location.state._id,
      email: email
    };
    axios
      .post("http://localhost:8081/postRouter/manageLikes", user)
      .then(data => {
        setLike(data.data[0].like.length);
      })
      .catch(err => console.log(err));
  };

  const handleUnlikes = e => {
    e.preventDefault();
    const user = {
      _id: props.location.state._id,
      email: email
    };
    axios
      .post("http://localhost:8081/postRouter/manageUnlike", user)
      .then(data => {
        setUnlike(data.data[0].unlike.length);
      })
      .catch(err => console.log(err));
  };
  const commentChange = e => {
    setComment(e.target.value);
  };
  const handleCommentSubmit = e => {
    e.preventDefault();
    const user = {
      _id: props.location.state._id,
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
            <div className="div_title">{props.location.state.PostName}</div>
            <div className="btm_rgt">
              <div className="btm_arc">{props.location.state.category}</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft">
                <img src="/images/img_6.png" />
                {props.location.state.email}
              </div>
              <div className="div_top_rgt">
                <span className="span_date">
                  {new Date(props.location.state.date).toLocaleDateString()}
                </span>
                <span className="span_time">
                  {new Date(props.location.state.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="div_image">
              <img
                src={`http://localhost:8081/profile/${props.location.state.fileName}`}
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
              <li>
                <a onClick={handleUnlikes}>
                  <span className="btn_icon">
                    <img src="/images/icon_003.png" alt="share" />
                  </span>
                  Unlike
                </a>
              </li>
              <div className="like_count">
                <span className="lft_cnt" />
                <span className="mid_cnt">{unlike}</span>
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
    click: state.click.click
  };
};

export default connect(mapStateToProps, { click })(SinglePost);
