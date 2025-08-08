import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { signup } from "@/services/api/auth/signupApi";
import { checkNicknameDuplicate } from "@/services/api/auth/nicknameApi";
import { useAuthStore } from "@/stores/authStore";
import { validateNickname } from "@/utils";

const SignupCard = () => {
  const [nickname, setNickname] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuthStore();

  const handleCheckDuplicate = async () => {
    const validation = validateNickname(nickname);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setIsChecking(true);
    setError(null);
    
    try {
      const available = await checkNicknameDuplicate(nickname);
      setIsAvailable(available);
      
      if (!available) {
        setError("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 중 오류:", error);
      const errorMessage = error instanceof Error ? error.message : "닉네임 중복 확인 중 오류가 발생했습니다.";
      setError(errorMessage);
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSignup = async () => {
    const validation = validateNickname(nickname);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    if (isAvailable === null) {
      setError("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }

    if (!isAvailable) {
      setError("사용할 수 없는 닉네임입니다.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // sessionStorage에서 Google ID 가져오기
      const socialId = sessionStorage.getItem('tempGoogleId');
      
      if (!socialId) {
        setError('소셜 로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
        return;
      }

      console.log('회원가입 시작:', { socialId, nickname });

      // 회원가입 API 호출
      const response = await signup({ socialId, nickname });

      console.log('회원가입 성공:', response);

      // 사용자 정보 저장
      setUser(response.user);
      
      // accessToken 저장
      setAccessToken(response.accessToken);
      
      // 임시 Google ID 제거
      sessionStorage.removeItem('tempGoogleId');

      console.log('로비로 이동');
      navigate('/lobby');

    } catch (error) {
      console.error("회원가입 중 오류:", error);
      const errorMessage = error instanceof Error ? error.message : "회원가입 중 오류가 발생했습니다.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsAvailable(null); // 닉네임이 변경되면 중복확인 결과 초기화
    setError(null); // 에러 메시지 초기화
  };

  const handleBackToLogin = () => {
    // 임시 Google ID 제거
    sessionStorage.removeItem('tempGoogleId');
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">회원가입</h1>
        <p className="text-gray-600">닉네임을 입력하여 회원가입을 완료하세요</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
            닉네임
          </label>
          <div className="flex gap-2">
            <Input
              id="nickname"
              type="text"
              placeholder="2-8글자 (한글, 영문, 숫자, _, -)"
              value={nickname}
              onChange={handleNicknameChange}
              className={`flex-1 ${
                isAvailable === true ? 'border-green-400 focus:border-green-400' : ''
              } ${
                isAvailable === false || error ? 'border-red-400 focus:border-red-400' : ''
              }`}
              disabled={isChecking || isSubmitting}
              maxLength={8}
            />
            <Button
              onClick={handleCheckDuplicate}
              disabled={isChecking || !nickname.trim() || isSubmitting}
              variant="outline"
              className="whitespace-nowrap"
            >
              {isChecking ? "확인중..." : "중복확인"}
            </Button>
          </div>
          
          {/* 상태 메시지 */}
          {isAvailable === true && !error && (
            <p className="text-sm text-green-600 mt-1">✓ 사용 가능한 닉네임입니다</p>
          )}
          {isAvailable === false && (
            <p className="text-sm text-red-600 mt-1">✗ 이미 사용 중인 닉네임입니다</p>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleSignup}
          disabled={isSubmitting || isAvailable !== true}
          className="w-full"
        >
          {isSubmitting ? "가입중..." : "회원가입 완료"}
        </Button>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <button 
              onClick={handleBackToLogin}
              disabled={isSubmitting}
              className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
            >
              다른 계정으로 로그인
            </button>
          </p>
          
          {/* 안내 메시지 */}
          <div className="text-xs text-gray-500 space-y-1">
            <div>• 닉네임은 2-8글자로 설정해주세요</div>
            <div>• 한글, 영문, 숫자, _(언더바), -(하이픈) 사용 가능</div>
            <div>• 나중에 설정에서 변경할 수 있습니다</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;