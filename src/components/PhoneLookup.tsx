import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Loader2, ArrowLeft, Coffee, ShoppingBag, Gift, Trophy, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StampCard } from "./StampCard";
import { Progress } from "@/components/ui/progress";

interface ClientData {
  id: string;
  name: string;
  phone: string;
  points: number;
  free_coffees: number;
  total_purchases: number;
}

interface PhoneLookupProps {
  onBack: () => void;
}

export const PhoneLookup = ({ onBack }: PhoneLookupProps) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState<ClientData | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 9) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .ilike("phone", `%${cleanPhone}%`)
      .maybeSingle();

    setLoading(false);

    if (error) {
      console.error("Lookup error:", error);
      toast.error("Something went wrong. Please try again.");
      return;
    }

    if (!data) {
      toast.error("No loyalty card found for this phone number");
      return;
    }

    setClientData(data);
    toast.success(`Welcome back, ${data.name}!`);
  };

  const handleReset = () => {
    setClientData(null);
    setPhone("");
  };

  const pointsToReward = clientData ? 10 - clientData.points : 10;
  const progressPercent = clientData ? (clientData.points / 10) * 100 : 0;
  const hasRewardReady = clientData ? clientData.points >= 10 : false;

  if (clientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coffee-light via-cream to-coffee-light/50 p-4">
        <div className="max-w-2xl mx-auto space-y-6 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={handleReset}
            className="text-coffee hover:text-espresso"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Check another number
          </Button>

          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl text-foreground mb-2">
              Welcome, {clientData.name}!
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

          {/* Sign in prompt */}
          <Card className="border-coffee/20 bg-coffee/5">
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Want to access your loyalty card anytime?
              </p>
              <Button variant="outline" onClick={onBack} className="border-coffee/30">
                Create an account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-light via-cream to-coffee-light/50 p-4">
      <Card className="w-full max-w-md shadow-elegant border-coffee/20">
        <CardHeader className="text-center space-y-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="absolute left-4 top-4 text-coffee hover:text-espresso"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-coffee to-espresso rounded-full flex items-center justify-center shadow-lg">
            <Phone className="w-8 h-8 text-cream" />
          </div>
          <CardTitle className="font-display text-2xl text-espresso">Check Your Loyalty Card</CardTitle>
          <CardDescription className="text-coffee/70">
            Enter your phone number to see your rewards
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLookup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-espresso">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee/50" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  autoComplete="tel"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-coffee hover:bg-espresso" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Look Up My Card
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
