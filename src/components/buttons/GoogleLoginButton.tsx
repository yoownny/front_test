import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;

      try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        });

        const data = await response.json();

        if (!response.ok || !data.accessToken) {
          throw new Error("로그인 실패");
        }

        // 로그인 성공 시 토큰 저장
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        navigate("/lobby");
      } catch (error) {
        alert("구글 로그인에 실패했습니다. 다시 시도해 주세요.");
        console.error("로그인 오류:", error);
      }
    },
    onError: () => console.error("구글 로그인 실패"),
  });

  return (
    <Button
      variant="outline"
      className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100"
      onClick={() => login()}
    >
      <FcGoogle size={20} />
      구글 계정으로 로그인
    </Button>
  );
};

export default GoogleLoginButton;
