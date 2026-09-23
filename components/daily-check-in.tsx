"use client";

import { useEffect, useState } from "react";

const key = "nourished-garden-check-in";
const today = () => new Date().toLocaleDateString("en-CA");

export function DailyCheckIn() {
  const [done, setDone] = useState(false);
  const [note, setNote] = useState("");
  const [remind, setRemind] = useState(false);
  useEffect(() => {
    try {
      setDone(localStorage.getItem(key) === today());
      setRemind(localStorage.getItem("garden-reminder") === "yes");
      if (localStorage.getItem("garden-reminder") === "yes" && localStorage.getItem(key) !== today() && "Notification" in window && Notification.permission === "granted") {
        new Notification("A moment for your garden", { body: "How are you feeling today? Open your member garden for a quick check-in.", icon: "/icons/garden.svg" });
      }
    } catch { /* Storage or notifications may be unavailable. */ }
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  function save() {
    try { localStorage.setItem(key, today()); } catch { /* Local storage may be unavailable. */ }
    setDone(true);
  }
  async function enable() {
    if (!("Notification" in window)) { setNote("Notifications are unavailable in this browser."); return; }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      localStorage.setItem("garden-reminder", "yes");
      setRemind(true);
      setNote("Reminders are on when you open the app. Background daily alerts are coming later.");
    } else setNote("Notifications were not enabled. You can still check in here each day.");
  }
  return <section className="check-in-card" aria-label="Daily check-in">
    <div><p className="eyebrow">A little time for you</p><h2>Daily check-in</h2><p>{done ? "You checked in today. See you tomorrow!" : "How are you feeling today? Take one small step for yourself."}</p></div>
    <div className="check-in-actions"><button className="button button-primary" onClick={save} disabled={done}>{done ? "Checked in today ✓" : "I checked in today"}</button>{!remind && <button className="button button-secondary" onClick={enable}>Enable reminders</button>}</div>
    {note && <p className="fine-print" role="status">{note}</p>}
    <p className="fine-print">Check-ins are saved on this device. Reminders appear when you open the app; scheduled background alerts require a later update.</p>
  </section>;
}
