import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRandomConfig } from "../services/adminAPI";
import { toast } from "react-toastify";

export default function useUpdateRandomConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRandomConfig,
    onSuccess: () => {
      //   toast.success("Cập nhật thành công");
      queryClient.invalidateQueries(["randomConfig"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
