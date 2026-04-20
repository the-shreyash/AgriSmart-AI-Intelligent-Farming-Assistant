// ============================================================
//  src/pages/Home.jsx  –  Landing page
// ============================================================
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Animated counter ────────────────────────────────────────── */
function useCounter(target, duration = 1800) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const step = target / (duration / 16)
    let cur = 0
    const id = setInterval(() => {
      cur = Math.min(cur + step, target)
      setVal(Math.floor(cur))
      if (cur >= target) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [target, duration])
  return val
}

/* ── Stat card ───────────────────────────────────────────────── */
function StatCard({ icon, value, suffix, label }) {
  const n = useCounter(value)
  return (
    <div className="stat-card" style={{
      background: 'rgba(255,255,255,.07)',
      border: '1px solid rgba(255,255,255,.13)',
      borderRadius: '18px',
      padding: '30px 24px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ fontSize: '34px', marginBottom: '10px' }}>{icon}</div>
      <div style={{
        fontFamily: "'Syne',sans-serif",
        fontSize: 'clamp(30px,4vw,46px)',
        fontWeight: 800,
        color: 'var(--gold-light)',
        lineHeight: 1,
      }}>
        {n.toLocaleString('en-IN')}{suffix}
      </div>
      <div style={{
        fontFamily: "'Noto Sans Devanagari',sans-serif",
        fontSize: '13px',
        color: 'rgba(255,255,255,.62)',
        marginTop: '8px',
      }}>{label}</div>
    </div>
  )
}

/* ── Feature card ────────────────────────────────────────────── */
function FeatureCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="feature-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '22px',
        padding: '34px 28px',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        border: `1px solid ${hovered ? 'rgba(46,168,79,.2)' : 'rgba(0,0,0,.05)'}`,
        transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
        transition: 'all .28s ease',
      }}
    >
      <div style={{
        width: '58px', height: '58px',
        background: 'linear-gradient(135deg,rgba(46,168,79,.12),rgba(26,107,53,.06))',
        borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '28px', marginBottom: '18px',
        border: '1px solid rgba(46,168,79,.12)',
      }}>{icon}</div>
      <h3 style={{
        fontFamily: "'Syne',sans-serif",
        fontSize: '17px', fontWeight: 700,
        color: 'var(--green-deep)', marginBottom: '10px',
      }}>{title}</h3>
      <p style={{
        fontFamily: "'Noto Sans Devanagari',sans-serif",
        fontSize: '14px', lineHeight: 1.8,
        color: 'var(--text-mid)',
      }}>{desc}</p>
    </div>
  )
}

/* ── Step ────────────────────────────────────────────────────── */
function Step({ num, icon, title, desc }) {
  return (
    <div className="how-step" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{
        flexShrink: 0, width: '50px', height: '50px',
        background: 'linear-gradient(135deg,var(--green-bright),var(--green-mid))',
        borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '18px', color: '#fff',
        boxShadow: '0 4px 16px rgba(46,168,79,.35)',
      }}>{num}</div>
      <div>
        <div style={{ fontSize: '22px', marginBottom: '4px' }}>{icon}</div>
        <h4 style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: '15px', fontWeight: 700,
          color: 'var(--green-deep)', marginBottom: '6px',
        }}>{title}</h4>
        <p style={{
          fontFamily: "'Noto Sans Devanagari',sans-serif",
          fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.7,
        }}>{desc}</p>
      </div>
    </div>
  )
}

/* ── Crop ticker item ────────────────────────────────────────── */
function CropTile({ emoji, name, hindi, price, trend }) {
  const [hov, setHov] = useState(false)
  const tColor = trend === '↑' ? '#2e7d32' : trend === '↓' ? 'var(--red)' : '#f57c00'
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '16px 18px',
        display: 'flex', alignItems: 'center', gap: '14px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid rgba(0,0,0,.05)',
        transform: hov ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform .2s',
      }}
    >
      <span style={{ fontSize: '32px' }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--green-deep)' }}>{name}</div>
        <div style={{ fontFamily: "'Noto Sans Devanagari',sans-serif", fontSize: '12px', color: 'var(--text-light)' }}>{hindi}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--green-deep)' }}>{price}</div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: tColor }}>{trend} MSP</div>
      </div>
    </div>
  )
}

