import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Loader2, ArrowLeft, Trophy } from "lucide-react";
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
  prefilledPhone?: string;
}

type View = "input" | "welcome" | "card";

export const PhoneLookup = ({ onBack, prefilledPhone = "" }: PhoneLookupProps) => {
  const [phone, setPhone] = useState(prefilledPhone);
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [view, setView] = useState<View>("input");
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (prefilledPhone) {
      doLookup(prefilledPhone);
    }
  }, []);

  const doLookup = async (rawPhone: string) => {
    const cleanPhone = rawPhone.replace(/\D/g, "");
    if (cleanPhone.length < 7) {
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
      toast.error("Something went wrong. Please try again.");
      return;
    }

    if (!data) {
      toast.error("No loyalty card found for this phone number");
      return;
    }

    const key = `welcomed_${data.id}`;
    const isFirstTime = !localStorage.getItem(key);

    if (isFirstTime) {
      localStorage.setItem(key, "1");
      setClientData(data);
      setView("welcome");
      setTimeout(() => setView("card"), 4500);
    } else {
      setClientData(data);
      setView("card");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doLookup(phone);
  };

  const handleReset = () => {
    setClientData(null);
    setPhone("");
    setView("input");
    setHasTriggered(false);
  };

  if (view === "welcome" && clientData) {
    return (
      <div className="min-h-screen bg-amber-900 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <div className="text-6xl mb-6 animate-bounce">☕</div>
        <p className="text-amber-200 text-lg mb-2">Hey there,</p>
        <h1 className="text-5xl font-bold text-white mb-4">{clientData.name}!</h1>
        <p className="text-amber-300 text-lg">So happy to have you 🎉</p>
      </div>
    );
  }

  if (view === "card" && clientData) {
    const pointsToRewardLocal = 10 - clientData.points;
    const progressPercentLocal = (clientData.points / 10) * 100;
    const hasRewardReadyLocal = clientData.points >= 10;

    return (
      <div className="min-h-screen bg-gradient-to-br from-coffee-light via-cream to-coffee-light/50 p-4 animate-fadeInSlow">
        <div className="max-w-md mx-auto space-y-4 py-6">
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-coffee hover:text-espresso -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Check another number
          </Button>

          <div className="mb-2">
            <h2 className="font-serif text-2xl text-foreground">
              Welcome, {clientData.name}!
            </h2>
            <p className="text-muted-foreground text-sm">Your loyalty card</p>
          </div>

          <StampCard points={clientData.points} maxPoints={10} />

          {!hasRewardReadyLocal && (
            <Card className="border-coffee/20">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-coffee-gold" />
                    {pointsToRewardLocal} more {pointsToRewardLocal === 1 ? "coffee" : "coffees"} to go
                  </span>
                  <span className="text-xs text-muted-foreground">{clientData.points}/10</span>
                </div>
                <Progress value={progressPercentLocal} className="h-2" />
              </CardContent>
            </Card>
          )}

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
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-light via-cream to-coffee-light/50 p-4">
      <Card className="w-full max-w-md shadow-elegant border-coffee/20">
        <CardHeader className="text-center space-y-4 pt-12">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute left-2 top-2 text-coffee hover:text-espresso"
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-espresso">Phone Number</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee/50" />
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    enterKeyHint="go"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPhone(val);
                      if (!hasTriggered && val.replace(/\D/g, "").length >= 9) {
                        setHasTriggered(true);
                        doLookup(val);
                      }
                    }}
                    className="pl-10 text-base"
                    autoComplete="tel"
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-coffee hover:bg-espresso px-5 shrink-0"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Go"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
