import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import Protected from "./helpers/Protected";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "project/:projectID",
    element: (
      <Protected>
        <ProjectPage />
      </Protected>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
