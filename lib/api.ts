const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function register(userId: string, name: string, region = "in") {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name, region }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function login(userId: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getNodes() {
  const res = await fetch(`${API_URL}/nodes`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function submitJob(type: string, slices = 1, script = "", priority = 0, submitterId: string) {
  const res = await fetch(`${API_URL}/jobs/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, slices, script, priority, submitterId }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getJobs(status?: string, submitterId?: string) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (submitterId) params.set("submitterId", submitterId);
  const res = await fetch(`${API_URL}/jobs?${params}`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getCredits(userId: string) {
  const res = await fetch(`${API_URL}/credits/${userId}`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function topup(userId: string, amount: number) {
  const res = await fetch(`${API_URL}/credits/topup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, amount }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function cashout(userId: string, amount: number) {
  const res = await fetch(`${API_URL}/credits/cashout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, amount }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getLeaderboard() {
  const res = await fetch(`${API_URL}/credits/leaderboard`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getStatus() {
  const res = await fetch(`${API_URL}/status`);
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getLogs(limit = 50) {
  const res = await fetch(`${API_URL}/logs?limit=${limit}`);
  if (!res.ok) throw await res.json();
  return res.json();
}