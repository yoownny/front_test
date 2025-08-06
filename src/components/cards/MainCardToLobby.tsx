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

const MainCardToLobby = () => {
  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle>사건 파일 목록</CardTitle>
        <CardDescription>다른 탐정들과 함께 사건을 조사합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>📁</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link to={"/lobby"}>
          <Button variant="default" className="w-full">
            조사하러 가기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MainCardToLobby;
