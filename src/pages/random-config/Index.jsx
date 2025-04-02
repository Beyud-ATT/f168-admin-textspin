import { Table } from "antd";
import useGetRandomConfig from "../../hooks/useGetRandomConfig";
import EditModal from "./components/EditForm";
import { useMemo } from "react";

export default function RandomConfig() {
  const { randomConfig, isLoading } = useGetRandomConfig();

  const columns = useMemo(
    () => [
      {
        title: "Từ khóa",
        dataIndex: "word",
        key: "word",
      },
      {
        title: "Tần suất",
        dataIndex: "percent",
        key: "percent",
      },
      {
        title: "Hành động",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => {
          return (
            <div className="flex gap-2">
              <EditModal record={record} data={randomConfig} />
            </div>
          );
        },
      },
    ],
    [randomConfig]
  );

  return (
    <div className="w-[50%] mx-auto">
      <Table
        columns={columns}
        dataSource={randomConfig?.data?.wordItems?.map((item) => item)}
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
}
