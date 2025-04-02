import { useMutation } from "@tanstack/react-query";
import { createMission } from "../services/adminAPI";
import { toast } from "react-toastify";

export default function useCreateMission() {
  return useMutation({
    mutationFn: createMission,
    onSuccess: () => {
      toast.success(
        "Tạo nhiệm vụ thành công, nhiệm vụ mới sẽ được đồng bộ vào ngày tiếp theo của sự kiện !!!"
      );
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
