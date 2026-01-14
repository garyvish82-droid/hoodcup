import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface StampCardProps {
  points: number;
  maxPoints?: number;
  animate?: boolean;
}

export function StampCard({ points, maxPoints = 10, animate = false }: StampCardProps) {
  return (
    <div className="coffee-card">
      <div className="text-center mb-6">
        <h3 className="font-serif text-xl text-foreground mb-1">Your Loyalty Card</h3>
        <p className="text-muted-foreground text-sm">
          {points} / {maxPoints} stamps collected
        </p>
      </div>
      
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: maxPoints }).map((_, index) => {
          const isFilled = index < points;
          const isLatest = animate && index === points - 1;
          
          return (
            <div
              key={index}
              className={cn(
                "aspect-square rounded-full flex items-center justify-center transition-all duration-300",
                isFilled 
                  ? "stamp-filled" 
                  : "stamp-empty border-2 border-dashed border-coffee-stamp-empty",
                isLatest && "animate-stamp-pop"
              )}
            >
              {isFilled && (
                <Coffee className="w-5 h-5 text-primary-foreground" />
              )}
            </div>
          );
        })}
      </div>
      
      {points >= maxPoints && (
        <div className="mt-6 text-center animate-celebrate">
          <div className="inline-flex items-center gap-2 bg-coffee-gold/20 text-coffee-gold px-4 py-2 rounded-full">
            <Coffee className="w-5 h-5" />
            <span className="font-medium">Free coffee ready!</span>
          </div>
        </div>
      )}
    </div>
  );
}
