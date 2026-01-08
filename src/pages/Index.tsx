import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ClientLookup } from "@/components/ClientLookup";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Client {
  id: string;
  name: string;
  phone: string;
  points: number;
  totalRewards: number;
}

// Temporary local storage for demo - will be replaced with database
const STORAGE_KEY = "coffee-loyalty-clients";

const loadClients = (): Client[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Demo data
  return [
    { id: "1", name: "Sarah Johnson", phone: "+1 555 123 4567", points: 7, totalRewards: 3 },
    { id: "2", name: "Mike Chen", phone: "+1 555 234 5678", points: 10, totalRewards: 5 },
    { id: "3", name: "Emma Wilson", phone: "+1 555 345 6789", points: 2, totalRewards: 1 },
  ];
};

const saveClients = (clients: Client[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
};

const Index = () => {
  const [view, setView] = useState<"admin" | "client">("client");
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    setClients(loadClients());
  }, []);

  useEffect(() => {
    if (clients.length > 0) {
      saveClients(clients);
    }
  }, [clients]);

  const handleAddClient = (name: string, phone: string) => {
    const newClient: Client = {
      id: Date.now().toString(),
      name,
      phone,
      points: 0,
      totalRewards: 0,
    };
    setClients((prev) => [...prev, newClient]);
    toast.success(`${name} added to loyalty program!`);
  };

  const handleAddPoint = (id: string) => {
    setClients((prev) =>
      prev.map((client) => {
        if (client.id === id) {
          const newPoints = client.points + 1;
          if (newPoints === 10) {
            toast.success(`${client.name} earned a free coffee! 🎉`);
          } else {
            toast.success(`Point added for ${client.name}`);
          }
          return { ...client, points: newPoints };
        }
        return client;
      })
    );
  };

  const handleRedeemReward = (id: string) => {
    setClients((prev) =>
      prev.map((client) => {
        if (client.id === id && client.points >= 10) {
          toast.success(`Free coffee redeemed for ${client.name}! ☕`);
          return {
            ...client,
            points: 0,
            totalRewards: client.totalRewards + 1,
          };
        }
        return client;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header view={view} onViewChange={setView} />
      
      <main className="container mx-auto px-4 py-8">
        {view === "admin" ? (
          <AdminDashboard
            clients={clients}
            onAddClient={handleAddClient}
            onAddPoint={handleAddPoint}
            onRedeemReward={handleRedeemReward}
          />
        ) : (
          <ClientLookup clients={clients} />
        )}
      </main>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default Index;
