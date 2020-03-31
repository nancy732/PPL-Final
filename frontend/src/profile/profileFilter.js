import React from "react";
import { connect } from "react-redux";
import { selectCategory } from "../redux/index";

function ProfileFilter(props) {
  const buttoncategory = e => {
    props.selectCategory(e.target.name);
  };
  return (
    <div>
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
export default connect(mapStateToProps, { selectCategory })(ProfileFilter);
