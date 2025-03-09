
import { useState } from "react";
import { ArrowRight, Clock, Code, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ChallengeCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
  estimatedTime: string;
  isCompleted?: boolean;
  progress?: number;
}

const DifficultyBadge = ({ difficulty }: { difficulty: "beginner" | "intermediate" | "advanced" }) => {
  const colors = {
    beginner: "bg-green-100 text-green-800 hover:bg-green-100",
    intermediate: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    advanced: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <Badge variant="outline" className={cn(colors[difficulty])}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
};

const ChallengeCard = ({
  id,
  title,
  description,
  category,
  difficulty,
  points,
  estimatedTime,
  isCompleted = false,
  progress = 0,
}: ChallengeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "transition-all duration-300 h-full flex flex-col",
        isHovered && "shadow-lg transform scale-[1.02]",
        isCompleted && "border-green-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1">{category}</CardDescription>
          </div>
          <DifficultyBadge difficulty={difficulty} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span>{points} points</span>
          </div>
        </div>
        
        {progress > 0 && progress < 100 && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          className="w-full" 
          variant={isCompleted ? "outline" : "default"}
        >
          <a href={`/challenges/${id}`}>
            {isCompleted ? (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Review Challenge
              </>
            ) : (
              <>
                {progress > 0 ? "Continue" : "Start"} Challenge
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
