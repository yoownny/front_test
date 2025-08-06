import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

const TimeSelect = ({ 
  value, 
  onValueChange, 
  placeholder = "제한 시간" 
}: TimeSelectProps) => {
  const timeOptions = [
    { value: "10", label: "10분" },
    { value: "15", label: "15분" },
    { value: "20", label: "20분" },
    { value: "25", label: "25분" },
    { value: "30", label: "30분" }
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {timeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
