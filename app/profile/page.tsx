'use client'
import AppNav from '../../components/AppNav'
import { useUser } from '@clerk/nextjs'
import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'

type Profile = {
  name: string
  age: string
  gender: string
  phone: string
  emergency: string
  address: string
  type: 'Elderly' | 'General Public'
  caregiverName: string
  caregiverPhone: string
}

const blank: Profile = {
  name: '',
  age: '',
  gender: '',
  phone: '',
  emergency: '',
  address: '',
  type: 'Elderly',
  caregiverName: '',
  caregiverPhone: '',
}

export default function Page() {
  const { user } = useUser()
  const [p, setP] = useState<Profile>(blank)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const x = localStorage.getItem('docit_profile')
    setP(x ? JSON.parse(x) : { ...blank, name: user?.fullName || user?.firstName || '' })
  }, [user])

  const update = (k: keyof Profile, v: string) => setP({ ...p, [k]: v })

  const save = () => {
    localStorage.setItem('docit_profile', JSON.stringify(p))
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <>
      <AppNav />
      <main className="main">
        <div className="eyebrow">Account &amp; care details</div>
        <h1 className="h1">User registration &amp; profile</h1>
        <p className="sub">
          Keep the essential information simple. This demo stores form data
          in your browser only; connect it to your backend later.
        </p>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="form">
            <div className="row">
              <div className="field">
                <label>Name</label>
                <input value={p.name} onChange={e => update('name', e.target.value)} placeholder="Full name" />
              </div>
              <div className="field">
                <label>Age</label>
                <input type="number" value={p.age} onChange={e => update('age', e.target.value)} placeholder="Age" />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Gender</label>
                <select value={p.gender} onChange={e => update('gender', e.target.value)}>
                  <option value="">Select</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div className="field">
                <label>Phone</label>
                <input value={p.phone} onChange={e => update('phone', e.target.value)} placeholder="Phone number" />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Emergency contact</label>
                <input value={p.emergency} onChange={e => update('emergency', e.target.value)} placeholder="Name + phone" />
              </div>
              <div className="field">
                <label>User type</label>
                <select value={p.type} onChange={e => update('type', e.target.value as Profile['type'])}>
                  <option>Elderly</option>
                  <option>General Public</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label>Address</label>
              <textarea value={p.address} onChange={e => update('address', e.target.value)} placeholder="Home address" />
            </div>

            {p.type === 'Elderly' && (
              <div className="card" style={{ background: 'var(--card-soft)' }}>
                <div className="card-title">Elderly-specific</div>
                <div className="row" style={{ marginTop: 14 }}>
                  <div className="field">
                    <label>Family / caregiver name</label>
                    <input
                      value={p.caregiverName}
                      onChange={e => update('caregiverName', e.target.value)}
                      placeholder="Caregiver name"
                    />
                  </div>
                  <div className="field">
                    <label>Family / caregiver phone</label>
                    <input
                      value={p.caregiverPhone}
                      onChange={e => update('caregiverPhone', e.target.value)}
                      placeholder="Caregiver phone"
                    />
                  </div>
                </div>
              </div>
            )}

            <button className="btn btn-primary" onClick={save}>
              <Save size={17} />
              Save profile
            </button>
          </div>
        </div>

        {saved && <div className="toast">Profile saved for this demo.</div>}
      </main>
    </>
  )
}
