import { Button } from "antd";
import { downloadExcel } from "../utils/helper";
import { IoMdDownload } from "react-icons/io";
import useGetStaticUsers from "../hooks/useGetStaticUsers";

const ExportExcel = () => {
  const { staticUser, isLoading } = useGetStaticUsers();

  const downloadExcelFunc = () => {
    downloadExcel({
      data: staticUser?.data,
    });
  };

  return (
    <Button
      type="primary"
      className="!bg-[var(--color-brand-primary)] uppercase font-semibold"
      htmlType="button"
      onClick={downloadExcelFunc}
      icon={<IoMdDownload />}
      disabled={isLoading}
    >
      tải bảng thống kê
    </Button>
  );
};

export default ExportExcel;
