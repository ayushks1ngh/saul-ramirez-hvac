const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(body.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message?: string;
  status: string;
  created_at: string;
}

export interface Quote {
  id: string;
  name: string;
  phone: string;
  email: string;
  property_type: string;
  requested_service: string;
  notes?: string;
  created_at: string;
}

export interface DashboardMetrics {
  total_leads: number;
  new_leads: number;
  total_quotes: number;
  recent_leads: Lead[];
  recent_quotes: Quote[];
}

export const api = {
  createLead(data: { name: string; phone: string; email: string; service: string; message?: string }) {
    return request<Lead>("/leads", { method: "POST", body: JSON.stringify(data) });
  },
  createQuote(data: { name: string; phone: string; email: string; property_type: string; requested_service: string; notes?: string }) {
    return request<Quote>("/quotes", { method: "POST", body: JSON.stringify(data) });
  },
  getLeads(params?: { status?: string; search?: string }) {
    const q = new URLSearchParams();
    if (params?.status) q.set("status", params.status);
    if (params?.search) q.set("search", params.search);
    return request<Lead[]>(`/leads?${q}`);
  },
  getLead(id: string) {
    return request<Lead>(`/leads/${id}`);
  },
  updateLead(id: string, data: { status: string }) {
    return request<Lead>(`/leads/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  },
  login(email: string, password: string) {
    return request<{ access_token: string }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  },
  getDashboard(token: string) {
    return request<DashboardMetrics>("/admin/dashboard", { headers: { Authorization: `Bearer ${token}` } });
  },
};
