import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useClients } from "@/hooks/useClients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const { clients, loading, addClient, addPoint, redeemReward, findClientByPhone } = useClients();
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [adding, setAdding] = useState(false);

  const filtered = search
    ? [findClientByPhone(search)].filter(Boolean)
    : clients;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    await addClient(newName, newPhone);
    setNewName("");
    setNewPhone("");
    setAdding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-amber-900">HoodCup Admin</h1>
            <p className="text-sm text-gray-500">Manage your loyalty program</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/join`);
                toast.success("Invite link copied! 🔗");
              }}
            >
              Copy Invite Link
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>Sign out</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-900">{clients.length}</p>
            <p className="text-xs text-gray-500">Members</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-900">
              {clients.filter(c => c.points >= 10).length}
            </p>
            <p className="text-xs text-gray-500">Ready to redeem</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-900">
              {clients.reduce((sum, c) => sum + c.total_purchases, 0)}
            </p>
            <p className="text-xs text-gray-500">Total visits</p>
          </div>
        </div>

        {/* Add Client */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="font-semibold text-gray-800 mb-3">Add new member</h2>
          <form onSubmit={handleAdd} className="flex gap-2">
            <Input
              placeholder="Name"
              value={newName}
