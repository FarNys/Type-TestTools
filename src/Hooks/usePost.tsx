import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { baseeUrl } from "../Api/api";
import e from "express";

type AllNameType = string;
interface ElType {
  name: any;
}

const usePost = () => {
  return useQuery({
    queryKey: ["posts"],
    // staleTime: 1000,
    // refetchInterval: 5000,
    queryFn: async () => {
      const result = await fetch("https://kavinotech.com/panel/api/articles");
      const data = await result.json();
      const emptyList = [];
      for (let i = 0; i < data.data.length; i++) {
        emptyList.push(data.data[i].id);
      }

      return emptyList;
    },
  });
};

export default usePost;
