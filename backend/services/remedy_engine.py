"""
remedy_engine.py

Pure lookup/data layer for Crop Dekho.

This module is intentionally kept separate from the ML inference code
(predictor.py). It knows nothing about TensorFlow, images, or the model —
it only maps a predicted class name to structured remedy information that
the API can serialize back to the frontend.

IMPORTANT — chemical treatment disclaimer:
The `treatment` entries below are carried over as-is from the project's
own training notebook (main.ipynb) and reflect commonly published
agricultural-extension guidance for these rice diseases. They are kept
here in a single, clearly-labeled place so they can be reviewed and
swapped for verified, locally-applicable guidance (e.g. from a state
agricultural university or the local Krishi Vigyan Kendra) before this
system is used to make real treatment decisions. Every response also
carries a `disclaimer` field for the frontend to display alongside any
treatment content.
"""

from typing import Dict, List, TypedDict


class RemedyInfo(TypedDict):
    display_name: str
    status: str
    description: str
    cause: str
    symptoms: List[str]
    immediate_actions: List[str]
    treatment: List[str]
    prevention: List[str]


# Canonical class order — MUST match the index order the model was
# trained with (Keras' ImageDataGenerator.flow_from_directory sorts
# class subfolders alphabetically). Do not reorder this list.
CLASS_NAMES: List[str] = [
    "Bacterial_Leaf_Blight",
    "Brown_Spot",
    "Healthy_Ric_Leaf",
    "Leaf_Blast",
    "Leaf_scald",
    "Sheath_Blight",
]

DISCLAIMER = (
    "Treatment and dosage information is general agricultural guidance carried "
    "over from public extension sources. Always confirm product choice and "
    "dosage with your local agricultural extension office before applying any "
    "chemical treatment."
)

