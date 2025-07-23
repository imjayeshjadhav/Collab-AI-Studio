import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // Import X icon for closing the chat box

/**
 * ChatButtonAndModal Component (Movable, Resizable, Positioned)
 *
 * This component renders a button (whose content is passed as children).
 * When clicked, it toggles the visibility of a small, floating, movable,
 * and resizable chat box that does not block interaction with the rest of the page.
 *
 * @param {ReactNode} children - The content to be rendered inside the button
 * that triggers the chat box. This would typically be an icon.
 */
interface ChatButtonAndModalProps {
  children?: ReactNode; // Made children prop optional
}

// Define a type for a chat message
interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean; // To differentiate messages from the current user
}

export const ChatButtonAndModal = ({ children }: ChatButtonAndModalProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 320, height: 400 }); // Initial size
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  const [resizeStartData, setResizeStartData] = useState({ startX: 0, startY: 0, startWidth: 0, startHeight: 0, handle: '' });
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Messages array is now empty

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for scrolling to the latest message

  useEffect(() => {
    setPosition({ 
      x: window.innerWidth - 340, 
      y: window.innerHeight - 440 
    });
  }, []);
  // Function to set initial position near the trigger button
  const setInitialPosition = useCallback(() => {
    if (triggerButtonRef.current && chatBoxRef.current) {
      const buttonRect = triggerButtonRef.current.getBoundingClientRect();
      const chatBoxWidth = size.width;
      const chatBoxHeight = size.height;

      // Position top-right of the button, with some offset and boundary checks
      let newX = buttonRect.right - chatBoxWidth;
      let newY = buttonRect.bottom + 10; // 10px below the button

      // Ensure it doesn't go off screen (right/bottom)
      newX = Math.min(newX, window.innerWidth - chatBoxWidth - 10);
      newY = Math.min(newY, window.innerHeight - chatBoxHeight - 10);

      // Ensure it doesn't go off screen (left/top)
      newX = Math.max(newX, 10);
      newY = Math.max(newY, 10);

      setPosition({ x: newX, y: newY });
    }
  }, [size.width, size.height]);

  // Effect to set initial position when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setInitialPosition();
    }
  }, [isChatOpen, setInitialPosition]);

  // Effect to scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Scroll whenever messages change

  // Draggable logic
  const handleDragStart = (e: React.MouseEvent) => {
    if (chatBoxRef.current) {
      setIsDragging(true);
      setDragStartOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      let newX = e.clientX - dragStartOffset.x;
      let newY = e.clientY - dragStartOffset.y;

      // Boundary checks for dragging
      newX = Math.max(0, Math.min(newX, window.innerWidth - size.width));
      newY = Math.max(0, Math.min(newY, window.innerHeight - size.height));

      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, dragStartOffset, size.width, size.height]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Resizable logic
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation(); // Prevent drag from starting if resizing
    setIsResizing(true);
    setResizeStartData({
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      handle: handle,
    });
  };

  const handleResize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const { startX, startY, startWidth, startHeight, handle } = resizeStartData;
      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;

      const minWidth = 250;
      const minHeight = 200;

      if (handle.includes('right')) {
        newWidth = Math.max(minWidth, startWidth + (e.clientX - startX));
      }
      if (handle.includes('bottom')) {
        newHeight = Math.max(minHeight, startHeight + (e.clientY - startY));
      }
      if (handle.includes('left')) {
        newWidth = Math.max(minWidth, startWidth - (e.clientX - startX));
        newX = startX + (startWidth - newWidth); // Adjust X position for left resize
      }
      if (handle.includes('top')) {
        newHeight = Math.max(minHeight, startHeight - (e.clientY - startY));
        newY = startY + (startHeight - newHeight); // Adjust Y position for top resize
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    }
  }, [isResizing, resizeStartData, position.x, position.y, size.width, size.height]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Global mouse event listeners for dragging and resizing
  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', isDragging ? handleDrag : handleResize);
      document.addEventListener('mouseup', isDragging ? handleDragEnd : handleResizeEnd);
    } else {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isDragging, isResizing, handleDrag, handleDragEnd, handleResize, handleResizeEnd]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(), // Unique ID for the message
        user: 'You', // This would be dynamic in a real app (e.g., from auth context)
        text: currentMessage.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCurrentMessage(''); // Clear input field
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Send on Enter, allow Shift+Enter for new line
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* The trigger button for the chat box */}
      <Button
        ref={triggerButtonRef} // Assign ref to the button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsChatOpen(!isChatOpen)} // Toggle visibility on click
      >
        {children} {/* This is where your icon will go */}
      </Button>

      {/* The floating, movable, and resizable chat box */}
      {isChatOpen && (
        <div
          ref={chatBoxRef} // Assign ref to the chat box
          className="fixed border border-border rounded-lg shadow-lg z-50 flex flex-col overflow-hidden bg-blue-200" // Changed bg-card to bg-blue-200
          style={{
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            cursor: isDragging ? 'grabbing' : 'grab', // Cursor for dragging
          }}
        >
          {/* Chat Box Header (Drag Handle) */}
          <div
            className="flex justify-between items-center p-3 border-b border-border bg-blue-300 rounded-t-lg cursor-grab text-blue-900" // Changed bg-muted/20 to bg-blue-300, added text-blue-900
            onMouseDown={handleDragStart}
          >
            <h3 className="text-lg font-semibold">Collaborative Chat</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-blue-900 hover:bg-blue-400" // Added text-blue-900, hover effect
              onClick={() => setIsChatOpen(false)} // Close button
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-3 overflow-y-auto text-sm"> {/* Removed text-muted-foreground to allow message colors */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded-md ${
                  msg.isCurrentUser
                    ? 'bg-blue-100 text-blue-800 self-end ml-auto' // Sky color for current user (sent)
                    : 'bg-white text-gray-800 self-start mr-auto' // White background for other users (received)
                }`}
                style={{ maxWidth: '85%' }} // Limit message bubble width
              >
                <div className="font-semibold text-xs mb-1">
                  {msg.user} <span className="text-gray-500 ml-1">{msg.timestamp}</span> {/* Changed text-muted-foreground to text-gray-500 */}
                </div>
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Scroll to this div */}
          </div>

          {/* Chat Input Area */}
          <div className="p-3 border-t border-border bg-blue-300 rounded-b-lg"> {/* Changed bg-muted/20 to bg-blue-300 */}
            <textarea
              className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
              placeholder="Type your message here..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
            <Button className="mt-2 w-full" onClick={handleSendMessage}>Send Message</Button>
          </div>

          {/* Resize Handles */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-nwse-resize" // Changed bg-primary to bg-blue-500
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
            style={{ borderRadius: '0 0 8px 0' }} // Match border-radius of parent
          ></div>
          <div
            className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500 cursor-nesw-resize" // Changed bg-primary to bg-blue-500
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
            style={{ borderRadius: '0 0 0 8px' }}
          ></div>
          <div
            className="absolute top-0 right-0 w-3 h-3 bg-blue-500 cursor-nesw-resize" // Changed bg-primary to bg-blue-500
            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
            style={{ borderRadius: '0 8px 0 0' }}
          ></div>
          <div
            className="absolute top-0 left-0 w-3 h-3 bg-blue-500 cursor-nwse-resize" // Changed bg-primary to bg-blue-500
            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
            style={{ borderRadius: '8px 0 0 0' }}
          ></div>
        </div>
      )}
    </>
  );
};
