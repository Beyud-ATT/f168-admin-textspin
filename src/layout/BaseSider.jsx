import { Menu, Typography } from "antd";
import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import { FaGear, FaGem } from "react-icons/fa6";
import { FaUserNinja } from "react-icons/fa";

const itemStyle = "font-bold text-[14px]";

const items = [
  {
    key: "users",
    icon: <FaUserNinja className="font-bold !text-lg" />,
    label: (
      <Link to="/users" className={itemStyle}>
        Người dùng
      </Link>
    ),
  },
  {
    key: "comments",
    icon: <IoChatbubbleOutline className="!text-lg" strokeWidth={3} />,
    label: (
      <Link to="/comments" className={itemStyle}>
        Bình luận
      </Link>
    ),
  },
  {
    key: "random-config",
    icon: <FaGear className="font-bold !text-lg" />,
    label: (
      <Link to="/random-config" className={itemStyle}>
        Tỷ lệ quay thưởng
      </Link>
    ),
  },
  // {
  //   key: "missions",
  //   icon: <FaGem className="font-bold !text-lg" />,
  //   label: (
  //     <Link to="/missions" className={itemStyle}>
  //       Nhiệm vụ
  //     </Link>
  //   ),
  // },
];

export default function BaseSider({ Layout, ...rest }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useLocation().pathname;
  const [current, setCurrent] = useState(
    pathname === "/" ? "users" : pathname.replace("/", "")
  );

  useEffect(() => {
    setCurrent(pathname.replace("/", ""));
  }, [pathname]);

  const toggleCollapse = () => {
    setCollapsed((state) => !state);
  };

  return (
    <Layout.Sider
      id="main-layout-sider"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={300}
      className={`pt-5`}
      {...rest}
    >
      <Typography.Title
        level={4}
        className="font-bold !text-white w-full flex justify-around items-center py-2"
      >
        {!collapsed && (
          <span className="font-bold text-[20px]">Bảng điều khiển</span>
        )}
        <div className="flex flex-col justify-center items-center">
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={toggleCollapse}
              className="cursor-pointer !text-xl"
            />
          ) : (
            <MenuFoldOutlined
              onClick={toggleCollapse}
              className="m-0 p-0 cursor-pointer !text-xl"
            />
          )}
        </div>
      </Typography.Title>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname.replace("/", "")]}
        selectedKeys={[current]}
        onClick={({ key }) => setCurrent(key)}
        items={items}
      />
    </Layout.Sider>
  );
}
