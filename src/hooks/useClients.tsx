import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Client {
  id: string;
  name: string;
  phone: string;
  points: number;
  free_coffees: number;
  total_purchases: number;
  user_id?: string | null;
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to load clients");
    } else {
      setClients(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const addClient = async (name: string, phone: string) => {
    const { data, error } = await supabase
      .from("clients")
      .insert([{ name, phone }])
      .select()
      .single();

    if (error) {
      console.error("Error adding client:", error);
      toast.error(error.message);
      return false;
    }

    setClients((prev) => [data, ...prev]);
    toast.success(`${name} added to loyalty program!`);
    return true;
  };

  const addPoint = async (id: string) => {
    const client = clients.find((c) => c.id === id);
    if (!client) return;

    const newPoints = client.points + 1;
    const newTotalPurchases = client.total_purchases + 1;

    const { error } = await supabase
      .from("clients")
      .update({ 
        points: newPoints, 
        total_purchases: newTotalPurchases 
      })
      .eq("id", id);

    if (error) {
      console.error("Error adding point:", error);
      toast.error("Failed to add point");
      return;
    }

    setClients((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, points: newPoints, total_purchases: newTotalPurchases }
          : c
      )
    );

    if (newPoints === 10) {
      toast.success(`${client.name} earned a free coffee! 🎉`);
    } else {
      toast.success(`Point added for ${client.name}`);
    }
  };

  const redeemReward = async (id: string) => {
    const client = clients.find((c) => c.id === id);
    if (!client || client.points < 10) return;

    const newFreeCoffees = client.free_coffees + 1;

    const { error } = await supabase
      .from("clients")
      .update({ points: 0, free_coffees: newFreeCoffees })
      .eq("id", id);

    if (error) {
      console.error("Error redeeming reward:", error);
      toast.error("Failed to redeem reward");
      return;
    }

    setClients((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, points: 0, free_coffees: newFreeCoffees } : c
      )
    );

    toast.success(`Free coffee redeemed for ${client.name}! ☕`);
  };

  const findClientByPhone = (phone: string) => {
    return clients.find((c) => 
      c.phone.replace(/\D/g, "").includes(phone.replace(/\D/g, ""))
    );
  };

  return {
    clients,
    loading,
    addClient,
    addPoint,
    redeemReward,
    findClientByPhone,
    refetch: fetchClients,
  };
};
