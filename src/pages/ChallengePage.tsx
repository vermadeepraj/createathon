
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Trophy, Clock, Users, Save, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Badge from "@/components/ui/common/Badge";

// Mock challenge data
const challengeData = {
  id: 1,
  title: "Build a Responsive Navigation Bar",
  description: "Create a fully responsive navigation bar that transforms into a hamburger menu on mobile devices. This challenge will test your HTML, CSS, and JavaScript skills.",
  difficulty: "Beginner",
  category: "Web Development",
  completions: 1243,
  timeEstimate: "1-2 hours",
  points: 50,
  progress: 25,
  instructions: `
## Objective

Create a navigation bar that:
- Displays horizontally on desktop
- Collapses into a hamburger menu on mobile devices (viewport width < 768px)
- Animates smoothly during the transition

## Requirements

1. **HTML Structure**
   - Create a semantic navigation structure
   - Include a logo/brand element
   - Include at least 5 navigation links
   - Include a hamburger icon for mobile

2. **CSS Styling**
   - Style the navigation bar with a modern, clean aesthetic
   - Use Flexbox or Grid for layout
   - Implement responsive breakpoints
   - Add hover effects for interactive elements

3. **JavaScript Functionality**
   - Toggle the mobile menu when the hamburger icon is clicked
   - Implement smooth animations for menu appearance/disappearance
   - Ensure the menu closes when a link is clicked

## Bonus Tasks

- Add a dropdown for one of the menu items
- Implement a sticky navigation that changes style on scroll
- Add accessibility features (ARIA attributes, keyboard navigation)

## Submission

Your submission should include:
- HTML, CSS, and JavaScript files
- A brief explanation of your approach
- Any challenges you faced and how you overcame them
  `,
  codeTemplate: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Navigation</title>
  <style>
    /* Your CSS here */
    
  </style>
</head>
<body>
  <!-- Your HTML here -->
  
  <script>
    // Your JavaScript here
    
  </script>
</body>
</html>
  `
};

// Difficulty badge color mapping
const difficultyColors = {
  "Beginner": "success",
  "Intermediate": "warning",
  "Advanced": "error",
} as const;

const ChallengePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("instructions");
  const [code, setCode] = useState(challengeData.codeTemplate);

  // In a real app, you would fetch the challenge data based on the id

  return (
    <div className="container px-4 py-12 max-w-6xl">
      <Link to="/challenges" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to challenges
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:w-2/3">
          <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <Badge 
                label={challengeData.category} 
                variant="outline" 
                className="text-xs"
              />
              <Badge 
                label={challengeData.difficulty} 
                variant={difficultyColors[challengeData.difficulty as keyof typeof difficultyColors]} 
                className="text-xs"
              />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{challengeData.title}</h1>
            <p className="text-muted-foreground mb-6">{challengeData.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>{challengeData.points} points</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{challengeData.timeEstimate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{challengeData.completions.toLocaleString()} completions</span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1 flex-grow mr-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{challengeData.progress}%</span>
                </div>
                <Progress value={challengeData.progress} className="h-2" />
              </div>
              
              <Button className="bg-primary text-white hover:bg-primary/90">
                Submit Solution
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="solution">Your Solution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructions" className="p-0 mt-6">
              <div className="glass-card p-6">
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: challengeData.instructions.replace(/^#{1,6}\s+(.+)$/gm, '<h$1>$2</h$1>').replace(/^-\s+(.+)$/gm, '<li>$1</li>').replace(/\n\n/g, '</p><p>') }} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="solution" className="p-0 mt-6">
              <div className="glass-card p-6">
                <div className="bg-black rounded-lg p-4 mb-6">
                  <pre className="text-white overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                    <Button className="bg-primary text-white hover:bg-primary/90">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Learning Resources</h2>
            <ul className="space-y-4">
              {[
                { title: "CSS Flexbox Guide", url: "#" },
                { title: "Responsive Design Principles", url: "#" },
                { title: "JavaScript DOM Manipulation", url: "#" },
                { title: "CSS Media Queries", url: "#" },
              ].map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.url} 
                    className="flex items-center text-primary hover:underline"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {resource.title}
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-lg font-medium mb-4">Similar Challenges</h2>
            <ul className="space-y-4">
              {[
                { id: 2, title: "Build a Modal Component", difficulty: "Beginner" },
                { id: 3, title: "Implement a Dropdown Menu", difficulty: "Intermediate" },
                { id: 4, title: "Create a Form with Validation", difficulty: "Intermediate" },
              ].map((challenge) => (
                <li key={challenge.id} className="border-b border-border/40 last:border-0 pb-4 last:pb-0">
                  <Link to={`/challenges/${challenge.id}`} className="group">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {challenge.title}
                      </h3>
                      <Badge 
                        label={challenge.difficulty} 
                        variant={difficultyColors[challenge.difficulty as keyof typeof difficultyColors]} 
                        size="sm" 
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
