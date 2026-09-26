import { motion } from 'framer-motion'
import { AlertTriangle, Search, ShieldAlert, Pill, ShieldCheck, Leaf, Sprout } from 'lucide-react'
import ConfidenceScore from './ConfidenceScore.jsx'
import RemedyCard from './RemedyCard.jsx'

export default function PredictionResult({ result, previewUrl, onReset }) {
  if (!result) return null

  const {
    disease,
    confidence,
    is_healthy,
    low_confidence,
    description,
    cause,
    symptoms,
    immediate_actions,
    treatment,
    prevention,
    disclaimer,
  } = result

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-6"
    >
      {/* Top summary card */}
      <div className="rounded-3xl bg-white shadow-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <img
            src={previewUrl}
            alt="Analyzed rice leaf"
            className="w-32 h-32 rounded-2xl object-cover shrink-0"
          />

          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-medium text-paddy-700 uppercase tracking-wide mb-1">
              AI Diagnosis
            </p>
            {is_healthy ? (
              <h2 className="text-2xl sm:text-3xl font-semibold text-paddy-800 flex items-center justify-center sm:justify-start gap-2">
                <Sprout size={26} /> 🌱 Your rice leaf appears healthy.
              </h2>
            ) : (
              <>
                <p className="text-xs uppercase tracking-wide text-paddy-900/45">Disease</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-paddy-950">{disease}</h2>
              </>
            )}
            <p className="mt-2 text-paddy-900/60 max-w-md">{description}</p>

            {low_confidence && (
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                <AlertTriangle size={14} />
                Confidence is on the lower side — try a clearer, well-lit photo for a more reliable result.
              </p>
            )}
          </div>

          <ConfidenceScore confidence={confidence} />
        </div>

        <button
          onClick={onReset}
          className="mt-6 text-sm font-semibold text-paddy-700 hover:text-paddy-800 underline underline-offset-4"
        >
          Analyze another leaf
        </button>
      </div>

      {is_healthy ? (
        <div className="grid sm:grid-cols-1 gap-5">
          <RemedyCard icon={<ShieldCheck size={18} />} title="Recommended Preventive Practices" items={prevention} tone="treatment" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          <RemedyCard icon={<Leaf size={18} />} title="Common Symptoms" items={symptoms} />
          <RemedyCard icon={<Search size={18} />} title="Possible Causes" items={[cause]} />
          <RemedyCard icon={<ShieldAlert size={18} />} title="Immediate Actions" items={immediate_actions} tone="alert" />
          <RemedyCard icon={<Pill size={18} />} title="Treatment" items={treatment} tone="treatment" />
          <RemedyCard icon={<ShieldCheck size={18} />} title="Prevention" items={prevention} />
        </div>
      )}

      {!is_healthy && disclaimer && (
        <p className="text-xs text-paddy-900/50 text-center px-4">{disclaimer}</p>
      )}
    </motion.div>
  )
}
