"use client";

import { Globe, Link2, ArrowRight } from "lucide-react";
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

const AddedWebsites = () => {
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
    <div className="mt-10 border border-emerald-200/40 bg-gradient-to-br from-white/70 to-emerald-50/60 shadow-xl rounded-3xl p-8 backdrop-blur-md">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-emerald-700 flex items-center gap-3">
          <Globe className="w-7 h-7 text-emerald-600" /> Your Added Websites
        </h2>
        <span className="text-sm text-emerald-500 font-medium bg-emerald-100 px-3 py-1 rounded-full shadow-inner">
          {websites.length} Active
        </span>
      </div>

      {loadingSites ? (
        <p className="text-gray-500">Loading websites...</p>
      ) : websites.length === 0 ? (
        <div className="text-center py-12 text-gray-500 italic">
          You haven’t added any websites yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {websites.map((site) => (
            <div
              key={site._id}
              onClick={() => router.push(`/dashboard/analysis/${site._id}`)}
              className="group relative cursor-pointer p-6 rounded-2xl border border-emerald-100/50 bg-white/90 shadow-md hover:shadow-emerald-200/70 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-emerald-600" />{" "}
                  {site.websiteName}
                </h3>
                <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="text-sm text-emerald-700/80 hover:text-emerald-900 transition-colors">
                <UrlPreview url={site.websiteUrl} />
              </div>

              <div className="absolute inset-0 bg-emerald-50/0 group-hover:bg-emerald-50/20 rounded-2xl transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddedWebsites;
