import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { openConnect } from "@/websocket/webSocketConnection";
import useUserStore from "@/stores/userStore";

// Lazy-loaded pages
const IndexPage = lazy(() => import("@/pages/index"));
const RoomPage = lazy(() => import("@/pages/room"));
const LobbyPage = lazy(() => import("@/pages/lobby"));
const LoginPage = lazy(() => import("@/pages/login"));
const SignupPage = lazy(() => import("@/pages/signup"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const RankingPage = lazy(() => import("@/pages/ranking"));

function Router() {
  useEffect(() => {
    useUserStore.getState().setUserFromStorage();
    openConnect(); // 앱 시작 시 WebSocket 연결 시도
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<IndexPage />} />

        <Route
          path="/lobby"
          element={
            <ProtectedRoute>
              <LobbyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <RoomPage />
            </ProtectedRoute>
          }
        />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/users/:userId" element={<ProfilePage />} />

          <Route path="/rankings" element={<RankingPage />} />

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    
  );
}

export default Router;
