
import ChallengeList from "@/components/challenge/ChallengeList";
import ChallengeCategorySection from "@/components/challenge/ChallengeCategorySection";
import Badge from "@/components/ui/common/Badge";

const Challenges = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge label="Learning Challenges" variant="outline" size="lg" className="mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Coding Challenges</h1>
          <p className="text-muted-foreground text-lg">
            Enhance your skills with our interactive coding challenges. 
            Each challenge is designed to help you learn new concepts 
            and apply them in practical scenarios.
          </p>
        </div>
        
        <ChallengeCategorySection />
        
        <div className="py-16">
          <ChallengeList showTitle={false} />
        </div>
      </div>
    </div>
  );
};

export default Challenges;
