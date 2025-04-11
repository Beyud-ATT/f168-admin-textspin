import { Table } from "antd";
import useComments from "../../hooks/useComments";
import { useCallback, useMemo, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useProcessComment from "../../hooks/useProcessComment";
import { CommentStatus } from "../../utils/constant";
import { useQueryClient } from "@tanstack/react-query";
import TextSearch from "../../components/TextSearch";

export default function Comments() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const params = useMemo(
    () => ({ pageIndex: page, pageSize }),
    [page, pageSize]
  );
  const { comments, isLoading } = useComments(params);
  const { mutate: processComment } = useProcessComment();

  const handleChangeStatus = useCallback(
    (record, status) => {
      processComment(
        {
          commentId: record.id,
          approvalStatus: status,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["comments", params]);
          },
        }
      );
    },
    [processComment, queryClient, params]
  );

  const columns = useMemo(
    () => [
      {
        title: "Tên người dùng",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Nội dung tin nhắn",
        dataIndex: "message",
        key: "message",
      },
      {
        title: "Trạng thái",
        dataIndex: "approvalStatusName",
        key: "approvalStatusName",
        render: (_, record) => {
          return (
            <span
              className={`${
                record?.approvalStatus === CommentStatus.PENDING
                  ? "text-yellow-500"
                  : record?.approvalStatus === CommentStatus.APPROVED
                  ? "text-green-500"
                  : "text-red-500"
              } text-[var(--color-brand-primary)] font-bold md:block hidden`}
            >
              {record.approvalStatusName}
            </span>
          );
        },
      },
      {
        title: "Xét duyệt",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => {
          return (
            <div className="flex gap-2">
              <button
                className="cursor-pointer"
                onClick={() =>
                  handleChangeStatus(record, CommentStatus.APPROVED)
                }
              >
                <FaRegCheckCircle className="!text-green-500 text-2xl" />
              </button>
              <button
                className="cursor-pointer"
                onClick={() =>
                  handleChangeStatus(record, CommentStatus.REJECTED)
                }
              >
                <IoIosCloseCircleOutline className="!text-red-500 text-3xl" />
              </button>
            </div>
          );
        },
      },
    ],
    [handleChangeStatus]
  );

  return (
    <div className="w-[50%] mx-auto">
      <TextSearch />
      <Table
        columns={columns}
        dataSource={comments?.data}
        pagination={{
          ...comments?.pagination,
          current: page,
          onChange: (page, pageSize) => {
            setPage(page), setPageSize(pageSize);
          },
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        scroll={{ y: 700 }}
        loading={isLoading}
      />
    </div>
  );
}
