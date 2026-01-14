import { useState } from "react";
import { Search, Users, Coffee, Gift } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ClientCard } from "./ClientCard";
import { AddClientDialog } from "./AddClientDialog";

interface Client {
  id: string;
  name: string;
  phone: string;
  points: number;
  totalRewards: number;
}

interface AdminDashboardProps {
  clients: Client[];
  onAddClient: (name: string, phone: string) => void;
  onAddPoint: (id: string) => void;
  onRedeemReward: (id: string) => void;
}

export function AdminDashboard({
  clients,
  onAddClient,
  onAddPoint,
  onRedeemReward,
}: AdminDashboardProps) {
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.includes(search)
  );

  const totalPoints = clients.reduce((sum, c) => sum + c.points, 0);
  const totalRewards = clients.reduce((sum, c) => sum + c.totalRewards, 0);
  const readyToRedeem = clients.filter((c) => c.points >= 10).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="coffee-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-serif font-semibold">{clients.length}</p>
            <p className="text-sm text-muted-foreground">Total Clients</p>
          </div>
        </div>

        <div className="coffee-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-coffee-stamp/10 flex items-center justify-center">
            <Coffee className="w-6 h-6 text-coffee-stamp" />
          </div>
          <div>
            <p className="text-2xl font-serif font-semibold">{totalPoints}</p>
            <p className="text-sm text-muted-foreground">Active Points</p>
          </div>
        </div>

        <div className="coffee-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-coffee-gold/10 flex items-center justify-center">
            <Gift className="w-6 h-6 text-coffee-gold" />
          </div>
          <div>
            <p className="text-2xl font-serif font-semibold">{totalRewards}</p>
            <p className="text-sm text-muted-foreground">Rewards Given</p>
          </div>
        </div>

        <div className="coffee-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <Gift className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-serif font-semibold">{readyToRedeem}</p>
            <p className="text-sm text-muted-foreground">Ready to Redeem</p>
          </div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <AddClientDialog onAddClient={onAddClient} />
      </div>

      {/* Client List */}
      <div className="grid gap-4">
        {filteredClients.length === 0 ? (
          <div className="coffee-card text-center py-12">
            <Coffee className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              {search ? "No clients found" : "No clients yet. Add your first client!"}
            </p>
          </div>
        ) : (
          filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onAddPoint={onAddPoint}
              onRedeemReward={onRedeemReward}
            />
          ))
        )}
      </div>
    </div>
  );
}
