import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
// import { Link } from "react-router-dom";

const MainCardToToday = () => {
  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle>오늘의 사건 의뢰</CardTitle>
        <CardDescription>
          <p>매일 변경되는 사건을 조사합니다.</p>
          </CardDescription>
      </CardHeader>
      <CardContent>
        <p>🚧</p>
        <p>(공사 중)</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/* <Link to={"/lobby"}> */}
          <Button variant="default" className="w-full">
            조사하러 가기
          </Button>
        {/* </Link> */}
      </CardFooter>
    </Card>
  );
};

export default MainCardToToday;
