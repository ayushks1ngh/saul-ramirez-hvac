import { useState, useEffect } from "react";
import { api, type Lead, type Quote, type DashboardMetrics } from "@/lib/api";

const statusOptions = ["new", "contacted", "qualified", "converted", "closed"];

const Admin = () => {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [tab, setTab] = useState<"dashboard" | "leads" | "quotes">("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await api.login(email, password);
      localStorage.setItem("admin_token", res.access_token);
      setToken(res.access_token);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
  };

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.getDashboard(token).then(setMetrics).catch(() => { setToken(""); localStorage.removeItem("admin_token"); }).finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (!token || tab !== "leads") return;
    api.getLeads({ status: statusFilter || undefined, search: search || undefined }).then(setLeads);
  }, [token, tab, statusFilter, search]);

  useEffect(() => {
    if (!token || tab !== "quotes") return;
    fetch(`${import.meta.env.VITE_API_URL || "/api"}/quotes`, { headers: { "Content-Type": "application/json" } })
      .then(r => r.json()).then(setQuotes);
  }, [token, tab]);

  const updateStatus = async (id: string, status: string) => {
    await api.updateLead(id, { status });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <form onSubmit={handleLogin} className="bg-card p-8 rounded-xl shadow-lg border border-border w-full max-w-sm">
          <h1 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">Admin Login</h1>
          {loginError && <p className="text-destructive text-sm mb-4">{loginError}</p>}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-ring" />
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold">Sign In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-heading font-bold text-xl text-foreground">Admin Dashboard</h1>
        <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground">Logout</button>
      </header>

      <div className="container py-8">
        <nav className="flex gap-2 mb-8">
          {(["dashboard", "leads", "quotes"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>

        {tab === "dashboard" && metrics && (
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="font-heading font-extrabold text-3xl text-primary">{metrics.total_leads}</div>
              <div className="text-muted-foreground text-sm">Total Leads</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="font-heading font-extrabold text-3xl text-accent">{metrics.new_leads}</div>
              <div className="text-muted-foreground text-sm">New Leads</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="font-heading font-extrabold text-3xl text-primary">{metrics.total_quotes}</div>
              <div className="text-muted-foreground text-sm">Total Quotes</div>
            </div>
          </div>
        )}
        {tab === "dashboard" && loading && <p className="text-muted-foreground">Loading...</p>}

        {tab === "leads" && (
          <>
            <div className="flex gap-4 mb-6 flex-wrap">
              <input placeholder="Search name or email..." value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm w-64 focus:outline-none focus:ring-2 focus:ring-ring" />
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">All Statuses</option>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Service</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(l => (
                    <tr key={l.id} className="border-t border-border">
                      <td className="px-4 py-3 text-foreground">{l.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{l.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{l.service}</td>
                      <td className="px-4 py-3">
                        <select value={l.status} onChange={e => updateStatus(l.id, e.target.value)} className="px-2 py-1 rounded border border-input bg-background text-foreground text-xs">
                          {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {leads.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No leads found</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "quotes" && (
          <div className="bg-card rounded-xl border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Service</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Property</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map(q => (
                  <tr key={q.id} className="border-t border-border">
                    <td className="px-4 py-3 text-foreground">{q.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{q.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{q.requested_service}</td>
                    <td className="px-4 py-3 text-muted-foreground">{q.property_type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(q.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {quotes.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No quotes found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
