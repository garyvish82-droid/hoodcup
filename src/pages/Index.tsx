import { Header } from "@/components/Header";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ClientLookup } from "@/components/ClientLookup";
import { AuthForm } from "@/components/AuthForm";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useClients } from "@/hooks/useClients";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, role, loading: authLoading, signOut } = useAuth();
  const { clients, loading: clientsLoading, addClient, addPoint, redeemReward, findClientByPhone } = useClients();

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-coffee" />
      </div>
    );
  }

  // Show auth form if not logged in
  if (!user) {
    return (
      <>
        <AuthForm />
        <Toaster position="bottom-center" />
      </>
    );
  }

  // Convert clients for components (totalRewards -> free_coffees mapping)
  const mappedClients = clients.map((c) => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    points: c.points,
    totalRewards: c.free_coffees,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header 
        view={role === "admin" ? "admin" : "client"} 
        onViewChange={() => {}} 
        userRole={role}
        onSignOut={signOut}
      />
      
      <main className="container mx-auto px-4 py-8">
        {clientsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-coffee" />
          </div>
        ) : role === "admin" ? (
          <AdminDashboard
            clients={mappedClients}
            onAddClient={addClient}
            onAddPoint={addPoint}
            onRedeemReward={redeemReward}
          />
        ) : (
          <ClientLookup 
            clients={mappedClients} 
            findByPhone={findClientByPhone}
          />
        )}
      </main>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default Index;
