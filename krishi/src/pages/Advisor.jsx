// ============================================================
//  src/pages/Advisor.jsx  –  AI Crop Recommendation form + results
//  Calls the Express backend at /api/recommend (proxied by Vite)
// ============================================================
import { useState } from 'react'

const SOIL_OPTIONS = [
  { value:'alluvial',     label:'जलोढ़ / Alluvial'         },
  { value:'black cotton', label:'काली / Black Cotton'       },
  { value:'red laterite', label:'लाल / Red Laterite'        },
  { value:'sandy loam',   label:'बलुई दोमट / Sandy Loam'   },
  { value:'clay loam',    label:'चिकनी दोमट / Clay Loam'   },
  { value:'saline',       label:'लवणीय / Saline'            },
  { value:'acidic',       label:'अम्लीय / Acidic'           },
]
const SEASON_OPTIONS = [
  { value:'Kharif (June-November)',  label:'खरीफ (जून–नवम्बर)'      },
  { value:'Rabi (November-April)',   label:'रबी (नवम्बर–अप्रैल)'    },
  { value:'Zaid (March-June)',       label:'जायद (मार्च–जून)'       },
]
const WATER_OPTIONS = [
  { value:'high - canal/tubewell available', label:'अधिक – नहर / नलकूप'         },
  { value:'medium - seasonal irrigation',   label:'मध्यम – मौसमी सिंचाई'        },
  { value:'low - rain-fed only',            label:'कम – केवल वर्षा'              },
  { value:'drip irrigation available',      label:'ड्रिप सिंचाई उपलब्ध'          },
]

const TREND_COLOR = { rising:'#2e7d32', falling:'#c0392b', stable:'#f57c00', volatile:'#1565c0' }
const TREND_LABEL = { rising:'↑ बढ़त', falling:'↓ गिरावट', stable:'→ स्थिर', volatile:'↕ अस्थिर' }
const RANK_LABELS = ['🥇 पहली पसंद', '🥈 दूसरी पसंद', '🥉 तीसरी पसंद']
const SCHEME_ICONS = ['🌾','💳','🛡️','💊','🏦']

