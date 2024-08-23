import { useState } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

const MiddleView = () => {
  return (
    <>
      <section>
        <p>Middle view</p>
        <CreatePost />
        <br />
        <br />
        <br />
        <PostCard />
      </section>
    </>
  );
};

export default MiddleView;
