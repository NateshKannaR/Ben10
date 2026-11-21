/**
 * Official Ben 10 Alien Database & Omnitrix Specifications
 * Only authentic aliens with official 3D GLB models and production artwork
 */

export const aliens = [
  {
    id: "heatblast",
    slot: 1,
    name: "Heatblast",
    tier: "full",
    accent: "#FF5A1F",
    species: "Pyronite",
    homeworld: "Pyros",
    bio: "A living column of flame inside a shell of cracked magma rock. Generates plasma blasts hot enough to melt solid metal instantly.",
    powers: [
      { name: "Fire blasts", detail: "Throws concentrated streams of flame from the hands." },
      { name: "Flame flight", detail: "Rides a jet of fire through the air on a piece of rock." },
      { name: "Heat immunity", detail: "Walks through lava and absorbs extreme heat effortlessly." }
    ],
    weakness: "Water and extreme cold extinguishing flames",
    stats: { strength: 65, speed: 55, intelligence: 45, durability: 70, agility: 55 },
    world: { name: "Pyros", blurb: "A young, burning planet where rivers of lava carve the black rock." },
    dna: "PYR-0417",
    modelScale: 2.05
  },
  {
    id: "four-arms",
    slot: 2,
    name: "Four Arms",
    tier: "full",
    accent: "#E0202B",
    species: "Tetramand",
    homeworld: "Khoros",
    bio: "Twelve feet of armored red muscle with incredible physical prowess, sporting four muscular arms and immense brute strength.",
    powers: [
      { name: "Super strength", detail: "Lifts armoured vehicles and tosses heavy boulders with ease." },
      { name: "Shockwave claps", detail: "A sonic clap of all four hands flattens obstacles in front." },
      { name: "Huge leaps", detail: "Clears entire city blocks in a single explosive jump." }
    ],
    weakness: "Heavy mass reduces agility in tight spaces",
    stats: { strength: 95, speed: 40, intelligence: 35, durability: 90, agility: 40 },
    world: { name: "Khoros", blurb: "A harsh desert world of tribal warrior clans." },
    dna: "TET-2804",
    modelScale: 2.55
  },
  {
    id: "xlr8",
    slot: 3,
    name: "XLR8",
    tier: "full",
    accent: "#00E5FF",
    species: "Kineceleran",
    homeworld: "Kinet",
    bio: "Semi-armoured speed demon that turns the world into slow motion with rolling wheeled footpads and friction-less reflexes.",
    powers: [
      { name: "Hyper speed", detail: "Runs at speeds exceeding 500 mph in seconds." },
      { name: "Friction manipulation", detail: "Runs up walls and across deep water with zero slip." },
      { name: "Scissor claws", detail: "Slices through metal obstacles with rapid-fire strikes." }
    ],
    weakness: "Magnetic fields and sticky surfaces",
    stats: { strength: 40, speed: 100, intelligence: 60, durability: 45, agility: 95 },
    world: { name: "Kinet", blurb: "A storm-swept, high-velocity planet of constant motion." },
    dna: "KIN-0812",
    modelScale: 2.05
  },
  {
    id: "diamondhead",
    slot: 4,
    name: "Diamondhead",
    tier: "full",
    accent: "#2AF598",
    species: "Petrosapien",
    homeworld: "Petropia",
    bio: "A living crystalline juggernaut whose silicon carbide body reflects laser energy and shapes deadly crystal weapon constructs.",
    powers: [
      { name: "Crystalline construct", detail: "Grows crystal shards, blades, and shields from thin air." },
      { name: "Energy refraction", detail: "Bounces laser blasts straight back at attackers." },
      { name: "Near invulnerability", detail: "Withstands crushing physical blows without cracking." }
    ],
    weakness: "High-frequency sonic vibrations that fracture crystals",
    stats: { strength: 80, speed: 45, intelligence: 55, durability: 95, agility: 50 },
    world: { name: "Petropia", blurb: "A crystalline world that was lost and reborn from the Codon Stream." },
    dna: "PET-3301",
    modelScale: 2.3
  },
  {
    id: "wildmutt",
    slot: 5,
    name: "Wildmutt",
    tier: "full",
    accent: "#FF9F1C",
    species: "Vulpimancer",
    homeworld: "Vulpin",
    bio: "A sightless predatory beast tracking everything by thermal scent and sonic radar with razor-sharp quills and primal strength.",
    powers: [
      { name: "Thermal tracking", detail: "Gills along the neck map a 360-degree radar image." },
      { name: "Beast agility", detail: "Leaps across treetops and bounds over rubble with ease." },
      { name: "Wall climbing", detail: "Runs up sheer surfaces on all fours." }
    ],
    weakness: "Blind, and intense smells or sounds confuse its senses",
    stats: { strength: 70, speed: 70, intelligence: 25, durability: 60, agility: 85 },
    world: { name: "Vulpin", blurb: "A murky orange wasteland under drifting clouds of spores." },
    dna: "VUL-1120",
    modelScale: 1.7
  },
  {
    id: "upgrade",
    slot: 6,
    name: "Upgrade",
    tier: "full",
    accent: "#0BFF9A",
    species: "Galvanic Mechamorph",
    homeworld: "Galvan B",
    bio: "Living nano-metallic biomechanoid that physically merges into any technology, upgrading it far beyond its theoretical limits.",
    powers: [
      { name: "Merges with machines", detail: "Pours itself into technology and upgrades it from inside." },
      { name: "Liquid shape-shifting", detail: "Flows through gaps and reforms on the far side." },
      { name: "Optic energy beam", detail: "Fires a focused plasma beam from its central optic sensor." }
    ],
    weakness: "Electrical surges and corrosive acid",
    stats: { strength: 45, speed: 50, intelligence: 75, durability: 55, agility: 80 },
    world: { name: "Galvan B", blurb: "A moon that is one vast machine, and is alive." },
    dna: "MEC-7706",
    modelScale: 2.05
  },
  {
    id: "grey-matter",
    slot: 7,
    name: "Grey Matter",
    tier: "light",
    accent: "#A7B8BD",
    species: "Galvan",
    homeworld: "Galvan Prime",
    bio: "Barely five inches tall, possessing level-19 synaptical hyper-intelligence capable of solving impossible technological puzzles.",
    powers: [
      { name: "Genius intellect", detail: "Solves in seconds what takes top planetary scientists years." },
      { name: "Micro-size infiltration", detail: "Slips into machines and hidden vents nobody guards." },
      { name: "Gadget rewire", detail: "Re-engineers complex technology with scraps." }
    ],
    weakness: "Extremely fragile physical size",
    stats: { strength: 5, speed: 35, intelligence: 100, durability: 10, agility: 70 },
    world: { name: "Galvan Prime", blurb: "A city-planet of quiet towers and impossible machines." },
    dna: "GAL-0009",
    modelScale: 1.1
  },
  {
    id: "stinkfly",
    slot: 8,
    name: "Stinkfly",
    tier: "light",
    accent: "#C7E000",
    species: "Lepidopterran",
    homeworld: "Lepidopterra",
    bio: "An agile four-winged insectoid master of aerial combat that fires streams of high-viscosity burning mucus and immobilizing slime.",
    powers: [
      { name: "Fast flight", detail: "Darts through the air on four thin aerodynamic wings." },
      { name: "Sticky slime", detail: "Pins targets down with fast-setting flammable goo." },
      { name: "360 vision", detail: "Eyestalks swivel in every direction simultaneously." }
    ],
    weakness: "Wings cannot fly when soaked with water or goo",
    stats: { strength: 30, speed: 80, intelligence: 45, durability: 35, agility: 90 },
    world: { name: "Lepidopterra", blurb: "A yellow-green swamp world wrapped in thick, sweet air." },
    dna: "LEP-5512",
    modelScale: 2.1
  },
  {
    id: "ripjaws",
    slot: 9,
    name: "Ripjaws",
    tier: "light",
    accent: "#1FA6A0",
    species: "Piscciss Volann",
    homeworld: "Piscciss",
    bio: "A ferocious deep-sea aquatic hunter equipped with steel-crushing hinged jaws, luminescent lure, and hydrodynamic tail propulsion.",
    powers: [
      { name: "Underwater speed", detail: "Cuts through deep water faster than any torpedo." },
      { name: "Steel-crushing jaws", detail: "Bites clean through reinforced metal submarines." },
      { name: "Abyssal lure", detail: "Draws prey close in total pitch darkness with bioluminescence." }
    ],
    weakness: "Dehydrates quickly and asphyxiates without water",
    stats: { strength: 70, speed: 60, intelligence: 40, durability: 65, agility: 75 },
    world: { name: "Piscciss", blurb: "An ocean planet with no shoreline and no floor anyone has reached." },
    dna: "PIS-6643",
    modelScale: 2.2
  },
  {
    id: "cannonbolt",
    slot: 10,
    name: "Cannonbolt",
    tier: "light",
    accent: "#F2C230",
    species: "Arburian Pelarota",
    homeworld: "Arburia",
    bio: "A massive creature with an indestructible yellow carapace that curls into a devastating wrecking ball capable of planetary ricochets.",
    powers: [
      { name: "Rolling charge", detail: "Tucks into a spherical ball and smashes through obstacles." },
      { name: "Armoured carapace", detail: "Plates deflect lasers, explosions, and re-entry heat." },
      { name: "Ricochet physics", detail: "Bounces off walls to build kinetic acceleration." }
    ],
    weakness: "Difficult steering control at maximum velocity",
    stats: { strength: 85, speed: 75, intelligence: 30, durability: 90, agility: 45 },
    world: { name: "Arburia", blurb: "A peaceful resort planet with sprawling mountain plateaus." },
    dna: "ARB-8871",
    modelScale: 2.2
  }
];

export const ben = {
  id: "ben",
  name: "Ben Tennyson",
  age: 10,
  bio: "An ordinary ten-year-old kid whose summer road trip changed forever after stumbling upon the Omnitrix in an alien capsule.",
  modelScale: 1.75
};

export const ALIEN_SCALE_FACTORS = {
  ben: 1.75,
  heatblast: 2.05,
  "four-arms": 2.55,
  xlr8: 2.05,
  diamondhead: 2.3,
  wildmutt: 1.7,
  upgrade: 2.05,
  "grey-matter": 1.1,
  stinkfly: 2.1,
  ripjaws: 2.2,
  cannonbolt: 2.2
};

export const allAliens = aliens;
export default aliens;
