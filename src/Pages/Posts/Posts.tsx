import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseeUrl } from "../../Api/api";
import usePost from "../../Hooks/usePost";
import { getAllPosts } from "../../store/slices/postsSlice";
import { RootState } from "../../store/store";
import Input from "../../Components/Actions/Input";
import InputGroup from "../../Components/DataInput/InputGroup";
import Button from "../../Components/Actions/Button";

type PostType = {
  attributes: {
    title: string;
  };
};

function Posts() {
  const dispatch = useDispatch();
  // const [posts, setposts] = useState<PostsType>([]);
  const posts = useSelector((state: RootState) => state.postsSlice.posts);
  const { data, isLoading, error } = usePost();
  const [nameValue, setnameValue] = useState<string>("");

  const nameInputHandler = (e: any) => {
    setnameValue(e.target.value);
  };

  const sendHandler = () => {
    console.log(nameValue);
  };
  // console.log(posts);

  useEffect(() => {
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
      {/* <div className="border border-sky-100 my-2">
        {strapiData?.data.map((el: any, index: number) => (
          <p key={`generate-${index}`}>{el.attributes.title}</p>
        ))}
      </div> */}
      <form>
        <InputGroup
          label="Name"
          name="create-test-item"
          onChange={nameInputHandler}
        />
        <Button size="sm" variant="info" onClick={sendHandler} title="Send" />
      </form>
    </div>
  );
}

export default Posts;
