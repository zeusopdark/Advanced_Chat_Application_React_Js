import axios from "axios";
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ProtectedRoute,
  ProtectedAdminRoute,
} from "./components/auth/ProtectedRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import {
  adminExists,
  adminNotExists,
  userExists,
  userNotExists,
} from "./redux/reducers/auth";
import { SocketProvider } from "./socket";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(
        `${server}/api/v1/user/me`,
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  useEffect(() => {
    axios
      .get(
        `${server}/api/v1/admin`,
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(({ data }) => dispatch(adminExists(data.admin)))
      .catch((err) => dispatch(adminNotExists()));
  });
  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* this route case of outlet  */}
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          {/* this route case of children  */}
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute admin={!isAdmin} redirect="/admin/dashboard">
                {" "}
                <AdminLogin />{" "}
              </ProtectedAdminRoute>
            }
          />
          <Route element={<ProtectedAdminRoute admin={isAdmin} />}>
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/chats" element={<ChatManagement />} />
            <Route path="/admin/messages" element={<MessageManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
