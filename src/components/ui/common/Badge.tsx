
import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "default" | "primary" | "secondary" | "outline" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Badge = ({ 
  label, 
  variant = "default", 
  size = "md",
  className 
}: BadgeProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap transition-colors";
  
  const variantStyles = {
    default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    error: "bg-red-100 text-red-800 hover:bg-red-200"
  };
  
  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-0.5",
    lg: "text-sm px-3 py-1"
  };

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
