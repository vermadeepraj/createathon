
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/ui/common/AnimatedCard";
import { cn } from "@/lib/utils";
import { getFadeInStaggerClass } from "@/lib/animations";

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  icon: string;
  color: string;
}

const categories: CategoryCardProps[] = [
  {
    title: "Web Development",
    description: "Master HTML, CSS, JavaScript and modern frameworks",
    count: 24,
    icon: "🌐",
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Data Science",
    description: "Learn data analysis, visualization and machine learning",
    count: 18,
    icon: "📊",
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Algorithms",
    description: "Solve complex problems and optimize solutions",
    count: 15,
    icon: "🧮",
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "Machine Learning",
    description: "Build intelligent systems and models",
    count: 12,
    icon: "🤖",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    title: "Mobile Development",
    description: "Create iOS and Android applications",
    count: 10,
    icon: "📱",
    color: "bg-red-50 border-red-200",
  },
  {
    title: "DevOps",
    description: "Master CI/CD pipelines and cloud infrastructure",
    count: 8,
    icon: "☁️",
    color: "bg-indigo-50 border-indigo-200",
  },
];

const CategoryCard = ({ title, description, count, icon, color }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedCard 
      className={cn(
        "flex items-start p-6 h-full border transition-all duration-300",
        color,
        isHovered ? "transform scale-[1.02] shadow-md" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mr-4 text-3xl">{icon}</div>
      <div className="flex-grow">
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{count} challenges</span>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              "p-0 hover:bg-transparent",
              isHovered ? "translate-x-1" : ""
            )}
          >
            <a href={`/challenges?category=${title.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="mr-1">Explore</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

const ChallengeCategorySection = () => {
  return (
    <section className="py-12">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of challenge categories to find the perfect 
            match for your learning goals and interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <div key={category.title} className={getFadeInStaggerClass(i)}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <a href="/challenges">View All Categories</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChallengeCategorySection;
