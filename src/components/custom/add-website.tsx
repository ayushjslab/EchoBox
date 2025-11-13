"use client";

import { useState, useRef } from "react";
import {
  Copy,
  Check,
  Zap,
  Code,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function AddWebsitePage({ userId }: { userId: string | null }) {
  const [step, setStep] = useState(1);
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [copied, setCopied] = useState(false);
  const scriptRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    console.log(userId);
    if (!siteName || !siteUrl || !userId) {
      toast.error("Please fill all fields and make sure you are logged in.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/website/add", {
        name: siteName,
        url: siteUrl,
        userId,
      });

      if (data.success) {
        toast.success(data.message || "Website added successfully!");
      } else {
        toast.error(data.message || "Failed to add website.");
      }

      const newSiteId = data.data._id;

      const script = `<script src="https://echomark.vercel.app/widget.js?siteId=${newSiteId}"  strategy="afterInteractive"></script>`;
      setGeneratedScript(script);

      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleCopy = async () => {
    if (!generatedScript) return;
    try {
      await navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleReset = () => {
    setSiteName("");
    setSiteUrl("");
    setGeneratedScript("");
    setStep(1);
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-emerald-50 to-white">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start mt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${
                step >= 1 ? "bg-emerald-600" : "bg-gray-300"
              }`}
            >
              1
            </div>
            <div
              className={`h-1 flex-1 rounded-full transition-all ${
                step >= 2 ? "bg-emerald-600" : "bg-gray-300"
              }`}
            />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all ${
                step >= 2 ? "bg-emerald-600" : "bg-gray-300"
              }`}
            >
              2
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-100 p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">
                  Website Name
                </label>
                <input
                  type="text"
                  placeholder="My Awesome Website"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">
                  Website URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!siteName || !siteUrl || loading} // disable while loading
                className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 text-white" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Generate Script
                  </>
                )}
              </button>
            </div>
          </div>

          {step === 1 && (
            <div className="grid gap-4">
              <div className="flex gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <Code size={20} className="text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Easy Integration
                  </h4>
                  <p className="text-sm text-gray-600">
                    Copy the generated script and paste it into your
                    website&apos;s HTML
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <Zap size={20} className="text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Instant Analytics
                  </h4>
                  <p className="text-sm text-gray-600">
                    Start tracking visitor behavior immediately after adding the
                    script
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {generatedScript ? (
            <div className="space-y-6">
              <div className="bg-linear-to-br from-emerald-50 to-white rounded-2xl border-2 border-emerald-200 p-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Script Generated!
                  </h3>
                  <p className="text-gray-600">
                    Copy the script below and add it to your website
                  </p>
                </div>
              </div>

              <div
                ref={scriptRef}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-emerald-500/20"
              >
                <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
                  <span className="text-xs font-mono text-gray-400">
                    tracking-script.js
                  </span>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 font-mono text-sm text-emerald-400 overflow-x-auto">
                  <code className="block">{generatedScript}</code>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-emerald-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Next Steps:
                </h4>
                <ol className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span className="text-gray-700">
                      Copy the script using the button above
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span className="text-gray-700">
                      Go to your website&lsquo;s HTML{" "}
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                        &lt;head&gt;
                      </code>{" "}
                      section
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span className="text-gray-700">
                      Paste the script and save your changes
                    </span>
                  </li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50 transition-all"
                >
                  Add Another Website
                </button>
                <button
                  onClick={() => (window.location.href = "/analysis")}
                  className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl h-full flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready to Track?</h3>
                  <p className="text-emerald-100 text-lg">
                    Fill in your website details on the left to generate your
                    unique tracking script.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-emerald-50">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                      <Zap size={18} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Lightning Fast</p>
                      <p className="text-sm text-emerald-100">
                        Real-time analytics with minimal impact on your site
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-emerald-50">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Privacy First</p>
                      <p className="text-sm text-emerald-100">
                        GDPR compliant tracking with full transparency
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-emerald-50">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                      <Code size={18} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Simple Setup</p>
                      <p className="text-sm text-emerald-100">
                        One line of code, powerful insights
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
