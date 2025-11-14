/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 Display */}
        <div className="mb-8">
          <div className="inline-block">
            <div className="text-9xl md:text-10xl font-black text-primary animate-float">
              404
            </div>
            <div className="h-2 w-32 bg-gradient-to-r from-primary/40 to-primary/20 rounded-full mx-auto mt-4"></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-foreground/70 mb-8 text-balance leading-relaxed">
          We couldn&lsquo;t find what you were looking for. The page might have moved
          or doesn&apos;t exist anymore.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/5 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Contact Support
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-2 opacity-40">
          <div
            className="w-2 h-2 rounded-full bg-primary animate-glow"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-primary animate-glow"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-primary animate-glow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
