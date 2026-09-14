'use client'
import AppNav from '../../components/AppNav'
import { HeartPulse, Save, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

type V = {
  date: string
  bp: string
  hr: string
  spo2: string
  temp: string
  sugar: string
  weight: string
}

export default function Page() {
  const [form, setForm] = useState<V>({
    date: new Date().toISOString().slice(0, 10),
    bp: '120/80',
    hr: '72',
    spo2: '98',
    temp: '98.6',
    sugar: '95',
    weight: '65',
  })
  const [rows, setRows] = useState<V[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => setRows(JSON.parse(localStorage.getItem('docit_vitals') || '[]')), [])

  const u = (k: keyof V, v: string) => setForm({ ...form, [k]: v })

  const save = () => {
    const next = [form, ...rows].slice(0, 8)
    setRows(next)
    localStorage.setItem('docit_vitals', JSON.stringify(next))
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <>
      <AppNav />
      <main className="main">
        <div className="eyebrow">Health snapshot</div>
        <h1 className="h1">Vitals Vault</h1>
        <p className="sub">
          Enter a quick set of vitals and keep the latest values visible.
          This is a prototype, not a medical decision tool.
        </p>

        <div className="grid grid-2" style={{ marginTop: 24 }}>
          <div className="card">
            <div className="icon-box">
              <HeartPulse size={20} />
            </div>
            <div className="section-head">
              <h2>New reading</h2>
            </div>
            <div className="form">
              <div className="field">
                <label>Date</label>
                <input type="date" value={form.date} onChange={e => u('date', e.target.value)} />
              </div>
              <div className="row">
                <div className="field">
                  <label>Blood pressure</label>
                  <input value={form.bp} onChange={e => u('bp', e.target.value)} placeholder="120/80" />
                </div>
                <div className="field">
                  <label>Heart rate (bpm)</label>
                  <input value={form.hr} onChange={e => u('hr', e.target.value)} placeholder="72" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>SpO₂ (%)</label>
                  <input value={form.spo2} onChange={e => u('spo2', e.target.value)} placeholder="98" />
                </div>
                <div className="field">
                  <label>Temperature (°F)</label>
                  <input value={form.temp} onChange={e => u('temp', e.target.value)} placeholder="98.6" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Blood sugar (mg/dL)</label>
                  <input value={form.sugar} onChange={e => u('sugar', e.target.value)} placeholder="95" />
                </div>
                <div className="field">
                  <label>Weight (kg)</label>
                  <input value={form.weight} onChange={e => u('weight', e.target.value)} placeholder="65" />
                </div>
              </div>
              <button className="btn btn-primary" onClick={save}>
                <Save size={17} />
                Save reading
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Latest vitals</div>
            <div className="muted" style={{ margin: '4px 0 14px' }}>Date → value</div>
            {rows.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>BP</th>
                    <th>HR</th>
                    <th>SpO₂</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td>{r.date}</td>
                      <td>{r.bp}</td>
                      <td>{r.hr}</td>
                      <td>{r.spo2}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty">No previous readings in this demo. Save your first set above.</div>
            )}
          </div>
        </div>

        {saved && <div className="toast">Vitals saved.</div>}

        <div className="card" style={{ marginTop: 18, background: 'var(--gold-soft)' }}>
          <b>
            <Plus size={16} style={{ verticalAlign: '-3px' }} /> Demo note:
          </b>
          <span className="muted"> backend can later add timestamps, database history, trends and alerts.</span>
        </div>
      </main>
    </>
  )
}
