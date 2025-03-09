
import { useState } from "react";
import { ArrowLeft, Clock, Award, ExternalLink, BookOpen, Code, CheckCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChallengeDetailProps {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
  estimatedTime: string;
  prerequisites: string[];
  resources: Array<{ title: string; url: string }>;
  tasks: Array<{ id: string; description: string; completed: boolean }>;
  progress: number;
}

const ChallengeDetail = ({
  id,
  title,
  description,
  longDescription,
  category,
  difficulty,
  points,
  estimatedTime,
  prerequisites,
  resources,
  tasks,
  progress,
}: ChallengeDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Calculate completion stats
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" asChild>
          <a href="/challenges">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Challenges
          </a>
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">
                {category}
              </Badge>
              <Badge 
                variant="outline" 
                className={difficultyColors[difficulty]}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              {description}
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">{points} points</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-medium">Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{completionPercentage}%</span>
              <Button 
                size="sm" 
                className={cn(
                  completionPercentage === 100 ? "bg-green-600 hover:bg-green-700" : ""
                )}
                disabled={completionPercentage !== 100}
              >
                {completionPercentage === 100 ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Complete
                  </>
                ) : (
                  "Complete All Tasks"
                )}
              </Button>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </CardContent>
      </Card>
      
      {/* Main content tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Overview</CardTitle>
                  <CardDescription>
                    Learn about this challenge and what you'll accomplish
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{longDescription}</p>
                    
                    <h3>What You'll Learn</h3>
                    <ul>
                      <li>Understanding core concepts and best practices</li>
                      <li>Building practical, real-world solutions</li>
                      <li>Testing and debugging techniques</li>
                      <li>Performance optimization strategies</li>
                    </ul>
                    
                    <h3>Prerequisites</h3>
                    <ul>
                      {prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Tasks</CardTitle>
                  <CardDescription>
                    Complete these tasks to finish the challenge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {tasks.map((task) => (
                      <li key={task.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-accent">
                        <div className="mt-0.5">
                          <input
                            type="checkbox"
                            id={task.id}
                            checked={task.completed}
                            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                            onChange={() => {}}
                          />
                        </div>
                        <label
                          htmlFor={task.id}
                          className={cn(
                            "cursor-pointer flex-grow text-sm",
                            task.completed && "line-through text-muted-foreground"
                          )}
                        >
                          {task.description}
                        </label>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Save Progress
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Solution</CardTitle>
                  <CardDescription>
                    Upload your code or provide a link to your solution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <label htmlFor="solution-link" className="text-sm font-medium">
                        Solution URL (GitHub, CodePen, etc.)
                      </label>
                      <input
                        type="text"
                        id="solution-link"
                        placeholder="https://github.com/yourusername/project"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <label htmlFor="solution-file" className="text-sm font-medium">
                        Or upload files
                      </label>
                      <input
                        id="solution-file"
                        type="file"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Submit Solution
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                  <CardDescription>
                    Helpful materials to complete this challenge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {resources.map((resource, index) => (
                      <li key={index} className="flex items-start p-3 rounded-md hover:bg-accent">
                        <div className="mr-4 mt-0.5">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{resource.title}</h4>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary flex items-center hover:underline"
                          >
                            View Resource
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussion" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Community Discussion</CardTitle>
                  <CardDescription>
                    Share your questions and insights with other learners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center py-12 text-center">
                    <div>
                      <Code className="h-12 w-12 text-muted-foreground mb-4 mx-auto" />
                      <h3 className="text-lg font-medium mb-2">Join the conversation</h3>
                      <p className="text-muted-foreground mb-4">
                        Connect with fellow coders to share solutions and get help
                      </p>
                      <Button>Start Discussion</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground mb-1">Category</dt>
                  <dd>{category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Difficulty</dt>
                  <dd className="capitalize">{difficulty}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Points</dt>
                  <dd>{points}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Estimated Time</dt>
                  <dd>{estimatedTime}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Share Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-2">
                <Share2 className="mr-2 h-4 w-4" />
                Share with Friends
              </Button>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Challenge URL</h4>
                <div className="flex">
                  <input
                    type="text"
                    value={`https://yoursite.com/challenges/${id}`}
                    readOnly
                    className="flex-grow h-9 rounded-l-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button variant="secondary" className="h-9 rounded-l-none">
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Similar Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm hover:underline">Advanced CSS Animations</a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:underline">JavaScript Array Methods</a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:underline">React State Management</a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
