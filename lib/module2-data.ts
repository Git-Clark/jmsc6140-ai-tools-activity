// Module 2: the five reporting topics and their icon artwork, ported
// verbatim (including file paths) from the prototype's TOPICS/ICONS.

export interface Topic {
  name: string;
  scope: string;
  file: string;
}

export const TOPICS: Topic[] = [
  {
    "name": "The Survival of Hong Kong's Neon Heritage",
    "scope": "Track how many of Hong Kong's iconic neon signs have disappeared since 2010, and where the survivors remain, district by district.",
    "file": "data/hk-neon-heritage-dataset.xlsx"
  },
  {
    "name": "Waste Charging Scheme & Household Recycling Rates",
    "scope": "Examine how districts are responding to the waste charging scheme through recycling infrastructure and estate participation rates.",
    "file": "data/hk-waste-and-recycling-dataset.xlsx"
  },
  {
    "name": "Heat Island Effect & Outdoor Worker Safety",
    "scope": "Investigate how rising summer heat is affecting subdivided-flat residents and outdoor workers across districts.",
    "file": "data/hk-heat-and-worker-safety-dataset.xlsx"
  },
  {
    "name": "Electric Bus Adoption & Public Transit Decarbonization",
    "scope": "Compare how Hong Kong's bus operators are progressing toward electrifying their fleets ahead of 2030 targets.",
    "file": "data/hk-electric-bus-adoption-dataset.xlsx"
  },
  {
    "name": "Pet Ownership Boom & Urban Space Conflicts",
    "scope": "Explore how a growing pet population is straining shared public space and city infrastructure, district by district.",
    "file": "data/hk-pet-ownership-boom-dataset.xlsx"
  }
];

// Each entry is a self-contained inline SVG string, exactly as authored
// in the prototype, rendered via dangerouslySetInnerHTML into the
// .topic-icon-box element.
export const ICONS: string[] = [
  "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"22\" fill=\"#1E1533\"/><path d=\"M20 50 C28 34, 55 30, 68 42 C74 47, 74 53, 68 58 C55 70, 28 66, 20 50 Z\" fill=\"none\" stroke=\"#FF5DA2\" stroke-width=\"5\" stroke-linejoin=\"round\"/><path d=\"M68 42 L82 34 L78 50 L82 66 L68 58\" fill=\"none\" stroke=\"#FF5DA2\" stroke-width=\"5\" stroke-linejoin=\"round\"/><circle cx=\"32\" cy=\"47\" r=\"3.5\" fill=\"#5EE7F5\"/><path d=\"M24 50 C24 50, 20 44, 24 38\" fill=\"none\" stroke=\"#5EE7F5\" stroke-width=\"3\" stroke-linecap=\"round\"/></svg>",
  "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"22\" fill=\"#DFF2E6\"/><rect x=\"32\" y=\"42\" width=\"36\" height=\"36\" rx=\"4\" fill=\"#2E7D4F\"/><rect x=\"28\" y=\"36\" width=\"44\" height=\"8\" rx=\"3\" fill=\"#2E7D4F\"/><rect x=\"42\" y=\"28\" width=\"16\" height=\"8\" rx=\"2\" fill=\"#2E7D4F\"/><path d=\"M50 50 a10 10 0 1 1 -8 16\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"4\" stroke-linecap=\"round\"/><path d=\"M40 62 l4 8 l8 -3\" fill=\"none\" stroke=\"#FFFFFF\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"22\" fill=\"#FDECD2\"/><circle cx=\"50\" cy=\"38\" r=\"14\" fill=\"#F2A93B\"/><g stroke=\"#F2A93B\" stroke-width=\"4\" stroke-linecap=\"round\"><line x1=\"50\" y1=\"14\" x2=\"50\" y2=\"8\"/><line x1=\"68\" y1=\"22\" x2=\"72\" y2=\"18\"/><line x1=\"32\" y1=\"22\" x2=\"28\" y2=\"18\"/></g><path d=\"M28 74 a22 18 0 0 1 44 0 Z\" fill=\"#D9534F\"/><rect x=\"24\" y=\"72\" width=\"52\" height=\"8\" rx=\"4\" fill=\"#B23A2E\"/></svg>",
  "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"22\" fill=\"#DCEBF9\"/><rect x=\"20\" y=\"36\" width=\"60\" height=\"30\" rx=\"8\" fill=\"#2E6FB2\"/><rect x=\"26\" y=\"42\" width=\"14\" height=\"12\" rx=\"2\" fill=\"#DCEBF9\"/><rect x=\"44\" y=\"42\" width=\"14\" height=\"12\" rx=\"2\" fill=\"#DCEBF9\"/><rect x=\"62\" y=\"42\" width=\"12\" height=\"12\" rx=\"2\" fill=\"#DCEBF9\"/><circle cx=\"32\" cy=\"68\" r=\"6\" fill=\"#1D2026\"/><circle cx=\"68\" cy=\"68\" r=\"6\" fill=\"#1D2026\"/><path d=\"M52 20 L40 40 L48 40 L44 56 L60 34 L51 34 Z\" fill=\"#F2C230\"/></svg>",
  "<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"100\" height=\"100\" rx=\"22\" fill=\"#F3E6D8\"/><ellipse cx=\"50\" cy=\"62\" rx=\"20\" ry=\"16\" fill=\"#8B5E34\"/><ellipse cx=\"28\" cy=\"42\" rx=\"8\" ry=\"10\" fill=\"#8B5E34\"/><ellipse cx=\"46\" cy=\"32\" rx=\"8\" ry=\"10\" fill=\"#8B5E34\"/><ellipse cx=\"64\" cy=\"42\" rx=\"8\" ry=\"10\" fill=\"#8B5E34\"/><ellipse cx=\"72\" cy=\"56\" rx=\"7\" ry=\"9\" fill=\"#8B5E34\"/></svg>"
];
