import { DEV_URL } from "../../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdatePosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostsAPI,
    onSuccess: (data, variables, context) => {
      console.log("Updated data: ", data);
      queryClient.setQueryData(["posts", { id: variables[0] }], data);
      queryClient.invalidateQueries(["posts"]);
      console.log("Post updated successfully!");
      if (context?.onSuccess) {
        context.onSuccess();
      }
    },
    onError: (error) => {
      alert("Error updating post!", error);
    }
  });
}

export const updatePostsAPI = async (data) => {
  const [id, postData] = data;
  console.log("ID: ", id);
  console.log("Data: ", postData);

  const response = await fetch(`${DEV_URL}/posts/${id}?_method=PATCH`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Failed to update post');
  }

  return await response.json();
};