/* ── Crop card ───────────────────────────────────────────────── */
function CropCard({ crop, rank }) {
  const [hov, setHov] = useState(false)
  const price = crop.mandiPrice || {}
  const trend = price.trend || 'stable'
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:'#fff', borderRadius:'20px', overflow:'hidden',
        boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        border:`1px solid ${hov ? 'rgba(46,168,79,.2)' : 'rgba(0,0,0,.05)'}`,
        transform: hov ? 'translateY(-5px)' : 'none',
        transition:'all .25s ease',
        animation:`slideUp .5s ease ${rank * 0.1}s both`,
      }}
    >
      {/* Card header */}
      <div style={{ background:'linear-gradient(135deg,#0a3d1f,#1a6b35)', padding:'20px 22px 16px', position:'relative' }}>
        <div style={{
          position:'absolute', top:'10px', right:'10px',
          background:'var(--gold)', color:'var(--green-deep)',
          fontSize:'11px', fontWeight:700, padding:'4px 10px', borderRadius:'50px',
        }}>{RANK_LABELS[rank]}</div>

        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'22px', fontWeight:800, color:'#fff' }}>{crop.name}</div>
        {crop.nameHindi && crop.nameHindi !== crop.name && (
          <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'13px', color:'rgba(255,255,255,.6)', marginTop:'2px' }}>{crop.nameHindi}</div>
        )}

        {/* Score bar */}
        <div style={{ marginTop:'12px', height:'5px', background:'rgba(255,255,255,.2)', borderRadius:'3px', overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${crop.suitabilityScore || 80}%`, background:'var(--gold-light)', borderRadius:'3px', transition:'width 1s ease' }} />
        </div>
        <div style={{ fontSize:'11px', color:'rgba(255,255,255,.6)', marginTop:'4px' }}>
          अनुकूलता: {crop.suitabilityScore || '–'}%
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding:'18px 22px' }}>
        {/* Stats grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'14px' }}>
          {[
            ['🌾 उपज/एकड़', crop.estimatedYield],
            ['📆 अवधि',     crop.growingDuration],
            ['💧 पानी',     crop.waterRequirement],
            ['💰 लाभ',      crop.profitPotential],
          ].map(([label, val]) => (
            <div key={label} style={{ background:'var(--cream)', padding:'9px 11px', borderRadius:'9px' }}>
              <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'11px', color:'var(--text-light)', fontWeight:600, textTransform:'uppercase' }}>{label}</div>
              <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'13px', fontWeight:700, color:'var(--text-dark)', marginTop:'2px' }}>{val || '–'}</div>
            </div>
          ))}
        </div>

        {/* Mandi box */}
        <div style={{
          background:'linear-gradient(135deg,#fff8e1,#fff3cd)',
          border:'1px solid #f5c842', borderRadius:'10px',
          padding:'11px 14px', marginBottom:'12px',
        }}>
          <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'11px', color:'var(--earth)', fontWeight:700, marginBottom:'4px' }}>
            📈 मंडी भाव पूर्वानुमान
          </div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontSize:'17px', fontWeight:800, color:'var(--green-deep)' }}>
            ₹{price.min || '–'}–{price.max || '–'}
          </span>
          <span style={{ fontSize:'11px', color:'var(--text-mid)', marginLeft:'4px' }}>{price.unit || '/quintal'}</span>
          <span style={{ fontSize:'12px', fontWeight:700, marginLeft:'8px', color: TREND_COLOR[trend] }}>
            {TREND_LABEL[trend]}
          </span>
          {price.msp && (
            <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'11px', color:'#666', marginTop:'2px' }}>
              MSP: ₹{price.msp}/quintal
            </div>
          )}
        </div>

        <p style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'13px', lineHeight:1.75, color:'var(--text-mid)', marginBottom:'10px' }}>
          {crop.whyRecommended}
        </p>

        {crop.risks && (
          <div style={{
            background:'#fff5f5', borderLeft:'3px solid var(--red)',
            padding:'7px 11px', borderRadius:'4px',
            fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'12px', color:'var(--red)',
          }}>⚠️ {crop.risks}</div>
        )}
      </div>
    </div>
  )
}

/* ── ADVISOR PAGE ────────────────────────────────────────────── */
export default function Advisor() {
  const [lang,    setLang]    = useState('hi')
  const [form,    setForm]    = useState({ location:'', soilType:'', season:'', waterAvailability:'', farmSize:'' })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [data,    setData]    = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    const { location, soilType, season, waterAvailability } = form
    if (!location || !soilType || !season || !waterAvailability) {
      setError(lang === 'hi' ? 'कृपया सभी जरूरी जानकारी भरें।' : 'Please fill in all required fields.')
      return
    }
    setError(''); setLoading(true); setData(null)
    try {
      const res = await fetch('/api/recommend', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ ...form, language: lang }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Server error')
      setData(json)
      setTimeout(() => document.getElementById('results-anchor')?.scrollIntoView({ behavior:'smooth' }), 100)
    } catch (e) {
      setError(e.message.includes('fetch')
        ? 'सर्वर से जुड़ नहीं सका। क्या backend चल रहा है? (npm run dev)'
        : e.message)
    } finally {
      setLoading(false)
    }
  }

  const rec = data?.recommendations
  const weather = data?.weather

  return (
    <>
      {/* ════ HERO ════ */}
      <section style={{
        background:'linear-gradient(145deg,#0a3d1f 0%,#1a6b35 60%,#0d5228 100%)',
        padding:'80px 28px 64px', position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'radial-gradient(ellipse 50% 60% at 80% 40%, rgba(232,166,21,.1) 0%, transparent 60%)',
        }}/>
        <div className="container" style={{ position:'relative', zIndex:1, textAlign:'center' }}>
          <div style={{ fontSize:'52px', animation:'sway 4s ease-in-out infinite', display:'inline-block', marginBottom:'16px' }}>🌾</div>
          <h1 style={{
            fontFamily:"'Syne',sans-serif",
            fontSize:'clamp(30px,5vw,52px)',
            fontWeight:800, color:'#fff', lineHeight:1.1, marginBottom:'14px',
          }}>
            AI फसल सलाहकार
          </h1>
          <p style={{
            fontFamily:"'Noto Sans Devanagari',sans-serif",
            fontSize:'16px', color:'rgba(255,255,255,.72)',
            lineHeight:1.75, maxWidth:'480px', margin:'0 auto',
          }}>
            अपनी खेत की जानकारी दें — Gemini AI सर्वश्रेष्ठ फसल, मंडी भाव और कैलेंडर तैयार करेगा।
          </p>
        </div>
      </section>

      {/* ════ FORM ════ */}
      <section style={{ padding:'48px 28px' }}>
        <div className="container">
          <div style={{
            background:'#fff', borderRadius:'24px',
            boxShadow:'var(--shadow-md)',
            padding:'clamp(24px,4vw,44px)',
            border:'1px solid rgba(0,0,0,.06)',
            maxWidth:'800px', margin:'0 auto',
          }}>
            {/* Lang toggle */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px', flexWrap:'wrap', gap:'12px' }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'18px', color:'var(--green-deep)' }}>
                📋 {lang === 'hi' ? 'खेत की जानकारी दर्ज करें' : 'Enter Your Farm Details'}
              </h2>
              <div style={{ display:'flex', gap:'8px' }}>
                {[['hi','हिंदी'],['en','English']].map(([l, lbl]) => (
                  <button
                    key={l} onClick={() => setLang(l)}
                    style={{
                      padding:'8px 18px', borderRadius:'50px',
                      border:`2px solid ${lang===l ? 'var(--green-bright)' : '#e4e4d8'}`,
                      background: lang===l ? 'rgba(46,168,79,.08)' : 'transparent',
                      fontFamily:"'Noto Sans Devanagari','DM Sans',sans-serif",
                      fontSize:'13px', fontWeight: lang===l ? 700 : 400,
                      color: lang===l ? 'var(--green-deep)' : 'var(--text-mid)',
                      cursor:'pointer', transition:'all .15s',
                    }}
                  >{lbl}</button>
                ))}
              </div>
            </div>

            {/* Grid of inputs */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:'18px', marginBottom:'24px' }}>
              {/* Location */}
              <div className="field">
                <label>{lang==='hi' ? '📍 स्थान / जिला *' : '📍 Location / District *'}</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                  placeholder={lang==='hi' ? 'जैसे: Lucknow, Varanasi' : 'e.g. Lucknow, Varanasi'}
                  onKeyDown={e => e.key==='Enter' && submit()}
                />
              </div>

              {/* Soil */}
              <div className="field">
                <label>{lang==='hi' ? '🪱 मिट्टी का प्रकार *' : '🪱 Soil Type *'}</label>
                <select value={form.soilType} onChange={e => set('soilType', e.target.value)}>
                  <option value="">-- {lang==='hi'?'चुनें':'Select'} --</option>
                  {SOIL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Season */}
              <div className="field">
                <label>{lang==='hi' ? '🌤️ मौसम / सीजन *' : '🌤️ Farming Season *'}</label>
                <select value={form.season} onChange={e => set('season', e.target.value)}>
                  <option value="">-- {lang==='hi'?'चुनें':'Select'} --</option>
                  {SEASON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Water */}
              <div className="field">
                <label>{lang==='hi' ? '💧 पानी की उपलब्धता *' : '💧 Water Availability *'}</label>
                <select value={form.waterAvailability} onChange={e => set('waterAvailability', e.target.value)}>
                  <option value="">-- {lang==='hi'?'चुनें':'Select'} --</option>
                  {WATER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Farm size */}
              <div className="field">
                <label>{lang==='hi' ? '🏡 खेत (एकड़)' : '🏡 Farm Size (Acres)'}</label>
                <input
                  type="number" min="0.1" step="0.5"
                  value={form.farmSize}
                  onChange={e => set('farmSize', e.target.value)}
                  placeholder={lang==='hi' ? 'जैसे: 2.5' : 'e.g. 2.5'}
                />
              </div>
            </div>

            {error && (
              <div style={{
                background:'#fff5f5', border:'1px solid #ffcdd2',
                borderLeft:'4px solid var(--red)',
                borderRadius:'10px', padding:'12px 16px', marginBottom:'16px',
                fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'14px', color:'#b71c1c',
              }}>❌ {error}</div>
            )}

            <button
              onClick={submit}
              disabled={loading}
              style={{
                width:'100%', padding:'17px',
                background: loading ? '#aaa' : 'linear-gradient(135deg,var(--green-bright),var(--green-mid))',
                color:'#fff', border:'none', borderRadius:'var(--radius-sm)',
                fontFamily:"'Syne',sans-serif", fontSize:'16px', fontWeight:700,
                cursor: loading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(46,168,79,.35)',
                transition:'all .15s',
              }}
            >
              {loading ? (
                <><span style={{ width:'20px',height:'20px',border:'3px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin 1s linear infinite',display:'inline-block' }} />
                  {lang==='hi' ? 'Gemini AI विश्लेषण कर रहा है...' : 'Gemini AI is analysing...'}</>
              ) : `🤖 ${lang==='hi' ? 'AI से फसल सुझाव प्राप्त करें' : 'Get AI Crop Recommendations'}`}
            </button>
          </div>
        </div>
      </section>

      {/* ════ RESULTS ════ */}
      {data && (
        <section id="results-anchor" style={{ padding:'0 28px 80px' }}>
          <div className="container">

            {/* Weather strip */}
            <div style={{
              background:'linear-gradient(135deg,#e3f2fd,#bbdefb)',
              border:'1px solid #90caf9', borderRadius:'16px',
              padding:'18px 26px', marginBottom:'22px',
              display:'flex', flexWrap:'wrap', gap:'24px', alignItems:'center',
            }}>
              {[
                [`${weather?.icon||'🌡️'} ${weather?.temperature}°C`, lang==='hi'?'तापमान':'Temperature'],
                [`💧 ${weather?.humidity}%`, lang==='hi'?'नमी':'Humidity'],
                [`🌬️ ${weather?.windSpeed} km/h`, lang==='hi'?'हवा':'Wind'],
                [`☁️ ${weather?.description}`, weather?.city],
              ].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'18px', fontWeight:700, color:'var(--blue)' }}>{val}</div>
                  <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'12px', color:'#5c7fa3' }}>{lbl}</div>
                </div>
              ))}
              {weather?.isFallback && <span style={{ marginLeft:'auto', fontSize:'12px', color:'#888', fontStyle:'italic' }}>⚠️ demo weather data</span>}
            </div>

            {/* Revenue hero */}
            <div style={{
              background:'linear-gradient(135deg,var(--green-deep),var(--green-mid))',
              borderRadius:'18px', padding:'32px', textAlign:'center', marginBottom:'28px',
            }}>
              <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'14px', color:'rgba(255,255,255,.75)', marginBottom:'6px' }}>
                {lang==='hi'?'अनुमानित आय':'Estimated Revenue'}
              </div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(28px,5vw,44px)', fontWeight:900, color:'var(--gold-light)', lineHeight:1 }}>
                {rec.expectedRevenue || '₹40,000–₹80,000'}
              </div>
              <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'13px', color:'rgba(255,255,255,.6)', marginTop:'6px' }}>
                {lang==='hi'?'प्रति एकड़ प्रति सीजन':'per acre per season'}
              </div>
            </div>

            {/* Weather alert */}
            {rec.weatherAlert && (
              <div style={{
                background:'#fff3e0', border:'1px solid #ffcc02',
                borderRadius:'12px', padding:'12px 18px', marginBottom:'20px',
                fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'13px', color:'#e65100',
              }}>⚠️ {rec.weatherAlert}</div>
            )}

            {/* Crop cards */}
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'20px', color:'var(--green-deep)', margin:'32px 0 16px', borderBottom:'3px solid var(--green-light)', paddingBottom:'10px' }}>
              🌱 {lang==='hi'?'शीर्ष अनुशंसित फसलें':'Top Recommended Crops'}
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:'22px' }}>
              {(rec.topCrops || []).map((crop, i) => <CropCard key={i} crop={crop} rank={i} />)}
            </div>

            {/* Farming Calendar */}
            {rec.farmingCalendar?.length > 0 && (
              <>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'20px', color:'var(--green-deep)', margin:'36px 0 16px', borderBottom:'3px solid var(--green-light)', paddingBottom:'10px' }}>
                  📅 {lang==='hi'?'मौसमी खेती कैलेंडर':'Seasonal Farming Calendar'}
                </h2>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(148px,1fr))', gap:'12px' }}>
                  {rec.farmingCalendar.map((c, i) => (
                    <div key={i} style={{
                      background:'#fff', borderRadius:'12px', padding:'14px',
                      textAlign:'center', boxShadow:'var(--shadow-sm)',
                      borderTop:'4px solid var(--green-bright)',
                    }}>
                      <div style={{ fontSize:'24px', marginBottom:'6px' }}>{c.icon || '📅'}</div>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'13px', color:'var(--green-deep)', marginBottom:'4px' }}>{c.month}</div>
                      <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'11px', color:'var(--text-mid)', lineHeight:1.5 }}>{c.activity}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Advisory cards */}
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'20px', color:'var(--green-deep)', margin:'36px 0 16px', borderBottom:'3px solid var(--green-light)', paddingBottom:'10px' }}>
              🧪 {lang==='hi'?'खेती सलाह':'Farming Advice'}
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'16px' }}>
              {[
                { icon:'🪱', hi:'मिट्टी तैयारी',   en:'Soil Preparation',    text: rec.soilPreparation    },
                { icon:'💧', hi:'सिंचाई सलाह',     en:'Irrigation Advice',   text: rec.irrigationAdvice   },
                { icon:'🧪', hi:'उर्वरक अनुसूची', en:'Fertilizer Schedule', text: rec.fertilizerSchedule },
                { icon:'🐛', hi:'कीट प्रबंधन',    en:'Pest Management',     text: rec.pestManagement     },
              ].filter(c => c.text).map((c, i) => (
                <div key={i} style={{ background:'#fff', borderRadius:'16px', padding:'22px', boxShadow:'var(--shadow-sm)', border:'1px solid rgba(0,0,0,.05)' }}>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'14px', color:'var(--green-deep)', marginBottom:'10px' }}>
                    {c.icon} {lang==='hi' ? c.hi : c.en}
                  </h3>
                  <p style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'13px', lineHeight:1.75, color:'var(--text-mid)' }}>{c.text}</p>
                </div>
              ))}
            </div>

            {/* Govt schemes */}
            {rec.governmentSchemes?.length > 0 && (
              <>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'20px', color:'var(--green-deep)', margin:'36px 0 16px', borderBottom:'3px solid var(--green-light)', paddingBottom:'10px' }}>
                  🏛️ {lang==='hi'?'सरकारी योजनाएँ':'Government Schemes'}
                </h2>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                  {rec.governmentSchemes.map((s, i) => (
                    <div key={i} style={{
                      background:'#fff', borderRadius:'12px', padding:'15px 18px',
                      display:'flex', alignItems:'center', gap:'14px',
                      boxShadow:'var(--shadow-sm)', borderLeft:'4px solid var(--gold)',
                    }}>
                      <span style={{ fontSize:'26px', flexShrink:0 }}>{SCHEME_ICONS[i % SCHEME_ICONS.length]}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'14px', color:'var(--green-deep)' }}>{s.name}</div>
                        <div style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'12px', color:'var(--text-mid)', marginTop:'2px' }}>{s.benefit}</div>
                      </div>
                      {s.link && (
                        <a href={`https://${s.link}`} target="_blank" rel="noopener"
                          style={{ fontSize:'12px', color:'var(--blue)', fontWeight:600, flexShrink:0 }}>
                          🔗 {s.link}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Loan card */}
            {rec.bankLoanAdvice && (
              <>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'20px', color:'var(--green-deep)', margin:'36px 0 16px', borderBottom:'3px solid var(--green-light)', paddingBottom:'10px' }}>
                  🏦 {lang==='hi'?'बैंक ऋण सहायता':'Bank Loan Support'}
                </h2>
                <div style={{ background:'#fff', borderRadius:'16px', padding:'26px', boxShadow:'var(--shadow-sm)', border:'1px solid rgba(0,0,0,.05)' }}>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'15px', color:'var(--blue)', marginBottom:'10px' }}>🏦 {lang==='hi'?'बैंक ऋण सलाह':'Bank Loan Advisory'}</h3>
                  <p style={{ fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:'14px', lineHeight:1.8, color:'var(--text-mid)' }}>{rec.bankLoanAdvice}</p>
                </div>
              </>
            )}

            {/* Action buttons */}
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginTop:'36px' }}>
              <button onClick={() => window.print()}
                style={{
                  flex:1, minWidth:'200px', padding:'16px 24px',
                  background:'linear-gradient(135deg,#1565c0,#1976d2)',
                  color:'#fff', border:'none', borderRadius:'var(--radius-sm)',
                  fontFamily:"'Syne',sans-serif", fontSize:'14px', fontWeight:700,
                  cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                  boxShadow:'0 4px 16px rgba(21,101,192,.35)',
                  transition:'transform .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform=''}
              >🖨️ {lang==='hi'?'PDF रिपोर्ट प्रिंट करें':'Print PDF Report'}</button>

              <button
                onClick={async () => {
                  if (navigator.share) await navigator.share({ title:'किसान AI Report', url: window.location.href })
                  else { await navigator.clipboard.writeText(window.location.href); alert(lang==='hi'?'लिंक कॉपी हो गया!':'Link copied!') }
                }}
                style={{
                  flex:1, minWidth:'200px', padding:'16px 24px',
                  background:'linear-gradient(135deg,var(--gold),var(--gold-light))',
                  color:'var(--green-deep)', border:'none', borderRadius:'var(--radius-sm)',
                  fontFamily:"'Syne',sans-serif", fontSize:'14px', fontWeight:700,
                  cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                  boxShadow:'0 4px 16px rgba(232,166,21,.35)',
                  transition:'transform .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform=''}
              >📤 {lang==='hi'?'रिपोर्ट साझा करें':'Share Report'}</button>
            </div>

          </div>
        </section>
      )}
    </>
  )
}
