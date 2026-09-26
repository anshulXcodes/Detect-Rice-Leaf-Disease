import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Sprout } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/detect', label: 'Detect' },
  { to: '/diseases', label: 'Diseases' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-husk-50/90 backdrop-blur border-b border-paddy-100">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid place-items-center w-9 h-9 rounded-full bg-paddy-600 text-white">
            <Sprout size={18} />
          </span>
          <span className="text-lg font-semibold tracking-tight">🌾 Crop Dekho</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-paddy-700' : 'text-paddy-900/70 hover:text-paddy-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/detect"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-paddy-600 text-white hover:bg-paddy-700 transition-colors"
          >
            Detect Disease
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-paddy-900 min-h-11 min-w-11"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-paddy-100 bg-husk-50">
          <div className="container-page py-3 flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-base font-medium border-b border-paddy-100/70 ${
                    isActive ? 'text-paddy-700' : 'text-paddy-900/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/detect"
              onClick={() => setOpen(false)}
              className="mt-2 mb-1 text-center text-base font-semibold px-4 py-3 rounded-full bg-paddy-600 text-white"
            >
              Detect Disease
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
