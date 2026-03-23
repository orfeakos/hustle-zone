'use client'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

const CATS = [
  { key:'freelancing',  emoji:'💸', title:'FREELANCING',        desc:'Fiverr, Upwork, coding, writing, editing.',        online:'1,204', color:'#7B2FFF', textColor:'#FFE000' },
  { key:'crypto',       emoji:'⭐', title:'CRYPTO & TRADING',   desc:'Memecoins, DeFi, pump.fun. High risk high reward.', online:'876',   color:'#00230F', textColor:'#00E676' },
  { key:'content',      emoji:'🎥', title:'CONTENT CREATION',   desc:'TikTok, YouTube, Instagram. Monetize yourself.',    online:'2,041', color:'#FF2D2D', textColor:'#fff'    },
  { key:'dropshipping', emoji:'📦', title:'DROPSHIPPING',       desc:'Shopify, winning products, TikTok ads.',            online:'543',   color:'#0044CC', textColor:'#FFE000' },
  { key:'affiliate',    emoji:'🔗', title:'AFFILIATE MARKETING',desc:'Amazon, ClickBank, niche sites. Earn while asleep.',online:'389',   color:'#FF6B00', textColor:'#111'    },
  { key:'design',       emoji:'🎨', title:'DESIGN & UI/UX',     desc:'Figma, logos, branding. Sell your aesthetics.',     online:'612',   color:'#FF3DAA', textColor:'#fff'    },
  { key:'gaming',       emoji:'🎮', title:'GAMING & STREAMING', desc:'Twitch, esports, YouTube. Playtime = pay time.',    online:'1,788', color:'#111',    textColor:'#FFE000' },
  { key:'saas',         emoji:'⚙️', title:'MICRO SAAS & AI',    desc:'Build tiny apps, sell subscriptions. Real money.',  online:'294',   color:'#003D3D', textColor:'#00FFF5' },
]

