/**
 * Alien database and Omnitrix specifications
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
    bio: "A living column of flame inside a shell of cracked magma rock.",
    powers: [
      { name: "Fire blasts", detail: "Throws concentrated streams of flame from the hands." },
      { name: "Flame flight", detail: "Rides a jet of fire through the air." },
      { name: "Heat immunity", detail: "Walks through lava as if it were shallow water." }
    ],
    weakness: "Water and extreme cold",
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
    bio: "Twelve feet of red muscle, with a fist for every direction.",
    powers: [
      { name: "Super strength", detail: "Lifts armoured vehicles with one pair of arms." },
      { name: "Shockwave claps", detail: "A clap of all four hands flattens whatever stands in front." },
      { name: "Huge leaps", detail: "Clears city blocks in a single jump." }
    ],
    weakness: "Too big to move quickly",
    stats: { strength: 95, speed: 40, intelligence: 40, durability: 90, agility: 35 },
    world: { name: "Khoros", blurb: "A red desert of wind-cut canyons, built for giants." },
    dna: "TET-2204",
    modelScale: 2.55
  },
  {
    id: "xlr8",
    slot: 3,
    name: "XLR8",
    tier: "full",
    accent: "#2E7BFF",
    species: "Kineceleran",
    homeworld: "Kinet",
    bio: "So quick that the rest of the world seems to stand still.",
    powers: [
      { name: "Extreme speed", detail: "Crosses a city between two heartbeats." },
      { name: "Lightning reflexes", detail: "Reacts to bullets as if they were floating." },
      { name: "Vortex runs", detail: "Circles a target so fast that the air becomes a tornado." }
    ],
    weakness: "Loses grip on slick ground",
    stats: { strength: 35, speed: 100, intelligence: 55, durability: 40, agility: 95 },
    world: { name: "Kinet", blurb: "A planet of endless racing lines, where nothing ever stops moving." },
    dna: "KIN-9981",
    modelScale: 2.05
  },
  {
    id: "diamondhead",
    slot: 4,
    name: "Diamondhead",
    tier: "full",
    accent: "#6FF0E0",
    species: "Petrosapien",
    homeworld: "Petropia",
    bio: "A warrior of living crystal who can grow a weapon in a second.",
    powers: [
      { name: "Crystal growth", detail: "Raises walls, blades and bridges from the ground." },
      { name: "Diamond-hard body", detail: "Shrugs off blows that would crack steel." },
      { name: "Energy deflection", detail: "Bends incoming beams away through its facets." }
    ],
    weakness: "Sonic vibration",
    stats: { strength: 80, speed: 40, intelligence: 55, durability: 95, agility: 40 },
    world: { name: "Petropia", blurb: "A cold world of crystal spires, lit from within." },
    dna: "PET-3350",
    modelScale: 2.3
  },
  {
    id: "wildmutt",
    slot: 5,
    name: "Wildmutt",
    tier: "light",
    accent: "#FF8A00",
    species: "Vulpimancer",
    homeworld: "Vulpin",
    bio: "Eyeless and fearless, it hunts by scent, sound and instinct alone.",
    powers: [
      { name: "Super senses", detail: "Reads a whole room through smell and sound." },
      { name: "Savage claws", detail: "Tears through steel doors with little effort." },
      { name: "Wall climbing", detail: "Runs up sheer surfaces on all fours." }
    ],
    weakness: "Blind, and strong scents confuse it",
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
    bio: "Living liquid metal that takes over any machine it touches.",
    powers: [
      { name: "Merges with machines", detail: "Pours itself into technology and upgrades it from inside." },
      { name: "Liquid shape-shifting", detail: "Flows through gaps and reforms on the far side." },
      { name: "Optic energy beam", detail: "Fires a focused beam from its single eye." }
    ],
    weakness: "Electrical overload",
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
    bio: "Barely five inches tall, and the smartest being in most rooms.",
    powers: [
      { name: "Genius intellect", detail: "Solves in seconds what takes engineers years." },
      { name: "Tiny size", detail: "Slips into machines and through gaps nobody guards." },
      { name: "Gadget repair", detail: "Rewires any device from the inside out." }
    ],
    weakness: "Physically fragile",
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
    bio: "A four-eyed flyer that fights from the air with sticky slime.",
    powers: [
      { name: "Fast flight", detail: "Darts through the air on four thin wings." },
      { name: "Sticky slime", detail: "Pins targets down with fast-setting goo." },
      { name: "Four-eyed vision", detail: "Watches in almost every direction at once." }
    ],
    weakness: "Its own slime can clog its eyes",
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
    bio: "An ambush hunter from the deep, with jaws that crush steel.",
    powers: [
      { name: "Underwater speed", detail: "Cuts through deep water faster than a torpedo." },
      { name: "Crushing jaws", detail: "Bites clean through metal plating." },
      { name: "Deep-sea lure", detail: "Draws prey close with a glowing light." }
    ],
    weakness: "Dries out quickly on land",
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
    homeworld: "Kylmyys",
    bio: "Curls into an armoured ball and becomes a wrecking machine.",
    powers: [
      { name: "Rolling charge", detail: "Tucks into a ball and smashes through walls." },
      { name: "Armoured shell", detail: "Plates lock together to turn aside almost any hit." },
      { name: "Ricochet", detail: "Bounces off surfaces to build even more speed." }
    ],
    weakness: "Hard to steer at full speed",
    stats: { strength: 85, speed: 75, intelligence: 30, durability: 90, agility: 45 },
    world: { name: "Kylmyys", blurb: "A frozen moon of ice ridges under a golden, distant sun." },
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
