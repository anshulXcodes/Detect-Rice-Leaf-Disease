import { motion } from 'framer-motion'

export default function LoadingState() {
  return (
    <div className="w-full rounded-3xl bg-white shadow-card p-10 sm:p-14 text-center">
      <div className="relative mx-auto w-20 h-20">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-paddy-100"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-paddy-600 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-paddy-950">Analyzing your rice leaf...</h3>
      <p className="mt-2 text-paddy-900/60">AI is examining visual symptoms</p>
    </div>
  )
}
