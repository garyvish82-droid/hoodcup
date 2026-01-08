import { Coffee, User, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppRole = "admin" | "client";

interface HeaderProps {
  view: "admin" | "client";
  onViewChange: (view: "admin" | "client") => void;
  userRole?: AppRole | null;
  onSignOut?: () => void;
}

export function Header({ view, onViewChange, userRole, onSignOut }: HeaderProps) {
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

          <div className="flex items-center gap-3">
            {/* Role indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
              {userRole === "admin" ? (
                <>
                  <Shield className="w-4 h-4 text-coffee" />
                  <span className="text-sm font-medium text-foreground">Admin</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-coffee" />
                  <span className="text-sm font-medium text-foreground">Client</span>
                </>
              )}
            </div>

            {onSignOut && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSignOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
