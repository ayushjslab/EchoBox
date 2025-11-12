"use client";

import { useState } from "react";
import {
  Menu,
  Plus,
  BarChart3,
  Settings,
  User,
  CreditCard,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Plus, label: "Add website", href: "#" },
    { icon: BarChart3, label: "Analysis", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: User, label: "Profile", href: "#" },
    { icon: CreditCard, label: "Billing", href: "#" },
  ];

  return (
    <div
      className="fixed left-0 top-0 h-full z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Sidebar Background */}
      <div
        className={`h-full backdrop-blur-md bg-white/70 border-r border-emerald-200 shadow-2xl transition-all duration-500 ease-in-out rounded-r-2xl ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-emerald-100">
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            <h1 className="text-2xl font-extrabold text-emerald-600 whitespace-nowrap tracking-tight">
              EchoMark
            </h1>
          </div>
          <div className="flex-shrink-0 text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors">
            {!isOpen && (
              <div className="w-8 h-8 bg-gradient-to-br mr-4 from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EM</span>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 space-y-3 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 px-3 py-3 rounded-xl text-gray-700 hover:bg-emerald-100 hover:backdrop-blur-sm hover:text-emerald-600 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></span>
                <Icon className="w-6 h-6 flex-shrink-0 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-300" />
                <span
                  className={`font-medium overflow-hidden transition-all duration-500 ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                  } whitespace-nowrap relative`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Footer Gradient Glow */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-emerald-50/70 via-transparent rounded-t-xl pointer-events-none"></div>
      </div>
    </div>
  );
}
