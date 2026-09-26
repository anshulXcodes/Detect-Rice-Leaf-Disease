export default function ConfidenceScore({ confidence, size = 108 }) {
  const percent = Math.round(confidence * 100)
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  const color =
    percent >= 85 ? '#3c6e30' : percent >= 60 ? '#6ea75d' : '#c98a3c'

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0eedd"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <span className="text-2xl font-semibold text-paddy-950">{percent}%</span>
          <p className="text-[11px] text-paddy-900/50 leading-tight">confidence</p>
        </div>
      </div>
    </div>
  )
}
