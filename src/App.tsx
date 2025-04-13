import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Header from "./Components/Header";
import ListActions from "./Pages/List";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/edit/:id",
    element: <ListActions action="edit" />,
  },
  {
    path: "/create",
    element: <ListActions action="create" />,
  },
]);

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
