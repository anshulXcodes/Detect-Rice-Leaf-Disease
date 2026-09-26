import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ScanLine, Leaf, Images, Cpu, Zap } from 'lucide-react'

const stats = [
  { icon: <Leaf size={18} />, label: '6 Disease Classes' },
  { icon: <Images size={18} />, label: '3,829+ Training Images' },
  { icon: <Cpu size={18} />, label: 'MobileNetV2' },
  { icon: <Zap size={18} />, label: 'CPU Optimized' },
]

export default function Hero() {
  return (
    <section className="container-page pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block text-sm font-medium text-paddy-700 bg-paddy-100 px-3 py-1 rounded-full mb-5">
          🌾 Crop Dekho
        </span>
        <h1 className="text-4xl md:text-5xl leading-[1.1] font-semibold text-paddy-950">
          Detect Rice Leaf Diseases with AI
        </h1>
        <p className="mt-5 text-lg text-paddy-900/75 max-w-md">
          Upload a photo of your rice leaf and get an AI-powered diagnosis with
          actionable treatment and prevention guidance.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/detect"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-paddy-600 text-white font-semibold hover:bg-paddy-700 transition-colors"
          >
            Detect Disease <ArrowRight size={18} />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-paddy-300 text-paddy-800 font-semibold hover:bg-paddy-50 transition-colors"
          >
            How It Works
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2.5 rounded-2xl bg-white shadow-soft px-3 py-3"
            >
              <span className="w-8 h-8 rounded-xl bg-paddy-100 text-paddy-700 grid place-items-center shrink-0">
                {stat.icon}
              </span>
              <span className="text-sm font-medium text-paddy-900 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative mx-auto w-full max-w-sm"
      >
        <div className="relative w-full aspect-square rounded-3xl bg-paddy-100 shadow-card overflow-hidden grid place-items-center">
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 text-paddy-600" fill="currentColor">
            <path d="M100 20c40 30 60 70 40 130-30-10-70-10-90 20-20-70 10-120 50-150z" opacity="0.9" />
            <path d="M100 40c25 25 38 55 26 100" stroke="#f2f8f1" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
          <motion.div
            className="absolute left-0 right-0 h-1 bg-paddy-500/70 shadow-[0_0_20px_4px_rgba(79,138,63,0.5)]"
            initial={{ top: '10%' }}
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="absolute -bottom-4 left-4 right-4 sm:left-auto sm:-right-4 sm:w-auto bg-white shadow-soft rounded-2xl px-4 py-3 flex items-center gap-2">
          <ScanLine size={18} className="text-paddy-600 shrink-0" />
          <span className="text-sm font-medium text-paddy-900">AI scanning in progress</span>
        </div>
      </motion.div>
    </section>
  )
}
