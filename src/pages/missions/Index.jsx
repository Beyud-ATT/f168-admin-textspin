import { Flex, Modal, Table } from "antd";
import useGetMissions from "../../hooks/useGetMissions";
import { MissionType } from "../../utils/constant";
import CreateModal from "./components/CreateModal";
import { FaTrash } from "react-icons/fa6";
import { useMemo } from "react";
import useDeleteMission from "../../hooks/useDeleteMission";

export default function Missions() {
  const { missions, isLoading } = useGetMissions();
  const { mutate: deleteMission } = useDeleteMission();

  const columns = useMemo(
    () => [
      {
        title: "Tên nhiệm vụ",
        dataIndex: "missionContentTemplete",
        key: "missionContentTemplete",
      },
      {
        title: "Mục tiêu nhiệm vụ",
        dataIndex: "missionGoal",
        key: "missionGoal",
      },
      {
        title: "Số lượt quy đổi",
        dataIndex: "turn",
        key: "turn",
      },
      {
        title: "Loại nhiệm vụ",
        dataIndex: "missionType",
        key: "missionType",
        render: (text) => {
          return (
            <span
              className={`text-[var(--color-brand-primary)] font-bold md:block hidden`}
            >
              {text === MissionType.DEPOSIT
                ? "Nạp tiền"
                : text === MissionType.BET
                ? "Đặt cược"
                : "Mời"}
            </span>
          );
        },
      },
      {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
          <div className="p-2 w-fit rounded-lg bg-red-500 cursor-pointer">
            <FaTrash
              className="text-lg"
              onClick={() => {
                Modal.confirm({
                  title: "Xác nhận xóa",
                  content: "Bạn có chắc chắn muốn xóa nhiệm vụ này?",
                  onOk: () => {
                    deleteMission(record.id);
                  },
                });
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-[50%] mx-auto">
      <Flex justify="end" className="!mb-4">
        <CreateModal />
      </Flex>
      <Table
        columns={columns}
        dataSource={missions?.data}
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
}
