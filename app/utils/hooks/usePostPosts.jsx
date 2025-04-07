import { DEV_URL } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePostPosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPostsAPI,
    onSettled: (data, error, variables, context) => {
      console.log("Final data: ", data);
      if (data.ok) {
        queryClient.invalidateQueries(["posts"]);
        console.log("Post created successfully!");
        if (context?.onSuccess) {
          context.onSuccess();
        }
      } else {
        alert("Error creating post!", error);
      }
    },
  });
}

export const postPostsAPI = async (postData) => {
  console.log("postdata", postData);
  const response = await fetch(`${DEV_URL}/posts`, {
    method: "POST",
    headers: {
      //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  return await response.json();
};
