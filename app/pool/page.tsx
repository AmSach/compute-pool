"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PoolPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"form" | "install" | "docker">("form");
  const [gpuTier, setGpuTier] = useState("rtx-3060");

  const handleJoin = () => {
    if (!userId.trim() || !name.trim()) return;
    sessionStorage.setItem("cp_userId", userId.trim());
    sessionStorage.setItem("cp_name", name.trim());
    setStep("install");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-mono font-black text-center mb-2">
        <span className="text-cyan-400">Join</span> the Pool
      </h1>
      <p className="text-gray-400 text-center mb-12">
        Install the node agent on your machine and start contributing compute.
      </p>

      {step === "form" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Your User ID</label>
            <input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. aman_pc or friend_name"
              className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Display Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aman"
              className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">GPU Tier</label>
            <select
              value={gpuTier}
              onChange={(e) => setGpuTier(e.target.value)}
              className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="rtx-4090">RTX 4090 (3.0x)</option>
              <option value="rtx-3090">RTX 3090 (2.5x)</option>
              <option value="rtx-4070">RTX 4070 (2.5x)</option>
              <option value="rtx-3060">RTX 3060 (2.0x)</option>
              <option value="rtx-2070">RTX 2070 (2.0x)</option>
              <option value="gtx-1080ti">GTX 1080 Ti (1.5x)</option>
              <option value="gtx-1080">GTX 1080 (1.5x)</option>
              <option value="gtx-1660">GTX 1660 (1.3x)</option>
              <option value="cpu">CPU Only (0.8x)</option>
            </select>
            <p className="text-xs text-gray-600 mt-1">Multiplier applied to your earnings per compute hour.</p>
          </div>
          <button
            onClick={handleJoin}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg rounded-lg transition"
          >
            Continue to Installation
          </button>
        </div>
      )}

      {step === "install" && (
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-green-400">✓</span> Account Ready
            </h2>
            <p className="text-gray-400 mb-6">Choose how to run the node agent on your machine:</p>

            {/* Docker Option */}
            <div
              onClick={() => setStep("docker")}
              className="p-6 bg-black/30 border border-white/10 rounded-xl hover:border-cyan-500/50 cursor-pointer transition mb-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-sm">🐳</div>
                <div>
                  <div className="font-bold text-lg">Docker (Recommended)</div>
                  <div className="text-gray-400 text-sm">Works on Windows, macOS, Linux. Isolated environment.</div>
                </div>
              </div>
            </div>

            {/* Python Option */}
            <div className="p-6 bg-black/30 border border-white/10 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center font-mono font-bold text-sm text-black">🐍</div>
                <div>
                  <div className="font-bold text-lg">Bare Python</div>
                  <div className="text-gray-400 text-sm">Direct install. Requires Python 3.10+ and pip.</div>
                </div>
              </div>
              <div className="bg-black/60 rounded-lg p-4 font-mono text-sm text-green-400 mb-4">
                <div># Install dependencies</div>
                <div>pip install requests psutil</div>
                <div className="mt-3"># Set your Hub URL</div>
                <div>export HUB_URL=https://your-hub-url.com</div>
                <div>export OWNER_ID={userId}</div>
                <div>export NODE_NAME={name}-pc</div>
                <div>export GPU_TIER={gpuTier}</div>
                <div className="mt-3"># Download agent</div>
                <div>curl -L -o agent.py https://your-repo/raw/main/agent.py</div>
                <div className="mt-3"># Run</div>
                <div>python3 agent.py</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "docker" && (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">🐳 Docker Installation</h2>
            <p className="text-gray-400 mb-6">Run the node agent in a Docker container. Works on any OS with Docker installed.</p>

            <div className="bg-black/60 rounded-xl p-6 font-mono text-sm">
              <div className="text-gray-500 mb-4"># 1. Create a docker-compose.yml</div>
              <pre className="text-green-400 whitespace-pre-wrap">{`services:
  compute-node:
    image: amsach/compute-pool-node:latest
    restart: unless-stopped
    environment:
      HUB_URL: https://your-hub.railway.app
      OWNER_ID: ${userId}
      NODE_NAME: ${name}-pc
      GPU_TIER: ${gpuTier}
      REGION: in
    network_mode: host`}</pre>
            </div>

            <div className="bg-black/60 rounded-xl p-6 font-mono text-sm mt-4">
              <div className="text-gray-500 mb-4"># 2. Start the node</div>
              <pre className="text-green-400">docker compose up -d</pre>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-4">
              <div className="text-yellow-400 font-bold mb-1">⚠️ Important: Replace HUB_URL</div>
              <div className="text-gray-400 text-sm">
                Change <code className="text-yellow-300">https://your-hub.railway.app</code> to your actual deployed backend URL.
                Once deployed, we&apos;ll give you the exact URL to use.
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep("form")}
            className="text-gray-500 hover:text-white text-sm transition"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}