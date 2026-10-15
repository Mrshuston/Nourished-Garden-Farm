"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ClientGardenData, ClientLead, LeadStatus, SocialPost, SocialStatus } from "@/lib/client-garden";

const blankLead = (): ClientLead => ({ id: crypto.randomUUID(), name: "", email: "", source: "Facebook", interest: "Calm Home, Connected Family", status: "New", followUpDate: "", value: 0, notes: "", createdAt: new Date().toISOString() });
const blankPost = (): SocialPost => ({ id: crypto.randomUUID(), platform: "Facebook & Instagram", publishDate: "", topic: "", caption: "", status: "Idea", createdAt: new Date().toISOString() });
const replyTemplates = [
  { title: "New interest", text: "Hi [Name]! Thank you for reaching out. I help neurodivergent families create calmer routines, simpler meals, better sleep habits and practical systems that fit real life. What part of your day currently feels the hardest?" },
  { title: "Send the free guide", text: "Hi [Name]! I would be happy to send you my free guide, 5 Simple Changes for a Calmer Family Week. Here is the link: https://www.nourished-garden-health.com/programs/calmer-family-week" },
  { title: "Invite to a call", text: "Based on what you shared, a free 20-minute wellness call may be a helpful next step. We can talk about your goals and see whether one of my programs fits. You can book here: https://calendly.com/thenourishedgardens/calm-call" },
  { title: "Gentle follow-up", text: "Hi [Name], I wanted to check in after our conversation. Are you still looking for support with [goal]? If now is not the right time, that is completely okay. I am happy to answer any questions you have." },
  { title: "Program recommendation", text: "Hi [Name], from what you shared, I believe [Program] may be the best fit because it focuses on [goal]. It provides practical education and accountability without expecting your family to change everything at once. Would you like the program details?" },
];

