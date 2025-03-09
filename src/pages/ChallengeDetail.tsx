
import { useParams } from "react-router-dom";
import ChallengeDetail from "@/components/challenge/ChallengeDetail";
import Badge from "@/components/ui/common/Badge";

// This would normally come from an API
const challengeData = {
  id: 1,
  title: "Build a Responsive Landing Page",
  description: "Create a mobile-friendly landing page using HTML, CSS, and JavaScript.",
  longDescription: `In this challenge, you'll build a responsive landing page that looks great on all devices. 
    You'll learn how to use CSS Flexbox, Grid, and media queries to create a layout that adapts to different screen sizes.
    
    This project will help you understand the principles of responsive design, which is essential for modern web development.
    You will implement a design from a provided mockup, ensuring that all elements scale and reposition appropriately on different devices.
    
    The landing page will include a hero section, feature highlights, testimonials, and a call-to-action form. 
    You'll also add some basic JavaScript functionality for a mobile navigation menu and form validation.`,
  category: "Web Development",
  difficulty: "beginner" as const,
  points: 100,
  estimatedTime: "2 hours",
  prerequisites: [
    "Basic knowledge of HTML and CSS",
    "Familiarity with JavaScript fundamentals",
    "Understanding of CSS layout concepts"
  ] as string[], // Convert readonly array to mutable string[]
  resources: [
    {
      title: "CSS Flexbox Guide",
      url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
    },
    {
      title: "Responsive Web Design Fundamentals",
      url: "https://web.dev/responsive-web-design-basics/"
    },
    {
      title: "Media Queries for Common Device Breakpoints",
      url: "https://www.w3schools.com/css/css_rwd_mediaqueries.asp"
    },
    {
      title: "Mobile Navigation Patterns",
      url: "https://bradfrost.com/blog/post/the-many-ways-to-show-navigation-on-responsive-websites/"
    }
  ] as Array<{title: string, url: string}>, // Convert readonly array to mutable array
  tasks: [
    {
      id: "task-1",
      description: "Create the HTML structure for the landing page following semantic markup principles",
      completed: true
    },
    {
      id: "task-2",
      description: "Style the hero section with a background image, headline, and call-to-action button",
      completed: true
    },
    {
      id: "task-3",
      description: "Implement a responsive navigation menu that converts to a hamburger menu on mobile devices",
      completed: true
    },
    {
      id: "task-4",
      description: "Create a features section using CSS Grid or Flexbox to display items in multiple columns on desktop and a single column on mobile",
      completed: false
    },
    {
      id: "task-5",
      description: "Add a testimonials section with customer quotes and images",
      completed: false
    },
    {
      id: "task-6",
      description: "Implement a contact form with client-side validation using JavaScript",
      completed: false
    },
    {
      id: "task-7",
      description: "Ensure the page is fully responsive and looks good on all screen sizes (mobile, tablet, desktop)",
      completed: false
    },
    {
      id: "task-8",
      description: "Test the page in multiple browsers and fix any compatibility issues",
      completed: false
    }
  ] as Array<{id: string, description: string, completed: boolean}>, // Convert readonly array to mutable array
  progress: 35
};

const ChallengeDetailPage = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch the challenge data based on the ID
  // For now, we're using mock data

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto">
        <Badge 
          label="Challenge Details" 
          variant="outline" 
          size="lg" 
          className="mt-8 mb-4"
        />
        
        <ChallengeDetail {...challengeData} />
      </div>
    </div>
  );
};

export default ChallengeDetailPage;
