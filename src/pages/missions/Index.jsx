import { Flex, Table } from "antd";
import useGetMissions from "../../hooks/useGetMissions";
import { MissionType } from "../../utils/constant";
import CreateModal from "./components/CreateModal";

const columns = [
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
];

export default function Missions() {
  const { missions, isLoading } = useGetMissions();

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
