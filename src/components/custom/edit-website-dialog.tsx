"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

interface EditWebsiteDialogProps {
  open: boolean;
  onClose: () => void;
  website: {
    _id: string;
    name: string;
    url: string;
  };
  onUpdated: () => void;
}

export default function EditWebsiteDialog({
  open,
  onClose,
  website,
  onUpdated,
}: EditWebsiteDialogProps) {
  const [name, setName] = useState(website?.name || "");
  const [url, setUrl] = useState(website?.url || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name.trim() || !url.trim()) return alert("Both fields are required.");

    try {
      setLoading(true);
      await axios.put(`/api/website/update/${website._id}`, { name, url });
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Website</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Edit Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Edit URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter new URL"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
