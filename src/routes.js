import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./pages/Users";
import ProtectedRoute from "./pages/ProtectedRoute";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
]);

export default router;
