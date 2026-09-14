'use client'
import AppNav from '../../components/AppNav'
import { CalendarDays, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

type B = { service: string; date: string; time: string; reason: string; status: string }

export default function Page() {
  const [b, setB] = useState<B>({
    service: 'Doctor Consultation',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
    reason: 'Routine checkup',
    status: 'Confirmed',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const x = localStorage.getItem('docit_booking')
    if (x) setB(JSON.parse(x))
  }, [])

  const save = () => {
    localStorage.setItem('docit_booking', JSON.stringify(b))
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  const u = (k: keyof B, v: string) => setB({ ...b, [k]: v })

  return (
    <>
      <AppNav />
      <main className="main">
        <div className="eyebrow">Care services</div>
        <h1 className="h1">Healthcare Booking</h1>
        <p className="sub">
          Select a service, choose a date and time, and confirm. The
          booking is stored locally for this front-end prototype.
        </p>

        <div className="grid grid-2" style={{ marginTop: 24 }}>
          <div className="card">
            <div className="icon-box">
              <CalendarDays size={20} />
            </div>
            <div className="section-head">
              <h2>Book healthcare service</h2>
            </div>
            <div className="form">
              <div className="field">
                <label>Select service</label>
                <select value={b.service} onChange={e => u('service', e.target.value)}>
                  <option>Doctor Consultation</option>
                  <option>Nurse Visit</option>
                  <option>Healthcare Assistant</option>
                  <option>Routine Checkup</option>
                </select>
              </div>
              <div className="row">
                <div className="field">
                  <label>Date</label>
                  <input type="date" value={b.date} onChange={e => u('date', e.target.value)} />
                </div>
                <div className="field">
                  <label>Time</label>
                  <input type="time" value={b.time} onChange={e => u('time', e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label>Reason</label>
                <textarea value={b.reason} onChange={e => u('reason', e.target.value)} placeholder="Reason for visit" />
              </div>
              <button className="btn btn-primary" onClick={save}>BOOK NOW</button>
            </div>
          </div>

          <div className="card">
            <div className="card-title">After booking</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
              <CheckCircle2 color="#1c6b59" />
              <div>
                <b>Booking confirmed</b>
                <div className="muted" style={{ marginTop: 4 }}>
                  Service: {b.service}<br />
                  Date: {b.date}<br />
                  Time: {b.time}<br />
                  Status: {b.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        {saved && <div className="toast">Booking confirmed for the prototype.</div>}
      </main>
    </>
  )
}
