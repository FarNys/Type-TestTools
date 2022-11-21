import React, { useEffect, useState } from "react";
import { PostsType } from "./PostsType";

function Posts() {
  const [posts, setposts] = useState<PostsType>([]);

  useEffect(() => {
    // let cleanUp = true;

    const fetchPosts = async () => {
      const res = await fetch(
        `http://192.168.1.99:1337/api/articles?populate=*`
      );
      const data = await res.json();
      //   console.log(data);
      setposts(data.data);
    };
    fetchPosts();

    // return () => (cleanUp = false);
  }, []);
  if (!posts) return <p>error</p>;
  return (
    <div data-testid="postParent" className="post-parent">
      {posts.map((el, index) => (
        <div key={`post-${index}`}>
          <span>{index} </span>
          <p data-testid="post">{el.attributes.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
