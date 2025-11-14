"use client";

import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const { user, loading: authLoading } = useAuth();
   useEffect(() => {
     if (user) {
       router.push("/");
     }
   }, [user, router]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        console.log("Google Token Response:", tokenResponse);

        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (userInfo.data) {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URI}/api/user`, {
            name: userInfo.data.name,
            email: userInfo.data.email,
            picture: userInfo.data.picture,
          });
          console.log("Backend Response:", data);
          toast.success("Logged in successfully!");
          router.push("/")
        }

        console.log("Google User Info:", userInfo.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error("Login failed. Try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Login Failed:", errorResponse);
      toast.error("Google login failed.");
    },
  });

   if (authLoading)
     return (
       <p className="ml-22 text-center mt-10">Loading authentication...</p>
     );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-sm border border-emerald-200">
        <h1 className="text-4xl font-extrabold text-emerald-600 text-center mb-8 tracking-tight">
          EchoMark
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Sign in to continue to your dashboard
        </p>

        <button
          onClick={() => googleLogin()}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 border border-emerald-300 rounded-xl py-3 px-6 shadow-md transition-all hover:shadow-lg hover:bg-emerald-50 text-gray-700 font-semibold mb-4 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          <FcGoogle size={24} className={loading ? "animate-spin" : ""} />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          &copy; {new Date().getFullYear()} EchoMark. All rights reserved.
        </p>
      </div>
    </div>
  );
}
