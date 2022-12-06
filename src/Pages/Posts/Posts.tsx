import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseeUrl } from "../../Api/api";
import { getAllPosts } from "../../store/slices/postsSlice";
import { RootState } from "../../store/store";

type PostType = {
  attributes: {
    title: string;
  };
};

function Posts() {
  const dispatch = useDispatch();
  // const [posts, setposts] = useState<PostsType>([]);
  const posts = useSelector((state: RootState) => state.postsSlice.posts);
  console.log(posts);
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
    </div>
  );
}

export default Posts;
