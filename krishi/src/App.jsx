// ============================================================
//  src/App.jsx  –  Root component: Router + Navbar + Footer
// ============================================================
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'

import Home     from './pages/Home'
import About    from './pages/About'
import Contact  from './pages/Contact'
import Advisor  from './pages/Advisor'

// ── Page transition wrapper ───────────────────────────────────
function PageWrapper({ children }) {
  const { pathname } = useLocation()
  return (
    <main key={pathname} className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      {children}
    </main>
  )
}

// ── Navbar ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const NAV_LINKS = [
    { to: '/',        label: 'Home',    emoji: '🏠' },
    { to: '/about',   label: 'About',   emoji: '🌿' },
    { to: '/contact', label: 'Contact', emoji: '📞' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: 'var(--nav-h)',
      background: scrolled
        ? 'rgba(10,61,31,.96)'
        : 'linear-gradient(180deg,rgba(10,61,31,.9) 0%,rgba(10,61,31,0) 100%)',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,.07)' : 'none',
      transition: 'all .3s ease',
      display: 'flex', alignItems: 'center',
      padding: '0 32px',
    }}>
      {/* Logo */}
      <Link to="/" style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '20px',
        color: '#fff', letterSpacing: '-.3px',
      }}>
        <span style={{ fontSize: '28px', animation: 'sway 4s ease-in-out infinite', display: 'inline-block' }}>🌾</span>
        किसान <span style={{ color: 'var(--gold-light)', marginLeft: '4px' }}>AI</span>
      </Link>

      {/* Desktop nav */}
      <nav style={{
        marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px',
      }} className="desktop-nav">
        {NAV_LINKS.map(({ to, label, emoji }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 18px',
              borderRadius: '50px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px', fontWeight: 500,
              color: isActive ? 'var(--gold-light)' : 'rgba(255,255,255,.75)',
              background: isActive ? 'rgba(232,166,21,.15)' : 'transparent',
              border: isActive ? '1px solid rgba(232,166,21,.25)' : '1px solid transparent',
              transition: 'all .2s',
            })}
          >
            <span>{emoji}</span> {label}
          </NavLink>
        ))}

        <Link to="/advisor" className="btn-gold" style={{
          marginLeft: '12px', padding: '10px 22px', fontSize: '13px',
        }}>
          🤖 Get AI Advice
        </Link>
      </nav>

      {/* Mobile burger */}
      <button
        onClick={() => setMenuOpen(v => !v)}
        className="burger-btn"
        aria-label="Toggle menu"
        style={{
          marginLeft: 'auto', background: 'none', border: '1px solid rgba(255,255,255,.2)',
          borderRadius: '8px', color: '#fff', fontSize: '18px',
          padding: '7px 10px', display: 'none',
        }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 'var(--nav-h)', left: 0, right: 0,
          background: 'rgba(10,61,31,.97)', backdropFilter: 'blur(20px)',
          padding: '16px 20px 24px',
          display: 'flex', flexDirection: 'column', gap: '6px',
          borderBottom: '1px solid rgba(255,255,255,.1)',
          animation: 'slideUp .2s ease both',
        }}>
          {NAV_LINKS.map(({ to, label, emoji }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: '13px 16px', borderRadius: '12px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px', fontWeight: 500,
                color: isActive ? 'var(--gold-light)' : 'rgba(255,255,255,.8)',
                background: isActive ? 'rgba(232,166,21,.15)' : 'transparent',
              })}
            >
              {emoji} {label}
            </NavLink>
          ))}
          <Link to="/advisor" style={{
            marginTop: '8px', padding: '14px 16px',
            background: 'linear-gradient(135deg,var(--gold),var(--gold-light))',
            color: 'var(--green-deep)', borderRadius: '12px',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: '14px', textAlign: 'center',
          }}>
            🤖 Get AI Crop Advice
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .desktop-nav { display: none !important; }
          .burger-btn  { display: block !important; }
        }
      `}</style>
    </header>
  )
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  const YEAR = new Date().getFullYear()
  return (
    <footer style={{
      background: 'var(--green-deep)',
      color: 'rgba(255,255,255,.6)',
      padding: '56px 28px 36px',
      marginTop: '80px',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '40px',
        paddingBottom: '36px',
        borderBottom: '1px solid rgba(255,255,255,.09)',
      }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '22px', color: '#fff', marginBottom: '12px' }}>
            🌾 किसान AI
          </div>
          <p style={{ fontFamily: "'Noto Sans Devanagari',sans-serif", fontSize: '13px', lineHeight: 1.8 }}>
            AI-powered crop advisory for Indian farmers. Smarter decisions, better harvests.
          </p>
        </div>

        {/* Pages */}
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: '#fff', marginBottom: '14px', fontSize: '13px', letterSpacing: '1px' }}>
            PAGES
          </div>
          {[['/', 'Home'], ['/about', 'About'], ['/contact', 'Contact'], ['/advisor', 'AI Advisor']].map(([to, label]) => (
            <Link key={to} to={to} style={{
              display: 'block', fontSize: '13px',
              color: 'rgba(255,255,255,.55)', marginBottom: '8px',
              transition: 'color .15s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.55)'}
            >{label}</Link>
          ))}
        </div>

        {/* Gov links */}
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: '#fff', marginBottom: '14px', fontSize: '13px', letterSpacing: '1px' }}>
            GOVERNMENT PORTALS
          </div>
          {[
            ['pmkisan.gov.in', 'PM-KISAN'],
            ['pmfby.gov.in', 'PMFBY Insurance'],
            ['agricoop.gov.in', 'Agriculture Dept'],
            ['soilhealth.dac.gov.in', 'Soil Health Card'],
          ].map(([href, label]) => (
            <a key={href} href={`https://${href}`} target="_blank" rel="noopener" style={{
              display: 'block', fontSize: '13px',
              color: 'rgba(255,255,255,.55)', marginBottom: '8px',
              transition: 'color .15s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.55)'}
            >
              {label} ↗
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: '#fff', marginBottom: '14px', fontSize: '13px', letterSpacing: '1px' }}>
            CONTACT
          </div>
          <p style={{ fontSize: '13px', lineHeight: 2 }}>
            📧 support@kisanai.in<br />
            📞 1800-XXX-XXXX (Toll Free)<br />
            🕐 Mon–Sat  9am – 6pm IST
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1100px', margin: '24px auto 0',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
        fontSize: '12px',
      }}>
        <span>© {YEAR} Kisan AI. Built with ❤️ for Indian farmers.</span>
        <span>Powered by Gemini AI + OpenWeatherMap</span>
      </div>
    </footer>
  )
}

// ── App root ──────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageWrapper>
        <Routes>
          <Route path="/"        element={<Home />}    />
          <Route path="/about"   element={<About />}   />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advisor" element={<Advisor />} />
        </Routes>
      </PageWrapper>
      <Footer />
    </BrowserRouter>
  )
}
