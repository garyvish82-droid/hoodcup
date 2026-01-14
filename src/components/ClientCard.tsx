import { Coffee, Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  phone: string;
  points: number;
  totalRewards: number;
}

interface ClientCardProps {
  client: Client;
  onAddPoint: (id: string) => void;
  onRedeemReward: (id: string) => void;
}

export function ClientCard({ client, onAddPoint, onRedeemReward }: ClientCardProps) {
  const canRedeem = client.points >= 10;

  return (
    <div className="coffee-card animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg text-foreground">{client.name}</h3>
          <p className="text-muted-foreground text-sm">{client.phone}</p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Gift className="w-4 h-4" />
          <span className="text-sm">{client.totalRewards} redeemed</span>
        </div>
      </div>

      {/* Mini stamp display */}
      <div className="flex gap-1.5 mb-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center transition-all",
              index < client.points
                ? "stamp-filled"
                : "stamp-empty"
            )}
          >
            {index < client.points && (
              <Coffee className="w-3 h-3 text-primary-foreground" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {client.points}/10 points
        </span>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddPoint(client.id)}
            className="gap-1"
            disabled={canRedeem}
          >
            <Plus className="w-4 h-4" />
            Add Point
          </Button>
          
          {canRedeem && (
            <Button
              size="sm"
              onClick={() => onRedeemReward(client.id)}
              className="gap-1 bg-coffee-gold hover:bg-coffee-gold/90 text-primary-foreground animate-celebrate"
            >
              <Gift className="w-4 h-4" />
              Redeem
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
