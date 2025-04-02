import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { me } from "../services/adminAPI";

export default function useAccount() {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["account"],
    queryFn: me,
    enabled: isAuthenticated,
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { data, isLoading };
}
