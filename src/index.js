import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/errorPage";
import RootLoader from "./components/loader/rootLoader";
import Dashboard from "./pages/dashboard";
import Authentication from "./pages/auth";
import Setting from "./pages/setting";
import { isUserDataAvailable } from "./utils";
import TeamManagement from "./pages/teamManagement";
import TaskManagement from "./pages/taskManagement";

function ProtectedRoute({ element, isPublic }) {
  const user = isUserDataAvailable();

  if (!user && !isPublic) {
    return <Navigate to="/authentication" />;
  }

  return element;
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
  },
  {
    path: "/authentication",
    element: <Authentication />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
  },
  {
    path: "/dashboard/task_management",
    element: <ProtectedRoute element={<TaskManagement />} />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
  },
  {
    path: "/dashboard/team_management",
    element: <ProtectedRoute element={<TeamManagement />} />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
  },
  {
    path: "/dashboard/setting",
    element: <ProtectedRoute element={<Setting />} />,
    errorElement: <ErrorPage />,
    loader: RootLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={routes} />);
