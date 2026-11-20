/**
 * Ben 10 Multiverse Lore, Omnitrix Devices & Cosmic Threat Codex
 * Integrated from Ben 10 Wiki & Galvan Archives
 */

export const omnitrixDevices = [
  {
    id: "prototype",
    name: "Prototype Omnitrix",
    era: "Classic (Original Series)",
    creator: "Azmuth of Galvan Prime",
    powerLevel: 82,
    dnaCapacity: "1,000,903+ species (10 active initial)",
    stability: "74%",
    aiInterface: "Voice Recognition & DNA Sampling",
    description: "The original device created by Azmuth to foster universal peace and empathy by walking in the shoes of other lifeforms. Bound to 10-year-old Ben Tennyson after crashing in the woods.",
    failsafes: [
      "Self-destruct charge (capable of tearing the universe apart if charged for days)",
      "DNA repair burst (restored DNA-mutated hybrids)",
      "Master Control lockout"
    ],
    quirks: "Prone to mistransformations due to forceful dial slamming; 10-15 minute timeout with red recharge cooldown.",
    accent: "#39FF14",
    image: "/images/series/classic_banner.jpg"
  },
  {
    id: "recalibrated",
    name: "Recalibrated Omnitrix",
    era: "Alien Force",
    creator: "Azmuth (Auto-recalibrated)",
    powerLevel: 90,
    dnaCapacity: "1,000,912 species (Playlist of 10 new aliens)",
    stability: "89%",
    aiInterface: "Holographic Projection & Neural Sync",
    description: "After 5 years of retirement, Ben put the Omnitrix back on. It recalibrated itself into a sleek wristwatch format with a green glowing faceplate and 3D holographic alien selection.",
    failsafes: [
      "Genetic repair wave for Highbreed DNA corruption",
      "Auto-translation of all known languages",
      "Biometric lock prevents unauthorized removal"
    ],
    quirks: "Touchpad interface with improved energy efficiency; transformed 15-year-old Ben into Swampfire, Humungousaur, and Alien X.",
    accent: "#00E5FF",
    image: "/images/series/af_banner.webp"
  },
  {
    id: "ultimatrix",
    name: "The Ultimatrix",
    era: "Ultimate Alien",
    creator: "Albedo (Modified from Azmuth's core)",
    powerLevel: 96,
    dnaCapacity: "1,000,912+ (Evolutionary Feature unlocked)",
    stability: "79%",
    aiInterface: "Hyper-Evolutionary Combat Processor",
    description: "A gauntlet-style device developed by Albedo using a stolen Galvan power core. Features the revolutionary 'Ultimate' function: subjects alien DNA to a 1,000,000-year simulated war to evolve the species into ultimate combat forms.",
    failsafes: [
      "Ultimate DNA evolutionary stabilization",
      "Direct codestream link to Primus",
      "DNA scanning by physical touch"
    ],
    quirks: "Created sentient Ultimate forms that broke out of the codestream; lacked Azmuth's safety interlocks.",
    accent: "#FF3D00",
    image: "/images/series/ua_banner.webp"
  },
  {
    id: "complete",
    name: "The Complete Omnitrix",
    era: "Omniverse",
    creator: "Azmuth (Definitive Masterpiece)",
    powerLevel: 99,
    dnaCapacity: "1,000,912+ species fully unlocked",
    stability: "99.8%",
    aiInterface: "Direct Neural Interface & Touchscreen Dial",
    description: "The perfected masterpiece Azmuth spent six years building. Given to Ben after the destruction of the Ultimatrix. Features a square holographic faceplate, failsafes that prevent death, and rapid transformation switching.",
    failsafes: [
      "Universal extinction fail-safe (instantly cycles to the alien needed to survive universe annihilation)",
      "Voice command authorization (Azmuth & Ben code overrides)",
      "Zero DNA timeout when properly synchronized"
    ],
    quirks: "Random mistransformations still occur because Ben hits the touch dial too hard, triggering randomizer failsafes.",
    accent: "#76FF03",
    image: "/images/series/ov_banner.jpg"
  },
  {
    id: "biomnitrix",
    name: "The Biomnitrix",
    era: "Ben 10,000 (Future Multiverse)",
    creator: "Ben Tennyson (Adult Hero of Earth)",
    powerLevel: 100,
    dnaCapacity: "Multi-Million DNA Hybrids",
    stability: "95%",
    aiInterface: "Dual-Wrist Linked Neural Array",
    description: "Invented by adult Ben Tennyson using Galvan science. Twin gauntlets worn on both wrists that allow the user to cross-breed and fuse any two alien genomes into dual hybrids (e.g., Fourmungousaur, Atomic-X, Crashocker).",
    failsafes: [
      "Dual genome stabilization matrices",
      "No timeout limit",
      "Instant dual-voice command activation"
    ],
    quirks: "Requires simultaneous dual-arm coordination; immense mental stamina required to control fused instincts.",
    accent: "#E040FB",
    image: "/images/series/ov_banner.jpg"
  }
];

