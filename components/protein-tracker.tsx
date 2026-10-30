"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Meal = "Breakfast" | "Lunch" | "Dinner" | "Snack";
type ProteinEntry = { id: string; food: string; meal: Meal; grams: number };
type DayRecord = { goal: number; entries: ProteinEntry[] };
type ProteinRecords = Record<string, DayRecord>;

const STORAGE_KEY = "nourished-garden-protein-tracker-v1";

function localDateKey(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function shortDate(dateKey: string) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(
    new Date(`${dateKey}T12:00:00`),
  );
}

export function ProteinTracker() {
  const [records, setRecords] = useState<ProteinRecords>({});
  const [selectedDate, setSelectedDate] = useState(localDateKey);
  const [goal, setGoal] = useState(100);
  const [food, setFood] = useState("");
  const [grams, setGrams] = useState("");
  const [meal, setMeal] = useState<Meal>("Breakfast");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? (JSON.parse(saved) as ProteinRecords) : {};
      setRecords(parsed);
      setGoal(parsed[localDateKey()]?.goal ?? 100);
    } catch {
      setRecords({});
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [loaded, records]);

  useEffect(() => {
    setGoal(records[selectedDate]?.goal ?? 100);
  }, [records, selectedDate]);

  const day = records[selectedDate] ?? { goal, entries: [] };
  const total = day.entries.reduce((sum, entry) => sum + entry.grams, 0);
  const remaining = Math.max(goal - total, 0);
  const percent = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;

  const history = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      const key = localDateKey(date);
      const record = records[key];
      const dayTotal = record?.entries.reduce((sum, entry) => sum + entry.grams, 0) ?? 0;
      return { key, total: dayTotal, goal: record?.goal ?? 100 };
    });
  }, [records]);

  function saveGoal(value: number) {
    const safeGoal = Math.min(Math.max(Math.round(value || 0), 1), 400);
    setGoal(safeGoal);
    setRecords((current) => ({
      ...current,
      [selectedDate]: { goal: safeGoal, entries: current[selectedDate]?.entries ?? [] },
    }));
  }

  function addEntry(event: FormEvent) {
    event.preventDefault();
    const protein = Number(grams);
    if (!food.trim() || !Number.isFinite(protein) || protein <= 0) return;
    const entry: ProteinEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      food: food.trim(),
      meal,
      grams: Math.min(Math.round(protein * 10) / 10, 300),
    };
    setRecords((current) => ({
      ...current,
      [selectedDate]: {
        goal,
        entries: [...(current[selectedDate]?.entries ?? []), entry],
      },
    }));
    setFood("");
    setGrams("");
  }

  function removeEntry(id: string) {
    setRecords((current) => ({
      ...current,
      [selectedDate]: {
        goal,
        entries: (current[selectedDate]?.entries ?? []).filter((entry) => entry.id !== id),
      },
    }));
  }

  return (
    <section className="protein-tracker-section" aria-labelledby="protein-tracker-title">
      <div className="protein-tracker-heading">
        <div>
          <p className="eyebrow">Daily nourishment tool</p>
          <h2 id="protein-tracker-title">Protein Tracker</h2>
          <p>Set your goal, log protein by meal, and watch your progress grow throughout the day.</p>
        </div>
        <span aria-hidden="true">🌻</span>
      </div>

      <div className="protein-summary-grid">
        <div className="protein-progress-card">
          <div className="protein-date-row">
            <label htmlFor="protein-date">Date</label>
            <input id="protein-date" type="date" value={selectedDate} max={localDateKey()} onChange={(event) => setSelectedDate(event.target.value)} />
          </div>
          <div className="protein-total"><strong>{total.toFixed(total % 1 ? 1 : 0)}g</strong><span>of {goal}g</span></div>
          <div className="protein-progress-track" aria-label={`${Math.round(percent)} percent of protein goal logged`}>
            <span style={{ width: `${percent}%` }} />
          </div>
          <p>{remaining > 0 ? `${remaining.toFixed(remaining % 1 ? 1 : 0)}g remaining today` : "Daily goal reached!"}</p>
          <div className="protein-goal-control">
            <label htmlFor="protein-goal">Daily goal</label>
            <input id="protein-goal" type="number" min="1" max="400" value={goal} onChange={(event) => setGoal(Number(event.target.value))} onBlur={() => saveGoal(goal)} />
            <span>grams</span>
            <button type="button" onClick={() => saveGoal(goal)}>Save goal</button>
          </div>
        </div>

        <form className="protein-entry-form" onSubmit={addEntry}>
          <h3>Log protein</h3>
          <label htmlFor="protein-food">Food or meal</label>
          <input id="protein-food" value={food} onChange={(event) => setFood(event.target.value)} placeholder="Example: Greek yogurt" required />
          <div className="protein-form-row">
            <div><label htmlFor="protein-meal">Meal</label><select id="protein-meal" value={meal} onChange={(event) => setMeal(event.target.value as Meal)}>{(["Breakfast", "Lunch", "Dinner", "Snack"] as Meal[]).map((option) => <option key={option}>{option}</option>)}</select></div>
            <div><label htmlFor="protein-grams">Protein (g)</label><input id="protein-grams" type="number" inputMode="decimal" min="0.1" max="300" step="0.1" value={grams} onChange={(event) => setGrams(event.target.value)} placeholder="25" required /></div>
          </div>
          <button className="button button-primary" type="submit">Add to today</button>
        </form>
      </div>

      <div className="protein-log-grid">
        <div className="protein-day-log">
          <h3>{shortDate(selectedDate)} entries</h3>
          {day.entries.length ? (
            <ul>{day.entries.map((entry) => <li key={entry.id}><span><strong>{entry.food}</strong><small>{entry.meal}</small></span><b>{entry.grams}g</b><button type="button" aria-label={`Remove ${entry.food}`} onClick={() => removeEntry(entry.id)}>×</button></li>)}</ul>
          ) : <p className="protein-empty">Nothing logged yet. Add your first food or meal above.</p>}
        </div>
        <div className="protein-history">
          <h3>Last 7 days</h3>
          <ul>{history.map((item) => <li key={item.key}><span>{shortDate(item.key)}</span><div><i style={{ width: `${Math.min((item.total / item.goal) * 100, 100)}%` }} /></div><strong>{item.total}g</strong></li>)}</ul>
        </div>
      </div>
      <p className="protein-tracker-note">Your entries are saved on this device. Protein amounts and needs vary. This tracker is educational and is not individualized nutrition or medical advice; ask a qualified professional about the right goal for you.</p>
    </section>
  );
}
