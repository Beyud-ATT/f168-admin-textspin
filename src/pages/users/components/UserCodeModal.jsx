import { CompoundModal } from "../../../components/CompoundModal";
import { Table } from "antd";
import { useMemo } from "react";
import useUsersGetCode from "../../../hooks/useUsersGetCode";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function UserCodeTable({ record }) {
  const { id } = record;
  const { usersCode, isLoading } = useUsersGetCode(id);

  const columns = useMemo(() => {
    return [
      {
        title: "Mã quay thưởng",
        dataIndex: "code",
        key: "code",
      },
    ];
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={usersCode?.data}
      loading={isLoading}
      pagination={false}
    />
  );
}

export default function UserCodeModal({ record }) {
  return (
    <div>
      <CompoundModal>
        <CompoundModal.Trigger
          render={(openModal) => (
            <button className="cursor-pointer" onClick={openModal}>
              <MdOutlineQrCodeScanner className="!text-[var(--color-brand-primary)] text-2xl" />
            </button>
          )}
        />
        <CompoundModal.Content
          classNames={{ content: "!bg-[#FEF3D4] !shadow-none !pt-12" }}
          closeIcon={<IoClose className="text-black text-4xl font-bold" />}
          render={(closeModal) => (
            <UserCodeTable closeModal={closeModal} record={record} />
          )}
        />
      </CompoundModal>
    </div>
  );
}
