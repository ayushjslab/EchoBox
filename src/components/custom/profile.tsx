/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { Globe, Mail, User2, Link2, Pencil, Trash2, Copy } from "lucide-react";
import { UrlPreview } from "../ui/direct-preview";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Website {
  _id: string;
  websiteName: string;
  websiteUrl: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loadingSites, setLoadingSites] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);

  useEffect(() => {
    async function fetchWebsites() {
      try {
        if (!user?.id) return;
        const { data } = await axios.get(`/api/website/fetch/${user.id}`);
        setWebsites(data.data || []);
      } catch (err) {
        console.error("Failed to fetch websites:", err);
        toast.error("Failed to load websites.");
      } finally {
        setLoadingSites(false);
      }
    }

    fetchWebsites();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/website/delete/${id}`);
      toast.success("Website deleted successfully!");
      setWebsites((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete website.");
    }
  };

  const handleEdit = (website: Website) => {
    setSelectedWebsite(website);
    setDialogOpen(true);
  };

  const refreshWebsites = async () => {
    try {
      if (!user?.id) return;
      const { data } = await axios.get(`/api/website/fetch/${user.id}`);
      setWebsites(data.data || []);
    } catch (err) {
      console.error("Refresh error:", err);
    }
  };

  if (loading)
    return (
      <p className="ml-22 text-center mt-10 text-emerald-600 font-semibold">
        Loading profile...
      </p>
    );

  if (!user)
    return (
      <p className="ml-22 text-center mt-10 text-gray-600">
        Please log in to view your profile.
      </p>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-emerald-50">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white/80 shadow-xl border border-emerald-100 rounded-3xl p-8 backdrop-blur-sm">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-400 shadow-lg">
          <img
            src={user.picture}
            alt={user.name}
            className="object-cover w-full h-full"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-emerald-700 flex items-center justify-center md:justify-start gap-2">
            <User2 size={24} /> {user.name}
          </h1>
          <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
            <Mail size={18} /> {user.email}
          </p>
        </div>
      </div>

      {/* Websites Section */}
      <div className="mt-10 bg-white/80 border border-emerald-100 shadow-lg rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
            <Globe size={22} /> Added Websites
          </h2>
        </div>

        {loadingSites ? (
          <p className="text-gray-500">Loading websites...</p>
        ) : websites.length === 0 ? (
          <p className="text-gray-500 italic">
            You haven’t added any websites yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((site) => (
              <div
                key={site._id}
                className="relative p-6 border border-emerald-100 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Edit/Delete Buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => {
                      const script = `<script src="https://echomark.vercel.app/widget.js?siteId=${site._id}" strategy="afterInteractive"></script>`;
                      navigator.clipboard.writeText(script);
                      toast.success("Script copied to clipboard!");
                    }}
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    title="Copy Script"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(site)}
                    className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(site._id)}
                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h3 className="text-xl font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                  <Link2 size={18} /> {site.websiteName}
                </h3>
                <a
                  href={site.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-600 hover:underline break-all"
                >
                  <UrlPreview url={site.websiteUrl} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedWebsite && (
        <EditWebsiteDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          website={selectedWebsite}
          onUpdated={refreshWebsites}
        />
      )}
    </div>
  );
}


interface EditWebsiteDialogProps {
  open: boolean;
  onClose: () => void;
  website: Website;
  onUpdated: () => void;
}

function EditWebsiteDialog({
  open,
  onClose,
  website,
  onUpdated,
}: EditWebsiteDialogProps) {
  const [name, setName] = useState(website.websiteName || "");
  const [url, setUrl] = useState(website.websiteUrl || "");
  const [loading, setLoading] = useState(false);

   useEffect(() => {
     if (website) {
       setName(website.websiteName || "");
       setUrl(website.websiteUrl || "");
     }
   }, [website]);

  const handleUpdate = async () => {
    if (!name.trim() || !url.trim())
      return toast.error("Both fields are required.");

    try {
      setLoading(true);
      await axios.put(`/api/website/update/${website._id}`, {
        websiteName: name,
        websiteUrl: url,
      });
      toast.success("Website updated successfully!");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl border border-emerald-100">
        <DialogHeader>
          <DialogTitle className="text-emerald-700 font-bold text-xl">
            Edit Website
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Edit Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new name"
              className="border-emerald-200 focus-visible:ring-emerald-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Edit URL
            </label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter new URL"
              className="border-emerald-200 focus-visible:ring-emerald-400"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
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
