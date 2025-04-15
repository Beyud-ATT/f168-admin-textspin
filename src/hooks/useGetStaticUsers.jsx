import { useQuery } from "@tanstack/react-query";
import { getStaticUsers } from "../services/adminAPI";
import { toast } from "react-toastify";

export default function useGetStaticUsers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["static-users"],
    queryFn: getStaticUsers,
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { staticUser: data, isLoading };
}
