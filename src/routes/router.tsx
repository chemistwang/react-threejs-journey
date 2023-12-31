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
// import ScrollBasedAnimation from "../courses/classicTech/scroll-based-animation";
import Physics from "../courses/advTech/physics";
import ImportedModels from "../courses/advTech/imported-models";
import RaycasterAndMouseEvents from "../courses/advTech/raycaster-and-mouse-events";
import RealisticRender from "../courses/advTech/realistic-render";
import CodeStructuringForBiggerProjects from "../courses/advTech/code-structuring-for-bigger-projects";
import Shaders from "../courses/shaders/shaders";
import ShaderPatterns from "../courses/shaders/shader-patterns";
import RagingSea from "../courses/shaders/raging-sea";
import AnimatedGalaxy from "../courses/shaders/animated-galaxy";
import ModifiedMaterials from "../courses/shaders/modified-materials";
import PerformanceTips from "../courses/extra/performance-tips";
// import AppDemo from "../demo/AppDemo";
// import BloomDemo from "../demo/bloomDemo";
// import MineDemo from "../demo/mineDemo";

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
      // {
      //   key: "scroll-based-animation",
      //   label: "Scroll Based Animation",
      //   icon: <AppstoreOutlined />,
      // },
    ],
  },
  {
    key: "3",
    label: "Advanced techniques",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "physics",
        label: "Physics",
        icon: <AppstoreOutlined />,
      },
      {
        key: "imported-models",
        label: "Imported Models",
        icon: <AppstoreOutlined />,
      },
      {
        key: "raycaster-and-mouse-events",
        label: "Raycaster & Mouse events",
        icon: <AppstoreOutlined />,
      },
      {
        key: "realistic-render",
        label: "Realistic render",
        icon: <AppstoreOutlined />,
      },
      {
        key: "code-structuring-for-bigger-projects",
        label: "Code Structuring for Bigger Projects",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    key: "4",
    label: "Shaders",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "shaders",
        label: "Shaders",
        icon: <AppstoreOutlined />,
      },
      {
        key: "shader-patterns",
        label: "Shader Patterns",
        icon: <AppstoreOutlined />,
      },
      {
        key: "raging-sea",
        label: "Raging Sea",
        icon: <AppstoreOutlined />,
      },
      {
        key: "animated-galaxy",
        label: "Animated Galaxy",
        icon: <AppstoreOutlined />,
      },
      {
        key: "modified-materials",
        label: "Modified Materials",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    key: "5",
    label: "Extra",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "post-processing",
        label: "Post processing",
        icon: <AppstoreOutlined />,
      },
      {
        key: "performance-tips",
        label: "Performance tips",
        icon: <AppstoreOutlined />,
      },
      {
        key: "intro-and-loading-progress",
        label: "Intro and loading progress",
        icon: <AppstoreOutlined />,
      },
      {
        key: "mixing-html-and-webgl",
        label: "Mixing HTML and WebGL",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    key: "6",
    label: "Portal Scene",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "creating-a-scene-in-blender",
        label: "Creating a scene in Blender",
        icon: <AppstoreOutlined />,
      },
      {
        key: "baking-and-exporting-the-scene",
        label: "Baking and exporting the scene",
        icon: <AppstoreOutlined />,
      },
      {
        key: "importing-and-optimizing-the-scene",
        label: "Importing and optimizing the scene",
        icon: <AppstoreOutlined />,
      },
      {
        key: "adding-details-to-the-scene",
        label: "Adding details to the scene",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    key: "7",
    label: "React Three Fiber",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "first-r3f-application",
        label: "First R3F Application",
        icon: <AppstoreOutlined />,
      },
      {
        key: "drei",
        label: "Drei",
        icon: <AppstoreOutlined />,
      },
      {
        key: "debug",
        label: "Debug",
        icon: <AppstoreOutlined />,
      },
      {
        key: "environment-and-staging",
        label: "Environment and Staging",
        icon: <AppstoreOutlined />,
      },
      {
        key: "load-models",
        label: "Load models",
        icon: <AppstoreOutlined />,
      },
      {
        key: "3d-text",
        label: "3D Text",
        icon: <AppstoreOutlined />,
      },
      {
        key: "portal-scene",
        label: "Portal Scene",
        icon: <AppstoreOutlined />,
      },
      {
        key: "mouse-events",
        label: "Mouse Events",
        icon: <AppstoreOutlined />,
      },
      {
        key: "post-processing",
        label: "Post processing",
        icon: <AppstoreOutlined />,
      },
      {
        key: "fun-and-simple-portfolio",
        label: "Fun and Simple Portfolio",
        icon: <AppstoreOutlined />,
      },
      {
        key: "physics",
        label: "Physics",
        icon: <AppstoreOutlined />,
      },
      {
        key: "create-a-game",
        label: "Create a game",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    key: "999",
    label: "Demo",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "app-demo",
        label: "App Demo",
        icon: <AppstoreOutlined />,
      },
      {
        key: "bloom-demo",
        label: "Bloom Demo",
        icon: <AppstoreOutlined />,
      },
      {
        key: "mine-demo",
        label: "Mine Demo",
        icon: <AppstoreOutlined />,
      },
    ],
  },
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
      // {
      //   path: "scroll-based-animation",
      //   element: <ScrollBasedAnimation />,
      // },
      {
        path: "physics",
        element: <Physics />,
      },
      {
        path: "imported-models",
        element: <ImportedModels />,
      },
      {
        path: "raycaster-and-mouse-events",
        element: <RaycasterAndMouseEvents />,
      },
      {
        path: "realistic-render",
        element: <RealisticRender />,
      },
      {
        path: "code-structuring-for-bigger-projects",
        element: <CodeStructuringForBiggerProjects />,
      },
      {
        path: "shaders",
        element: <Shaders />,
      },
      {
        path: "shader-patterns",
        element: <ShaderPatterns />,
      },
      {
        path: "raging-sea",
        element: <RagingSea />,
      },
      {
        path: "animated-galaxy",
        element: <AnimatedGalaxy />,
      },
      {
        path: "modified-materials",
        element: <ModifiedMaterials />,
      },
      {
        path: "performance-tips",
        element: <PerformanceTips />,
      },
      // {
      //   path: "app-demo",
      //   element: <AppDemo />,
      // },
      // {
      //   path: "bloom-demo",
      //   element: <BloomDemo />,
      // },
      // {
      //   path: "mine-demo",
      //   element: <MineDemo />,
      // },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
