import { useState } from "react";
import { Coffee, Gift, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
  onUpdateClient: (id: string, fields: { name: string; phone: string }) => Promise<boolean>;
}

export function ClientCard({ client, onAddPoint, onRedeemReward, onUpdateClient }: ClientCardProps) {
  const canRedeem = client.points >= 10;
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(client.name);
  const [phone, setPhone] = useState(client.phone);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !phone.trim()) return;
    setSaving(true);
    const ok = await onUpdateClient(client.id, { name: name.trim(), phone: phone.trim() });
    setSaving(false);
    if (ok) setEditOpen(false);
  };

  const hasChanges = name.trim() !== client.name || phone.trim() !== client.phone;

  return (
    <>
      <div className="coffee-card animate-fade-in">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-serif text-lg text-foreground">{client.name}</h3>
            <p className="text-muted-foreground text-sm">{client.phone}</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gift className="w-4 h-4" />
            <span className="text-sm">{client.totalRewards} redeemed</span>
            <Button
              size="icon"
              variant="ghost"
              className="w-7 h-7 text-muted-foreground hover:text-foreground"
              onClick={() => { setName(client.name); setPhone(client.phone); setEditOpen(true); }}
            >
              <Pencil className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex gap-1.5 mb-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                index < client.points ? "stamp-filled" : "stamp-empty"
              )}
            >
              {index < client.points && <Coffee className="w-3 h-3 text-primary-foreground" />}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{client.points}/10 points</span>
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

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button
              className="bg-coffee hover:bg-espresso"
              onClick={handleSave}
              disabled={saving || !name.trim() || !phone.trim() || !hasChanges}
            >
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
