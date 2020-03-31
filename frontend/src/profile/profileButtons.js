import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setCategoryArray } from "../redux/index";

function ProfileButton(props) {
  const [category, setCategory] = useState();

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };
  const handleUploadClick = () => {
    props.handleUploadClick(true);
  };
  const handleCategory = e => {
    e.preventDefault();
    const user = { category: props.category };
    axios
      .post("http://localhost:8081/categoryRouter/category", user)
      .then(data => {
        console.log("category IN ARRAY", data.data[0].category);
        props.setCategoryArray(data.data[0].category);
        setCategory("");
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
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
    </div>
  );
}

const mapStateToProps = state => {
  return {
    categoryArray:
      state.categorySelectReducer.categoryArrayReducer.categoryArray
  };
};
export default connect(mapStateToProps, { setCategoryArray })(ProfileButton);
