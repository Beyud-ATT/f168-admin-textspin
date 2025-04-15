import { Table } from "antd";
import useComments from "../../hooks/useComments";
import { useCallback, useMemo, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useProcessComment from "../../hooks/useProcessComment";
import { CommentStatus } from "../../utils/constant";
import TextSearch from "../../components/TextSearch";
import { useSearchParams } from "react-router";

export default function Comments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { comments, isLoading } = useComments();
  const { mutate: processComment } = useProcessComment();

  const handleChangeStatus = useCallback(
    (record, status) => {
      processComment({
        commentId: record.id,
        approvalStatus: status,
      });
    },
    [processComment]
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
          current: searchParams.get("page") || 1,
          pageSize: searchParams.get("pageSize") || 20,
          ...comments?.pagination,
          onChange: (page, pageSize) => {
            searchParams.set("page", page);
            searchParams.set("pageSize", pageSize);
            setSearchParams(searchParams);
          },
          showSizeChanger: true,
          pageSizeOptions: ["20", "50", "100"],
        }}
        scroll={{ y: 670 }}
        loading={isLoading}
      />
    </div>
  );
}
