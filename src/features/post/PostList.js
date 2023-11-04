import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "./postSlice";
import PostFrom from "./PostFrom";
import Post from "./Post";
function PostList() {
  let { post } = useSelector((state) => state.post);
  const [postData, setPostrData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  useEffect(() => {
    setPostrData(post);
    console.log(post);
  }, [postData, post]);

  console.log(post);
  return (
    <div>
      <PostFrom />
      {post.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}

export default PostList;
