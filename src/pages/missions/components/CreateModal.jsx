import { FaPlus } from "react-icons/fa6";
import { CompoundModal } from "../../../components/CompoundModal";
import { Form, Input, Select } from "antd";
import useCreateMission from "../../../hooks/useCreateMission";
import { useCallback } from "react";
import { MissionType } from "../../../utils/constant";

function CreateForm({ closeModal }) {
  const [form] = Form.useForm();
  const { mutate: createMission } = useCreateMission();

  const handleFinish = useCallback(
    (values) => {
      createMission(values, {
        onSuccess: () => {
          form.resetFields();
          closeModal();
        },
      });
    },
    [createMission, form, closeModal]
  );

  return (
    <Form className="!mt-8" onFinish={handleFinish} layout="vertical">
      {/* <Form.Item
        label="Tên nhiệm vụ"
        name="missionContentTemplete"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        label="Mục tiêu nhiệm vụ"
        name="missionGoal"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số lượt quy đổi"
        name="turn"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Loại nhiệm vụ"
        name="missionType"
        rules={[{ required: true }]}
      >
        <Select
          options={Object.entries(MissionType).map(([key, value]) => ({
            label: key,
            value: value,
          }))}
        />
      </Form.Item>
      <Form.Item>
        <button
          type="primary"
          className="!bg-[var(--color-brand-primary)] px-4 py-2 rounded-lg cursor-pointer text-white font-bold"
          onClick={form.submit}
        >
          Lưu
        </button>
      </Form.Item>
    </Form>
  );
}

export default function CreateModal() {
  return (
    <CompoundModal>
      <CompoundModal.Trigger
        render={(openModal) => (
          <button
            className="flex gap-2 cursor-pointer bg-green-500 py-2 px-4 text-white rounded-lg"
            onClick={openModal}
          >
            <FaPlus className="text-2xl" />
            <span className="font-bold md:block hidden">Thêm nhiệm vụ</span>
          </button>
        )}
      />
      <CompoundModal.Content
        classNames={{ content: "!bg-[#FEF3D4]" }}
        render={(closeModal) => <CreateForm closeModal={closeModal} />}
      />
    </CompoundModal>
  );
}
