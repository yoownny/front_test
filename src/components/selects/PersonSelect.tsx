import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

// 방 만들기 - 최대 인원 선택
const PersonSelect = ({
  value,
  onValueChange,
  placeholder = "최대 인원",
}: PersonSelectProps) => {
  const personOptions = [
    { value: "2", label: "2명" },
    { value: "3", label: "3명" },
    { value: "4", label: "4명" },
    { value: "5", label: "5명" },
    { value: "6", label: "6명" },
  ];
  return (
    <>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {personOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default PersonSelect;
