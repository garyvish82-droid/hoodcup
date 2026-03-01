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
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="font-semibold text-gray-800 mb-3">Add new member</h2>
          <form onSubmit={handleAdd} className="flex gap-2">
            <Input placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} required />
            <Input placeholder="Phone" value={newPhone} onChange={e => setNewPhone(e.target.value)} required />
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white whitespace-nowrap" disabled={adding}>
              Add
            </Button>
          </form>
        </div>
        <Input placeholder="Search by phone number..." value={search} onChange={e => setSearch(e.target.value)} className="mb-4" />
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="space-y-3">
            {(filtered as typeof clients).map(client => (
              <div key={client.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-amber-900">{client.points}/10 stamps</p>
                    <p className="text-xs text-gray-400">{client.total_purchases} visits</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full ${i < client.points ? "bg-amber-500" : "bg-gray-200"}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white flex-1" onClick={() => addPoint(client.id)} disabled={client.points >= 10}>
                    + Stamp
                  </Button>
                  {client.points >= 10 && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex-1" onClick={() => redeemReward(client.id)}>
                      Redeem ☕
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-8">No members found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}