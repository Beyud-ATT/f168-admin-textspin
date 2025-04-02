import { useQuery } from "@tanstack/react-query";
import { getRandomConfig } from "../services/adminAPI";
import { toast } from "react-toastify";

export default function useGetRandomConfig() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["randomConfig"],
    queryFn: getRandomConfig,
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { randomConfig: data, isLoading };
}
