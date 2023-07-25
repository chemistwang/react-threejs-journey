import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

import App from "../App";
import ErrorPage from "../pages/errorPage";

import BasicScene from "../courses/basics/basic-scene";
import TransformObjects from "../courses/basics/transform-objects";
import Animations from "../courses/basics/animations";
import Cameras from "../courses/basics/cameras";
import FullscreenResizing from "../courses/basics/fullscreen-resizing";
import Geometries from "../courses/basics/geometries";
import DebugUI from "../courses/basics/debug-ui";
import Textures from "../courses/basics/textures";
import Materials from "../courses/basics/materials";
import Text3D from "../courses/basics/3d-text";
import Lights from "../courses/classicTech/lights";
import Shadows from "../courses/classicTech/shadows";
import HauntedHouse from "../courses/classicTech/haunted-house";
import Particles from "../courses/classicTech/particles";
import GalaxyGenerator from "../courses/classicTech/galaxy-generator";

type MenuItem = Required<MenuProps>["items"][number];

const fetchMenuData = [{}];

export const items: MenuItem[] = [
  {
    key: "1",
    label: "Basics",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "basic-scene",
        label: "Basic Scene",
        icon: <AppstoreOutlined />,
      },
      {
        key: "transform-objects",
        label: "Transform objects",
        icon: <AppstoreOutlined />,
      },
      {
        key: "animations",
        label: "Animations",
        icon: <AppstoreOutlined />,
      },
      {
        key: "cameras",
        label: "Cameras",
        icon: <AppstoreOutlined />,
      },
      {
        key: "fullscreen-resizing",
        label: "Fullscreen and resizing",
        icon: <AppstoreOutlined />,
      },
      {
        key: "geometries",
        label: "Geometries",
        icon: <AppstoreOutlined />,
      },
      {
        key: "debug-ui",
        label: "Debug UI",
        icon: <AppstoreOutlined />,
      },
      {
        key: "textures",
        label: "Textures",
        icon: <AppstoreOutlined />,
      },
      {
        key: "materials",
        label: "Materials",
        icon: <AppstoreOutlined />,
      },
      {
        key: "text-3d",
        label: "3D Text",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    key: "2",
    label: "Classic techniques",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "lights",
        label: "Lights",
        icon: <AppstoreOutlined />,
      },
      {
        key: "shadows",
        label: "Shadows",
        icon: <AppstoreOutlined />,
      },
      {
        key: "haunted-house",
        label: "Haunted House",
        icon: <AppstoreOutlined />,
      },
      {
        key: "particles",
        label: "Particles",
        icon: <AppstoreOutlined />,
      },
      {
        key: "galaxy-generator",
        label: "Galaxy Generator",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  // {
  //   key: "3",
  //   label: "Advanced techniques",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       key: "lights",
  //       label: "Lights",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "transform-objects",
  //       label: "Transform objects",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "animations",
  //       label: "Animations",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "cameras",
  //       label: "Cameras",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "fullscreen-resizing",
  //       label: "Fullscreen and resizing",
  //       icon: <AppstoreOutlined />,
  //     },
  //   ],
  // },
  // {
  //   key: "4",
  //   label: "Shaders",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       key: "lights",
  //       label: "Lights",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "transform-objects",
  //       label: "Transform objects",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "animations",
  //       label: "Animations",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "cameras",
  //       label: "Cameras",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "fullscreen-resizing",
  //       label: "Fullscreen and resizing",
  //       icon: <AppstoreOutlined />,
  //     },
  //   ],
  // },
  // {
  //   key: "5",
  //   label: "Extra",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       key: "lights",
  //       label: "Lights",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "transform-objects",
  //       label: "Transform objects",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "animations",
  //       label: "Animations",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "cameras",
  //       label: "Cameras",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "fullscreen-resizing",
  //       label: "Fullscreen and resizing",
  //       icon: <AppstoreOutlined />,
  //     },
  //   ],
  // },
  // {
  //   key: "6",
  //   label: "Portal Scene",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       key: "lights",
  //       label: "Lights",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "transform-objects",
  //       label: "Transform objects",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "animations",
  //       label: "Animations",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "cameras",
  //       label: "Cameras",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "fullscreen-resizing",
  //       label: "Fullscreen and resizing",
  //       icon: <AppstoreOutlined />,
  //     },
  //   ],
  // },
  // {
  //   key: "7",
  //   label: "React Three Fiber",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       key: "lights",
  //       label: "Lights",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "transform-objects",
  //       label: "Transform objects",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "animations",
  //       label: "Animations",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "cameras",
  //       label: "Cameras",
  //       icon: <AppstoreOutlined />,
  //     },
  //     {
  //       key: "fullscreen-resizing",
  //       label: "Fullscreen and resizing",
  //       icon: <AppstoreOutlined />,
  //     },
  //   ],
  // },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "basic-scene",
        element: <BasicScene />,
      },
      {
        path: "transform-objects",
        element: <TransformObjects />,
      },
      {
        path: "animations",
        element: <Animations />,
      },
      {
        path: "cameras",
        element: <Cameras />,
      },
      {
        path: "fullscreen-resizing",
        element: <FullscreenResizing />,
      },
      {
        path: "geometries",
        element: <Geometries />,
      },
      {
        path: "debug-ui",
        element: <DebugUI />,
      },
      {
        path: "textures",
        element: <Textures />,
      },
      {
        path: "materials",
        element: <Materials />,
      },
      {
        path: "text-3d",
        element: <Text3D />,
      },
      {
        path: "lights",
        element: <Lights />,
      },
      {
        path: "shadows",
        element: <Shadows />,
      },
      {
        path: "haunted-house",
        element: <HauntedHouse />,
      },
      {
        path: "particles",
        element: <Particles />,
      },
      {
        path: "galaxy-generator",
        element: <GalaxyGenerator />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
