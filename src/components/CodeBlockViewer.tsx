import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ClipboardCopy, Check } from 'lucide-react';

interface CodeBlockViewerProps {
  codeString: string;
  language?: string;
  fileName?: string;
}

const CodeBlockViewer: React.FC<CodeBlockViewerProps> = ({
  codeString,
  language,
  fileName,
}) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  console.log('CodeBlockViewer loaded');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: fileName ? `${fileName} code has been copied.` : "Code has been copied.",
      });
      setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2 seconds
    } catch (err) {
      console.error('Failed to copy code: ', err);
      toast({
        title: "Error copying",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="relative group my-4">
      {(fileName || language) && (
        <CardHeader className="flex flex-row justify-between items-center p-3 border-b bg-muted/50">
          <div>
            {fileName && <CardTitle className="text-sm font-medium">{fileName}</CardTitle>}
          </div>
          {language && <span className="text-xs text-muted-foreground uppercase">{language}</span>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="relative">
          <pre className="p-4 text-sm overflow-x-auto bg-background text-foreground rounded-b-md">
            <code className={`language-${language || 'plaintext'}`}>
              {codeString.trim()}
            </code>
          </pre>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
          >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeBlockViewer;