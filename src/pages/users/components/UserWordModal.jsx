import { RiCharacterRecognitionFill } from "react-icons/ri";
import { CompoundModal } from "../../../components/CompoundModal";
import { IoClose } from "react-icons/io5";
import { Table, Typography } from "antd";
import { useMemo } from "react";

function UserWordTable({ record }) {
  const { words } = record || [];
  const columns = useMemo(() => {
    return [
      {
        title: "Chữ cái",
        dataIndex: "wordText",
        key: "wordText",
      },
      {
        title: "Số lượng",
        dataIndex: "count",
        key: "count",
      },
    ];
  }, []);

  return (
    <>
      <Typography.Title level={3}>Chữ cái quay thưởng</Typography.Title>
      <Table columns={columns} dataSource={words} pagination={false} />
    </>
  );
}

export default function UserWordModal({ record }) {
  return (
    <CompoundModal>
      <CompoundModal.Trigger
        render={(openModal) => (
          <button className="cursor-pointer" onClick={openModal}>
            <RiCharacterRecognitionFill className="!text-[var(--color-brand-primary)] text-2xl -translate-y-0.5" />
          </button>
        )}
      />
      <CompoundModal.Content
        classNames={{ content: "!bg-[#FEF3D4] !shadow-none !pt-12" }}
        closeIcon={<IoClose className="text-black text-4xl font-bold" />}
        render={(closeModal) => (
          <UserWordTable closeModal={closeModal} record={record} />
        )}
      />
    </CompoundModal>
  );
}
