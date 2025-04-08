import { useQuery } from "@tanstack/react-query";
import { DEV_URL } from "../../config";

export default function useShowUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: showUsersAPI,
  });
}

export const showUsersAPI = async (id) => {
  const response = await fetch(`${DEV_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const res = await response.json();

  if (res.ok) {
    return res.data;
  } else {
    throw new Error("something went wrong.");
  }
};