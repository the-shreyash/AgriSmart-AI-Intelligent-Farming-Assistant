// ============================================================
//  src/pages/About.jsx  –  About page
// ============================================================
import { useState } from 'react'
import { Link } from 'react-router-dom'

/* ── Team card ───────────────────────────────────────────────── */
function TeamCard({ emoji, name, role, desc, delay }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '32px 26px',
        textAlign: 'center',
        boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        border: `1px solid ${hov ? 'rgba(46,168,79,.2)' : 'rgba(0,0,0,.05)'}`,
        transform: hov ? 'translateY(-6px)' : 'none',
        transition: 'all .25s ease',
        animation: `slideUp .5s ease ${delay}s both`,
      }}
    >
      <div style={{
        width: '72px', height: '72px',
        background: 'linear-gradient(135deg,var(--green-bright),var(--green-mid))',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '30px', margin: '0 auto 16px',
        boxShadow: '0 8px 24px rgba(46,168,79,.3)',
      }}>{emoji}</div>
      <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'16px', color:'var(--green-deep)', marginBottom:'4px' }}>{name}</h3>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, color:'var(--green-bright)', marginBottom:'12px', textTransform:'uppercase', letterSpacing:'.6px' }}>{role}</div>
      <p style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'13px', lineHeight:1.75, color:'var(--text-mid)' }}>{desc}</p>
    </div>
  )
}

/* ── Value card ──────────────────────────────────────────────── */
function ValueCard({ icon, title, desc }) {
  return (
    <div style={{
      display: 'flex', gap: '18px', alignItems: 'flex-start',
      padding: '22px',
      background: 'rgba(255,255,255,.6)',
      borderRadius: '16px',
      border: '1px solid rgba(10,61,31,.07)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        flexShrink: 0, width: '46px', height: '46px',
        background: 'var(--gold-pale)',
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px',
        border: '1px solid rgba(232,166,21,.2)',
      }}>{icon}</div>
      <div>
        <h4 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'15px', color:'var(--green-deep)', marginBottom:'6px' }}>{title}</h4>
        <p style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'13px', lineHeight:1.7, color:'var(--text-mid)' }}>{desc}</p>
      </div>
    </div>
  )
}

/* ── Milestone ───────────────────────────────────────────────── */
function Milestone({ year, event, icon }) {
  return (
    <div style={{ display:'flex', gap:'16px', alignItems:'flex-start' }}>
      <div style={{
        flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:'0',
      }}>
        <div style={{
          width:'42px', height:'42px',
          background:'var(--green-deep)',
          borderRadius:'50%',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'18px',
          boxShadow:'0 4px 14px rgba(10,61,31,.25)',
        }}>{icon}</div>
        <div style={{ width:'2px', flex:1, background:'rgba(10,61,31,.12)', marginTop:'6px', minHeight:'30px' }} />
      </div>
      <div style={{ paddingBottom:'24px' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'13px', color:'var(--green-bright)', letterSpacing:'.5px', marginBottom:'4px' }}>{year}</div>
        <p style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'14px', color:'var(--text-dark)', lineHeight:1.65 }}>{event}</p>
      </div>
    </div>
  )
}

/* ── Tech badge ──────────────────────────────────────────────── */
function TechBadge({ icon, name, desc }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--green-deep)' : '#fff',
        borderRadius: '16px',
        padding: '20px 18px',
        textAlign: 'center',
        boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        border: '1px solid rgba(0,0,0,.05)',
        transform: hov ? 'scale(1.04)' : 'scale(1)',
        transition: 'all .22s ease',
        cursor: 'default',
      }}
    >
      <div style={{ fontSize:'32px', marginBottom:'8px' }}>{icon}</div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'14px', color: hov?'#fff':'var(--green-deep)', marginBottom:'4px' }}>{name}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color: hov?'rgba(255,255,255,.6)':'var(--text-light)' }}>{desc}</div>
    </div>
  )
}

