
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delayIndex?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const AnimatedCard = ({ 
  children, 
  className, 
  hoverEffect = true,
  delayIndex = 0,
  onMouseEnter,
  onMouseLeave
}: AnimatedCardProps) => {
  const animationDelay = delayIndex * 50;

  return (
    <div
      className={cn(
        "glass-card p-6 opacity-0 translate-y-4",
        "animate-[fade-in_0.5s_ease-out_forwards] will-change-transform",
        hoverEffect && "hover-lift",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
