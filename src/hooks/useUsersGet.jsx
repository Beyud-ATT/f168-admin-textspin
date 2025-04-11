import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/adminAPI";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";

export default function useUsersGet() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const textSearch = searchParams.get("textSearch");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["users", page, pageSize, textSearch],
    queryFn: () => getUsers({ pageIndex: page, pageSize, textSearch }),
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { users: data, isLoading };
}
