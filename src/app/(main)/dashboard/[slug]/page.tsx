"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
import ProfilePage from "@/components/custom/profile";

const AddWebsite = dynamic(() => import("@/components/custom/add-website"));

export default function DashboardPageClient() {
  const params = useParams();
  const rawSlug = params?.slug;
  const { user, loading } = useAuth();

  const slug = Array.isArray(rawSlug) ? rawSlug.join("-") : rawSlug;

  const renderComponent = () => {
    switch (slug) {
      case "add-website":
        return <AddWebsite userId={user?.id || null} />;
      case "profile":
        return <ProfilePage />;
      default:
        return <p>Page not found</p>;
    }
  };

  if (loading)
    return <p className="ml-22 text-center mt-10">Loading authentication...</p>;

  return (
    <div className="p-6 ml-22">
      <h1 className="text-3xl font-bold text-emerald-600 capitalize mb-4">
        {slug?.replace("-", " ") || "Dashboard"}
      </h1>
      {renderComponent()}
    </div>
  );
}
