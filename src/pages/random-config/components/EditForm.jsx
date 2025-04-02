import { FaRegEdit } from "react-icons/fa";
import { CompoundModal } from "../../../components/CompoundModal";
import { Form, InputNumber } from "antd";
import useUpdateRandomConfig from "../../../hooks/useUpdateRandomConfig";
import { useCallback, useMemo } from "react";

function EditForm({ record, data, closeModal }) {
  const [form] = Form.useForm();
  const { mutate: updateRandomConfig } = useUpdateRandomConfig();

  const wordItems = useMemo(
    () => data?.data?.wordItems?.map((item) => item) || [],
    [data]
  );

  const handleFinish = useCallback(
    (values) => {
      const formData = {
        wordItems: wordItems?.map((item) => {
          if (item.word === record.word) {
            return { ...item, ...values };
          }
          return item;
        }),
        lastWordPercent: data?.data?.lastWordPercent,
      };

      updateRandomConfig(formData, {
        onSuccess: () => {
          closeModal();
        },
      });
    },
    [updateRandomConfig, closeModal, wordItems, data, record]
  );

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item
        name="percent"
        label="Tỷ lệ"
        rules={[{ required: true }]}
        className="!mt-8"
      >
        <InputNumber />
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

export default function EditModal({ record, data }) {
  return (
    <CompoundModal>
      <CompoundModal.Trigger
        render={(openModal) => (
          <button className="cursor-pointer" onClick={openModal}>
            <FaRegEdit className="!text-green-500 text-2xl" />
          </button>
        )}
      />
      <CompoundModal.Content
        classNames={{ content: "!bg-[#FEF3D4]" }}
        render={(closeModal) => (
          <EditForm record={record} data={data} closeModal={closeModal} />
        )}
      />
    </CompoundModal>
  );
}
