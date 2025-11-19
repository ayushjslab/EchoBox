import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy } from "lucide-react";

export default function InstallTabs() {
  const [copied, setCopied] = useState(false);

  const commands = {
    npm: "npm install echomark",
    pnpm: "pnpm add echomark",
    yarn: "yarn add echomark",
    bun: "bun add echomark",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-xl p-6">
      <Card className="rounded-3xl shadow-xl bg-linear-to-br from-emerald-50 to-white border border-emerald-300 backdrop-blur-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center tracking-wide">
            Install EchoMark
          </h2>

          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="bg-emerald-200/40 rounded-2xl p-2 shadow-inner backdrop-blur-md flex items-center justify-center">
              <TabsTrigger
                value="npm"
                className="rounded-lg cursor-pointer py-3 px-3 font-medium text-emerald-800 hover:bg-emerald-200/60 transition-all"
              >
                npm
              </TabsTrigger>
              <TabsTrigger
                value="pnpm"
                className="rounded-lg cursor-pointer py-3 px-3 font-medium text-emerald-800 hover:bg-emerald-200/60 transition-all"
              >
                pnpm
              </TabsTrigger>
              <TabsTrigger
                value="yarn"
                className="rounded-lg cursor-pointer py-3 px-3 font-medium text-emerald-800 hover:bg-emerald-200/60 transition-all"
              >
                yarn
              </TabsTrigger>
              <TabsTrigger
                value="bun"
                className="rounded-lg cursor-pointer py-3 px-3 font-medium text-emerald-800 hover:bg-emerald-200/60 transition-all"
              >
                bun
              </TabsTrigger>
            </TabsList>

            {Object.entries(commands).map(([key, cmd]) => (
              <TabsContent key={key} value={key}>
                <div className="mt-4 bg-linear-to-br from-gray-900 to-black text-white p-5 rounded-2xl relative font-mono text-sm flex items-center justify-between shadow-lg border border-gray-700">
                  <span>
                    {cmd.split(" ").map((word, i) => {
                      if (word === "npm" || word === "pnpm" || word === "bun" || word === "yarn")
                        return (
                          <span key={i} className="text-blue-400 font-bold">
                            {word}{" "}
                          </span>
                        );
                      if (word === "install" || word === "add")
                        return (
                          <span key={i} className="text-white">
                            {word}{" "}
                          </span>
                        );
                      if (word === "echomark")
                        return (
                          <span key={i} className="text-emerald-300">
                            echomark
                          </span>
                        );
                      return <span key={i}>{word} </span>;
                    })}{" "}
                  </span>
                  <button
                    onClick={() => handleCopy(cmd)}
                    className="ml-3 p-2 rounded-lg hover:bg-gray-700 active:scale-95 transition-all"
                  >
                    <Copy size={18} />
                  </button>
                  {copied && (
                    <span className="absolute -top-5 right-2 text-emerald-600 text-xs font-semibold">
                      Copied!
                    </span>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
