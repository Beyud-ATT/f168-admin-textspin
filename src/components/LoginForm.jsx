import { Button, Form, Image, Input } from "antd";
import LogoImg from "../assets/game-logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await login(values);
      form.resetFields();
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  return (
    <div className="py-3 px-1 w-full">
      <div className="flex flex-col justify-center items-center mb-8">
        <Image src={LogoImg} />
      </div>
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="w-full"
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Hãy nhập tên tài khoản!" }]}
        >
          <Input
            autoComplete="new-username"
            placeholder="Nhập tài khoản"
            className="h-12 bg-white/10 border border-gray-600 rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
        >
          <Input.Password
            autoComplete="new-password"
            placeholder="Nhập mật khẩu"
            className="h-12 bg-white/10 border border-gray-600 rounded-lg login-form-password"
            iconRender={(visible) =>
              visible ? <FaRegEye /> : <FaRegEyeSlash />
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 !bg-[var(--color-brand-primary)] hover:!bg-[var(--color-brand-primary)] border-none rounded-lg text-lg font-medium"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
