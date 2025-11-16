"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ButtonStyles {
  emoji: string;
  fontSize: number;
  textColor: string;
  gradientStart: string;
  gradientEnd: string;
  borderRadius: number;
  paddingX: number;
  paddingY: number;
  shadowIntensity: number;
  blurAmount: number;
  borderColor: string;
  bottom: number;
  right: number;
  zIndex: number;
  hoverBrightness: number;
}

export default function ButtonCustomization({websiteId}: {websiteId: string}) {
  const [styles, setStyles] = useState<ButtonStyles>({
    emoji: "💬",
    fontSize: 22,
    textColor: "#ffffff",
    gradientStart: "#10b981",
    gradientEnd: "#059669",
    borderRadius: 20,
    paddingX: 10,
    paddingY: 6,
    shadowIntensity: 35,
    blurAmount: 6,
    borderColor: "rgba(255,255,255,0.3)",
    bottom: 30,
    right: 30,
    zIndex: 9999,
    hoverBrightness: 110,
  });

  const [loading, setLoading] = useState(false);

  const updateStyle = <K extends keyof ButtonStyles>(
    key: K,
    value: ButtonStyles[K]
  ) => {
    setStyles((prev) => ({ ...prev, [key]: value }));
  };

  const hexToRgba = (hex: string, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const saveStyles = async () => {
    try {
      setLoading(true);
      await axios.post("/api/website/save-button-styles", {
        websiteId,
        styles,
      });
      toast.success("Button styles saved!");
    } catch (e) {
      console.error(e);
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const res = await axios.get(`/api/website/fetch-button-styles?websiteId=${websiteId}`);
        if (res.data?.buttonStyles) {
          setStyles(res.data.buttonStyles);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchStyles();
  }, [websiteId]);

  return (
    <div className="flex justify-center flex-wrap gap-6 p-6">
      {/* LEFT PANEL - CONTROLS */}
      <div className="max-w-xl p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Customize Button
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {[
            { label: "Emoji", key: "emoji", type: "text" },
            { label: "Font Size", key: "fontSize", type: "number" },
            { label: "Text Color", key: "textColor", type: "color" },
            { label: "Gradient Start", key: "gradientStart", type: "color" },
            { label: "Gradient End", key: "gradientEnd", type: "color" },
            { label: "Border Radius", key: "borderRadius", type: "number" },
            { label: "Padding X", key: "paddingX", type: "number" },
            { label: "Padding Y", key: "paddingY", type: "number" },
            {
              label: "Shadow Intensity",
              key: "shadowIntensity",
              type: "number",
            },
            { label: "Blur Amount", key: "blurAmount", type: "number" },
            { label: "Border Color", key: "borderColor", type: "color" },
            { label: "Bottom Distance", key: "bottom", type: "number" },
            { label: "Right Distance", key: "right", type: "number" },
            { label: "Z Index", key: "zIndex", type: "number" },
            {
              label: "Hover Brightness",
              key: "hoverBrightness",
              type: "number",
            },
          ].map(({ label, key, type }) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={styles[key as keyof ButtonStyles] as string | number}
                onChange={(e) =>
                  updateStyle(
                    key as keyof ButtonStyles,
                    type === "number" ? Number(e.target.value) : e.target.value
                  )
                }
                className={`w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:ring-2 transition-all ${
                  type === "color" ? "cursor-pointer h-10" : ""
                }`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={saveStyles}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-xl font-semibold transform transition-all duration-300 ${
            loading
              ? "bg-emerald-300 cursor-not-allowed opacity-70"
              : "bg-emerald-500 text-white shadow-lg hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
          }`}
        >
          {loading ? "Saving..." : "Save Button Styles"}
        </button>
      </div>

      {/* RIGHT PANEL - BUTTON PREVIEW */}
      <div className="flex items-center justify-center w-full md:w-auto">
        <button
          style={{
            position: "fixed",
            bottom: `${styles.bottom}px`,
            right: `${styles.right}px`,
            zIndex: styles.zIndex,
            background: `linear-gradient(135deg, ${styles.gradientStart}, ${styles.gradientEnd})`,
            color: styles.textColor,
            border: `1px solid ${styles.borderColor}`,
            borderRadius: `${styles.borderRadius}px`,
            padding: `${styles.paddingY}px ${styles.paddingX}px`,
            fontSize: `${styles.fontSize}px`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 10px 25px ${hexToRgba(
              "#000",
              styles.shadowIntensity / 100
            )}`,
            backdropFilter: `blur(${styles.blurAmount}px)`,
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            fontWeight: 700,
          }}
          onMouseEnter={(e) => {
            (
              e.currentTarget as HTMLButtonElement
            ).style.filter = `brightness(${styles.hoverBrightness}%)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter =
              "brightness(100%)";
          }}
        >
          {styles.emoji}
        </button>
      </div>
    </div>
  );
}
