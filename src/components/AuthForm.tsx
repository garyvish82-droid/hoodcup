import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Coffee, Mail, Lock, Loader2, Phone, ArrowLeft } from "lucide-react";
import { PhoneLookup } from "./PhoneLookup";

type View = "home" | "phone" | "admin";

export const AuthForm = () => {
  const { signIn } = useAuth();
  const [view, setView] = useState<View>("home");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error("Invalid email or password");
    }
  };

  // Phone lookup view
  if (view === "phone") {
    return <PhoneLookup onBack={() => setView("home")} />;
  }

  // Admin login view
  if (view === "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-light via-cream to-coffee-light/50 p-4">
        <Card className="w-full max-w-md shadow-elegant border-coffee/20">
          <CardHeader className="text-center space-y-4">
            <Button
              variant="ghost"
              onClick={() => setView("home")}
              className="absolute left-4 top-4 text-coffee hover:text-espresso"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-coffee to-espresso rounded-full flex items-center justify-center shadow-lg">
              <Coffee className="w-8 h-8 text-cream" />
            </div>
            <CardTitle className="font-display text-2xl text-espresso">Coffee Shop Login</CardTitle>
            <CardDescription className="text-coffee/70">
              Sign in to manage your loyalty program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-espresso">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-espresso">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee/50" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-coffee hover:bg-espresso"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Home view — default landing page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-light via-cream to-coffee-light/50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Branding */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-coffee to-espresso rounded-full flex items-center justify-center shadow-lg">
            <Coffee className="w-10 h-10 text-cream" />
          </div>
          <h1 className="font-display text-4xl text-espresso font-bold">HoodCup</h1>
          <p className="text-coffee/70 text-lg">Your local coffee loyalty card — always in your pocket</p>
        </div>

        {/* Main actions */}
        <div className="space-y-3">
          <Button
            className="w-full h-14 text-lg bg-coffee hover:bg-espresso text-cream"
            onClick={() => setView("phone")}
          >
            <Phone className="w-5 h-5 mr-3" />
            Check my loyalty card
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 text-lg border-coffee/30 hover:bg-coffee/5 text-coffee"
            onClick={() => setView("admin")}
          >
            <Coffee className="w-5 h-5 mr-3" />
            I'm a coffee shop
          </Button>
        </div>

        {/* How it works */}
        <Card className="bg-white/60 border-coffee/10">
          <CardContent className="pt-6 pb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-1">☕</div>
                <p className="text-xs text-coffee/70">Buy a coffee</p>
              </div>
              <div>
                <div className="text-2xl mb-1">✓</div>
                <p className="text-xs text-coffee/70">Collect stamps</p>
              </div>
              <div>
                <div className="text-2xl mb-1">🎁</div>
                <p className="text-xs text-coffee/70">Get a free one</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};