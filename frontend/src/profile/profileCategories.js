import React from "react";
import { connect } from "react-redux";
import { selectCategory } from "../redux/index";

function ProfileCategory(props) {
  const buttoncategory = e => {
    props.selectCategory(e.target.name);
  };
  const createCategory = () => {
    const res = props.categoryArray;
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

  return (
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
  );
}
const mapStateToProps = state => {
  return {
    selectCategory:
      state.categorySelectReducer.selectCategoryReducer.selectCategory
  };
};
export default connect(mapStateToProps, { selectCategory })(ProfileCategory);