/* ── ABOUT PAGE ──────────────────────────────────────────────── */
export default function About() {
  return (
    <>
      {/* ════ HERO ════ */}
      <section style={{
        background: 'linear-gradient(145deg,#0a3d1f 0%,#185c2e 60%,#0f4a24 100%)',
        padding: '90px 28px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'radial-gradient(ellipse 50% 60% at 80% 40%, rgba(232,166,21,.1) 0%, transparent 60%)',
        }} />
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-label" style={{ color:'var(--gold-light)' }}>✦ OUR STORY</div>
          <h1 style={{
            fontFamily:"'Syne',sans-serif",
            fontSize:'clamp(34px,6vw,62px)',
            fontWeight:800, color:'#fff',
            lineHeight:1.1, marginBottom:'22px', maxWidth:'680px',
          }}>
            भारतीय किसानों के लिए<br />
            <span style={{ color:'var(--gold-light)' }}>बनाया, उन्हीं के साथ</span>
          </h1>
          <p style={{
            fontFamily:"'Noto Sans Devanagari',sans-serif",
            fontSize:'17px', color:'rgba(255,255,255,.72)',
            lineHeight:1.8, maxWidth:'540px',
          }}>
            किसान AI की शुरुआत एक सरल सवाल से हुई — क्या हम AI की शक्ति को
            भारत के करोड़ों किसानों तक पहुँचा सकते हैं? आज वो सपना हकीकत है।
          </p>
        </div>
      </section>

      {/* ════ MISSION ════ */}
      <section className="section">
        <div className="container">
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr',
            gap:'64px', alignItems:'center',
          }} className="mission-grid">
            {/* Left */}
            <div>
              <div className="section-label">✦ OUR MISSION</div>
              <h2 className="section-title">हमारा मिशन</h2>
              <p style={{
                fontFamily:"'Noto Sans Devanagari',sans-serif",
                fontSize:'16px', lineHeight:1.85,
                color:'var(--text-mid)', marginBottom:'24px',
              }}>
                भारत की 60% आबादी कृषि पर निर्भर है, फिर भी किसानों को सही
                जानकारी के अभाव में नुकसान उठाना पड़ता है। किसान AI का लक्ष्य
                है — <strong style={{color:'var(--green-deep)'}}>हर किसान को डेटा-आधारित, AI-powered खेती की जानकारी</strong>
                — हिंदी में, मुफ्त में।
              </p>
              <p style={{
                fontFamily:"'Noto Sans Devanagari',sans-serif",
                fontSize:'16px', lineHeight:1.85,
                color:'var(--text-mid)',
              }}>
                हम Gemini AI, OpenWeatherMap और सरकारी MSP डेटा को मिलाकर
                एक ऐसा उपकरण बनाते हैं जो हर किसान — छोटे खेत से लेकर बड़े
                उद्यम तक — के लिए उपयोगी है।
              </p>
            </div>

            {/* Right — stats box */}
            <div style={{
              background:'linear-gradient(135deg,var(--green-deep),var(--green-mid))',
              borderRadius:'24px', padding:'36px',
              boxShadow:'var(--shadow-lg)',
            }}>
              {[
                ['50,000+', 'किसान लाभान्वित'],
                ['28',      'राज्यों में उपलब्ध'],
                ['18+',     'फसल प्रकार सलाह'],
                ['94%',     'सटीकता दर'],
                ['100%',    'मुफ्त सेवा'],
              ].map(([val, label]) => (
                <div key={label} style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'14px 0',
                  borderBottom:'1px solid rgba(255,255,255,.09)',
                }}>
                  <span style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'14px', color:'rgba(255,255,255,.7)' }}>{label}</span>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'22px', color:'var(--gold-light)' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.mission-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* ════ VALUES ════ */}
      <section className="section" style={{ background:'var(--cream-dark)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'50px' }}>
            <div className="section-label">✦ WHAT WE BELIEVE</div>
            <h2 className="section-title">हमारे मूल्य</h2>
          </div>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
            gap:'18px',
          }}>
            {[
              { icon:'🌾', title:'किसान पहले',      desc:'हर फीचर किसान की जरूरत को ध्यान में रखकर बनाया गया है — तकनीक के लिए नहीं।' },
              { icon:'🌐', title:'सभी की पहुँच',    desc:'हिंदी सपोर्ट, सरल UI और मुफ्त सेवा — ताकि कोई भी किसान पीछे न रहे।' },
              { icon:'🔬', title:'डेटा पर भरोसा',   desc:'Gemini AI, सरकारी MSP और live weather — सभी निर्णय तथ्यों पर आधारित।' },
              { icon:'🤝', title:'पारदर्शिता',       desc:'हम बताते हैं कि हमारी सलाह क्यों दी गई — कोई hidden agenda नहीं।' },
              { icon:'📱', title:'सरलता',            desc:'जटिल AI को सरल भाषा में — ताकि बिना tech knowledge के भी काम आए।' },
              { icon:'🌱', title:'स्थायित्व',        desc:'खेती को टिकाऊ बनाने के लिए organic और पर्यावरण-अनुकूल सुझाव।' },
            ].map(v => <ValueCard key={v.title} {...v} />)}
          </div>
        </div>
      </section>

      {/* ════ TEAM ════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'50px' }}>
            <div className="section-label">✦ THE TEAM</div>
            <h2 className="section-title">हमारी टीम</h2>
            <p className="section-sub" style={{ margin:'0 auto', textAlign:'center' }}>
              Engineers, agronomists और farmers — सब मिलकर किसान AI को बनाते हैं।
            </p>
          </div>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',
            gap:'20px',
          }}>
            {[
              { emoji:'👨‍💻', name:'Arjun Sharma',     role:'Founder & AI Lead',    desc:'IIT Delhi से CS, 8 साल का AI अनुभव। किसान परिवार से आते हैं।',           delay:0    },
              { emoji:'👩‍🌾', name:'Priya Patel',      role:'Agronomy Advisor',     desc:'IARI से कृषि विज्ञान। 12 वर्ष का field research अनुभव।',                   delay:0.08 },
              { emoji:'👨‍🔬', name:'Rahul Verma',      role:'Data Scientist',       desc:'Weather models और mandi price forecasting के विशेषज्ञ।',                    delay:0.16 },
              { emoji:'👩‍💼', name:'Sunita Mishra',    role:'Community & Hindi UX', desc:'किसानों के साथ मिलकर Hindi-first UX डिजाइन करती हैं।',                     delay:0.24 },
            ].map(m => <TeamCard key={m.name} {...m} />)}
          </div>
        </div>
      </section>

      {/* ════ TECHNOLOGY ════ */}
      <section className="section" style={{ background:'var(--green-deep)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'50px' }}>
            <div className="section-label" style={{ color:'var(--gold-light)' }}>✦ TECHNOLOGY</div>
            <h2 className="section-title" style={{ color:'#fff' }}>हमारी तकनीक</h2>
            <p className="section-sub" style={{ color:'rgba(255,255,255,.65)', margin:'0 auto', textAlign:'center' }}>
              World-class APIs और open-source tools से बना किसान AI
            </p>
          </div>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',
            gap:'16px',
          }}>
            {[
              { icon:'🤖', name:'Gemini AI',        desc:'Google\'s LLM' },
              { icon:'⚡', name:'Vite + React',      desc:'Fast Frontend' },
              { icon:'🌤️', name:'OpenWeatherMap',   desc:'Live Weather' },
              { icon:'🟢', name:'Node.js + Express', desc:'Backend API' },
              { icon:'📊', name:'MSP Data',          desc:'Govt. CACP' },
              { icon:'🔒', name:'Helmet.js',         desc:'API Security' },
            ].map(t => <TechBadge key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ════ JOURNEY ════ */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'start' }} className="journey-grid">
            <div>
              <div className="section-label">✦ OUR JOURNEY</div>
              <h2 className="section-title">किसान AI की<br />यात्रा</h2>
              <p className="section-sub" style={{ marginBottom:'40px' }}>
                एक छोटे से prototype से शुरू होकर आज 50,000+ किसानों तक पहुँचना — यह हमारी कहानी है।
              </p>
              <div>
                {[
                  { year:'Jan 2024',  icon:'💡', event:'एक किसान परिवार की तकलीफ देखकर किसान AI का idea जन्मा।' },
                  { year:'Mar 2024',  icon:'🔧', event:'Gemini API और OpenWeatherMap integrate करके पहला prototype तैयार।' },
                  { year:'Jun 2024',  icon:'🧪', event:'UP के 200 किसानों के साथ beta testing — 91% ने सटीक सुझाव पाए।' },
                  { year:'Sep 2024',  icon:'🚀', event:'Hindi UI के साथ public launch — पहले महीने में 5,000 किसान।' },
                  { year:'Jan 2025',  icon:'📈', event:'50,000+ किसान, 28 राज्य, KCC loan feature added।' },
                  { year:'2025 →',    icon:'🌟', event:'WhatsApp bot, offline mode और 15+ regional languages का लक्ष्य।' },
                ].map(m => <Milestone key={m.year} {...m} />)}
              </div>
            </div>

            {/* Quote panel */}
            <div>
              <div style={{
                background:'var(--cream-dark)',
                borderRadius:'24px', padding:'36px',
                border:'1px solid rgba(10,61,31,.08)',
                marginBottom:'20px',
              }}>
                <div style={{ fontSize:'40px', color:'var(--gold)', marginBottom:'16px' }}>❝</div>
                <p style={{
                  fontFamily:"'Noto Sans Devanagari',sans-serif",
                  fontSize:'18px', lineHeight:1.8,
                  color:'var(--green-deep)', fontWeight:600,
                  marginBottom:'20px',
                }}>
                  "जब एक किसान AI सलाह लेकर अपने परिवार को बेहतर जीवन दे सकता है,
                  तो हमारी मेहनत सार्थक हो जाती है।"
                </p>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'14px', color:'var(--green-mid)' }}>
                  — Arjun Sharma, Founder
                </div>
              </div>

              <div style={{
                background:'linear-gradient(135deg,var(--gold-pale),#fff8e1)',
                borderRadius:'20px', padding:'28px',
                border:'1px solid rgba(232,166,21,.2)',
              }}>
                <h4 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'16px', color:'var(--green-deep)', marginBottom:'16px' }}>
                  🏆 Awards & Recognition
                </h4>
                {[
                  '🥇 AgriTech India 2024 — Best AI App',
                  '🏛️ NITI Aayog — Digital Agriculture Award',
                  '📰 Economic Times — Top 10 Agri Startups',
                  '🌱 WWF India — Sustainable Tech Award',
                ].map(a => (
                  <div key={a} style={{
                    fontFamily:"'Noto Sans Devanagari',sans-serif",
                    fontSize:'13px', color:'var(--text-mid)',
                    padding:'8px 0',
                    borderBottom:'1px solid rgba(232,166,21,.15)',
                  }}>{a}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.journey-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* ════ CTA ════ */}
      <section style={{
        background:'linear-gradient(135deg,var(--green-deep),var(--green-mid))',
        padding:'70px 28px', textAlign:'center',
      }}>
        <div className="container">
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(24px,4vw,38px)', fontWeight:800, color:'#fff', marginBottom:'14px' }}>
            हमारे साथ जुड़ें
          </h2>
          <p style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'16px', color:'rgba(255,255,255,.7)', marginBottom:'32px', maxWidth:'420px', margin:'0 auto 32px' }}>
            किसान AI को और बेहतर बनाने में मदद करें — feedback, partnership या volunteer के रूप में।
          </p>
          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/contact" className="btn-gold" style={{ padding:'15px 32px' }}>📞 संपर्क करें</Link>
            <Link to="/advisor" style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              padding:'15px 28px', borderRadius:'50px',
              border:'2px solid rgba(255,255,255,.3)', color:'rgba(255,255,255,.85)',
              fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:'15px',
              transition:'all .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.08)'; e.currentTarget.style.borderColor='rgba(255,255,255,.5)' }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(255,255,255,.3)' }}
            >
              🤖 Try AI Advisor
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
