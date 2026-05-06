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
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif text-xl text-foreground">Your Loyalty Card</h3>
        <span className="text-sm font-semibold bg-coffee/10 text-coffee px-3 py-1 rounded-full">
          {points}/{maxPoints} stamps
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {Array.from({ length: maxPoints }).map((_, index) => {
          const isFilled = index < points;
          const isLatest = animate && index === points - 1;

          return (
            <div
              key={index}
              className={cn(
                "w-full aspect-square rounded-full flex items-center justify-center transition-all duration-300",
                isFilled
                  ? "stamp-filled"
                  : "stamp-empty border-2 border-dashed border-coffee-stamp-empty",
                isLatest && "animate-stamp-pop"
              )}
            >
              {isFilled && (
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              )}
            </div>
          );
        })}
      </div>

      {points >= maxPoints && (
        <div className="mt-6 text-center animate-celebrate">
          <div className="inline-flex items-center gap-2 bg-coffee-gold text-white px-5 py-3 rounded-full shadow-md text-base font-semibold">
            <Coffee className="w-5 h-5" />
            <span>Show this to your barista! ☕</span>
          </div>
        </div>
      )}
    </div>
  );
}
