import { useQuery } from "@tanstack/react-query";
import { comments } from "../services/adminAPI";
import { toast } from "react-toastify";

export default function useComments(params) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["comments", params],
    queryFn: () => comments(params),
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { comments: data, isLoading };
}
