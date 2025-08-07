import MainCardToLobby from "@/components/cards/MainCardToLobby";
import MainCardToToday from "@/components/cards/MainCardToToday";
import MainCardToRanking from "@/components/cards/MainCardToRanking";
// import MainCardToAI from "@/components/cards/MainCardToAI";

const MainTemplate = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <MainCardToRanking/>
      <MainCardToLobby/>
      <MainCardToToday/>
      
      {/* AI 문제는 나중에 추가할 예정 */}
      {/* <MainCardToAI/> */}
    </div>
  );
};

export default MainTemplate;
