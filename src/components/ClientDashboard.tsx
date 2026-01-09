import { Coffee, Gift, ShoppingBag, Trophy, Sparkles } from "lucide-react";
import { StampCard } from "./StampCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useClientProfile } from "@/hooks/useClientProfile";
import { Loader2 } from "lucide-react";

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
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-foreground mb-2">
          Welcome back, {clientData.name}!
        </h2>
        <p className="text-muted-foreground">
          Here's your loyalty program status
        </p>
      </div>

      {/* Main Stamp Card */}
      <StampCard points={clientData.points} maxPoints={10} />

      {/* Progress Section */}
      <Card className="border-coffee/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-coffee-gold" />
            Progress to Free Coffee
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-3 mb-3" />
          {hasRewardReady ? (
            <div className="flex items-center gap-2 text-coffee-gold font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Congratulations! You have a free coffee ready!</span>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Just <span className="font-semibold text-foreground">{pointsToReward} more purchase{pointsToReward !== 1 ? 's' : ''}</span> until your free coffee!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-coffee/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-coffee/10">
                <ShoppingBag className="w-6 h-6 text-coffee" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {clientData.total_purchases}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Purchases
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-coffee/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-coffee-gold/10">
                <Gift className="w-6 h-6 text-coffee-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {clientData.free_coffees}
                </p>
                <p className="text-sm text-muted-foreground">
                  Free Coffees Earned
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="bg-muted/50 border-coffee/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Coffee className="w-5 h-5 text-coffee mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">How it works</h4>
              <p className="text-sm text-muted-foreground">
                Collect 10 stamps with each coffee purchase. Once you reach 10 stamps, 
                enjoy a free coffee on us! Your stamps will reset after redemption.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
