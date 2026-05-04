import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AuthenticationRoute from "./middlewares/AuthenticationRoute";
import Dashboard from "./pages/Dashboard";
import BrandList from "./pages/Data/BrandList";
import ManufactureList from "./pages/Data/ManufactureList";
import ModelList from "./pages/Data/ModelList";
import VehicleTypeList from "./pages/Data/VehicleTypeList";

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
];
const privateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/brand-list",
    element: <BrandList />,
  },
  {
    path: "/manufacture-list",
    element: <ManufactureList />,
  },
  {
    path: "/model-list",
    element: <ModelList />,
  },
  {
    path: "/vehicle-type-list",
    element: <VehicleTypeList />,
  },
];

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route element={<AuthenticationRoute />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}

export default App;
