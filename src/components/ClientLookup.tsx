import { useState } from "react";
import { Search, Coffee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StampCard } from "./StampCard";

interface Client {
  id: string;
  name: string;
  phone: string;
  points: number;
  totalRewards: number;
}

interface ClientLookupProps {
  clients: Client[];
}

export function ClientLookup({ clients }: ClientLookupProps) {
  const [phone, setPhone] = useState("");
  const [foundClient, setFoundClient] = useState<Client | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.phone.includes(phone));
    setFoundClient(client || null);
    setSearched(true);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
          <Coffee className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Check Your Rewards
        </h2>
        <p className="text-muted-foreground mt-2">
          Enter your phone number to view your loyalty progress
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setSearched(false);
            }}
            className="pl-10 text-center"
          />
        </div>
        <Button type="submit" className="w-full">
          Look Up My Card
        </Button>
      </form>

      {searched && (
        <div className="animate-fade-in">
          {foundClient ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-lg font-medium text-foreground">
                  Welcome back, {foundClient.name}!
                </p>
                <p className="text-sm text-muted-foreground">
                  You've redeemed {foundClient.totalRewards} free coffees
                </p>
              </div>
              <StampCard points={foundClient.points} />
              {foundClient.points >= 10 && (
                <div className="coffee-card text-center bg-coffee-gold/10 border border-coffee-gold/20">
                  <p className="font-serif text-lg text-coffee-gold">
                    🎉 You have a free coffee waiting!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Show this to our staff to redeem
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="coffee-card text-center">
              <Coffee className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                We couldn't find an account with that phone number.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Ask our staff to sign you up for our loyalty program!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
