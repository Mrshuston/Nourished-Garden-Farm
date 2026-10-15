"use client";

import { useEffect, useState } from "react";

type MetaStatus = {
  configured: boolean;
  connected: boolean;
  connectedAt: string | null;
  userName: string | null;
  pages: Array<{ id: string; name: string; instagram?: { id: string; username?: string } | null }>;
};

export function MetaConnectionCard() {
  const [status, setStatus] = useState<MetaStatus | null>(null);
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    fetch("/api/meta/status", { cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || "Meta status could not be loaded.");
        setStatus(body);
      })
      .catch((reason: Error) => setError(reason.message));
  }, []);

  const disconnect = async () => {
    if (!window.confirm("Disconnect Facebook and Instagram from the Nourished Client Garden? Scheduled drafts and lead notes in your dashboard will remain.")) return;
    setWorking(true); setError("");
    try {
      const response = await fetch("/api/meta/disconnect", { method: "DELETE" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Meta could not be disconnected.");
      setStatus((current) => current ? { ...current, connected: false, connectedAt: null, userName: null, pages: [] } : current);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Meta could not be disconnected.");
    } finally { setWorking(false); }
  };

  return (
    <section className="meta-connection-card" aria-labelledby="meta-connection-title">
      <div className="meta-connection-copy">
        <p className="eyebrow">Facebook + Instagram</p>
        <h2 id="meta-connection-title">Meta Business Suite connection</h2>
        {!status ? <p>Checking your connection…</p> : null}
        {status && !status.configured ? <><p>The secure website connection is installed. The final Meta app credentials and authorization still need to be added before the Connect button can open.</p><span className="connection-pill waiting">Setup in progress</span></> : null}
        {status?.configured && !status.connected ? <><p>Connect your Facebook Page and linked Instagram Professional account. Meta will show the exact permissions before anything is approved.</p><a className="button button-primary" href="/api/meta/connect">Connect Facebook &amp; Instagram</a></> : null}
        {status?.connected ? <><p><strong>Connected as {status.userName}</strong></p><div className="connected-assets">{status.pages.map((page) => <div key={page.id}><span>Facebook Page</span><strong>{page.name}</strong>{page.instagram ? <small>Instagram: @{page.instagram.username || page.instagram.id}</small> : <small>No linked Instagram Professional account found</small>}</div>)}</div><button className="button button-secondary" type="button" disabled={working} onClick={() => void disconnect()}>{working ? "Disconnecting…" : "Disconnect Meta"}</button></> : null}
        {error ? <p className="form-error" role="alert">{error}</p> : null}
      </div>
      <div className="meta-connection-icon" aria-hidden="true"><span>f</span><span>◎</span></div>
    </section>
  );
}
