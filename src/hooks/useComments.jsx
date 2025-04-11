import { useQuery } from "@tanstack/react-query";
import { comments } from "../services/adminAPI";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";

export default function useComments(params) {
  const [searchParams] = useSearchParams();

  const textSearch = searchParams.get("textSearch");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["comments", params, textSearch],
    queryFn: () => comments(params),
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { comments: data, isLoading };
}