async function writeClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function ClientGardenDashboard() {
  const [data, setData] = useState<ClientGardenData>({ leads: [], posts: [], updatedAt: "" });
  const [lead, setLead] = useState<ClientLead>(blankLead);
  const [post, setPost] = useState<SocialPost>(blankPost);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/client-garden", { cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || "Dashboard could not be loaded.");
        setData(body);
      })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  const save = useCallback(async (next: ClientGardenData, message: string) => {
    setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/client-garden", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Changes could not be saved.");
      setData(body); setNotice(message);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Changes could not be saved.");
    } finally { setSaving(false); }
  }, []);

  const metrics = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return {
      leads: data.leads.filter((item) => item.status !== "Not now").length,
      followUps: data.leads.filter((item) => item.followUpDate && item.followUpDate <= today && item.status !== "Enrolled" && item.status !== "Not now").length,
      calls: data.leads.filter((item) => item.status === "Call booked").length,
      clients: data.leads.filter((item) => item.status === "Enrolled").length,
      revenue: data.leads.filter((item) => item.status === "Enrolled").reduce((sum, item) => sum + item.value, 0),
      planned: data.posts.filter((item) => item.status !== "Published").length,
    };
  }, [data]);

  const addLead = (event: React.FormEvent) => {
    event.preventDefault();
    if (!lead.name.trim()) return setError("Add the person's name before saving.");
    void save({ ...data, leads: [lead, ...data.leads] }, `${lead.name} was added to your lead garden.`);
    setLead(blankLead());
  };

  const updateLead = (id: string, changes: Partial<ClientLead>) => {
    void save({ ...data, leads: data.leads.map((item) => item.id === id ? { ...item, ...changes } : item) }, "Lead updated.");
  };

  const deleteLead = (id: string) => {
    if (!window.confirm("Remove this lead from your dashboard?")) return;
    void save({ ...data, leads: data.leads.filter((item) => item.id !== id) }, "Lead removed.");
  };

  const addPost = (event: React.FormEvent) => {
    event.preventDefault();
    if (!post.topic.trim()) return setError("Add a post topic before saving.");
    void save({ ...data, posts: [post, ...data.posts] }, "Social post added to your planner.");
    setPost(blankPost());
  };

  const updatePost = (id: string, changes: Partial<SocialPost>) => {
    void save({ ...data, posts: data.posts.map((item) => item.id === id ? { ...item, ...changes } : item) }, "Post updated.");
  };

  const deletePost = (id: string) => {
    if (!window.confirm("Remove this post from your planner?")) return;
    void save({ ...data, posts: data.posts.filter((item) => item.id !== id) }, "Post removed.");
  };

  if (loading) return <section className="client-garden-shell"><p>Opening your private client garden…</p></section>;

  return (
    <section className="client-garden-shell">
      <div className="client-garden-tabs" role="tablist" aria-label="Client Garden sections">
        {["overview", "leads", "content", "replies", "find clients"].map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} className={tab === name ? "active" : ""} onClick={() => setTab(name)}>{name}</button>)}
      </div>
      {error ? <p className="form-error dashboard-notice" role="alert">{error}</p> : null}
      {notice ? <p className="form-success dashboard-notice" role="status">{notice}</p> : null}
      {saving ? <p className="save-indicator" role="status">Saving…</p> : null}

      {tab === "overview" ? <div>
        <div className="metric-grid">
          <article><span>Active leads</span><strong>{metrics.leads}</strong></article>
          <article><span>Follow-ups due</span><strong>{metrics.followUps}</strong></article>
          <article><span>Calls booked</span><strong>{metrics.calls}</strong></article>
          <article><span>Enrolled clients</span><strong>{metrics.clients}</strong></article>
          <article><span>Recorded revenue</span><strong>${metrics.revenue.toLocaleString()}</strong></article>
          <article><span>Posts planned</span><strong>{metrics.planned}</strong></article>
        </div>
        <div className="dashboard-two-column">
          <article className="dashboard-panel"><p className="eyebrow">Today</p><h2>Your next best actions</h2><ol><li>Follow up with {metrics.followUps || "your warmest"} lead{metrics.followUps === 1 ? "" : "s"}.</li><li>Publish one useful tip for neurodivergent families.</li><li>Invite one interested person to a free wellness call.</li><li>Reply warmly to every genuine comment and message.</li></ol></article>
          <article className="dashboard-panel"><p className="eyebrow">Monthly target</p><h2>$10,000 growth tracker</h2><p className="revenue-progress"><span style={{ width: `${Math.min(100, metrics.revenue / 100)}%` }} /></p><p><strong>${metrics.revenue.toLocaleString()}</strong> recorded of your $10,000 gross monthly target.</p><p className="fine-print">Enter the sale amount when a lead becomes enrolled. This is a planning total, not accounting or tax reporting.</p></article>
        </div>
      </div> : null}

      {tab === "leads" ? <div className="dashboard-two-column align-start">
        <form className="dashboard-panel dashboard-form" onSubmit={addLead}>
          <p className="eyebrow">Plant a new lead</p><h2>Add an interested person</h2>
          <label>Name<input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} required /></label>
          <label>Email or contact detail<input value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} /></label>
          <label>Where they found you<input value={lead.source} onChange={(e) => setLead({ ...lead, source: e.target.value })} /></label>
          <label>Program or goal<input value={lead.interest} onChange={(e) => setLead({ ...lead, interest: e.target.value })} /></label>
          <label>Follow-up date<input type="date" value={lead.followUpDate} onChange={(e) => setLead({ ...lead, followUpDate: e.target.value })} /></label>
          <label>Potential or collected sale value<input type="number" min="0" step="1" value={lead.value} onChange={(e) => setLead({ ...lead, value: Number(e.target.value) })} /></label>
          <label>Notes<textarea value={lead.notes} onChange={(e) => setLead({ ...lead, notes: e.target.value })} /></label>
          <button className="button button-primary" disabled={saving}>Add lead</button>
        </form>
        <div className="dashboard-list"><p className="eyebrow">Your pipeline</p><h2>Leads and follow-ups</h2>
          {data.leads.length ? data.leads.map((item) => <article className="lead-card" key={item.id}>
            <div><h3>{item.name}</h3><p>{item.interest || "General interest"}</p><small>{item.source || "Source not recorded"}{item.followUpDate ? ` · Follow up ${item.followUpDate}` : ""}</small></div>
            <label>Status<select value={item.status} onChange={(e) => updateLead(item.id, { status: e.target.value as LeadStatus })}>{["New", "Contacted", "Call booked", "Enrolled", "Not now"].map((status) => <option key={status}>{status}</option>)}</select></label>
            <label>Value<input type="number" min="0" value={item.value} onChange={(e) => updateLead(item.id, { value: Number(e.target.value) })} /></label>
            {item.email ? <a href={item.email.includes("@") ? `mailto:${item.email}` : undefined}>{item.email}</a> : null}
            {item.notes ? <p className="lead-notes">{item.notes}</p> : null}
            <button className="text-danger" type="button" onClick={() => deleteLead(item.id)}>Remove</button>
          </article>) : <div className="empty-state"><span>🌱</span><h3>No leads yet</h3><p>Add the next person who comments, requests your guide or asks about coaching.</p></div>}
        </div>
      </div> : null}

      {tab === "content" ? <div className="dashboard-two-column align-start">
        <form className="dashboard-panel dashboard-form" onSubmit={addPost}><p className="eyebrow">Content planner</p><h2>Plan a social post</h2>
          <label>Platform<select value={post.platform} onChange={(e) => setPost({ ...post, platform: e.target.value })}><option>Facebook &amp; Instagram</option><option>Facebook</option><option>Instagram</option><option>Pinterest</option><option>Email</option></select></label>
          <label>Publish date<input type="date" value={post.publishDate} onChange={(e) => setPost({ ...post, publishDate: e.target.value })} /></label>
          <label>Topic<input value={post.topic} onChange={(e) => setPost({ ...post, topic: e.target.value })} placeholder="Example: A calmer three-step bedtime routine" required /></label>
          <label>Caption<textarea rows={8} value={post.caption} onChange={(e) => setPost({ ...post, caption: e.target.value })} placeholder="Write or paste your caption here…" /></label>
          <button className="button button-primary" disabled={saving}>Add to planner</button>
        </form>
        <div className="dashboard-list"><p className="eyebrow">Upcoming</p><h2>Your content</h2>
          {data.posts.length ? data.posts.map((item) => <article className="post-card" key={item.id}><div><span>{item.platform}</span><h3>{item.topic}</h3><small>{item.publishDate || "No date selected"}</small></div><select aria-label={`Status for ${item.topic}`} value={item.status} onChange={(e) => updatePost(item.id, { status: e.target.value as SocialStatus })}>{["Idea", "Draft", "Scheduled", "Published"].map((status) => <option key={status}>{status}</option>)}</select>{item.caption ? <p>{item.caption}</p> : null}<div className="card-actions">{item.caption ? <button type="button" onClick={() => void writeClipboard(item.caption).then(() => setNotice("Caption copied."))}>Copy caption</button> : null}<button className="text-danger" type="button" onClick={() => deletePost(item.id)}>Remove</button></div></article>) : <div className="empty-state"><span>📅</span><h3>Your planner is ready</h3><p>Add Monday's practical tip or Friday's program invitation.</p></div>}
        </div>
      </div> : null}

      {tab === "replies" ? <div><div className="dashboard-section-heading"><p className="eyebrow">Reply helper</p><h2>Warm replies that sound like you</h2><p>Replace the words in brackets, review the message and copy it into Facebook, Instagram or email.</p></div><div className="template-grid">{replyTemplates.map((template) => <article className="dashboard-panel" key={template.title}><h3>{template.title}</h3><p>{template.text}</p><button className="button button-secondary" type="button" onClick={() => void writeClipboard(template.text).then(() => setNotice(`${template.title} reply copied.`))}>Copy reply</button></article>)}</div></div> : null}

      {tab === "find clients" ? <div><div className="dashboard-section-heading"><p className="eyebrow">Client finder</p><h2>Where to start genuine conversations</h2><p>Help first, follow community rules and only invite people to your services when it naturally fits.</p></div><div className="opportunity-grid">
        <article className="dashboard-panel"><h3>Neurodivergent parent communities</h3><p>Look for public Facebook groups, homeschool groups and local parent organizations where practical routine support is welcomed.</p><strong>Action: Answer two questions helpfully this week.</strong></article>
        <article className="dashboard-panel"><h3>Homeschool communities</h3><p>Share family routines, garden-to-table activities and simple meal-planning education with local and online homeschool families.</p><strong>Action: Offer one free mini-workshop or printable.</strong></article>
        <article className="dashboard-panel"><h3>Aligned partnerships</h3><p>Connect with gyms, farm stores, community centers, parent educators and wellness businesses serving the same families.</p><strong>Action: Contact three possible partners.</strong></article>
        <article className="dashboard-panel"><h3>Your warm network</h3><p>Former coworkers, relatives, friends and existing followers may know someone who wants practical family wellness support.</p><strong>Action: Start five personal, no-pressure conversations.</strong></article>
      </div><aside className="finder-boundary"><strong>Good outreach builds trust.</strong> Do not scrape private information, add people to email lists without permission, spam groups or pretend an automated message is personal.</aside></div> : null}
    </section>
  );
}
