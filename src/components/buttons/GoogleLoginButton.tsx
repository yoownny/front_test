import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

const GoogleLoginButton = () => {
  const { isLoading, handleGoogleLogin } = useGoogleAuth();

  return (
    <Button
      variant="outline"
      className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 disabled:opacity-50"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <FcGoogle size={20} />
      {isLoading ? '로그인 중...' : '구글 계정으로 로그인'}
    </Button>
  );
};

export default GoogleLoginButton;