
import { useState } from "react";
import { Trophy, Search, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AnimatedCard from "@/components/ui/common/AnimatedCard";
import Badge from "@/components/ui/common/Badge";
import { cn } from "@/lib/utils";
import { getFadeInStaggerClass } from "@/lib/animations";

// Mock data
const timeFrames = ["All Time", "This Month", "This Week", "Today"];
const categories = ["All Categories", "Web Development", "Data Science", "Algorithm & DS", "Machine Learning"];

const topUsers = [
  { rank: 1, name: "Sarah Chen", points: 12450, completedChallenges: 78, streak: 42 },
  { rank: 2, name: "Alex Johnson", points: 10980, completedChallenges: 65, streak: 30 },
  { rank: 3, name: "Miguel Santos", points: 9870, completedChallenges: 59, streak: 25 },
];

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", points: 12450, completedChallenges: 78, streak: 42, avatar: "" },
  { rank: 2, name: "Alex Johnson", points: 10980, completedChallenges: 65, streak: 30, avatar: "" },
  { rank: 3, name: "Miguel Santos", points: 9870, completedChallenges: 59, streak: 25, avatar: "" },
  { rank: 4, name: "Emma Williams", points: 8540, completedChallenges: 47, streak: 12, avatar: "" },
  { rank: 5, name: "James Wilson", points: 7890, completedChallenges: 43, streak: 8, avatar: "" },
  { rank: 6, name: "Olivia Davis", points: 7650, completedChallenges: 41, streak: 15, avatar: "" },
  { rank: 7, name: "Noah Miller", points: 7420, completedChallenges: 39, streak: 7, avatar: "" },
  { rank: 8, name: "Sophia Garcia", points: 6950, completedChallenges: 37, streak: 9, avatar: "" },
  { rank: 9, name: "Liam Martinez", points: 6780, completedChallenges: 36, streak: 5, avatar: "" },
  { rank: 10, name: "Isabella Brown", points: 6540, completedChallenges: 34, streak: 11, avatar: "" },
];

const Leaderboard = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("All Time");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter leaderboard data
  const filteredLeaderboard = leaderboardData.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 py-12 max-w-6xl">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Badge label="Leaderboard" variant="outline" size="lg" className="mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Top Performers</h1>
        <p className="text-muted-foreground text-lg">
          See who's leading the pack and challenge yourself to climb the ranks.
        </p>
      </div>

      {/* Top 3 Users */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {topUsers.map((user, index) => (
          <AnimatedCard
            key={user.rank}
            delayIndex={index}
            className={cn(
              "text-center p-8",
              user.rank === 1 ? "border-2 border-yellow-400" : ""
            )}
          >
            <div className="flex justify-center mb-4">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                user.rank === 1 ? "bg-yellow-100 text-yellow-800" :
                user.rank === 2 ? "bg-gray-100 text-gray-800" :
                "bg-amber-100 text-amber-800"
              )}>
                <Trophy className="h-8 w-8" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
            <p className="text-muted-foreground mb-4">Rank #{user.rank}</p>
            
            <div className="flex justify-center gap-4 text-sm">
              <div>
                <p className="font-medium">{user.points}</p>
                <p className="text-muted-foreground">Points</p>
              </div>
              <div>
                <p className="font-medium">{user.completedChallenges}</p>
                <p className="text-muted-foreground">Challenges</p>
              </div>
              <div>
                <p className="font-medium">{user.streak} days</p>
                <p className="text-muted-foreground">Streak</p>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent>
                {timeFrames.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <AnimatedCard className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="hidden md:table-cell text-right">Challenges</TableHead>
              <TableHead className="hidden md:table-cell text-right">Streak</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeaderboard.map((user) => (
              <TableRow key={user.rank}>
                <TableCell className="font-medium">{user.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <Users className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{user.points.toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell text-right">{user.completedChallenges}</TableCell>
                <TableCell className="hidden md:table-cell text-right">{user.streak} days</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="float-right">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AnimatedCard>
      
      <div className="mt-6 text-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
};

export default Leaderboard;