/* ── Testimonial ─────────────────────────────────────────────── */
function Testimonial({ quote, name, location, crop }) {
  return (
    <div className="testimonial-card" style={{
      background: '#fff',
      borderRadius: '20px',
      padding: '28px 26px',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid rgba(0,0,0,.05)',
    }}>
      <div style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '12px' }}>❝</div>
      <p style={{
        fontFamily: "'Noto Sans Devanagari',sans-serif",
        fontSize: '14px', lineHeight: 1.8,
        color: 'var(--text-mid)', marginBottom: '18px',
        fontStyle: 'italic',
      }}>{quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px', height: '42px',
          background: 'linear-gradient(135deg,var(--green-bright),var(--green-mid))',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', color: '#fff', fontWeight: 700,
          fontFamily: "'Syne',sans-serif",
        }}>{name[0]}</div>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--green-deep)' }}>{name}</div>
          <div style={{ fontFamily: "'Noto Sans Devanagari',sans-serif", fontSize: '12px', color: 'var(--text-light)' }}>{location} · {crop}</div>
        </div>
      </div>
    </div>
  )
}

/* ── HOME PAGE ───────────────────────────────────────────────── */
export default function Home() {
  const container = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.stat-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.stats-container', start: 'top 85%' } }
    )

    gsap.fromTo('.feature-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.features-container', start: 'top 80%' } }
    )

    gsap.fromTo('.how-step',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: '.steps-container', start: 'top 80%' } }
    )

    gsap.fromTo('.mandi-panel',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.steps-container', start: 'top 80%' } }
    )

    gsap.fromTo('.testimonial-card',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.testimonials-container', start: 'top 85%' } }
    )
  }, { scope: container })

  return (
    <div ref={container}>
      {/* ════ HERO ════ */}
      <section style={{
        background: 'linear-gradient(145deg,#0a3d1f 0%,#1a6b35 55%,#0c4d28 100%)',
        minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Radial glows */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 50% at 15% 60%, rgba(46,168,79,.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 85% 20%, rgba(232,166,21,.12) 0%, transparent 55%)
          `,
        }} />

        {/* Floating field emojis */}
        {['🌾', '🚜', '💧', '🌱', '☀️', '🐄'].map((e, i) => (
          <span key={i} style={{
            position: 'absolute',
            fontSize: `${20 + i * 7}px`,
            opacity: 0.1,
            top: `${8 + i * 15}%`,
            left: `${4 + i * 17}%`,
            animation: `floatY ${3.2 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            pointerEvents: 'none',
          }}>{e}</span>
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '90px 28px' }}>
          {/* Pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(232,166,21,.14)',
            border: '1px solid rgba(232,166,21,.28)',
            borderRadius: '50px', padding: '6px 16px',
            marginBottom: '28px',
            animation: 'slideUp .4s ease both',
          }}>
            <span>✨</span>
            <span style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: '12px', fontWeight: 600,
              color: 'var(--gold-light)', letterSpacing: '.8px',
            }}>POWERED BY GEMINI AI + LIVE WEATHER</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 'clamp(38px,7vw,72px)',
            fontWeight: 800, color: '#fff',
            lineHeight: 1.07, marginBottom: '22px',
            maxWidth: '700px',
            animation: 'slideUp .5s ease .08s both',
          }}>
            खेती को बनाएं<br />
            <span style={{
              background: 'linear-gradient(90deg,#f5c842 0%,#e8a615 40%,#f5c842 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 2.8s linear infinite',
            }}>AI से स्मार्ट</span>
          </h1>

          <p style={{
            fontFamily: "'Noto Sans Devanagari',sans-serif",
            fontSize: 'clamp(15px,2vw,18px)',
            color: 'rgba(255,255,255,.75)',
            lineHeight: 1.8, maxWidth: '520px',
            marginBottom: '44px',
            animation: 'slideUp .5s ease .16s both',
          }}>
            अपनी मिट्टी, मौसम और पानी की जानकारी दें — किसान AI आपके लिए
            सबसे अच्छी फसल चुनेगा, मंडी भाव बताएगा और बैंक लोन रिपोर्ट तैयार करेगा।
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '14px', flexWrap: 'wrap',
            animation: 'slideUp .5s ease .24s both',
          }}>
            <Link to="/advisor" className="btn-gold" style={{ padding: '15px 34px', fontSize: '15px' }}>
              🤖 AI सलाह लें — मुफ्त
            </Link>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '15px 28px',
              borderRadius: '50px',
              border: '2px solid rgba(255,255,255,.25)',
              color: 'rgba(255,255,255,.85)',
              fontFamily: "'Syne',sans-serif",
              fontSize: '15px', fontWeight: 600,
              transition: 'border-color .2s, background .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.5)'; e.currentTarget.style.background = 'rgba(255,255,255,.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)'; e.currentTarget.style.background = 'transparent' }}
            >
              🌿 More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ════ STATS ════ */}
      <section style={{
        background: 'linear-gradient(135deg,var(--green-deep),var(--green-mid))',
        padding: '60px 28px',
      }}>
        <div className="container stats-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
            gap: '20px',
          }}>
            <StatCard icon="👨‍🌾" value={50000} suffix="+" label="किसान लाभान्वित" />
            <StatCard icon="🌾" value={18} suffix="+" label="फसल प्रकार" />
            <StatCard icon="🗺️" value={28} suffix="" label="राज्यों में उपलब्ध" />
            <StatCard icon="📈" value={94} suffix="%" label="सटीकता दर" />
          </div>
        </div>
      </section>

      {/* ════ FEATURES ════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label">✦ FEATURES</div>
            <h2 className="section-title" style={{ margin: '0 auto 16px', maxWidth: '500px' }}>
              हर जरूरत के लिए एक समाधान
            </h2>
            <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
              Gemini AI की शक्ति से आपकी खेती को नई ऊंचाइयों पर ले जाएं
            </p>
          </div>

          <div className="features-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))',
            gap: '22px',
          }}>
            {[
              { icon: '🤖', title: 'AI फसल सुझाव', desc: 'Gemini AI आपकी मिट्टी, मौसम और पानी का विश्लेषण करके Top 3 फसलें सुझाता है।' },
              { icon: '🌤️', title: 'Live मौसम डेटा', desc: 'OpenWeatherMap से आपके क्षेत्र का वास्तविक तापमान, नमी और वर्षा का डेटा।' },
              { icon: '📈', title: 'मंडी भाव पूर्वानुमान', desc: '18 प्रमुख फसलों का MSP और बाज़ार भाव — ताकि आप सही समय पर बेचें।' },
              { icon: '📅', title: 'खेती कैलेंडर', desc: 'महीने-दर-महीने काम की सूची — बुवाई से कटाई तक पूरी योजना।' },
              { icon: '🏦', title: 'बैंक लोन रिपोर्ट', desc: 'KCC और फसल ऋण के लिए प्रिंट-ready PDF रिपोर्ट — बैंक में सीधे दिखाएं।' },
              { icon: '🇮🇳', title: 'सरकारी योजनाएँ', desc: 'PM-KISAN, PMFBY, KCC और राज्य योजनाओं की जानकारी एक जगह।' },
            ].map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════ */}
      <section className="section" style={{ background: 'var(--cream-dark)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px', alignItems: 'center',
          }}
            className="how-grid steps-container"
          >
            <div>
              <div className="section-label">✦ HOW IT WORKS</div>
              <h2 className="section-title">4 आसान कदम,<br />बेहतर फसल</h2>
              <p className="section-sub" style={{ marginBottom: '40px' }}>
                किसान AI को इस्तेमाल करना बेहद आसान है — बस अपनी जानकारी दें और AI बाकी काम करेगा।
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <Step num="1" icon="📍" title="स्थान और जमीन की जानकारी दें" desc="जिला, मिट्टी का प्रकार, खेत का आकार और मौसम चुनें।" />
                <Step num="2" icon="🤖" title="AI विश्लेषण करता है" desc="Gemini AI + Live weather डेटा से आपकी जमीन का पूरा विश्लेषण।" />
                <Step num="3" icon="🌾" title="Top 3 फसलें मिलती हैं" desc="मंडी भाव, उपज अनुमान और पूरा कैलेंडर के साथ।" />
                <Step num="4" icon="📄" title="रिपोर्ट डाउनलोड करें" desc="बैंक लोन के लिए PDF रिपोर्ट प्रिंट करें या शेयर करें।" />
              </div>
            </div>

            {/* Mandi ticker panel */}
            <div className="mandi-panel">
              <div style={{
                background: 'var(--green-deep)',
                borderRadius: '24px', padding: '28px',
                boxShadow: 'var(--shadow-lg)',
              }}>
                <div style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700,
                  fontSize: '14px', color: 'var(--gold-light)',
                  letterSpacing: '1px', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{ animation: 'pulse 1.5s ease-in-out infinite', display: 'inline-block', color: '#4caf50' }}>●</span>
                  LIVE MANDI PRICES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { emoji: '🌾', name: 'Wheat / गेहूँ', hindi: '₹2,100–2,400/qtl', price: 'MSP ₹2,275', trend: '↑' },
                    { emoji: '🌿', name: 'Mustard / सरसों', hindi: '₹5,200–5,650/qtl', price: 'MSP ₹5,650', trend: '→' },
                    { emoji: '🫘', name: 'Chickpea / चना', hindi: '₹5,100–5,500/qtl', price: 'MSP ₹5,440', trend: '↑' },
                    { emoji: '🌽', name: 'Maize / मक्का', hindi: '₹1,700–1,950/qtl', price: 'MSP ₹2,090', trend: '→' },
                    { emoji: '🌱', name: 'Soybean / सोयाबीन', hindi: '₹4,300–4,800/qtl', price: 'MSP ₹4,600', trend: '↓' },
                  ].map(c => (
                    <div key={c.name} style={{
                      background: 'rgba(255,255,255,.07)',
                      border: '1px solid rgba(255,255,255,.1)',
                      borderRadius: '12px', padding: '12px 14px',
                      display: 'flex', alignItems: 'center', gap: '12px',
                    }}>
                      <span style={{ fontSize: '24px' }}>{c.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '13px', color: '#fff' }}>{c.name}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', marginTop: '1px' }}>{c.hindi}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-light)' }}>{c.price}</div>
                        <div style={{
                          fontSize: '11px', fontWeight: 700,
                          color: c.trend === '↑' ? '#66bb6a' : c.trend === '↓' ? '#ef5350' : '#ffa726'
                        }}>
                          {c.trend} {c.trend === '↑' ? 'Rising' : c.trend === '↓' ? 'Falling' : 'Stable'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width:768px) { .how-grid { grid-template-columns:1fr !important; } }
        `}</style>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">✦ FARMER STORIES</div>
            <h2 className="section-title">किसानों की आवाज़</h2>
          </div>
          <div className="testimonials-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
            gap: '20px',
          }}>
            {[
              { quote: 'किसान AI ने मुझे सरसों उगाने की सलाह दी — इस साल ₹58,000 प्रति एकड़ कमाई हुई। पहले इतना कभी नहीं हुआ था।', name: 'रामलाल यादव', location: 'Varanasi, UP', crop: 'सरसों' },
              { quote: 'बैंक लोन के लिए रिपोर्ट जमा करनी थी। किसान AI की PDF रिपोर्ट से पहली बार में ही KCC मिल गया।', name: 'सुनीता देवी', location: 'Indore, MP', crop: 'सोयाबीन' },
              { quote: 'Hindi में सब कुछ समझ आया। मंडी भाव देख कर सही समय पर गेहूँ बेचा — 15% ज्यादा दाम मिला।', name: 'Harpreet Singh', location: 'Amritsar, Punjab', crop: 'गेहूँ' },
            ].map(t => <Testimonial key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ════ CTA BANNER ════ */}
      <section style={{
        background: 'linear-gradient(135deg,var(--green-deep),var(--green-mid))',
        padding: '80px 28px', textAlign: 'center',
      }}>
        <div className="container">
          <div style={{ fontSize: '48px', marginBottom: '20px', animation: 'floatY 3s ease-in-out infinite' }}>🌾</div>
          <h2 style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 'clamp(26px,4vw,42px)',
            fontWeight: 800, color: '#fff',
            marginBottom: '16px',
          }}>
            अभी शुरू करें — बिल्कुल मुफ्त
          </h2>
          <p style={{
            fontFamily: "'Noto Sans Devanagari',sans-serif",
            fontSize: '16px', color: 'rgba(255,255,255,.72)',
            marginBottom: '36px', maxWidth: '460px', margin: '0 auto 36px',
          }}>
            50,000+ किसान पहले से किसान AI से फायदा उठा रहे हैं।
            आप भी आज ही अपनी फसल की योजना बनाएं।
          </p>
          <Link to="/advisor" className="btn-gold" style={{ padding: '17px 42px', fontSize: '16px' }}>
            🤖 AI सलाह लें — अभी
          </Link>
        </div>
      </section>
    </div>
  )
}
