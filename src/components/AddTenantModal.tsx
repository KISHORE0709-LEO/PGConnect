import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus, X } from "lucide-react";
import { db } from "@/config/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  pgId: string;
  roomNo: string;
  onTenantAdded: () => void;
}

const AddTenantModal = ({ isOpen, onClose, pgId, roomNo, onTenantAdded }: AddTenantModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    try {
      const roomRef = doc(db, 'pgs', pgId, 'rooms', roomNo);
      const newTenant = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        rentStatus: false, // New tenant hasn't paid yet
        joinedDate: new Date().toISOString(),
      };

      await updateDoc(roomRef, {
        occupants: arrayUnion(newTenant)
      });

      setFormData({ name: "", email: "", phone: "" });
      onTenantAdded();
      onClose();
    } catch (error) {
      console.error('Error adding tenant:', error);
      alert('Failed to add tenant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Tenant to Room {roomNo}
          </DialogTitle>
          <DialogDescription>
            Fill in the tenant details to add them to this room.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter tenant's full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+91-XXXXXXXXXX"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name || !formData.email}>
              {loading ? "Adding..." : "Add Tenant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTenantModal;