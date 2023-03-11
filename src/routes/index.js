import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import Loadable from "../Helpers/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import MainLayout from "../layout/MainLayout";
import Login from "../Components/Login/Login";
import Dashboard from "../Components/Dashboard/Dashboard";
import AdminProperty from "../Components/Properties/AdminProperty";
import AdminProperties from "../Components/Properties/AdminProperties";
// const Home = Loadable(lazy(() => import("../Components/Home/Home")));

export default function ROUTES() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route exact path="/login" element={<Login />} />

        <Route
          exact
          path="/"
          element={
            <MinimalLayout>
              <AdminProperties />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="properties"
          element={
            <MinimalLayout>
              <AdminProperties />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="property"
          element={
            <MinimalLayout>
              <AdminProperty />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="property/:propertyId"
          element={
            <MinimalLayout>
              <AdminProperty />
            </MinimalLayout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
