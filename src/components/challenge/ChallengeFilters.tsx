
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ChallengeFiltersProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    difficulty: string;
    sortBy: string;
  }) => void;
  categories: string[];
}

const ChallengeFilters = ({ onFilterChange, categories }: ChallengeFiltersProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    applyFilters(e.target.value, category, difficulty, sortBy);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    applyFilters(search, value, difficulty, sortBy);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    applyFilters(search, category, value, sortBy);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters(search, category, difficulty, value);
  };

  const applyFilters = (
    searchVal: string,
    categoryVal: string,
    difficultyVal: string,
    sortByVal: string
  ) => {
    onFilterChange({
      search: searchVal,
      category: categoryVal,
      difficulty: difficultyVal,
      sortBy: sortByVal,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setDifficulty("all");
    setSortBy("newest");
    applyFilters("", "all", "all", "newest");
  };

  const activeFilterCount = [
    category !== "all" ? 1 : 0,
    difficulty !== "all" ? 1 : 0,
    sortBy !== "newest" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search challenges..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <div className="flex md:hidden">
          <Button
            variant="outline"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            className="w-full md:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-primary text-white" variant="default">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
        <div className={`md:flex gap-3 ${isFiltersVisible ? 'flex' : 'hidden'} flex-col md:flex-row`}>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="points-high">Highest Points</SelectItem>
              <SelectItem value="points-low">Lowest Points</SelectItem>
            </SelectContent>
          </Select>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              className="hidden md:flex"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {isFiltersVisible && activeFilterCount > 0 && (
        <div className="flex md:hidden justify-end">
          <Button variant="link" onClick={clearFilters} className="h-auto p-0">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeFilters;
