"use client";
import { useState } from "react";
export function CustomerPortalButton() {
  const [error, setError] = useState("");
  async function openPortal() { const response = await fetch("/api/portal", { method: "POST" }); const data = await response.json(); if (response.ok) window.location.assign(data.url); else setError(data.error); }
  return <div><button className="button button-secondary" onClick={openPortal}>Manage billing</button>{error && <p className="form-error">{error}</p>}</div>;
}
