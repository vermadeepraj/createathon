
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Trophy, Clock, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import AnimatedCard from "@/components/ui/common/AnimatedCard";
import Badge from "@/components/ui/common/Badge";
import { cn } from "@/lib/utils";
import { getFadeInStaggerClass } from "@/lib/animations";

const mockChallenges = [
  { id: 1, title: "Introduction to React Hooks", category: "Web Development", progress: 75, lastAccessed: "2 days ago" },
  { id: 2, title: "Building a REST API with Django", category: "Backend", progress: 30, lastAccessed: "1 week ago" },
  { id: 3, title: "Data Visualization with D3.js", category: "Data Science", progress: 50, lastAccessed: "3 days ago" },
];

const mockAchievements = [
  { id: 1, title: "First Challenge Completed", date: "May 15, 2023", icon: "🏆" },
  { id: 2, title: "5-Day Streak", date: "May 20, 2023", icon: "🔥" },
  { id: 3, title: "Algorithm Master", date: "June 2, 2023", icon: "🧠" },
];

const Dashboard = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="animate-pulse-subtle">Loading dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect will happen via useEffect
  }

  return (
    <div className="container px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <Badge 
            label="Dashboard" 
            variant="outline" 
            size="lg" 
            className={getFadeInStaggerClass(0)}
          />
          <h1 className={cn(
            "text-3xl font-bold mt-2", 
            getFadeInStaggerClass(1)
          )}>
            Welcome back, {user?.name}
          </h1>
          <p className={cn(
            "text-muted-foreground mt-2", 
            getFadeInStaggerClass(2)
          )}>
            Track your progress and continue your learning journey
          </p>
        </div>
        
        <Button 
          className={cn(
            "mt-4 md:mt-0 bg-primary text-white hover:bg-primary/90", 
            getFadeInStaggerClass(3)
          )}
          asChild
        >
          <a href="/challenges">
            Browse All Challenges
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <AnimatedCard className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Trophy className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rank</p>
            <p className="text-2xl font-semibold">#42</p>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delayIndex={1} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Book className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Challenges Completed</p>
            <p className="text-2xl font-semibold">7 / 84</p>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delayIndex={2} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-semibold">3 days</p>
          </div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="space-y-6">
            {mockChallenges.map((challenge, index) => (
              <AnimatedCard 
                key={challenge.id}
                delayIndex={index} 
                className="flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {challenge.category} • Last accessed {challenge.lastAccessed}
                    </p>
                  </div>
                  <Badge 
                    label={`${challenge.progress}%`} 
                    variant={challenge.progress >= 75 ? "success" : "primary"} 
                  />
                </div>
                <div className="mt-4">
                  <Progress value={challenge.progress} className="h-2" />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/challenges/${challenge.id}`}>
                      Continue
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <a href="/challenges">See all in-progress challenges</a>
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          <div className="space-y-4">
            {mockAchievements.map((achievement, index) => (
              <AnimatedCard 
                key={achievement.id}
                delayIndex={index + 3} 
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{achievement.icon}</span>
                </div>
                <div>
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <a href="/achievements">View all achievements</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
