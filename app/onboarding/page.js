'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Onboarding() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoaded || !user) return
    supabase.from('profiles')
      .select('username')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.username) router.push('/')
      })
  }, [isLoaded, user])

  async function handleSubmit() {
    if (!username.trim() || username.length < 3) {
      setError('Must be at least 3 characters')
      return
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Only letters, numbers and underscores')
      return
    }
    setLoading(true)
    const { error: dbError } = await supabase
      .from('profiles')
      .upsert({ user_id: user.id, username: username.trim().toLowerCase() })
    if (dbError?.code === '23505') {
      setError('That username is taken, try another')
      setLoading(false)
      return
    }
    router.push('/')
  }

  return (
    <div style={{minHeight:'100vh',background:'#FFE000',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',fontFamily:'sans-serif'}}>
      <div style={{background:'#111',border:'4px solid #FFE000',borderRadius:'24px',padding:'40px 32px',maxWidth:'400px',width:'100%',boxShadow:'8px 8px 0 #FFB800',textAlign:'center'}}>
        <div style={{fontSize:'3rem',marginBottom:'12px'}}>👋</div>
        <h1 style={{fontFamily:'Impact,sans-serif',fontSize:'2rem',letterSpacing:'3px',color:'#FFE000',marginBottom:'8px'}}>PICK YOUR USERNAME</h1>
        <p style={{fontSize:'.8rem',color:'rgba(255,254,240,.5)',marginBottom:'28px',fontWeight:'700'}}>This is how the community will know you</p>
        <input
          value={username}
          onChange={e => { setUsername(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="e.g. hustle_king"
          maxLength={20}
          style={{width:'100%',background:'#FFE000',border:'3px solid #FFE000',borderRadius:'999px',padding:'12px 20px',fontWeight:'700',fontSize:'.9rem',outline:'none',marginBottom:'8px',color:'#111',boxSizing:'border-box'}}
        />
        {error && <p style={{fontSize:'.7rem',color:'#FF2D2D',fontWeight:'700',marginBottom:'12px'}}>{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{width:'100%',background:'#FF2D2D',color:'#fff',border:'3px solid #111',borderRadius:'999px',padding:'13px',fontFamily:'Impact,sans-serif',fontSize:'1.3rem',letterSpacing:'2px',cursor:'pointer',boxShadow:'4px 4px 0 #111',marginTop:'8px'}}
        >
          {loading ? 'SAVING...' : "LET'S GO 🔥"}
        </button>
      </div>
    </div>
  )
}