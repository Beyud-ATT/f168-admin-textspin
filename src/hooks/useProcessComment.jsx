import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { processComment } from "../services/adminAPI";

export default function useProcessComment() {
  return useMutation({
    mutationFn: processComment,
    onSuccess: () => {
      toast.success("Xét duyệt thành công");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
