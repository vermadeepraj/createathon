
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFadeInStaggerClass } from "@/lib/animations";
import AnimatedCard from "@/components/ui/common/AnimatedCard";
import Badge from "@/components/ui/common/Badge";

const features = [
  {
    title: "Interactive Challenges",
    description: "Engage with hands-on coding and knowledge challenges designed to enhance your skills.",
    icon: "📝"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your growth with detailed analytics and visualizations of your learning journey.",
    icon: "📈"
  },
  {
    title: "Community Leaderboard",
    description: "Compete with others and showcase your achievements on the global leaderboard.",
    icon: "🏆"
  },
  {
    title: "Real-time Feedback",
    description: "Receive immediate feedback on your submissions to accelerate your learning.",
    icon: "⚡"
  }
];

const categories = [
  { name: "Web Development", count: 24, color: "bg-blue-100" },
  { name: "Data Science", count: 18, color: "bg-green-100" },
  { name: "Machine Learning", count: 15, color: "bg-purple-100" },
  { name: "Algorithm & DS", count: 22, color: "bg-yellow-100" },
  { name: "Mobile Development", count: 12, color: "bg-pink-100" },
  { name: "DevOps & Cloud", count: 9, color: "bg-cyan-100" }
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-4">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,165,255,0.1),transparent)]" />
        
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge 
              label="Interactive Creator Platform" 
              variant="primary" 
              size="lg" 
              className={getFadeInStaggerClass(0)}
            />
            
            <h1 className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance", 
              getFadeInStaggerClass(1)
            )}>
              Master your skills with<br />engaging challenges
            </h1>
            
            <p className={cn(
              "max-w-2xl text-lg md:text-xl text-muted-foreground text-balance", 
              getFadeInStaggerClass(2)
            )}>
              An elegant platform for technical growth through interactive learning experiences, real-time feedback, and community engagement.
            </p>
            
            <div className={cn("flex flex-col sm:flex-row gap-4 pt-4", getFadeInStaggerClass(3))}>
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <Link to="/challenges">
                  Explore Challenges
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-white to-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <Badge label="Features" variant="outline" size="lg" />
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need to excel
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and features you need to enhance your technical skills through practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <AnimatedCard key={feature.title} delayIndex={idx} className="text-left">
                <div className="flex flex-col h-full">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <Badge label="Categories" variant="outline" size="lg" />
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Diverse learning paths
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of technical categories to find challenges that match your interests.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <Link 
                key={category.name} 
                to={`/challenges?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <AnimatedCard 
                  delayIndex={idx} 
                  className="flex justify-between items-center transition-all duration-300 group-hover:border-primary/30"
                >
                  <div>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    <p className="text-muted-foreground">{category.count} challenges</p>
                  </div>
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center", 
                    category.color
                  )}>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </AnimatedCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 bg-primary/5 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_70%,rgba(120,165,255,0.1),transparent)]" />
        
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 animate-on-scroll opacity-0">
              <Badge label="Get Started" variant="primary" size="lg" />
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Ready to accelerate your learning journey?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join our community of learners and start mastering new skills through interactive challenges and real-time feedback.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                  <Link to="/register">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/challenges">Browse Challenges</Link>
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-on-scroll opacity-0">
              <div className="glass-card p-8 border-primary/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Quick Start</h3>
                    <p className="text-muted-foreground">Begin your learning journey in minutes</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {[
                    "Create a free account to track your progress",
                    "Browse our diverse library of challenges",
                    "Start solving and receive instant feedback",
                    "Compare your solutions with others",
                    "Earn badges and climb the leaderboard"
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium">{idx + 1}</span>
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
