export default function RemedyCard({ icon, title, items, tone = 'default' }) {
  const toneClasses =
    tone === 'alert'
      ? 'border-amber-200 bg-amber-50'
      : tone === 'treatment'
      ? 'border-paddy-200 bg-paddy-50'
      : 'border-paddy-100 bg-white'

  if (!items || items.length === 0) return null

  return (
    <div className={`rounded-2xl border p-5 sm:p-6 shadow-soft ${toneClasses}`}>
      <h4 className="flex items-center gap-2 font-semibold text-paddy-950 mb-3">
        <span aria-hidden>{icon}</span>
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-paddy-900/80 leading-relaxed pl-4 relative">
            <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-paddy-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
