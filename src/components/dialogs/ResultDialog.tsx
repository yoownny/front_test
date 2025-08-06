import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

interface Result {
  winner: string;
  time: number; //소요 시간 n분
  turn: number; //시도 턴 수 m턴
  content: string;
  answer: string;
  isCorrect: boolean;
}

interface ResultProps {
  result: Result;
}

const ResultDialog = ({ result }: ResultProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* 추후 이벤트리스너로 처리 예정 */}
        <Button>게임 종료</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>수사 결과</DialogTitle>
        </DialogHeader>

        <div className="text-center p-4 text-lg font-semibold">
          {result.isCorrect === true ? "🎉 수사 성공!" : "😢 수사 종료"}
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="justify-between">
            <Badge className="bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md">소요시간: {result.time}분</Badge>
            <Badge className="bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md">시도 턴 수: {result.turn}턴</Badge>
            <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md">
              정답자: {result.isCorrect === true ? result.winner : "없음"}
            </Badge>
          </div>
        </div>

        {/* 문제 내용 */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">사건 내용</h3>
          <div className="bg-muted rounded-md p-4 text-sm">
            {result.content}
          </div>
        </div>

        {/* 문제 내용 */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">사건의 전말</h3>
          <div className="bg-muted rounded-md p-4 text-sm">{result.answer}</div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <Button>👍 이 문제 좋아요</Button>
          <Button>파일로 돌아가기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// 테스트용 컴포넌트
// const TestResultDialog = () => {
//   const mockResult: Result = {
//     winner: "Craftor",
//     time: 15,
//     turn: 25,
//     content:
//       "한 남자가 어느 레스토랑에서 바다거북 수프를 주문했다. 그는 수프를 한 입 먹고는 주방장을 불러 자신이 먹은 게 정말 바다거북 수프인지 물었다. 그렇다는 대답을 들은 남자는 계산을 마치고 집에 돌아가 스스로 목숨을 끊었다. 그 이유는 무엇일까?",
//     answer:
//       "남성은 과거에 조난해 굶어 죽을 위기에 처한 적 있다. 당시 함께 조난한 동료는 그에게 음식을 먹이며 '바다거북 수프'라고 이야기했다. 하지만 남성은 그 수프가 사실은 먼저 사망한 다른 조난자들의 인육일 가능성을 의심해 왔다. 마침내 먹어본 진짜 바다거북 수프의 맛은 기억과 달랐고, 남성은 진실을 깨달았다고 여겨 죄책감 속에 목숨을 끊고 만다.",
//     isCorrect: true,
//   };

//   const mockResultFail: Result = {
//     winner: "Detective",
//     time: 30,
//     turn: 50,
//     content:
//       "한 남자가 어느 레스토랑에서 바다거북 수프를 주문했다. 그는 수프를 한 입 먹고는 주방장을 불러 자신이 먹은 게 정말 바다거북 수프인지 물었다. 그렇다는 대답을 들은 남자는 계산을 마치고 집에 돌아가 스스로 목숨을 끊었다. 그 이유는 무엇일까?",
//     answer:
//       "남성은 과거에 조난해 굶어 죽을 위기에 처한 적 있다. 당시 함께 조난한 동료는 그에게 음식을 먹이며 '바다거북 수프'라고 이야기했다. 하지만 남성은 그 수프가 사실은 먼저 사망한 다른 조난자들의 인육일 가능성을 의심해 왔다. 마침내 먹어본 진짜 바다거북 수프의 맛은 기억과 달랐고, 남성은 진실을 깨달았다고 여겨 죄책감 속에 목숨을 끊고 만다.",
//     isCorrect: false,
//   };

//   return (
//     <div className="p-8 space-y-4">
//       <h1 className="text-2xl font-bold mb-6">ResultDialog 테스트</h1>

//       <div className="space-y-4">
//         <div>
//           <h2 className="text-lg font-semibold mb-2">성공 케이스</h2>
//           <ResultDialog result={mockResult} />
//         </div>

//         <div>
//           <h2 className="text-lg font-semibold mb-2">실패 케이스</h2>
//           <ResultDialog result={mockResultFail} />
//         </div>
//       </div>

//       {/* 추가 테스트용 데이터 */}
//       <div className="mt-8 p-4 bg-gray-100 rounded-lg">
//         <h3 className="font-semibold mb-2">테스트 데이터 확인:</h3>
//         <pre className="text-xs overflow-x-auto">
//           {JSON.stringify(mockResult, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

export default ResultDialog;
// export { TestResultDialog };
