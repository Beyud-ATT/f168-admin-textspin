import { useMutation } from "@tanstack/react-query";
import { deleteMission } from "../services/adminAPI";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function useDeleteMission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMission,
    onSuccess: () => {
      toast.success("Xóa nhiệm vụ thành công");
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
