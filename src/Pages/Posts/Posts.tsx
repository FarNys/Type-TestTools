import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseeUrl } from "../../Api/api";
import usePost from "../../Hooks/usePost";
import { getAllPosts } from "../../store/slices/postsSlice";
import { RootState } from "../../store/store";
import axios from "axios";

type PostType = {
  attributes: {
    title: string;
  };
};

interface El {
  id: number;
  attributes: {};
}

function Posts() {
  const dispatch = useDispatch();
  // const [posts, setposts] = useState<PostsType>([]);
  const posts = useSelector((state: RootState) => state.postsSlice.posts);
  const { data, isLoading, error } = usePost();
  console.log(data, isLoading);
  // console.log(posts);

  useEffect(() => {
    // let cleanUp = true;

    const fetchPosts = async () => {
      const res = await fetch(`${baseeUrl}/api/articles?populate=*`);
      const data = await res.json();
      dispatch(getAllPosts({ posts: data.data }));
    };
    fetchPosts();

    // return () => (cleanUp = false);
  }, []);

  if (!posts) return <p>error</p>;
  return (
    <div data-testid="postParent" className="post-parent">
      {posts.map((el: PostType, index) => (
        <div key={`post-${index}`} data-cy="single-post">
          <span>{index} </span>
          <p data-testid="post">{el.attributes.title}</p>
        </div>
      ))}
      {/* {data?.data.map((el: El, index: number) => (
        <p key={`generate-${index}`}>{el.id}</p>
      ))} */}
    </div>
  );
}

export default Posts;
