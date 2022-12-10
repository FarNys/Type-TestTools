import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const usePost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:1337/api/generateds");
      return data;
    },
  });
};

export default usePost;
