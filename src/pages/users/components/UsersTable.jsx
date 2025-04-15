import { Flex, Table } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import useUsersGet from "../../../hooks/useUsersGet";
import UserCodeModal from "./UserCodeModal";
import { useSearchParams } from "react-router";
import TextSearch from "../../../components/TextSearch";
import UserWordModal from "./UserWordModal";
import ExportExcel from "../../../components/ExportXLSX";

export default function UsersTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, isLoading } = useUsersGet();

  const columns = useMemo(() => {
    return [
      {
        title: "Tên tài khoản",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Mã giới thiệu",
        dataIndex: "userCode",
        key: "userCode",
        align: "center",
      },
      {
        title: "Trạng thái khóa",
        dataIndex: "isLocked",
        key: "isLocked",
        align: "center",
        render: (isLocked) => {
          return (
            <Flex justify="center">
              <span
                className={`${
                  !isLocked ? "bg-[var(--color-brand-primary)]" : "bg-gray-400"
                } font-bold md:block hidden px-2 py-1 rounded-lg w-fit`}
              >
                {isLocked ? "Khóa" : "Mở"}
              </span>
            </Flex>
          );
        },
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        align: "center",
        render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss"),
      },
      {
        title: "Hành động",
        key: "action",
        dataIndex: "action",
        align: "center",
        render: (_, record) => (
          <Flex align="center" justify="center" gap={10}>
            <UserCodeModal record={record} />
            <UserWordModal record={record} />
          </Flex>
        ),
      },
    ];
  }, []);

  return (
    <div>
      <Flex justify="space-between" align="center" gap={10} className="!my-4">
        <TextSearch />
        <ExportExcel />
      </Flex>
      <Table
        columns={columns}
        dataSource={users?.data}
        pagination={{
          current: searchParams.get("page") || 1,
          pageSize: searchParams.get("pageSize") || 20,
          ...users?.pagination,
          showSizeChanger: true,
          pageSizeOptions: ["20", "50", "100"],
          onChange: (page, pageSize) => {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("page", page);
            newSearchParams.set("pageSize", pageSize);
            setSearchParams(newSearchParams);
          },
        }}
        scroll={{ y: 670 }}
        loading={isLoading}
      />
    </div>
  );
}
