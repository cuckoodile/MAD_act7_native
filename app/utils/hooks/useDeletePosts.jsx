import { DEV_URL } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeletePosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostsAPI,
    onSettled: (data) => {
      if (data.ok) {
        queryClient.invalidateQueries(["products"]);
        alert("Post Deleted!");
      } else {
        alert("Error deleting!");
      }
    },
  });
}

export const deletePostsAPI = async (id) => {
  console.log("Reference ID: ", id);

  const response = await fetch(`${DEV_URL}/posts/${id}`, {
    method: "DELETE",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  console.log("Delete res: ", response);
  return await response.json();
};
