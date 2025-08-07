import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const MainCardToRanking = () => {
  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle>인기 사건 랭킹</CardTitle>
        <CardDescription>
          <p>지금까지 플레이된 사건의 인기 랭킹을 볼 수 있습니다.</p>
          </CardDescription>
      </CardHeader>
      <CardContent>
        <p>🥇</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link to={"/rankings"}>
          <Button variant="default" className="w-full">
            조사하러 가기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MainCardToRanking;
