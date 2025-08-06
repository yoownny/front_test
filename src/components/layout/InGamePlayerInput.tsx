import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputThrowButtonGroup from "../buttons/InputThrowButtonGroup";
import { Textarea } from "@/components/ui/textarea"

const InGamePlayerInput = () => {
  return (
    <Card className="h-full flex flex-col p-4 gap-4">
      <CardHeader className="p-0">
        <CardTitle className="text-[24px] font-bold">
          <Card className="p-4">문제 내용</Card>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-0">
        <Textarea 
          placeholder="Type your message here."
          className="resize-none h-full"
        />
      </CardContent>

      <CardFooter className="p-0">
        <InputThrowButtonGroup />
      </CardFooter>
    </Card>
  );
};

export default InGamePlayerInput;