export const cosmicThreats = [
  {
    id: "vilgax",
    name: "Vilgax the Conqueror",
    title: "Warlord of Vilgaxia & Conqueror of 10 Worlds",
    species: "Chimera Sui Generis",
    homeworld: "Vilgaxia (formerly Murray)",
    threatLevel: "Omega",
    threatScore: 98,
    color: "#E53935",
    powers: [
      "Colossal super strength (shatters mountains)",
      "Cybernetic biomechanical enhancements",
      "Laser vision & ruby energy beams",
      "Master combat tactician & sword of Bezel"
    ],
    weakness: "Overconfidence, vulnerability to extreme cold and magnetic disruption",
    bio: "The most persistent and feared warlord in the galaxy. Vilgax spent decades tracking the Omnitrix across star systems to arm an unstoppable army of biomechanical warriors.",
    archEnemy: "Ben Tennyson / Diamondhead",
    avatar: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "kevin11",
    name: "Kevin Levin / Kevin 11",
    title: "Osmosian Mutant & Chimera Destroyer",
    species: "Osmosian / Human Mutant",
    homeworld: "Earth",
    threatLevel: "Alpha",
    threatScore: 91,
    color: "#8E24AA",
    powers: [
      "Matter & energy absorption",
      "DNA synthesis into chimera mutations",
      "Dense armor coating (Taydenite, steel, rock)",
      "Instinctual weapon shaping"
    ],
    weakness: "Absorbing energy causes severe neuro-chemical imbalance and insanity",
    bio: "Originally an troubled runaway on the streets of New York, Kevin's Osmosian genetics absorbed the energy of the Omnitrix, mutating him into an amalgamated beast with the powers of all original 10 aliens.",
    archEnemy: "Four Arms / Cannonbolt",
    avatar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "malware",
    name: "Malware",
    title: "The Corrupted Galvanic Mechamorph",
    species: "Galvanic Mechamorph (Mutated)",
    homeworld: "Galvan B",
    threatLevel: "Omega",
    threatScore: 97,
    color: "#D50000",
    powers: [
      "Technological corruption & consumption",
      "Size expansion by absorbing machines",
      "Plasma cannon blast generation",
      "Immunity to conventional upgrades"
    ],
    weakness: "Helix stabilization codes and energy absorption overload (Feedback)",
    bio: "Born with an incomplete life code when Azmuth created Galvan B, Malware became bitter and insane, obsessing over stealing the Omnitrix to cure his broken code and destroying Galvan Prime.",
    archEnemy: "Feedback / Upgrade",
    avatar: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "highbreed",
    name: "Highbreed Supreme",
    title: "Lords of the Galactic Purge",
    species: "Highbreed",
    homeworld: "Augstaka",
    threatLevel: "Omega",
    threatScore: 94,
    color: "#00ACC1",
    powers: [
      "Immense physical durability",
      "Chest-dart projectile weaponry",
      "Atmospheric command ships & jump-gates",
      "DNAlien parasite conversion fleets"
    ],
    weakness: "Extreme sterile genetic inbreeding causing cellular degradation",
    bio: "Believing themselves to be the pure first race of the universe, the Highbreed waged a war of total extinction across the galaxy until Ben Tennyson used the Omnitrix to restore their genetic diversity.",
    archEnemy: "Swampfire / Humungousaur",
    avatar: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "aggregor",
    name: "Aggregor the Ultimate",
    title: "Osmosian Warlord of the Andromeda Five",
    species: "Osmosian",
    homeworld: "Unknown (Andromeda Galaxy)",
    threatLevel: "Omega",
    threatScore: 96,
    color: "#FB8C00",
    powers: [
      "100% full biological absorption (unlike Kevin's 1/10th limit)",
      "Combined powers of Bivalvan, Galapagus, P'andor, Ra'ad, and Andreas",
      "Electromagnetic disruption & radioactive blast",
      "Universal navigation through the Map of Infinity"
    ],
    weakness: "Over-reliance on absorbed biological matrix; vulnerable to Ultimate Kevin",
    bio: "A ruthless Osmosian warlord who kidnapped five distinct aliens from the Andromeda galaxy, constructing an energy siphon machine to absorb them 100% and break into the Forge of Creation.",
    archEnemy: "Ultimate Echo Echo / Alien X",
    avatar: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "albedo",
    name: "Albedo of Galvan",
    title: "The Red Omnitrix Renegade",
    species: "Galvan (trapped in Human DNA)",
    homeworld: "Galvan Prime",
    threatLevel: "Alpha",
    threatScore: 90,
    color: "#C2185B",
    powers: [
      "Galvan level-19 super-genius intellect",
      "Red Ultimatrix transformation matrix",
      "Ultimate alien form activations",
      "Omnitrix frequency disruptor rays"
    ],
    weakness: "Chili fry addiction caused by human DNA sync; arrogance",
    bio: "Azmuth's former brilliant apprentice who built his own copy of the Omnitrix. Because the original Omnitrix had Ben Tennyson's DNA as the default human template, Albedo's body was permanently rewritten into a clone of Ben.",
    archEnemy: "Ben Tennyson / Humungousaur",
    avatar: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80"
  }
];

