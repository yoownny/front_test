import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignupCard = () => {
  const [nickname, setNickname] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckDuplicate = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    setIsChecking(true);
    try {
      // TODO: 실제 API 호출로 변경
      // const response = await checkNicknameDuplicate(nickname);
      // setIsAvailable(response.isAvailable);
      
      // 임시 로직 (실제로는 API 호출)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAvailable = Math.random() > 0.5;
      setIsAvailable(mockAvailable);
      
      if (mockAvailable) {
        alert("사용 가능한 닉네임입니다.");
      } else {
        alert("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 중 오류:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSignup = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (isAvailable === null) {
      alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }

    if (!isAvailable) {
      alert("사용할 수 없는 닉네임입니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: 실제 회원가입 API 호출로 변경
      // const response = await signup({ nickname });
      
      // 임시 로직 (실제로는 API 호출)
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("회원가입이 완료되었습니다!");
      
      // 로그인 페이지로 이동
      window.location.href = "/login";
    } catch (error) {
      console.error("회원가입 중 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
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
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsAvailable(null); // 닉네임이 변경되면 중복확인 결과 초기화
              }}
              className="flex-1"
            />
            <Button
              onClick={handleCheckDuplicate}
              disabled={isChecking || !nickname.trim()}
              variant="outline"
              className="whitespace-nowrap"
            >
              {isChecking ? "확인중..." : "중복확인"}
            </Button>
          </div>
          {isAvailable === true && (
            <p className="text-sm text-green-600 mt-1">✓ 사용 가능한 닉네임입니다</p>
          )}
          {isAvailable === false && (
            <p className="text-sm text-red-600 mt-1">✗ 이미 사용 중인 닉네임입니다</p>
          )}
        </div>

        <Button
          onClick={handleSignup}
          disabled={isSubmitting || isAvailable !== true}
          className="w-full"
        >
          {isSubmitting ? "가입중..." : "회원가입 완료"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              로그인하기
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
