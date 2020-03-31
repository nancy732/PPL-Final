import React, { useState, useEffect } from "react";
import Post from "../profile/post";
import axios from "axios";
import Onload from "../profile/onload posts";
import PaginacionTabla from "../profile/pagination";
import { connect } from "react-redux";
import { loginAuthentication } from "../redux/index";
import { useHistory } from "react-router-dom";
function Timeline(props) {
  var show = localStorage.getItem("checkLogin");
  let history = useHistory();

  if (show == "false") {
    history.push("/login");
  }

  const [click, setClick] = useState(false);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState();
  const [postArray, setPostArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [buttonCategory, setButtonCategory] = useState("All");
  const [category, setCategory] = useState();

  useEffect(() => {
    props.loginAuthentication(true);

    window.scrollTo(0, 0);
    axios
      .get("http://localhost:8081/postRouter/onload")
      .then(data => {
        console.log("1st effect");
        setPostArray(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/categoryRouter/OnloadCategory")
      .then(data => {
        console.log("2nd effect");

        setCategoryArray(data.data[0].category);
      })
      .catch(err => console.log(err));
  }, []);

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handleCategory = e => {
    e.preventDefault();
    const user = { category: category };
    axios
      .post("http://localhost:8081/categoryRouter/category", user)
      .then(data => {
        console.log("category IN ARRAY", data.data[0].category);
        setCategoryArray(data.data[0].category);
        setCategory("");
      })
      .catch(err => console.log(err));
  };

  const createCategory = () => {
    const res = categoryArray;
    const result = res.map(res => {
      return (
        <div>
          <li>
            <a onClick={buttoncategory} name={res}>
              <span className="list_icon">
                <img
                  style={{ width: "40px" }}
                  src="images/animal.png"
                  alt="up"
                />
              </span>{" "}
              {res}
            </a>
          </li>
        </div>
      );
    });
    return result;
  };

  const createPost = () => {
    const res = postArray;

    if (buttonCategory === "All") {
      const result = res.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return result;
    } else {
      const result = res.filter(res => {
        return res.category == buttonCategory;
      });
      const results = result.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return results;
    }
  };

  const buttoncategory = e => {
    setButtonCategory(e.target.name);
  };

  const handleUploadClick = e => {
    setClick(e);
  };
  const handleUploadCheck = (e, result) => {
    setCheck(e);
    setData({ ...result });
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
            <div onClick={handleUploadClick} className="rght_btn">
              {" "}
              <span className="rght_btn_icon">
                <img src="images/btn_iconb.png" alt="up" />
              </span>{" "}
              <span className="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>{" "}
              <a>Upload Post</a>{" "}
            </div>
            <div className="rght_btn">
              {" "}
              <span className="rght_btn_icon">
                <img src="images/btn_icona.png" alt="up" />
              </span>{" "}
              <span className="btn_sep">
                <img src="images/btn_sep.png" alt="sep" />
              </span>{" "}
              <a>
                Add Categories
                <input
                  onChange={handleCategoryChange}
                  type="text"
                  name="category"
                  value={category}
                />
                <button onClick={handleCategory} type="submit">
                  Category
                </button>
              </a>{" "}
            </div>
            <div className="rght_cate">
              <div className="rght_cate_hd" id="rght_cat_bg">
                Categories
              </div>
              <div className="rght_list">
                <ul>
                  <li>
                    <a onClick={buttoncategory} name="Cats">
                      <span className="list_icon">
                        <img src="images/icon_01.png" alt="up" />
                      </span>{" "}
                      Cats
                    </a>
                  </li>
                  <li>
                    <a onClick={buttoncategory} name="Dogs">
                      <span className="list_icon">
                        <img src="images/icon_02.png" alt="up" />
                      </span>{" "}
                      Dogs
                    </a>
                  </li>
                  <li>
                    <a onClick={buttoncategory} name="Birds">
                      <span className="list_icon">
                        <img src="images/icon_03.png" alt="up" />
                      </span>{" "}
                      Birds
                    </a>
                  </li>
                  <li>
                    <a onClick={buttoncategory} name="Rabbits">
                      <span className="list_icon">
                        <img src="images/icon_04.png" alt="up" />
                      </span>{" "}
                      Rabbit
                    </a>
                  </li>
                  <li>
                    <a onClick={buttoncategory} name="Others">
                      <span className="list_icon">
                        <img src="images/icon_05.png" alt="up" />
                      </span>{" "}
                      Others
                    </a>
                  </li>
                  {createCategory()}
                  <li>
                    <a onClick={buttoncategory} name="All">
                      <span className="list_icon">
                        <img src="images/icon_05.png" alt="up" />
                      </span>{" "}
                      All
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rght_cate">
              <div className="rght_cate_hd" id="opn_cat_bg">
                Featured
              </div>
              <div className="sub_dwn">
                <div className="feat_sec">
                  <div className="feat_sec_img">
                    <img src="images/feat_img1.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Cats</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img">
                    <img src="images/feat_img2.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img">
                    <img src="images/feat_img3.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Rabbits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content_lft">
            <div className="timeline_div">
              <div className="timeline_div1">
                <div className="profile_pic">
                  <img src="images/timeline_img1.png" />
                  <div className="profile_text">
                    <a href="#">Change Profile Pic</a>
                  </div>
                </div>
                <div className="profile_info">
                  <div className="edit_div">
                    <a href="#">
                      Edit <img src="images/timeline_img.png" />
                    </a>
                  </div>
                  <div className="profile_form">
                    <ul>
                      <li>
                        <div className="div_name1">Name :</div>
                        <div className="div_name2">Stefiney Gibbs</div>
                      </li>
                      <li>
                        <div className="div_name1">Sex :</div>
                        <div className="div_name2">Female</div>
                      </li>
                      <li>
                        <div className="div_name1">Description :</div>
                        <div className="div_name3">
                          This is an example of a comment. You can create as
                          many comments like this one or sub comments as you
                          like and manage all of your content inside Account.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="timeline_div2">
                <ul>
                  <li>
                    <a href="#" className="active">
                      Timeline{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">About </a>
                  </li>
                  <li>
                    <a href="#">Album</a>
                  </li>
                  <li>
                    <a href="#"> Pets</a>
                  </li>
                  <li>
                    <a href="#">My Uploads </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={click ? "contnt_2 div_a" : null}>
              {click ? (
                <Post click={handleUploadClick} check={handleUploadCheck} />
              ) : null}{" "}
            </div>

            <div>
              <PaginacionTabla
                itemsperpage={5}
                nocolumns={1}
                items={createPost()}
                pagesspan={4}
              />
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    checkLogin: state.userAuthenticationReducer.checkLoggedInReducer.checkLogin
  };
};

export default connect(mapStateToProps, { loginAuthentication })(Timeline);
