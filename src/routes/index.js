import { Routes, Route, Navigate } from "react-router-dom";
import MinimalLayout from "../layout/MinimalLayout";
import MainLayout from "../layout/MainLayout";
import Login from "../Components/Login/Login";
import AdminProperty from "../Components/Properties/AdminProperty";
import AdminProperties from "../Components/Properties/AdminProperties";
import Reviews from "../Components/Admin/Reviews";
import Messages from "../Components/Admin/Messages";
import ViewProperty from "../Components/Properties/ViewProperty";
import Requests from "../Components/Properties/Requests";
import OldAdminProperty from "../Components/Properties/OldAdminProperty";
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
          path="reviews"
          element={
            <MinimalLayout>
              <Reviews />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="messages"
          element={
            <MinimalLayout>
              <Messages />
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
          path="old-property"
          element={
            <MinimalLayout>
              <OldAdminProperty />
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
        <Route
          exact
          path="view/:propertyId"
          element={
            <MinimalLayout>
              <ViewProperty />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="requests"
          element={
            <MinimalLayout>
              <Requests />
            </MinimalLayout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
