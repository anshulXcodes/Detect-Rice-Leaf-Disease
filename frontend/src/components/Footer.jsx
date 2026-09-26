import { Sprout } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-paddy-100 bg-white">
      <div className="container-page py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-paddy-900">
          <Sprout size={18} className="text-paddy-600" />
          <span className="font-semibold">🌾 Crop Dekho</span>
        </div>
        <p className="text-sm text-paddy-900/50 text-center">
          AI-powered rice leaf disease detection & remedy system
        </p>
        <p className="text-xs text-paddy-900/40">© {new Date().getFullYear()} Crop Dekho</p>
      </div>
    </footer>
  )
}
