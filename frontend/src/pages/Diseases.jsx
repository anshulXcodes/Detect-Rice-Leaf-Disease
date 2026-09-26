import DiseaseCard from '../components/DiseaseCard.jsx'

const DISEASES = [
  {
    name: 'Bacterial Leaf Blight',
    emoji: '🦠',
    description:
      'A bacterial disease causing water-soaked streaks along leaf margins that turn straw-white.',
    symptoms: [
      'Water-soaked lesions at leaf tips or margins',
      'Lesions turning yellow to straw-white',
      'Wilting of young seedlings in severe cases',
    ],
  },
  {
    name: 'Brown Spot',
    emoji: '🟤',
    description:
      'A fungal leaf spot disease common in nutrient-poor soils, appearing as brown oval lesions.',
    symptoms: [
      'Small circular to oval brown lesions with grey centers',
      'Lesions scattered across older leaves',
      'Discolored grains at the panicle stage',
    ],
  },
  {
    name: 'Healthy Rice Leaf',
    emoji: '🌱',
    isHealthy: true,
    description: 'No disease detected — the leaf shows the uniform color and texture of a healthy plant.',
    symptoms: [],
  },
  {
    name: 'Leaf Blast',
    emoji: '🔥',
    description:
      'One of the most destructive rice diseases, producing spindle-shaped lesions that spread rapidly.',
    symptoms: [
      'Spindle/diamond-shaped lesions with grey centers',
      'Lesions coalescing to blight entire leaves',
      'Neck/node infection causing panicles to break',
    ],
  },
  {
    name: 'Leaf Scald',
    emoji: '🟠',
    description:
      'A fungal disease producing zonate, scalded-looking lesions starting from the leaf tip.',
    symptoms: [
      'Alternating light-tan and brown zonate bands',
      'Scalded, water-soaked appearance',
    ],
  },
  {
    name: 'Sheath Blight',
    emoji: '🍂',
    description:
      'A soil-borne fungal disease producing greenish-grey lesions on the leaf sheath.',
    symptoms: [
      'Oval, greenish-grey lesions with irregular margins',
      'Lesions climbing upward through the canopy',
      'White fungal mycelium in humid conditions',
    ],
  },
]

export default function Diseases() {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-paddy-950">Disease Classes</h1>
        <p className="mt-3 text-paddy-900/60 max-w-lg mx-auto">
          Crop Dekho recognizes 6 conditions from a single rice leaf photo, matching the trained model classes.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DISEASES.map((d) => (
          <DiseaseCard key={d.name} {...d} />
        ))}
      </div>
    </div>
  )
}
