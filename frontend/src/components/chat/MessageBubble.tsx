import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  isAI: boolean;
  timestamp: string;
}

export const MessageBubble = ({ message, isAI, timestamp }: MessageBubbleProps) => {
  return (
    <div className={`flex gap-3 p-4 ${isAI ? 'bg-muted/30' : ''}`}>
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className={isAI ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
          {isAI ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isAI ? 'Lovable AI' : 'You'}
          </span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        
        <div className="text-sm leading-relaxed">
          {message}
        </div>
      </div>
    </div>
  );
};