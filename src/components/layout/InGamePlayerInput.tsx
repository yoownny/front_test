import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import InputThrowButtonGroup from "../buttons/InputThrowButtonGroup";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const InGamePlayerInput = () => {
  const [content, setContent] = useState("");

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <Card className="h-full flex flex-col p-4 gap-4">
      <CardHeader className="p-0">
        <Card className="text-[24px] p-4">문제 내용</Card>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-0">
        <Textarea
          placeholder="Type your message here."
          className="resize-none h-full"
          value={content}
          onChange={onChangeContent}
        />
      </CardContent>

      <CardFooter className="p-0">
        <InputThrowButtonGroup content={content} />
      </CardFooter>
    </Card>
  );
};

export default InGamePlayerInput;
