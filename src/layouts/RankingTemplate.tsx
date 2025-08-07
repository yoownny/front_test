import RankingDetail from "@/components/problem/RankingDetail";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/services/api/apiClient";
import type { ProblemRank, RankingResponse } from "@/types/problem/ranking";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RefreshCw, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RankingTemplate = () => {
  const [ranks, setRanks] = useState<ProblemRank[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onLeave = () => {
    try {
      navigate("/");
    } catch {
      alert("홈으로 나가기에 실패하였습니다.");
    }
  };

  // 랭킹 데이터 가져오기
  const fetchRanking = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<RankingResponse>(`/rankings`, {
        limit: 10,
      });

      setRanks(response.ranking);
      setTotalCount(response.totalCount);
      setLastUpdated(response.lastUpdated);
    } catch (err) {
      console.error("랭킹 조회 실패:", err);
      setError("랭킹 정보를 불러오는데 실패했습니다.");
      setRanks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  // 마지막 업데이트 시간
  const formatLastUpdated = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("ko-KR");
    } catch {
      return "정보 없음";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">사건 랭킹</h1>
            {!loading && (
              <Button
                onClick={fetchRanking}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                새로고침
              </Button>
            )}
          </div>
          <Button
            onClick={onLeave}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            홈으로
            <LogOut size={20} />
          </Button>
        </div>

        {!loading && !error && (
          <div className="mt-4 bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>총 {totalCount}개의 문제</span>
              <span>마지막 업데이트: {formatLastUpdated(lastUpdated)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-600">랭킹을 불러오는 중...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              오류가 발생했습니다
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchRanking} variant="outline">
              다시 시도
            </Button>
          </div>
        )}

        {/* 데이터가 없는 경우 */}
        {!loading && !error && ranks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              랭킹이 없습니다
            </h3>
            <p className="text-gray-600">아직 등록된 문제가 없습니다.</p>
          </div>
        )}

        {!loading && !error && ranks.length > 0 && (
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {ranks.map((rank) => (
                <RankingDetail
                  key={`${rank.problemId}-${rank.rank}`}
                  ranking={rank}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default RankingTemplate;
