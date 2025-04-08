import { useQuery } from "@tanstack/react-query";
import { DEV_URL } from "../../config";

export default function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPostsAPI,
  });
}

export const getPostsAPI = async () => {
  const response = await fetch(`${DEV_URL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const res = await response.json();

  if (res.ok) {
    // console.log("Post data: ", res.data);
    return res.data;
  } else {
    throw new Error("something went wrong.");
  }
};