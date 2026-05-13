import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

type Step = "phone" | "register";

export default function Join() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 7) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setSubmitting(true);
    const { data } = await supabase
      .from("clients")
      .select("id")
      .ilike("phone", `%${cleanPhone}%`)
      .maybeSingle();
    setSubmitting(false);

    if (data) {
      // Already registered — send to loyalty card lookup
      toast.success("Welcome back! Here's your loyalty card.");
      navigate(`/?phone=${encodeURIComponent(phone)}`);
    } else {
      setStep("register");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    const cleanPhone = phone.replace(/\D/g, "");
    const email = `u${cleanPhone}@hoodcup.app`;

    // Try sign up first
    let userId: string | null = null;
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });

    if (signUpError) {
      // If user already exists in auth, try signing in instead
      if (signUpError.message.toLowerCase().includes("already") || signUpError.status === 422) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError || !signInData.user) {
          toast.error("This phone is already registered. Try signing in.");
          setSubmitting(false);
          return;
        }
        userId = signInData.user.id;
      } else {
        toast.error(signUpError.message);
        setSubmitting(false);
        return;
      }
    } else if (signUpData.user) {
      // Always sign in after signup to ensure active session before DB write
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError || !signInData.user) {
        toast.error("Account created but login failed. Please try signing in.");
        setSubmitting(false);
        return;
      }
      userId = signInData.user.id;
    }

    if (!userId) {
      toast.error("Signup failed. Please try again.");
      setSubmitting(false);
      return;
    }

    // Client record is created by the handle_new_user DB trigger
    // Nothing else needed — navigate home
    toast.success("Welcome to HoodCup! ☕");
    navigate("/");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="text-4xl mb-2">☕</div>
          <h1 className="text-2xl font-bold text-amber-900">Join HoodCup</h1>
          <p className="text-gray-500 text-sm mt-1">Your free coffee loyalty card</p>
        </div>

        {step === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phone">Your Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                enterKeyHint="go"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className="text-base mt-1"
                autoFocus
                required
              />
              <p className="text-xs text-gray-400 mt-1">Used to find your card at the coffee shop</p>
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={submitting}
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {submitting ? "Checking..." : "Continue"}
            </Button>
          </form>
        )}

        {step === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-800 mb-2 -mt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {phone}
            </button>

            <div>
              <Label htmlFor="fullName">Your Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="First and last name"
                className="mt-1"
                autoFocus
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Create a Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="mt-1"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={submitting}
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {submitting ? "Creating your card..." : "Get My Loyalty Card ☕"}
            </Button>
          </form>
        )}

      </div>
    </div>
  );
}
