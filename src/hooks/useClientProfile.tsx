import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface ClientProfile {
  id: string;
  name: string;
  phone: string;
  points: number;
  free_coffees: number;
  total_purchases: number;
}

export const useClientProfile = () => {
  const { user } = useAuth();
  const [clientData, setClientData] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching client profile:", fetchError);
      setError("Failed to load your loyalty data");
      setClientData(null);
    } else {
      setClientData(data);
    }
    
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchClientProfile();
  }, [fetchClientProfile]);

  const pointsToReward = clientData ? 10 - clientData.points : 10;
  const progressPercent = clientData ? (clientData.points / 10) * 100 : 0;
  const hasRewardReady = clientData ? clientData.points >= 10 : false;

  return {
    clientData,
    loading,
    error,
    pointsToReward,
    progressPercent,
    hasRewardReady,
    refetch: fetchClientProfile,
  };
};
