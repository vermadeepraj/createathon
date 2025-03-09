
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" },
    { name: "Leaderboard", path: "/leaderboard" },
    ...(isAuthenticated ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 py-4 px-4 md:px-8",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-primary transition-opacity duration-300 hover:opacity-80"
        >
          Createathon
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300 hover:text-primary",
                    isActive(link.path) 
                      ? "text-primary" 
                      : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {isAuthenticated ? (
            <Button 
              variant="outline" 
              onClick={logout}
              className="ml-4"
            >
              Log Out
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                asChild
              >
                <Link to="/login">Log In</Link>
              </Button>
              <Button 
                asChild
                className="bg-primary text-white hover:bg-primary/90"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-4 md:hidden animate-fade-in">
          <nav className="flex flex-col h-full">
            <ul className="flex flex-col space-y-6 py-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "text-lg font-medium block transition-colors duration-300 hover:text-primary",
                      isActive(link.path) 
                        ? "text-primary" 
                        : "text-foreground/80"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pb-10">
              {isAuthenticated ? (
                <Button 
                  variant="outline" 
                  onClick={logout}
                  className="w-full mb-4"
                >
                  Log Out
                </Button>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Button 
                    variant="outline" 
                    asChild
                    className="w-full"
                  >
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button 
                    asChild
                    className="w-full bg-primary text-white hover:bg-primary/90"
                  >
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
