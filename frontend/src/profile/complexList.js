import React from "react";
import { connect } from "react-redux";

function ComplexList(props) {
  console.log("props", props);
  if (props.res.length > 5) {
    props.setLoading(true);
  }

  const post = () => {
    var res = props.res;

    if (props.categorySelect === "All") {
      const result = res.map(res => {
        return <div>{props.renderListItem(res)}</div>;
      });

      return result;
    } else if (props.categorySelect === "latest") {
      var sorted = res.reverse();

      const result = sorted.map(res => {
        return <div>{props.renderListItem(res)}</div>;
      });

      return result;
    } else if (props.categorySelect === "oldest") {
      var sorted = res.reverse();

      const result1 = sorted.map(res => {
        return <div>{props.renderListItem(res)}</div>;
      });

      return result1;
    } else if (props.categorySelect === "click") {
      var sorted = res.sort((a, b) => {
        return b.like.length - a.like.length;
      });

      const results = sorted.map(res => {
        return <div>{props.renderListItem(res)}</div>;
      });

      return results;
    } else if (props.categorySelect === "comment") {
      var sorted = res.sort((a, b) => {
        return b.comment.length - a.comment.length;
      });

      const results = sorted.map(res => {
        return <div>{props.renderListItem(res)}</div>;
      });

      return results;
    } else {
      const result = res.filter(res => {
        return res.category == props.categorySelect;
      });
      const results = result.map(res => {
        return <div>{props.renderListItem(res)}</div>;
      });

      return results;
    }
  };

  return (
    <div>
      <div className="post_txt">{props.children}</div>
      <div className="footer">{post()}</div>
      <div style={{ textAlign: "center" }}>{props.renderHeader(props)}</div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    categorySelect:
      state.categorySelectReducer.selectCategoryReducer.categorySelect
  };
};

export default connect(mapStateToProps)(ComplexList);
