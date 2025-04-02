import { useQuery } from "@tanstack/react-query";
import { getMissions } from "../services/adminAPI";
import { toast } from "react-toastify";

export default function useGetMissions() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["missions"],
    queryFn: getMissions,
  });

  if (isError) {
    toast.error(error.response.data.message);
  }

  return { missions: data, isLoading };
}
