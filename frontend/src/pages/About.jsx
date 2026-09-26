import { Cpu, Layers, Leaf } from 'lucide-react'

const facts = [
  { icon: <Layers size={20} />, label: 'Architecture', value: 'MobileNetV2 + GAP + Dropout + Dense(6)' },
  { icon: <Cpu size={20} />, label: 'Input size', value: '128 × 128 px' },
  { icon: <Leaf size={20} />, label: 'Classes', value: '6 rice leaf conditions' },
]

export default function About() {
  return (
    <div className="container-page py-12 sm:py-16 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl font-semibold text-paddy-950">About Crop Dekho</h1>
      <p className="mt-4 text-paddy-900/70 leading-relaxed">
        Crop Dekho is a lightweight computer-vision tool built for farmers and
        field agronomists. Upload a photo of a rice leaf and get an instant AI
        diagnosis, paired with clear, actionable remedy guidance — all running
        on a compact model efficient enough for everyday hardware.
      </p>

      <div className="mt-8 space-y-4">
        {facts.map((f) => (
          <div key={f.label} className="flex items-center gap-4 rounded-2xl bg-white shadow-soft p-4">
            <div className="w-10 h-10 rounded-xl bg-paddy-100 text-paddy-700 grid place-items-center shrink-0">
              {f.icon}
            </div>
            <div>
              <p className="text-sm text-paddy-900/50">{f.label}</p>
              <p className="font-medium text-paddy-950">{f.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-paddy-50 p-5 text-sm text-paddy-900/70 leading-relaxed">
        Crop Dekho is a diagnostic aid, not a substitute for professional
        agronomic advice. For chemical treatments, always confirm product and
        dosage with your local agricultural extension office.
      </div>
    </div>
  )
}
