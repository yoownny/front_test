import MainCardToLobby from "@/components/cards/MainCardToLobby";
import MainCardToAI from "@/components/cards/MainCardToAI";
import MainCardToToday from "@/components/cards/MainCardToToday";

const MainTemplate = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <MainCardToAI/>
      <MainCardToLobby/>
      <MainCardToToday/>
    </div>
  );
};

export default MainTemplate;
