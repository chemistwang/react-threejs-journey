import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { items } from "./routes/router";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem("Navigation One", "sub1", <MailOutlined />, [
//     getItem(
//       "Item 1",
//       null,
//       null,
//       [getItem("Option 1", "1"), getItem("Option 2", "2")],
//       "group"
//     ),
//     getItem(
//       "Item 2",
//       null,
//       null,
//       [getItem("Option 3", "3"), getItem("Option 4", "4")],
//       "group"
//     ),
//   ]),

//   getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
//     getItem("Option 5", "5"),
//     getItem("Option 6", "6"),
//     getItem("Submenu", "sub3", null, [
//       getItem("Option 7", "7"),
//       getItem("Option 8", "8"),
//     ]),
//   ]),

//   getItem("Navigation Three", "sub4", <SettingOutlined />, [
//     getItem("Option 9", "9"),
//     getItem("Option 10", "10"),
//     getItem("Option 11", "11"),
//     getItem("Option 12", "12"),
//   ]),
// ];

function App() {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click", e);
    // redirect("/basic");
    // redirect("/login");
    navigate(e.key);
  };

  // window.addEventListener("resize", () => {
  //   // Update sizes
  //   sizes.width = window.innerWidth;
  //   sizes.height = window.innerHeight;

  //   // Update camera
  //   camera.aspect = sizes.width / sizes.height;
  //   camera.updateProjectionMatrix();

  //   // Update renderer
  //   renderer.setSize(sizes.width, sizes.height);
  //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // });

  return (
    <div style={{ height: "100%", display: "flex" }}>
      <Menu
        style={{ width: 256 }}
        theme="dark"
        mode="inline"
        // mode="vertical"
        onClick={onClick}
        items={items}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
