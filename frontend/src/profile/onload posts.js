import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Onload(props) {
  const [click, setClick] = useState(false);
  const [like, setLike] = useState();

  useEffect(() => {
    setLike(props.res.like.length);
  });

  const handleImageClick = e => {
    setClick(true);
  };

  return (
    <div>
      <div className="contnt_2">
        <div className="div_a">
          <div className="div_title">{props.res.PostName}</div>
          <div className="btm_rgt">
            <div className="btm_arc">{props.res.category}</div>
          </div>
          <div className="div_top">
            <div className="div_top_lft">
              <img src="images/img_6.png" />
              {props.res.email}
            </div>
            <div className="div_top_rgt">
              <span className="span_date">
                {new Date(props.res.date).toLocaleDateString()}
              </span>
              <span className="span_time">
                {new Date(props.res.date).toLocaleTimeString()}
              </span>
            </div>
          </div>
          <div className="div_image" onClick={handleImageClick}>
            <img
              src={`http://localhost:8081/profile/${props.res.fileName}`}
              alt="pet"
            />
          </div>

          {click ? (
            <Redirect to={{ pathname: "/singlePost", state: props.res }} />
          ) : null}
          <div className="div_btm">
            <div className="btm_list">
              <ul>
                <li>
                  <a href="#">
                    <span className="btn_icon">
                      <img src="images/icon_001.png" alt="share" />
                    </span>
                    Share
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="btn_icon">
                      <img src="images/icon_002.png" alt="share" />
                    </span>
                    Flag
                  </a>
                </li>
                <li>
                  <a onClick={handleImageClick}>
                    <span className="btn_icon">
                      <img src="images/icon_004.png" alt="share" />
                    </span>
                    {props.res.comment.length} Comments
                  </a>
                </li>
                <li>
                  <a onClick={handleImageClick}>
                    <span className="btn_icon">
                      <img src="images/icon_003.png" alt="share" />
                    </span>
                    Likes
                  </a>
                </li>
                <div className="like_count" style={{ marginRight: "10px" }}>
                  <span className="lft_cnt" />
                  <span className="mid_cnt">{props.res.like.length}</span>
                  <span className="rit_cnt" />
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onload;
