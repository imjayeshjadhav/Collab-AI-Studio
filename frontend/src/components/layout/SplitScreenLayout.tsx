import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { ChatButtonAndModal } from "./ChatButtonAndModal";
import { IoPersonAddOutline } from "react-icons/io5";

import { CiChat1 } from "react-icons/ci";

export const SplitScreenLayout = () => {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50); // percentage

  const handleResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = leftPanelWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const containerWidth = window.innerWidth;
      const deltaPercentage = (deltaX / containerWidth) * 100;
      const newWidth = Math.max(20, Math.min(80, startWidth + deltaPercentage));
      setLeftPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="h-12 bg-card border-b border-border flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            className="p-2"
          >
            {leftPanelCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
            AI Code editor
          </h1>
        </div>
{/* this is the icone of chat and add friend */}

        <div className="flex gap-2 ">
          <ChatButtonAndModal><CiChat1 /></ChatButtonAndModal>

          <div className="flex center">
            <Button className=""><IoPersonAddOutline /></Button>

          </div>
        </div>
        
          
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Share
          </Button>
          <Button variant="hero" size="sm">
            Run
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - AI Chat */}
        <div 
          className={`bg-card border-r border-border transition-all duration-300 ${
            leftPanelCollapsed ? 'w-0' : ''
          }`}
          style={{ 
            width: leftPanelCollapsed ? '0%' : `${leftPanelWidth}%`,
            minWidth: leftPanelCollapsed ? '0px' : '300px'
          }}
        >
          <ChatInterface collapsed={leftPanelCollapsed} />
        </div>

        {/* Resize Handle */}
        {!leftPanelCollapsed && (
          <div 
            className="w-1 bg-border hover:bg-primary cursor-col-resize transition-colors"
            onMouseDown={handleResize}
          />
        )}

        {/* Right Panel - Code Editor */}
        <div className="flex-1 bg-background">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};