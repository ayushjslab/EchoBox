"use client";

import { Globe, Settings2, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { UrlPreview } from "../ui/direct-preview";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Website {
  _id: string;
  websiteName: string;
  websiteUrl: string;
}

const CustomizeWebsites = () => {
  const { user, loading } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loadingSites, setLoadingSites] = useState(true);
  const router = useRouter();

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

  if (loading)
    return (
      <p className="ml-22 text-center mt-10 text-emerald-600 font-semibold">
        Loading profile...
      </p>
    );

  return (
    <div className="mt-10 border border-emerald-200/40 bg-linear-to-br from-white to-emerald-50/30 shadow-xl rounded-3xl p-10 backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <Settings2 className="w-9 h-9 text-emerald-600" />
          <h2 className="text-3xl font-bold text-emerald-600">
            Choose Website to Customize
          </h2>
        </div>
        <span className="text-sm text-emerald-700 font-semibold bg-emerald-100 px-4 py-1.5 rounded-full shadow-inner">
          {websites.length} Available
        </span>
      </div>

      {/* Content */}
      {loadingSites ? (
        <p className="text-gray-500">Loading websites...</p>
      ) : websites.length === 0 ? (
        <div className="text-center py-16 text-gray-500 italic text-lg">
          No websites added yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {websites.map((site) => (
            <div
              key={site._id}
              onClick={() => router.push(`/dashboard/customize/${site._id}`)}
              className="group relative cursor-pointer p-7 rounded-2xl border border-emerald-100 bg-white shadow-md 
              hover:shadow-emerald-300/40 hover:border-emerald-300/60 hover:-translate-y-1 
              transition-all duration-300 backdrop-blur-sm"
            >
              {/* Title */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-700" />
                  {site.websiteName}
                </h3>
                <ArrowRight className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* URL Preview */}
              <div className="text-sm text-emerald-700/80 hover:text-emerald-900 transition-colors">
                <UrlPreview url={site.websiteUrl} />
              </div>

              {/* Hover Background */}
              <div className="absolute inset-0 bg-emerald-100/0 group-hover:bg-emerald-100/10 rounded-2xl transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomizeWebsites;
