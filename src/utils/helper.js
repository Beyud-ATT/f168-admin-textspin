import dayjs from "dayjs";
import * as XLSX from "xlsx";

function logoutHelper() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("displayName");
  localStorage.removeItem("userType");
}

const downloadExcel = ({ data, fileName = "Bảng thống kê" }) => {
  const excelData = [
    [
      "Tên đăng nhập",
      "Lượt đã nhận",
      "Lượt đã gửi",
      "Mã quay thưởng",
      "Chữ F",
      "Số 1",
      "Số 6",
      "Số 8",
      "Lần rút chữ gần nhất",
    ],
    ...data.map((item) => [
      item.username,
      item.useTurn,
      item.sendTurn,
      item.codes.join(", "),
      item.words?.find((word) => word.wordText === "F")?.count,
      item.words?.find((word) => word.wordText === "1")?.count,
      item.words?.find((word) => word.wordText === "6")?.count,
      item.words?.find((word) => word.wordText === "8")?.count,
      item.lastWordTime
        ? dayjs(item.lastWordTime).format("MM/DD/YYYY HH:mm:ss")
        : "",
    ]),
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(excelData);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, `${fileName || "download"}.xlsx`);
};

export { logoutHelper, downloadExcel };
