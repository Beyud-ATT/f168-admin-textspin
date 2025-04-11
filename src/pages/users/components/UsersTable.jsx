import { Flex, Table } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import useUsersGet from "../../../hooks/useUsersGet";
import UserCodeModal from "./UserCodeModal";
import { useSearchParams } from "react-router";
import TextSearch from "../../../components/TextSearch";

export default function UsersTable() {
  const { users, isLoading } = useUsersGet();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || 10);

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
        render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
      },
      {
        title: "Hành động",
        key: "action",
        dataIndex: "action",
        align: "center",
        render: (_, record) => <UserCodeModal record={record} />,
      },
    ];
  }, []);

  return (
    <div>
      <TextSearch />
      <Table
        columns={columns}
        dataSource={users?.data}
        pagination={{
          current: page,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
            searchParams.set("page", page);
            searchParams.set("pageSize", pageSize);
            setSearchParams(searchParams);
          },
        }}
        loading={isLoading}
      />
    </div>
  );
}
