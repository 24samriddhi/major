'use client'
import Link from 'next/link'
import AppNav from '../../components/AppNav'
import { CalendarDays, FileUp, HeartPulse, ShieldCheck, UserRound, ArrowRight, CircleCheck } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user } = useUser()
  const [docs, setDocs] = useState<string[]>([])
  const [booked, setBooked] = useState('No upcoming booking')

  useEffect(() => {
    setDocs(
      JSON.parse(localStorage.getItem('docit_docs') || '[]').map(
        (x: any) => x.name
      )
    )
    const b = localStorage.getItem('docit_booking')
    if (b) {
      const parsed = JSON.parse(b)
      setBooked(`${parsed.service} · ${parsed.date} · ${parsed.time}`)
    }
  }, [])

  return (
    <>
      <AppNav />
      <main className="main">
        <div className="hero">
          <div>
            <div className="eyebrow">Your care workspace</div>
            <h1 className="h1">Good to see you, {user?.firstName || 'there'}.</h1>
            <p className="sub">
              A simple front-end prototype for family-led care: profile,
              health vitals, medical records and service booking in one
              calm space.
            </p>
          </div>
          <Link href="/booking" className="btn btn-primary">
            <CalendarDays size={17} />
            Book care
          </Link>
        </div>

        <div className="grid grid-3">
          <div className="card">
            <div className="icon-box">
              <HeartPulse size={20} />
            </div>
            <div className="card-title" style={{ marginTop: 16 }}>
              Vitals Vault
            </div>
            <div className="muted">Latest quick-check</div>
            <div className="metric">
              120/80 <small>mmHg</small>
            </div>
          </div>

          <div className="card">
            <div className="icon-box">
              <FileUp size={20} />
            </div>
            <div className="card-title" style={{ marginTop: 16 }}>
              Medical Records
            </div>
            <div className="muted">Files saved in this demo</div>
            <div className="metric">
              {docs.length}
              <small> documents</small>
            </div>
          </div>

          <div className="card">
            <div className="icon-box">
              <ShieldCheck size={20} />
            </div>
            <div className="card-title" style={{ marginTop: 16 }}>
              Care connection
            </div>
            <div className="muted">Authentication</div>
            <div className="metric" style={{ fontSize: 20, marginTop: 16 }}>
              Protected with Clerk
            </div>
          </div>
        </div>

        <div className="section-head">
          <h2>Today's care overview</h2>
          <Link href="/profile" className="btn btn-secondary">
            Open profile <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <div className="card-title">Upcoming healthcare booking</div>
            <div className="muted" style={{ margin: '6px 0 16px' }}>
              {booked}
            </div>
            <Link href="/booking" className="btn btn-gold">
              Manage booking
            </Link>
          </div>

          <div className="card">
            <div className="card-title">Quick actions</div>
            <div className="list">
              <Link href="/vitals" className="list-item">
                <span>
                  <HeartPulse size={17} /> <b>Update vitals</b>
                </span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/documents" className="list-item">
                <span>
                  <FileUp size={17} /> <b>Upload a medical record</b>
                </span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/profile" className="list-item">
                <span>
                  <UserRound size={17} /> <b>Complete family details</b>
                </span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 18, background: 'var(--primary-soft)' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <CircleCheck size={20} color="#1c6b59" />
            <div>
              <b>Demo-ready flow</b>
              <div className="muted" style={{ marginTop: 4 }}>
                Sign in → dashboard → add vitals → upload a record → book a
                service. Backend/database/OCR can be connected later without
                changing the core UI.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
