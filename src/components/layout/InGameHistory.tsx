import { Card, CardTitle, CardContent } from "@/components/ui/card";
import HistoryList from "../chat/HistoryList";

const InGameHistory = () => {
  // 현재 Component는 임시로 너비와 높이를 고정해 사용하였습니다.
  // 추후 Grid를 통해 조정할 계획입니다.
  return (
    <Card className="max-h-[500px] p-4 h-full">
      <CardTitle className="p-4 pb-0">
        <span className="text-[32px]">질문 Record</span>
      </CardTitle>
      <CardContent className="p-0 overflow-y-auto">
        <HistoryList />
      </CardContent>
    </Card>
  );
};

export default InGameHistory;
