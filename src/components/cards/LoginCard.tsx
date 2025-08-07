import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import GoogleLoginButton from "@/components/buttons/GoogleLoginButton";

const LoginCard = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>소셜 로그인</CardTitle>
        <CardDescription>게임을 시작하려면 로그인하세요.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <GoogleLoginButton />
      </CardContent>
    </Card>
  );
};

export default LoginCard;