import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const usePost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return data;
    },
  });
};

export default usePost;
