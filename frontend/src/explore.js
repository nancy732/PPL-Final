import React, { useState, useEffect } from "react";
import Post from "./post";
import axios from "axios";
import Onload from "./onload posts";
//import InfiniteScroll from "react-infinite-scroll-component";
import ReactScrollablePagination from "react-scrollable-pagination";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { click } from "./redux/index";
const Scroller = withRouter(ReactScrollablePagination);

function Profile(props) {
  var show = localStorage.getItem("checkLogin");

  if (show == "false") {
    props.history.push("/login");
  }

  const [click, setClick] = useState(false);
  // const [check, setCheck] = useState(false);
  // const [data, setData] = useState();
  const [postArray, setPostArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [buttonCategory, setButtonCategory] = useState("All");
  const [category, setCategory] = useState();
  const [email, setemail] = useState(localStorage.getItem("email"));

  useEffect(() => {
    props.click(true);
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

  const createPost = data => {
    const res = data;

    if (buttonCategory === "All") {
      const result = res.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return result;
    } else if (buttonCategory === "latest") {
      var sorted = res.reverse();

      const result = sorted.map(sorted => {
        return (
          <div>
            <Onload res={sorted} />
          </div>
        );
      });

      return result;
    } else if (buttonCategory === "oldest") {
      var sorted = res.reverse();

      const result1 = sorted.map(sorted => {
        return (
          <div>
            <Onload res={sorted} />
          </div>
        );
      });
      console.log("sorted", sorted);

      return result1;
    } else if (buttonCategory === "click") {
      console.log("clicked");
      var sorted = res.sort((a, b) => {
        console.log(a.like.length);
        return b.like.length - a.like.length;
      });
      console.log("sorted", sorted);

      const results = sorted.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return results;
    } else if (buttonCategory === "comment") {
      console.log("clicked");
      var sorted = res.sort((a, b) => {
        console.log(a.comment.length);
        return b.comment.length - a.comment.length;
      });
      console.log("sorted", sorted);

      const results = sorted.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return results;
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
    // setCheck(e);
    console.log("result", result);
    result.comment = [];
    result.like = [];
    result.unlike = [];
    postArray.push(result);
    setPostArray([...postArray]);
  };
  useEffect(() => {
    console.log(postArray, "This is posrArrray");
  }, [postArray]);
  let x = 0;
  let scrol = <></>;
  if (postArray.length !== 0) {
    scrol = (
      <Scroller
        className="scroller"
        style={{
          height: "200vh",
          width: "auto",
          border: "1px solid white"
        }}
        pageParam="page"
        fetchData={page => {
          return new Promise((resolve, reject) => {
            try {
              resolve(postArray);
            } catch (err) {
              reject(["er"]);
            }
          });
        }}
        dataSelector={res => res}
        metaSelector={res => res.meta || { totalPages: 1 }}
        loader={<div className="loader" />}
      >
        {(data, meta) => (
          <div style={meta.totalPages > 1 ? { minHeight: "150vh" } : {}}>
            {console.log("data", data)}
            {createPost(data)}
          </div>
        )}
      </Scroller>
    );
  }
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
            <div className="contnt_1" style={{ marginBlockEnd: "30px  " }}>
              <div className="list_1"></div>
              <div className="post_div">
                <div className="post_list">
                  <ul>
                    <li>
                      <a onClick={buttoncategory} name="latest">
                        <span className="list_img">
                          <img src="images/img_1.png" />
                        </span>
                        Latest First
                      </a>
                    </li>
                    <li>
                      <a onClick={buttoncategory} name="oldest">
                        <span className="list_img">
                          <img src="images/img_2.png" />
                        </span>
                        Oldest First
                      </a>
                    </li>
                    <li>
                      <a onClick={buttoncategory} name="click">
                        <span className="list_img">
                          <img src="images/img_4.png" />
                        </span>
                        Most Clicks
                      </a>
                    </li>
                    <li>
                      <a onClick={buttoncategory} name="comment">
                        <span className="list_img">
                          <img src="images/img_5.png" />
                        </span>
                        Most Commented
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="post_txt">New Post Updates</div>
              </div>
            </div>
            <div className={click ? "contnt_2 div_a" : null}>
              {click ? (
                <Post click={handleUploadClick} check={handleUploadCheck} />
              ) : null}{" "}
            </div>

            <div>
              {" "}
              <div>{scrol}</div>
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
    email: state.user.email,
    click: state.click.click
  };
};

export default connect(mapStateToProps, { click })(Profile);
