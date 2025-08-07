import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/userStore";
import { Link } from "react-router-dom";
import profile from "@/assets/profile_black.png";
import { apiClient } from "@/services/api/apiClient";
import type { User } from "@/types/auth";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";

const ProfileCard = () => {
  const { userId } = useUserStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    if (!userId || userId <= 0) {
      setError("유효하지 않은 사용자 ID입니다.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await apiClient.get<User>(`/users/${userId}`);
      setUser(userData);
    } catch (err) {
      console.error("프로필 조회 실패:", err);
      setError("프로필 정보를 불러오는데 실패했습니다.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <Card className="w-full max-w-sm text-center">
        <CardContent className="p-6">
          <div className="text-center">프로필을 불러오는 중...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-sm text-center">
        <CardContent className="p-6">
          <Alert className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            onClick={fetchUserProfile}
            variant="outline"
            className="w-full mb-4"
          >
            다시 시도
          </Button>
          <Link to="/lobby">
            <Button variant="default" className="w-full">
              로비로 돌아가기
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // 사용자 데이터가 없는 경우
  if (!user) {
    return (
      <Card className="w-full max-w-sm text-center">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            프로필 정보를 찾을 수 없습니다.
          </div>
          <Link to="/lobby">
            <Button variant="default" className="w-full max-w-xs">
            로비로 돌아가기
          </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // 승률
  const winRate =
    user.totalGames > 0
      ? ((user.wins / user.totalGames) * 100).toFixed(1)
      : "0.0";

  const joinDate = new Date(user.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <div className="text-center">
          <img src={profile} alt="프로필" className="w-32 h-32 mx-auto mb-4" />
        </div>
        <CardTitle>내 프로필</CardTitle>
        <CardDescription>
          오늘도 고개를 숙이고 진실을 마주합니다...
        </CardDescription>
      </CardHeader>
      <CardContent>        
        <div className="grid gap-4">
          <div className="grid gap-3">
            <h4 className="text-sm font-medium">닉네임</h4>
            <p className="text-lg font-semibold">{user.nickname || "닉네임을 불러올 수 없습니다."}</p>
          </div>
          <div className="grid gap-3">
            <h4 className="text-sm font-medium">참여한 사건</h4>
            <p className="text-lg font-semibold">{user.totalGames}건</p>
          </div>
          <div className="grid gap-3">
            <h4 className="text-sm font-medium">해결한 사건</h4>
            <p className="text-lg font-semibold">{user.wins}건</p>
          </div>
          <div className="grid gap-3">
            <h4 className="text-sm font-medium">승률</h4>
            <p className="text-lg font-semibold">{winRate}%</p>
          </div>
          <div className="grid gap-3">
            <p className="text-sm">{joinDate}부터 함께하셨습니다.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-3 pt-6">
        <Button onClick={fetchUserProfile} variant="outline" className="w-full max-w-xs">
          새로고침
        </Button>
        <Link to="/lobby">
          <Button variant="default" className="w-full max-w-xs">
            로비로 돌아가기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
