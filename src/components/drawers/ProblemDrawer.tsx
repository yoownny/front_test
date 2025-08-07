import { useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import ExistingProblemList from "./ExistingProblemList";
import ProblemDetail from "./ProblemDetail";
import CustomProblemForm from "./CustomProblemForm";

import type { Problem, SelectedProblem } from "@/types/problem/problem";
import { apiClient } from "@/services/api/apiClient";
import { X } from "lucide-react";

interface ProblemDrawerProps {
  onProblemSelect: (problem: SelectedProblem) => void;
}

const ProblemDrawer = ({ onProblemSelect }: ProblemDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handleSelect = async (problemId: string) => {
  try {
    const data = await apiClient.get<Problem>(`/problems/${problemId}`);
    setSelectedProblem(data);
  } catch (err) {
    console.error("문제 상세 조회 실패:", err);
  }
};

  const handleConfirmExistingSelection = () => {
    if (!selectedProblem) return;
    onProblemSelect({
      ...selectedProblem,
      problemType: "ORIGINAL",
    });
    setIsOpen(false);
    setSelectedProblem(null);
  };

  const handleCustomSubmit = (customData: SelectedProblem) => {
    onProblemSelect(customData);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">사건 선택하기</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90%] px-6 py-4">
        <DrawerHeader className="flex flex-row justify-between text-center">
          <DrawerTitle className="text-2xl">사건 선택하기</DrawerTitle>
          <DrawerClose>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <X size={50} />
          </Button>
          </DrawerClose>
        </DrawerHeader>

        <Tabs defaultValue="existing" className="mt-4 w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">기존 사건</TabsTrigger>
            <TabsTrigger value="custom">새로운 사건</TabsTrigger>
          </TabsList>

          {/* 기존 사건 탭 */}
          <TabsContent value="existing" className="h-full mt-4">
            <div className="flex h-full gap-4">
              <ExistingProblemList onSelect={handleSelect} />
              <ProblemDetail problem={selectedProblem} onConfirm={handleConfirmExistingSelection} />
            </div>
          </TabsContent>

          {/* 새로운 사건 탭 */}
          <TabsContent value="custom" className="pt-4 space-y-4 h-full overflow-y-auto">
            <CustomProblemForm onSubmit={handleCustomSubmit} />
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
};

export default ProblemDrawer;
