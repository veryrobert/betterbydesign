'use client'

import { useEffect, useState } from 'react'

const PASSWORD = process.env.NEXT_PUBLIC_SITE_PASSWORD

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!PASSWORD) { setAuthed(true); return }
    setAuthed(sessionStorage.getItem('bbd_auth') === '1')
  }, [])

  if (authed === null) return null
  if (authed) return <>{children}</>

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === PASSWORD) {
      sessionStorage.setItem('bbd_auth', '1')
      setAuthed(true)
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div className="fixed inset-0 bg-bbd-black flex items-center justify-center" style={{ zIndex: 9999 }}>
      <form onSubmit={submit} className="flex flex-col gap-4 w-full max-w-xs px-6">
        <p className="text-white font-semibold" style={{ fontSize: '18px' }}>Better By Design 2026</p>
        <input
          type="password"
          autoFocus
          placeholder="Password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          className="bg-white/10 text-white placeholder-white/40 px-4 py-3 outline-none border border-white/20 focus:border-white/60 transition-colors"
          style={{ fontSize: '16px' }}
        />
        {error && (
          <p className="text-red-400" style={{ fontSize: '13px' }}>Incorrect password</p>
        )}
        <button
          type="submit"
          className="bg-white text-bbd-black font-semibold py-3 hover:bg-white/90 transition-colors"
          style={{ fontSize: '15px' }}
        >
          Enter
        </button>
      </form>
    </div>
  )
}
