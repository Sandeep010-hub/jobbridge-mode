
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Wand2, Tags, FileText, Loader2 } from 'lucide-react';

interface AIFeaturesProps {
  projectDescription?: string;
  onSummaryGenerated?: (summary: string) => void;
  onTagsGenerated?: (tags: string[]) => void;
}

export function AIFeatures({ projectDescription, onSummaryGenerated, onTagsGenerated }: AIFeaturesProps) {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);

  const generateSummary = async () => {
    if (!projectDescription) return;
    
    setIsGeneratingSummary(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const summary = `This project demonstrates advanced technical skills in modern web development, showcasing proficiency in React, TypeScript, and responsive design principles. The implementation features clean architecture, optimal performance, and user-centric design that would be valuable in professional development environments.`;
      
      setGeneratedSummary(summary);
      onSummaryGenerated?.(summary);
      setIsGeneratingSummary(false);
    }, 2000);
  };

  const generateTags = async () => {
    if (!projectDescription) return;
    
    setIsGeneratingTags(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const tags = ['React', 'TypeScript', 'Tailwind CSS', 'Responsive Design', 'Frontend Development'];
      
      setGeneratedTags(tags);
      onTagsGenerated?.(tags);
      setIsGeneratingTags(false);
    }, 1500);
  };

  return (
    <Card className="glass-dark border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          AI Enhancement Tools
        </CardTitle>
        <CardDescription className="text-gray-400">
          Let AI help make your project more professional and discoverable
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Generate Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Professional Summary
            </h4>
            <Button 
              size="sm" 
              onClick={generateSummary}
              disabled={isGeneratingSummary || !projectDescription}
              className="gradient-primary hover:opacity-90"
            >
              {isGeneratingSummary ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
          
          {generatedSummary && (
            <div className="p-3 bg-white/5 rounded-lg border border-purple-500/20">
              <p className="text-gray-300 text-sm leading-relaxed">{generatedSummary}</p>
            </div>
          )}
        </div>

        {/* Generate Tags */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium flex items-center gap-2">
              <Tags className="w-4 h-4" />
              Skill Tags
            </h4>
            <Button 
              size="sm" 
              onClick={generateTags}
              disabled={isGeneratingTags || !projectDescription}
              className="gradient-primary hover:opacity-90"
            >
              {isGeneratingTags ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Suggest Tags
                </>
              )}
            </Button>
          </div>
          
          {generatedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {generatedTags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {!projectDescription && (
          <div className="text-center py-4">
            <p className="text-gray-400 text-sm">
              Add a project description to enable AI features
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
