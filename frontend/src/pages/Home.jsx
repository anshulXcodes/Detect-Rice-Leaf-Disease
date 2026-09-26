import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'

const steps = [
  {
    step: 'STEP 1',
    emoji: '📸',
    title: 'Upload Leaf',
    text: 'Take or upload a clear JPG or PNG photo of a rice leaf.',
  },
  {
    step: 'STEP 2',
    emoji: '🤖',
    title: 'AI Analysis',
    text: 'The existing trained MobileNetV2 model classifies visual symptoms into one of 6 conditions.',
  },
  {
    step: 'STEP 3',
    emoji: '🌱',
    title: 'Get Treatment Guidance',
    text: 'Receive causes, symptoms, immediate actions, treatment, and prevention from the remedy engine.',
  },
]

export default function Home() {
  return (
    <div>
      <Hero />

      <section id="how-it-works" className="bg-white border-y border-paddy-100">
        <div className="container-page py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-paddy-950">
            How It Works
          </h2>
          <p className="mt-2 text-center text-paddy-900/60 max-w-lg mx-auto">
            Image classification is performed by the existing trained MobileNetV2
            model — not a mock result.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="rounded-2xl bg-paddy-50 p-6 text-center">
                <p className="text-xs font-semibold tracking-widest text-paddy-700">{item.step}</p>
                <div className="mx-auto mt-3 mb-4 w-14 h-14 rounded-full bg-white shadow-soft grid place-items-center text-2xl">
                  {item.emoji}
                </div>
                <h3 className="font-semibold text-paddy-950">{item.title}</h3>
                <p className="mt-2 text-sm text-paddy-900/60">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/detect"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-paddy-600 text-white font-semibold hover:bg-paddy-700 transition-colors"
            >
              Try it now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
