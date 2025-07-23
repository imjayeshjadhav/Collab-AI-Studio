import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

const fileStructure: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    path: 'src',
    children: [
      {
        name: 'codefile',
        type: 'folder',
        path: 'src/components',
        children: [
          ,
        ,
          ,
        ]
      },
      // {
      //   name: 'pages',
      //   type: 'folder',
      //   path: 'src/pages',
      //   children: [
      //     { name: 'Index.tsx', type: 'file', path: 'src/pages/Index.tsx' },
      //     { name: 'NotFound.tsx', type: 'file', path: 'src/pages/NotFound.tsx' },
      //   ]
      // },
      // { name: 'App.tsx', type: 'file', path: 'src/App.tsx' },
      // { name: 'main.tsx', type: 'file', path: 'src/main.tsx' },
      // { name: 'index.css', type: 'file', path: 'src/index.css' },
    ]
  },
  // { name: 'package.json', type: 'file', path: 'package.json' },
  // { name: 'tailwind.config.ts', type: 'file', path: 'tailwind.config.ts' },
  // { name: 'vite.config.ts', type: 'file', path: 'vite.config.ts' },
];

interface FileExplorerProps {
  onFileSelect: (filePath: string) => void;
  selectedFile: string | null;
}

export const FileExplorer = ({ onFileSelect, selectedFile }: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'src/components']));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <Button
          variant="ghost"
          className={`w-full justify-start h-7 px-2 font-normal text-sm ${
            isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              onFileSelect(node.path);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 mr-1" />
              ) : (
                <ChevronRight className="h-3 w-3 mr-1" />
              )}
              {isExpanded ? (
                <FolderOpen className="h-4 w-4 mr-2 text-primary" />
              ) : (
                <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
              )}
            </>
          ) : (
            <>
              <File className="h-4 w-4 mr-2 text-muted-foreground ml-4" />
            </>
          )}
          <span className="truncate">{node.name}</span>
        </Button>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full border-r border-border bg-muted/20">
      <div className="p-3 border-b border-border">
        <h3 className="text-sm font-medium">File Explorer</h3>
      </div>
      <ScrollArea className="h-[calc(100%-53px)]">
        <div className="p-1">
          {fileStructure.map((node) => renderFileNode(node))}
        </div>
      </ScrollArea>
    </div>
  );
};