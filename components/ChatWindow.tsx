'use client'
import { useEffect, useState, useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'

interface Message {
  id: string
  created_at: string
  user_id: string
  username: string
  category: string
  text: string
}

interface CategoryData {
  emoji: string
  title: string
  color: string
  desc: string
  tags: string[]
}

export default function ChatWindow({ category, categoryData }: { category: string, categoryData: CategoryData }) {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // get username
  useEffect(() => {
    if (!user) return
    supabase.from('profiles')
      .select('username')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => { if (data) setUsername(data.username) })
  }, [user])

  // load messages
  useEffect(() => {
    supabase.from('messages')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: true })
      .limit(100)
      .then(({ data }) => { if (data) setMessages(data) })
  }, [category])

  // realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`chat-${category}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `category=eq.${category}`
      }, payload => {
        setMessages(prev => [...prev, payload.new as Message])
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [category])

  // scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!text.trim() || !username) return
    const msg = { user_id: user!.id, username, category, text: text.trim() }
    setText('')
    await supabase.from('messages').insert(msg)
  }

  function formatTime(ts: string) {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>

      {/* BANNER */}
      <div style={{padding:'24px 20px 18px',background:'#111',borderBottom:`4px solid ${categoryData.color}`}}>
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <span style={{fontSize:'3.5rem'}}>{categoryData.emoji}</span>
          <div>
            <h1 style={{fontFamily:'Impact,sans-serif',fontSize:'2rem',letterSpacing:'3px',color:'#FFE000',textShadow:`3px 3px 0 ${categoryData.color}`,lineHeight:'1'}}>{categoryData.title}</h1>
            <p style={{fontSize:'.7rem',fontWeight:'700',color:'rgba(255,254,240,.5)',marginTop:'5px',fontFamily:'monospace'}}>{categoryData.desc}</p>
          </div>
        </div>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginTop:'12px'}}>
          {categoryData.tags.map(t => (
            <span key={t} style={{fontFamily:'monospace',fontSize:'.6rem',fontWeight:'700',padding:'3px 10px',borderRadius:'999px',background:'rgba(255,224,0,.08)',border:'1.5px solid rgba(255,224,0,.2)',color:'rgba(255,224,0,.6)'}}>{t}</span>
          ))}
        </div>
      </div>

      {/* MESSAGES */}
      <div style={{flex:1,overflowY:'auto',padding:'16px',display:'flex',flexDirection:'column',gap:'12px',background:'#FFE000',backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.08) 2px,transparent 2px)',backgroundSize:'22px 22px'}}>
        {messages.length === 0 && (
          <div style={{textAlign:'center',padding:'60px 20px',fontFamily:'monospace',fontSize:'.85rem',fontWeight:'700',color:'rgba(0,0,0,.3)'}}>
            No messages yet. Be the first! 👋
          </div>
        )}
        {messages.map(m => {
          const isOwn = m.user_id === user?.id
          return (
            <div key={m.id} style={{display:'flex',gap:'10px',flexDirection:isOwn?'row-reverse':'row',alignItems:'flex-end'}}>
              <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#111',border:'2.5px solid #111',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0,color:'#FFE000',fontWeight:'700',fontFamily:'monospace'}}>
                {m.username[0].toUpperCase()}
              </div>
              <div style={{maxWidth:'72%'}}>
                <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px',flexDirection:isOwn?'row-reverse':'row'}}>
                  <span style={{fontFamily:'monospace',fontSize:'.65rem',fontWeight:'700',color:'rgba(0,0,0,.5)'}}>{m.username}</span>
                  <span style={{fontFamily:'monospace',fontSize:'.58rem',color:'rgba(0,0,0,.3)'}}>{formatTime(m.created_at)}</span>
                </div>
                <div style={{background:isOwn?'#111':'#FFFEF0',color:isOwn?'#FFE000':'#111',border:'2.5px solid #111',borderRadius:isOwn?'18px 18px 4px 18px':'18px 18px 18px 4px',padding:'10px 14px',fontFamily:'monospace',fontWeight:'700',fontSize:'.85rem',lineHeight:'1.45',boxShadow:'3px 3px 0 rgba(0,0,0,0.15)',wordBreak:'break-word'}}>
                  {m.text}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{padding:'14px 16px',background:'#111',borderTop:'4px solid #FFE000',display:'flex',gap:'10px',alignItems:'center'}}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={username ? `Message as ${username}...` : 'Loading...'}
          style={{flex:1,background:'#FFE000',border:'2.5px solid #FFE000',borderRadius:'999px',padding:'12px 20px',fontFamily:'monospace',fontWeight:'700',fontSize:'.85rem',outline:'none',color:'#111'}}
        />
        <button
          onClick={sendMessage}
          style={{width:'48px',height:'48px',borderRadius:'50%',background:'#FFE000',border:'3px solid #111',fontSize:'1.3rem',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'3px 3px 0 #111'}}
        >➤</button>
      </div>
    </div>
  )
}