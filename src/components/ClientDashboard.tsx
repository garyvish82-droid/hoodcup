import { Trophy } from "lucide-react";
import { StampCard } from "./StampCard";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useClientProfile } from "@/hooks/useClientProfile";
import { Loader2, Coffee } from "lucide-react";

export function ClientDashboard() {
  const { 
    clientData, 
    loading, 
    error, 
    pointsToReward, 
    progressPercent, 
    hasRewardReady 
  } = useClientProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-coffee" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="coffee-card">
          <Coffee className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="font-serif text-2xl text-foreground mb-2">
            Welcome to HoodCup!
          </h2>
          <p className="text-muted-foreground">
            Your account isn't linked to a loyalty card yet. Please ask a staff member to set up your loyalty card.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Welcome Header */}
      <div className="mb-2">
        <h2 className="font-serif text-2xl text-foreground">
          Welcome back, {clientData.name}!
        </h2>
        <p className="text-muted-foreground text-sm">Your loyalty card</p>
      </div>

      {/* Main Stamp Card */}
      <StampCard points={clientData.points} maxPoints={10} />

      {/* Progress Section — only show when reward not ready */}
      {!hasRewardReady && (
        <Card className="border-coffee/20">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-coffee-gold" />
                {pointsToReward} more {pointsToReward === 1 ? "coffee" : "coffees"} to go
              </span>
              <span className="text-xs text-muted-foreground">{clientData.points}/10</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-coffee/20">
          <CardContent className="pt-5 pb-4 text-center">
            <p className="text-2xl font-bold text-foreground">{clientData.total_purchases}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Total visits</p>
          </CardContent>
        </Card>
        <Card className="border-coffee/20">
          <CardContent className="pt-5 pb-4 text-center">
            <p className="text-2xl font-bold text-foreground">{clientData.free_coffees}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Free coffees earned</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
