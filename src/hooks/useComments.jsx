import { useQuery } from "@tanstack/react-query";
import { comments } from "../services/adminAPI";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";

export default function useComments() {
  const [searchParams] = useSearchParams();

  const textSearch = searchParams.get("textSearch") || "";
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["comments", page, pageSize, textSearch],
    queryFn: () => comments({ pageIndex: page, pageSize, textSearch }),
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { comments: data, isLoading };
}
