import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Join() {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user && role) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // 1. Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (signUpError || !data.user) {
      toast.error(signUpError?.message || "Signup failed");
      setSubmitting(false);
      return;
    }

    const userId = data.user.id;

    // 2. Assign client role
    const { error: roleError } = await supabase
      .from("user_roles")
      .insert({ user_id: userId, role: "client" });

    if (roleError) {
      toast.error("Failed to assign role");
      setSubmitting(false);
      return;
    }

    // 3. Create loyalty card
    const { error: clientError } = await supabase
      .from("clients")
      .insert({
        user_id: userId,
        name: fullName,
        phone: phone,
      });

    if (clientError) {
      toast.error("Failed to create loyalty card");
      setSubmitting(false);
      return;
    }

    toast.success("Welcome to HoodCup! ☕");
    navigate("/dashboard");
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">☕</div>
          <h1 className="text-2xl font-bold text-amber-900">Join HoodCup</h1>
          <p className="text-gray-500 text-sm mt-1">
            You've been invited to join the loyalty program
          </p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={submitting}
          >
            {submitting ? "Creating your card..." : "Join & Get My Loyalty Card ☕"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-amber-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
