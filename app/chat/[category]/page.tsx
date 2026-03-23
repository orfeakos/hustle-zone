'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import ChatWindow from '@/components/ChatWindow'
import Link from 'next/link'

const CATS: Record<string, { emoji: string; title: string; color: string; desc: string; tags: string[] }> = {
  freelancing:  { emoji:'💸', title:'FREELANCING',        color:'#7B2FFF', desc:'Fiverr, Upwork, coding, writing.', tags:['#fiverr','#upwork','#remote','#coding'] },
  crypto:       { emoji:'⭐', title:'CRYPTO & TRADING',   color:'#00E676', desc:'Memecoins, DeFi, pump.fun plays.', tags:['#solana','#defi','#memecoins'] },
  content:      { emoji:'🎥', title:'CONTENT CREATION',   color:'#FF2D2D', desc:'TikTok, YouTube, Instagram.',      tags:['#tiktok','#youtube','#reels'] },
  dropshipping: { emoji:'📦', title:'DROPSHIPPING',       color:'#0066FF', desc:'Shopify, winning products, ads.',  tags:['#shopify','#aliexpress','#ecom'] },
  affiliate:    { emoji:'🔗', title:'AFFILIATE',          color:'#FF6B00', desc:'Amazon, ClickBank, niche sites.',  tags:['#amazon','#seo','#passive'] },
  design:       { emoji:'🎨', title:'DESIGN & UI/UX',     color:'#FF3DAA', desc:'Figma, logos, branding.',          tags:['#figma','#branding','#logos'] },
  gaming:       { emoji:'🎮', title:'GAMING & STREAMING', color:'#FFE000', desc:'Twitch, esports, YouTube gaming.', tags:['#twitch','#valorant','#streaming'] },
  saas:         { emoji:'⚙️', title:'MICRO SAAS & AI',    color:'#00FFF5', desc:'Build apps, sell subscriptions.',  tags:['#saas','#nocode','#ai'] },
}

export default function ChatPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const params = useParams()
  const category = params.category as string
  const cat = CATS[category]

  useEffect(() => {
    if (isLoaded && !user) router.push('/')
    if (!cat) router.push('/')
  }, [isLoaded, user])

  if (!isLoaded || !user || !cat) return (
    <div style={{minHeight:'100vh',background:'#111',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFE000',fontFamily:'Impact,sans-serif',fontSize:'2rem',letterSpacing:'3px'}}>
      LOADING...
    </div>
  )

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',background:'#111'}}>
      <nav style={{display:'flex',alignItems:'center',gap:'14px',padding:'12px 20px',background:'#111',borderBottom:'4px solid #FFE000',position:'sticky',top:0,zIndex:100}}>
        <Link href="/" style={{fontFamily:'Impact,sans-serif',fontSize:'1rem',letterSpacing:'1.5px',padding:'7px 18px',borderRadius:'999px',border:'2.5px solid #FFE000',color:'#FFE000',textDecoration:'none'}}>← BACK</Link>
        <span style={{fontFamily:'Impact,sans-serif',fontSize:'1.5rem',letterSpacing:'2px',color:'#FFE000',flex:1}}>{cat.emoji} {cat.title}</span>
        <Link href="/" style={{fontFamily:'Impact,sans-serif',fontSize:'1.4rem',letterSpacing:'3px',color:'#FFE000',textDecoration:'none',textShadow:'2px 2px 0 #FF2D2D'}}>HUSTLE<span style={{color:'#fff'}}>.ZONE</span></Link>
      </nav>
      <div style={{flex:1,overflow:'hidden'}}>
        <ChatWindow category={category} categoryData={cat} />
      </div>
    </div>
  )
}