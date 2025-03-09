
import { useState, useEffect } from "react";
import ChallengeCard, { ChallengeCardProps } from "./ChallengeCard";
import ChallengeFilters from "./ChallengeFilters";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/ui/common/AnimatedCard";
import { getFadeInStaggerClass } from "@/lib/animations";
import { cn } from "@/lib/utils";

// Mock categories - in a real app, these would come from an API
const categories = [
  "Web Development",
  "Data Science",
  "Algorithms",
  "Machine Learning",
  "Mobile Development"
];

// Mock challenges data - in a real app, this would come from an API
const allChallenges: ChallengeCardProps[] = [
  {
    id: 1,
    title: "Build a Responsive Landing Page",
    description: "Create a mobile-friendly landing page using HTML, CSS, and JavaScript.",
    category: "Web Development",
    difficulty: "beginner",
    points: 100,
    estimatedTime: "2 hours",
    progress: 75
  },
  {
    id: 2,
    title: "Data Visualization with D3.js",
    description: "Create interactive charts using the D3.js library to visualize a dataset.",
    category: "Data Science",
    difficulty: "intermediate",
    points: 250,
    estimatedTime: "4 hours"
  },
  {
    id: 3,
    title: "Implement a Binary Search Tree",
    description: "Code a complete binary search tree with insertion, deletion, and search operations.",
    category: "Algorithms",
    difficulty: "intermediate",
    points: 300,
    estimatedTime: "3 hours"
  },
  {
    id: 4,
    title: "Build a RESTful API with Express",
    description: "Create a RESTful API using Express.js with proper error handling and middleware.",
    category: "Web Development",
    difficulty: "intermediate",
    points: 200,
    estimatedTime: "5 hours",
    isCompleted: true
  },
  {
    id: 5,
    title: "Image Classification with TensorFlow",
    description: "Build a machine learning model to classify images using TensorFlow.",
    category: "Machine Learning",
    difficulty: "advanced",
    points: 500,
    estimatedTime: "8 hours"
  },
  {
    id: 6,
    title: "Create a React Native App",
    description: "Build a simple mobile app with React Native that works on both iOS and Android.",
    category: "Mobile Development",
    difficulty: "intermediate",
    points: 350,
    estimatedTime: "6 hours"
  },
  {
    id: 7,
    title: "Implement Authentication with JWT",
    description: "Add JWT-based authentication to a web application with login/logout functionality.",
    category: "Web Development",
    difficulty: "intermediate",
    points: 300,
    estimatedTime: "4 hours",
    progress: 30
  },
  {
    id: 8,
    title: "Exploratory Data Analysis",
    description: "Analyze a dataset using pandas and create visualizations to extract insights.",
    category: "Data Science",
    difficulty: "beginner",
    points: 150,
    estimatedTime: "3 hours"
  },
];

interface ChallengeListProps {
  showTitle?: boolean;
  limit?: number;
  category?: string;
  showFilters?: boolean;
}

const ChallengeList = ({
  showTitle = true,
  limit,
  category,
  showFilters = true
}: ChallengeListProps) => {
  const [filteredChallenges, setFilteredChallenges] = useState<ChallengeCardProps[]>([]);
  const [visibleChallenges, setVisibleChallenges] = useState<ChallengeCardProps[]>([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: category || "all",
    difficulty: "all",
    sortBy: "newest"
  });

  // Apply initial filtering based on category prop
  useEffect(() => {
    let initialChallenges = [...allChallenges];
    
    if (category) {
      initialChallenges = initialChallenges.filter(
        challenge => challenge.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    setFilteredChallenges(initialChallenges);
  }, [category]);

  // Apply user-selected filters
  useEffect(() => {
    let result = [...allChallenges];
    
    // Category filter
    if (filters.category !== "all") {
      result = result.filter(
        challenge => challenge.category.toLowerCase() === filters.category
      );
    }
    
    // Difficulty filter
    if (filters.difficulty !== "all") {
      result = result.filter(
        challenge => challenge.difficulty === filters.difficulty
      );
    }
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        challenge =>
          challenge.title.toLowerCase().includes(searchTerm) ||
          challenge.description.toLowerCase().includes(searchTerm) ||
          challenge.category.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sorting
    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "points-high":
        result.sort((a, b) => b.points - a.points);
        break;
      case "points-low":
        result.sort((a, b) => a.points - b.points);
        break;
    }
    
    setFilteredChallenges(result);
  }, [filters]);

  // Handle limit and load more functionality
  useEffect(() => {
    const initialLimit = limit || 6;
    
    if (filteredChallenges.length <= initialLimit) {
      setVisibleChallenges(filteredChallenges);
      setLoadMoreVisible(false);
    } else {
      setVisibleChallenges(filteredChallenges.slice(0, initialLimit));
      setLoadMoreVisible(true);
    }
  }, [filteredChallenges, limit]);

  const handleLoadMore = () => {
    setVisibleChallenges(filteredChallenges);
    setLoadMoreVisible(false);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div>
      {showTitle && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Coding Challenges</h2>
          <p className="text-muted-foreground">
            Test your skills with these interactive challenges
          </p>
        </div>
      )}

      {showFilters && (
        <ChallengeFilters
          onFilterChange={handleFilterChange}
          categories={categories}
        />
      )}

      {visibleChallenges.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No challenges found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search query
          </p>
          <Button onClick={() => setFilters({ search: "", category: "all", difficulty: "all", sortBy: "newest" })}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleChallenges.map((challenge, index) => (
              <AnimatedCard key={challenge.id} delayIndex={index} className="h-full">
                <ChallengeCard {...challenge} />
              </AnimatedCard>
            ))}
          </div>
          
          {loadMoreVisible && (
            <div className={cn("mt-8 text-center", getFadeInStaggerClass(visibleChallenges.length))}>
              <Button onClick={handleLoadMore} variant="outline">
                Load More Challenges
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChallengeList;
