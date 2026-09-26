import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function DiseaseCard({ name, emoji, description, symptoms, isHealthy }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-3xl bg-white shadow-soft hover:shadow-card transition-shadow p-6 flex flex-col">
      <div
        className={`w-14 h-14 rounded-2xl grid place-items-center text-2xl mb-4 ${
          isHealthy ? 'bg-paddy-100' : 'bg-amber-50'
        }`}
      >
        {emoji}
      </div>
      <h3 className="text-lg font-semibold text-paddy-950">{name}</h3>
      <p className="mt-2 text-sm text-paddy-900/65 leading-relaxed">{description}</p>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-paddy-700 self-start"
      >
        Learn More
        <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && symptoms?.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-paddy-100 pt-3">
          {symptoms.map((s, i) => (
            <li key={i} className="text-sm text-paddy-900/70 pl-4 relative">
              <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-paddy-500" />
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
