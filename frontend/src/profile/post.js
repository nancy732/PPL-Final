import React, { useState, useEffect } from "react";
import axios from "axios";

function Post(props) {
  const [PostName, setPostName] = useState();
  const [category, setCategory] = useState("Select Category");
  const [categoryArray, setCategoryArray] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [file, setFile] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/categoryRouter/OnloadCategory")
      .then(data => {
        setCategoryArray(data.data[0].category);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    setPostName(e.target.value);
  };

  const handleSelect = e => {
    setCategory(e.target.value);
  };

  const handleUpload = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("email", email);
    formData.append("PostName", PostName);
    formData.append("category", category);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:8081/postRouter/upload", formData, config)
      .then(data => {
        props.click(false);
        props.check(true, data.data);
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>UPLOAD YOUR POST</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="post_txt"
          type="text"
          onChange={handleChange}
          placeholder="Name your post"
          name="PostName"
          required
        ></input>
        <select
          className="post_txt"
          onChange={handleSelect}
          name="category"
          required
        >
          <option>Select Category</option>
          <option value="Cats">Cats</option>
          <option value="Dogs">Dogs</option>
          <option value="Birds">Birds</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Others">Others</option>
          {categoryArray.map(data => {
            return <option value={data}>{data}</option>;
          })}
        </select>
        <div>
          <input
            onChange={handleUpload}
            style={{
              marginLeft: "250px",
              paddingTop: "20px",
              paddingBottom: "10px"
            }}
            type="file"
            name="avatar"
            required
          />
        </div>
        <div>
          <button style={{ marginLeft: "300px" }} type="submit">
            UPLOAD
          </button>
        </div>
      </form>
    </div>
  );
}
export default Post;
