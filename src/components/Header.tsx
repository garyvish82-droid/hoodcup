import { Coffee, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  view: "admin" | "client";
  onViewChange: (view: "admin" | "client") => void;
}

export function Header({ view, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Coffee className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold text-foreground">
                Bean & Brew
              </h1>
              <p className="text-xs text-muted-foreground">Loyalty Program</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={view === "client" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("client")}
              className={cn(
                "gap-2",
                view === "client" && "shadow-soft"
              )}
            >
              <User className="w-4 h-4" />
              Client
            </Button>
            <Button
              variant={view === "admin" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("admin")}
              className={cn(
                "gap-2",
                view === "admin" && "shadow-soft"
              )}
            >
              <Shield className="w-4 h-4" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