REMEDY_DATABASE: Dict[str, RemedyInfo] = {
    "Bacterial_Leaf_Blight": {
        "display_name": "Bacterial Leaf Blight",
        "status": "Diseased",
        "description": (
            "A bacterial disease that causes water-soaked streaks along the leaf "
            "margins that turn yellow, then straw-white, and can wilt entire "
            "seedlings under severe infection."
        ),
        "cause": (
            "Bacterium Xanthomonas oryzae pv. oryzae, spread by wind, rain "
            "splash, and irrigation water in warm, humid conditions."
        ),
        "symptoms": [
            "Water-soaked lesions starting at leaf tips or margins",
            "Lesions turning yellow to straw-white with wavy edges",
            "Wilting of young seedlings (kresek phase) in severe cases",
            "Milky bacterial ooze on lesions in early morning",
        ],
        "immediate_actions": [
            "Stop nitrogen (urea) top-dressing — excess nitrogen accelerates spread",
            "Drain standing water from the field where possible",
            "Remove and destroy severely infected plants/leaves",
        ],
        "treatment": [
            "Spray copper oxychloride (~2.5 g/L water) mixed with streptocycline "
            "(~0.15 g/L water)",
        ],
        "prevention": [
            "Use resistant/tolerant seed varieties",
            "Avoid clipping seedling leaf tips during transplanting",
            "Practice balanced NPK fertilization, avoiding excess nitrogen",
        ],
    },
    "Brown_Spot": {
        "display_name": "Brown Spot",
        "status": "Diseased",
        "description": (
            "A fungal leaf spot disease common on nutrient-poor soils, appearing "
            "as small circular to oval brown lesions across the leaf blade."
        ),
        "cause": (
            "Fungus Bipolaris oryzae, usually aggravated by potassium- or "
            "silicon-deficient soil and general plant stress."
        ),
        "symptoms": [
            "Small circular to oval brown lesions with a grey/white center",
            "Lesions scattered across older leaves first",
            "Blackened, discolored grains at the panicle stage",
        ],
        "immediate_actions": [
            "Check soil fertility and correct potassium deficiency",
            "Apply muriate of potash (potassium fertilizer) to strengthen plants",
        ],
        "treatment": [
            "Foliar spray of mancozeb (~2.0 g/L water) or propiconazole "
            "(~1.0 mL/L water) at first sign of infection",
        ],
        "prevention": [
            "Treat seeds with carbendazim (~2 g/kg seed) before sowing",
            "Maintain balanced soil fertility, especially potassium and silicon",
        ],
    },
    "Healthy_Ric_Leaf": {
        "display_name": "Healthy Rice Leaf",
        "status": "Healthy",
        "description": (
            "No signs of disease detected. The leaf shows the uniform green "
            "color and texture expected of a healthy rice plant."
        ),
        "cause": "No disease detected.",
        "symptoms": [],
        "immediate_actions": [
            "No intervention needed — continue standard irrigation and monitoring",
        ],
        "treatment": [],
        "prevention": [
            "Maintain balanced NPK fertilization",
            "Inspect leaves weekly, especially during humid weather",
            "Keep field bunds free of weeds to maintain airflow",
        ],
    },
    "Leaf_Blast": {
        "display_name": "Leaf Blast",
        "status": "Diseased",
        "description": (
            "One of the most destructive rice diseases, producing spindle-"
            "shaped lesions that can rapidly kill leaves under favorable "
            "weather."
        ),
        "cause": (
            "Fungus Magnaporthe oryzae, favored by high nitrogen levels, "
            "cloudy skies, and frequent light drizzle."
        ),
        "symptoms": [
            "Spindle/diamond-shaped lesions with grey centers and brown margins",
            "Lesions coalescing to blight entire leaves in severe cases",
            "Neck/node infection causing panicles to break (neck blast)",
        ],
        "immediate_actions": [
            "Avoid draining the field completely — drought stress worsens blast",
            "Split nitrogen fertilizer applications instead of one large dose",
        ],
        "treatment": [
            "Apply tricyclazole 75% WP (~0.6 g/L water) or isoprothiolane "
            "(~1.5 mL/L water)",
        ],
        "prevention": [
            "Destroy diseased crop residue after harvest",
            "Use silicon-based soil amendments to strengthen cell walls",
        ],
    },
    "Leaf_scald": {
        "display_name": "Leaf Scald",
        "status": "Diseased",
        "description": (
            "A fungal disease producing zonate, scalded-looking lesions "
            "starting from the leaf tip, common in dense, wet canopies."
        ),
        "cause": (
            "Fungus Microdochium oryzae (syn. Rhynchosporium oryzae), "
            "triggered by heavy wet weather, high nitrogen, and close plant "
            "spacing."
        ),
        "symptoms": [
            "Alternating light-tan and brown zonate bands from the leaf tip",
            "A scalded, water-soaked appearance on affected areas",
        ],
        "immediate_actions": [
            "Halt heavy nitrogen top-dressing",
            "Remove weeds around field bunds to improve airflow",
        ],
        "treatment": [
            "Spray benomyl or carbendazim (~1.0 g/L water), or mancozeb "
            "(~2.5 g/L water)",
        ],
        "prevention": [
            "Avoid dense planting/close spacing",
            "Treat seeds with hot water or fungicide before planting",
        ],
    },
    "Sheath_Blight": {
        "display_name": "Sheath Blight",
        "status": "Diseased",
        "description": (
            "A soil-borne fungal disease producing oval, greenish-grey lesions "
            "on the leaf sheath that can climb the plant and reduce yield in "
            "dense canopies."
        ),
        "cause": (
            "Soil-borne fungus Rhizoctonia solani, thriving in high humidity, "
            "warm temperatures (28-32 C), and dense plant canopies."
        ),
        "symptoms": [
            "Oval, greenish-grey lesions with irregular margins on leaf sheaths",
            "Lesions climbing upward through the canopy over time",
            "White fungal mycelium visible in humid conditions",
        ],
        "immediate_actions": [
            "Drain the field for a few days to reduce humidity near stems/sheaths",
        ],
        "treatment": [
            "Spray hexaconazole 5% EC (~2.0 mL/L water) or validamycin 3% L "
            "(~2.0 mL/L water) directed at the base of the plants",
        ],
        "prevention": [
            "Practice alternate wetting and drying (AWD) irrigation",
            "Apply Trichoderma viride to the soil before planting",
        ],
    },
}


def get_remedy(class_name: str) -> RemedyInfo:
    """
    Return the structured remedy record for a raw model class name
    (e.g. "Brown_Spot"). Raises KeyError if the class name is unknown,
    which should never happen if CLASS_NAMES stays in sync with this map.
    """
    return REMEDY_DATABASE[class_name]
