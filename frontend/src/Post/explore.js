import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginAuthentication, selectCategory } from "../redux/index";
import Post from "../profile/post";
import ProfileFeatured from "../profile/profileFeatured";
import ProfileCategory from "../profile/profileCategories";
import ProfileButton from "../profile/profileButtons";
import ProfileFilter from "../profile/profileFilter";
import LoadContent from "../profile/loadContent";

function Profile(props) {
  var show = localStorage.getItem("checkLogin");
  let history = useHistory();

  if (show == "false") {
    history.push("/login");
  }

  const [click, setClick] = useState(false);
  const [postArray, setPostArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    props.loginAuthentication(true);
    axios
      .get("http://localhost:8081/postRouter/onload")
      .then(data => {
        setPostArray(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/categoryRouter/OnloadCategory")
      .then(data => {
        setCategoryArray(data.data[0].category);
      })
      .catch(err => console.log(err));
  }, []);

  const createPost = () => {
    return (
      <div>
        <LoadContent data={postArray} />
      </div>
    );
  };

  const handleUploadClick = e => {
    setClick(e);
  };
  const handleUploadCheck = (e, result) => {
    result.comment = [];
    result.like = [];
    result.unlike = [];
    postArray.push(result);
    setPostArray([...postArray]);
  };

  return (
    <div>
      <meta charSet="utf-8" />
      <title>Home</title>
      <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
      <link
        href="css/bootstrap-responsive.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="container" style={{ width: "1171px" }}>
        <div className="content">
          <div className="content_rgt">
            <div className="rght_cate">
              <ProfileButton handleUploadClick={handleUploadClick} />
              <ProfileCategory
                categoryArray={categoryArray}
                category={category}
              />
              <ProfileFeatured />
            </div>
          </div>
          <div className="content_lft">
            <div className="contnt_1">
              <div className="list_1"></div>
              <ProfileFilter />
            </div>
            <div className={click ? "contnt_2 div_a" : null}>
              {click ? (
                <Post click={handleUploadClick} check={handleUploadCheck} />
              ) : null}{" "}
            </div>

            <div>{createPost()}</div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    checkLogin: state.userAuthenticationReducer.checkLoggedInReducer.checkLogin,
    categorySelect:
      state.categorySelectReducer.selectCategoryReducer.categorySelect,
    categoryArray:
      state.categorySelectReducer.categoryArrayReducer.categoryArray
  };
};

export default connect(mapStateToProps, {
  loginAuthentication,
  selectCategory
})(Profile);