export default function Home() {
  const { isSignedIn } = useUser()

  return (
    <main style={{background:'#FFE000',minHeight:'100vh',fontFamily:'sans-serif'}}>

      {/* NAV */}
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 24px',background:'#111',borderBottom:'4px solid #FFE000',position:'sticky',top:0,zIndex:200}}>
        <span style={{fontFamily:'Impact,sans-serif',fontSize:'2rem',letterSpacing:'4px',color:'#FFE000',textShadow:'3px 3px 0 #FF2D2D'}}>HUSTLE<span style={{color:'#fff'}}>.ZONE</span></span>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <button style={{fontFamily:'Impact,sans-serif',fontSize:'1rem',letterSpacing:'2px',padding:'8px 22px',borderRadius:'999px',border:'2.5px solid #FFE000',background:'transparent',color:'#FFE000',cursor:'pointer'}}>LOGIN</button>
              </SignInButton>
              <SignInButton mode="modal">
                <button style={{fontFamily:'Impact,sans-serif',fontSize:'1rem',letterSpacing:'2px',padding:'8px 22px',borderRadius:'999px',border:'2.5px solid #FFE000',background:'#FFE000',color:'#111',cursor:'pointer',boxShadow:'3px 3px 0 #FF2D2D'}}>JOIN FREE ⚡</button>
              </SignInButton>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{background:'#FFE000',minHeight:'90vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'60px 24px 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.1) 2px,transparent 2px)',backgroundSize:'22px 22px',pointerEvents:'none'}}/>

        <div style={{background:'#111',color:'#00E676',fontFamily:'monospace',fontSize:'.72rem',fontWeight:'700',letterSpacing:'2px',padding:'7px 20px',borderRadius:'999px',marginBottom:'22px',border:'2.5px solid #00E676',position:'relative',zIndex:2}}>
          🟢 4,291 TEENS ONLINE RIGHT NOW
        </div>

        <h1 style={{fontFamily:'Impact,sans-serif',fontSize:'clamp(4rem,14vw,10rem)',lineHeight:.88,letterSpacing:'5px',color:'#111',position:'relative',zIndex:2,marginBottom:'0'}}>
          STOP <span style={{color:'#FF2D2D'}}>WAITING.</span><br/>
          <span style={{color:'#0066FF'}}>GET</span> PAID.
        </h1>

        <div style={{background:'#111',color:'#FFE000',fontSize:'clamp(.9rem,2.5vw,1.15rem)',fontWeight:'700',padding:'10px 26px',borderRadius:'10px',margin:'20px 0 30px',border:'3px solid #111',transform:'rotate(-1.5deg)',boxShadow:'5px 5px 0 #FF2D2D',position:'relative',zIndex:2}}>
          Pick your hustle. Join the community. Make moves. 🚀
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'12px',alignItems:'center',width:'100%',maxWidth:'360px',position:'relative',zIndex:2}}>
          <a href="#categories" style={{background:'#FF2D2D',color:'#fff',border:'3px solid #111',borderRadius:'999px',padding:'14px 40px',fontFamily:'Impact,sans-serif',fontSize:'1.35rem',letterSpacing:'2px',textDecoration:'none',boxShadow:'5px 5px 0 #111',display:'block',width:'100%',textAlign:'center',boxSizing:'border-box'}}>FIND YOUR HUSTLE 🔥</a>
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button style={{background:'#111',color:'#FFE000',border:'3px solid #111',borderRadius:'999px',padding:'14px 40px',fontFamily:'Impact,sans-serif',fontSize:'1.35rem',letterSpacing:'2px',cursor:'pointer',boxShadow:'5px 5px 0 #FFB800',width:'100%'}}>JOIN FREE ⚡</button>
            </SignInButton>
          )}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginTop:'40px',width:'100%',maxWidth:'360px',position:'relative',zIndex:2}}>
          {[['47K+','MEMBERS'],['8','CATEGORIES'],['$0','TO JOIN'],['24/7','LIVE CHATS']].map(([n,l]) => (
            <div key={l} style={{background:'#111',border:'3px solid #111',borderRadius:'18px',padding:'16px 12px',textAlign:'center',boxShadow:'4px 4px 0 #FFB800'}}>
              <div style={{fontFamily:'Impact,sans-serif',fontSize:'2.2rem',letterSpacing:'2px',color:'#FFE000',lineHeight:1}}>{n}</div>
              <div style={{fontSize:'.65rem',letterSpacing:'1px',color:'rgba(255,254,240,.5)',fontFamily:'monospace',marginTop:'3px'}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{overflow:'hidden',background:'#111',borderTop:'4px solid #FFE000',borderBottom:'4px solid #FFE000',padding:'11px 0'}}>
        <div style={{display:'flex',gap:'40px',animation:'marquee 20s linear infinite',width:'max-content'}}>
          {['💸 FREELANCING','⭐ CRYPTO','🎥 CONTENT','📦 DROPSHIPPING','🔗 AFFILIATE','🎮 GAMING','🎨 DESIGN','⚙️ MICRO SAAS',
            '💸 FREELANCING','⭐ CRYPTO','🎥 CONTENT','📦 DROPSHIPPING','🔗 AFFILIATE','🎮 GAMING','🎨 DESIGN','⚙️ MICRO SAAS'].map((t,i) => (
            <span key={i} style={{fontFamily:'Impact,sans-serif',fontSize:'1.2rem',letterSpacing:'3px',color:'#FFE000',whiteSpace:'nowrap'}}>{t} <span style={{color:'#FF2D2D'}}>✦</span></span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section id="categories" style={{background:'#FFE000',padding:'70px 20px',position:'relative'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.07) 2px,transparent 2px)',backgroundSize:'22px 22px',pointerEvents:'none'}}/>
        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'32px'}}>
          <h2 style={{fontFamily:'Impact,sans-serif',fontSize:'2.8rem',letterSpacing:'3px',color:'#111',textShadow:'3px 3px 0 #FF2D2D',whiteSpace:'nowrap'}}>PICK YOUR HUSTLE</h2>
          <div style={{flex:1,height:'5px',background:'#111',borderRadius:'3px'}}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'18px',position:'relative',zIndex:1}}>
          {CATS.map((cat, i) => (
            <div key={cat.key} style={{borderRadius:'20px',border:'3.5px solid #111',overflow:'hidden',cursor:'pointer',background:'#FFFEF0',boxShadow:'6px 6px 0 #111',transform:i%2===1?'rotate(.6deg)':'none',transition:'all .18s'}}>
              <div style={{padding:'24px 20px 16px',background:cat.color,borderBottom:'3px solid #111'}}>
                <div style={{fontSize:'2.8rem',marginBottom:'8px'}}>{cat.emoji}</div>
                <div style={{fontFamily:'Impact,sans-serif',fontSize:'1.8rem',letterSpacing:'2px',color:cat.textColor,lineHeight:1,marginBottom:'5px'}}>{cat.title}</div>
                <div style={{fontSize:'.78rem',fontFamily:'monospace',fontWeight:'700',color:'rgba(255,255,255,.6)',lineHeight:1.5}}>{cat.desc}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 18px',background:'#FFFEF0'}}>
                <div style={{display:'flex',alignItems:'center',gap:'6px',fontFamily:'monospace',fontSize:'.7rem',fontWeight:'700',color:'#222'}}>
                  <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#00E676',border:'2px solid #111'}}/>
                  {cat.online} online
                </div>
                {isSignedIn ? (
                  <Link href={`/chat/${cat.key}`} style={{fontFamily:'Impact,sans-serif',fontSize:'.92rem',letterSpacing:'1.5px',padding:'6px 16px',borderRadius:'999px',border:'2.5px solid #111',background:'#FFE000',color:'#111',boxShadow:'3px 3px 0 #111',textDecoration:'none'}}>ENTER CHAT →</Link>
                ) : (
                  <SignInButton mode="modal">
                    <button style={{fontFamily:'Impact,sans-serif',fontSize:'.92rem',letterSpacing:'1.5px',padding:'6px 16px',borderRadius:'999px',border:'2.5px solid #111',background:'#FFE000',color:'#111',cursor:'pointer',boxShadow:'3px 3px 0 #111'}}>JOIN TO CHAT →</button>
                  </SignInButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#111',padding:'48px 20px 28px',borderTop:'4px solid #FFE000',textAlign:'center'}}>
        <div style={{fontFamily:'Impact,sans-serif',fontSize:'3.5rem',letterSpacing:'4px',color:'#FFE000',textShadow:'5px 5px 0 #FF2D2D'}}>HUSTLE.ZONE</div>
        <div style={{fontFamily:'monospace',fontSize:'.7rem',color:'rgba(255,254,240,.3)',margin:'8px 0 24px',letterSpacing:'2px'}}>// WHERE TEENS LEARN TO MAKE THEIR FIRST $$$</div>
        <div style={{fontFamily:'monospace',fontSize:'.65rem',color:'rgba(255,255,255,.2)'}}>© 2025 HUSTLE.ZONE — Built different. 🔥</div>
      </footer>

      <style>{`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        a:hover > div, div:hover { transition: all .18s; }
      `}</style>
    </main>
  )
}