export const azmuthKnowledgeBase = [
  {
    id: "mistransformation",
    question: "Why does the Omnitrix constantly give Ben the wrong alien?",
    category: "Hardware",
    answer: "Because Tennyson strikes the Omnitrix selection dial with the subtlety of an enraged Appoplexian! The Omnitrix features precision touch-capacitive sensors; when slammed with excessive force, the impact sensor defaults to safety triage, selecting an alien fit to absorb kinetic trauma."
  },
  {
    id: "alienx",
    question: "Why can't Ben just use Alien X to solve every universe-ending problem?",
    category: "Celestialsapien DNA",
    answer: "Celestialsapiens exist outside the stream of linear space-time. Alien X possesses two conflicting inner consciousnesses: Bellicus (the voice of Rage and Aggression) and Serena (the voice of Love and Compassion). To perform any physical or cosmic action, including moving a finger, two of the three minds must achieve full consensus—which can take centuries of debate."
  },
  {
    id: "evolutionary",
    question: "How did Albedo create the Evolutionary Function of the Ultimatrix?",
    category: "Ultimatrix",
    answer: "Albedo stole a hyper-core from my laboratory and weaponized the codestream. He programmed an algorithm that subjects alien DNA to a simulated worst-case combat scenario lasting one million subjective years. It strips away biological culture, empathy, and beauty, keeping only brutal evolutionary survival traits."
  },
  {
    id: "failsafe",
    question: "Is it true the Omnitrix makes Ben Tennyson immortal?",
    category: "Defensive Protocols",
    answer: "The Complete Omnitrix is programmed with Level-20 bio-preservation protocols. Should the user suffer sudden atmospheric decompression, lethal biological decay, or even the Big Bang itself, the fail-safe triggers faster than light, cycling through the 1,000,912 species to find the exact DNA required to survive."
  },
  {
    id: "primus",
    question: "Where is all the alien DNA stored?",
    category: "Galvan Network",
    answer: "The physical codestream is housed within the planetoid Primus, submerged in an artificial Volganic bio-matrix. The Omnitrix communicates with Primus via real-time subspace tachyon telemetry. Even if the watch is separated from Galvan Prime, the stream remains unbroken."
  },
  {
    id: "feedback",
    question: "What makes Feedback (Conductoid) so special to Ben?",
    category: "Omniverse Lore",
    answer: "Feedback's golden antenna and tail allow him to absorb energy of any wavelength and redirect it without limit. When Malware severed Feedback's DNA from the Omnitrix during Ben's youth, Ben felt genuine psychological loss. Years later, Ben restored Conductoid DNA from the Helix and used Feedback to absorb the Annihilargh—the spark of universal creation itself."
  }
];
