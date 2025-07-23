import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileExplorer } from "./FileExplorer"; // Assuming FileExplorer is available
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Play, Save, FileText } from "lucide-react";

// Initial sample code structure (empty for new Python files)
const initialCodeContent: { [key: string]: string } = {
  'main.py': '', // Start with an empty Python file
};

export const CodeEditor = () => {
  const [openTabs, setOpenTabs] = useState<string[]>(['main.py']);
  const [activeTab, setActiveTab] = useState('main.py');
  const [fileExplorerWidth, setFileExplorerWidth] = useState(250);
  const [codeContent, setCodeContent] = useState<typeof initialCodeContent>(initialCodeContent);
  const [outputContent, setOutputContent] = useState<string>('');

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Synchronize scrolling between editor and line numbers
  const handleScroll = useCallback(() => {
    if (editorRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
    }
  }, []);

  useEffect(() => {
    const editorElement = editorRef.current;
    if (editorElement) {
      editorElement.addEventListener('scroll', handleScroll);
      return () => {
        editorElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeTab, handleScroll]); // Re-attach listener if activeTab changes

  // Generate line numbers based on code content
  const getLineNumbers = (content: string) => {
    const lines = content.split('\n');
    return lines.map((_, index) => index + 1).join('\n');
  };

  const handleFileSelect = (filePath: string) => {
    if (!openTabs.includes(filePath)) {
      setOpenTabs([...openTabs, filePath]);
      // Initialize content for new files if they don't exist in state
      if (!codeContent[filePath]) {
        setCodeContent(prev => ({ ...prev, [filePath]: '' }));
      }
    }
    setActiveTab(filePath);
  };

  const closeTab = (filePath: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab !== filePath);
    setOpenTabs(newTabs);

    // If the active tab is closed, switch to the last remaining tab
    if (activeTab === filePath) {
      if (newTabs.length > 0) {
        setActiveTab(newTabs[newTabs.length - 1]);
      } else {
        setActiveTab(''); // No tabs left
        setOutputContent(''); // Clear output when no tabs are open
      }
    }
  };

  const getFileName = (path: string) => {
    return path.split('/').pop() || path;
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCodeContent(prev => ({ ...prev, [activeTab]: newCode }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Prevent default tab behavior (losing focus)
      const { current: editor } = editorRef;
      if (editor) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        // Insert 2 spaces for tab
        const newCode = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
        setCodeContent(prev => ({ ...prev, [activeTab]: newCode }));

        // Move cursor after the inserted spaces
        // Use setTimeout to ensure state update has rendered before setting selection
        setTimeout(() => {
          editor.selectionStart = editor.selectionEnd = start + 2;
        }, 0);
      }
    }
  };

  const handleRunCode = () => {
    const currentCode = codeContent[activeTab];
    if (currentCode) {
      // Simulate Python execution. In a real app, this would send code to a backend or Pyodide.
      setOutputContent(`--- Running ${getFileName(activeTab)} ---\n\n${currentCode}\n\n--- End of execution simulation ---`);
    } else {
      setOutputContent('No code to run in the active file.');
    }
  };

  const handleSaveCode = () => {
    // In a real application, this would save the code to a backend or local storage.
    console.log(`Saving code for ${activeTab}:\n`, codeContent[activeTab]);
    setOutputContent(`Code for ${getFileName(activeTab)} saved (simulated).`);
  };

  const handlePreviewCode = () => {
    // In a real application, this might render the output of the code or a web preview.
    setOutputContent(`Previewing code for ${getFileName(activeTab)}:\n\n${codeContent[activeTab]}`);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-background text-foreground">
      {/* File Explorer */}
      <div style={{ width: `${fileExplorerWidth}px` }} className="flex-shrink-0 border-r border-border min-w-[200px] max-w-[400px] overflow-hidden">
        {/* FileExplorer component is assumed to be available */}
        <FileExplorer
          onFileSelect={handleFileSelect}
          selectedFile={activeTab}
        />
      </div>

      {/* Resize Handle */}
      <div
        className="hidden md:block w-1 bg-border hover:bg-primary cursor-col-resize transition-colors"
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startWidth = fileExplorerWidth;

          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const newWidth = Math.max(200, Math.min(400, startWidth + deltaX));
            setFileExplorerWidth(newWidth);
          };

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Python Editor</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveCode}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreviewCode}>
              <X className="h-4 w-4 mr-2" /> {/* Changed to 'X' for a generic 'Preview' or 'Clear Output' */}
              Preview
            </Button>
            <Button variant="hero" size="sm" onClick={handleRunCode}>
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
          </div>
        </div>

        {/* Tabs */}
        {openTabs.length > 0 && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start h-10 bg-muted/30 rounded-none border-b">
              {openTabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="relative group data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 flex items-center gap-2"
                >
                  <span className="mr-1">{getFileName(tab)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-opacity"
                    onClick={(e) => closeTab(tab, e)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </TabsTrigger>
              ))}
            </TabsList>

            {openTabs.map((tab) => (
              <TabsContent key={tab} value={tab} className="flex-1 m-0 flex flex-col">
                <div className="flex-1 flex overflow-hidden">
                  {/* Line Numbers */}
                  <div
                    ref={lineNumbersRef}
                    className="w-10 bg-muted/20 text-muted-foreground text-right pr-2 pt-2 text-sm font-mono overflow-hidden select-none"
                    style={{ lineHeight: '1.5rem', whiteSpace: 'pre-wrap', overflowY: 'hidden' }} // Hide vertical scrollbar
                  >
                    {getLineNumbers(codeContent[tab] || '')}
                  </div>

                  {/* Code Editor Textarea */}
                  <textarea
                    ref={editorRef}
                    value={codeContent[tab] || ''}
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-background text-foreground p-2 text-sm font-mono resize-none outline-none border-none leading-relaxed"
                    spellCheck="false"
                    wrap="off" // Prevent automatic word wrapping
                    style={{ lineHeight: '1.5rem' }} // Match line height with line numbers
                  />
                </div>

                {/* Output Console */}
                <div className="h-48 bg-card border-t border-border p-4 text-sm font-mono overflow-auto">
                  <h3 className="font-semibold mb-2 text-muted-foreground">Output:</h3>
                  <pre className="whitespace-pre-wrap text-wrap">{outputContent}</pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {openTabs.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a file from the explorer to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};