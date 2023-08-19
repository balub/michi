import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <HomePage />,
  },
  {
    path: "project/:projectID",
    element: <ProjectPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
