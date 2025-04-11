import { useQuery } from "@tanstack/react-query";
import { getUsersCode } from "../services/adminAPI";
import { toast } from "react-toastify";

export default function useUsersGetCode(id) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["usersCode", id],
    queryFn: () => getUsersCode(id),
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { usersCode: data, isLoading };
}
