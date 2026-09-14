'use client'
import AppNav from '../../components/AppNav'
import { FileText, Upload, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

type D = { name: string; size: number; date: string; type: string }

export default function Page() {
  const [docs, setDocs] = useState<D[]>([])
  const [notice, setNotice] = useState('')

  useEffect(() => setDocs(JSON.parse(localStorage.getItem('docit_docs') || '[]')), [])

  const add = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const next = [
      ...files.map(f => ({ name: f.name, size: f.size, date: new Date().toLocaleString(), type: f.type })),
      ...docs,
    ]
    setDocs(next)
    localStorage.setItem('docit_docs', JSON.stringify(next))
    setNotice(`${files.length} file(s) added to the prototype list.`)
    setTimeout(() => setNotice(''), 2200)
    e.target.value = ''
  }

  const remove = (i: number) => {
    const next = docs.filter((_, x) => x !== i)
    setDocs(next)
    localStorage.setItem('docit_docs', JSON.stringify(next))
  }

  return (
    <>
      <AppNav />
      <main className="main">
        <div className="eyebrow">Medical records</div>
        <h1 className="h1">Document upload</h1>
        <p className="sub">
          Very basic for tomorrow&apos;s demo: PDF, JPG and PNG file names
          are shown here. No OCR and no server upload yet.
        </p>

        <div className="card" style={{ marginTop: 24 }}>
          <label className="drop">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              multiple
              onChange={add}
              hidden
            />
            <Upload size={28} style={{ marginBottom: 8 }} />
            <div style={{ fontWeight: 800 }}>Upload document</div>
            <div className="muted">PDF · JPG · PNG</div>
          </label>

          <div className="list" style={{ marginTop: 18 }}>
            {docs.length ? (
              docs.map((d, i) => (
                <div className="list-item" key={`${d.name}-${i}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="icon-box">
                      <FileText size={18} />
                    </div>
                    <div>
                      <b>{d.name}</b>
                      <div className="muted">{(d.size / 1024).toFixed(0)} KB · {d.date}</div>
                    </div>
                  </div>
                  <button className="btn btn-secondary" onClick={() => remove(i)} aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="empty">No documents yet. Upload a prescription, blood test or report for the demo.</div>
            )}
          </div>
        </div>

        {notice && <div className="toast">{notice}</div>}
      </main>
    </>
  )
}
