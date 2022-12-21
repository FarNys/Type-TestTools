import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { baseeUrl } from "../Api/api";
import e from "express";

export const useGetTest = () => {
  return useQuery({
    queryKey: ["testPosts"],
    // staleTime: 1000,
    // refetchInterval: 5000,
    queryFn: async () => {
      const result = await fetch("http://localhost:1337/api/tests");
      const data = await result.json();
      return data;
    },
  });
};

export const useCreateTest = () => {
  const createTest = async () => {
    const res = await fetch(`http://localhost:1337/api/tests`, {
      method: "POST",
      body: JSON.stringify({
        data: {
          test: "HI ALL",
        },
      }),
    });
    return await res.json();
  };
  const { isLoading, isError, error, mutate } = useMutation(createTest);
  return { isLoading, isError, error, mutate };
};
