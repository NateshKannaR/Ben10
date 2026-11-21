/**
 * Azmuth Level-20 Galvan Intelligence Engine
 * Comprehensive knowledge base, smart semantic intent matcher, and terminal directives.
 */

export const AZMUTH_TOPICS = [
  // 1. Omnitrix Systems & Engineering
  {
    id: "mistransformation",
    question: "Why does the Omnitrix give Ben the wrong alien?",
    category: "Omnitrix Systems",
    tags: ["wrong alien", "mistransformation", "slam", "dial", "bug", "glitch"],
    answer: "Because Tennyson strikes the Omnitrix dial with the brute force of an enraged Appoplexian! The Omnitrix features micro-capacitive touch sensors designed for delicate Galvan finger pads. When slammed with human fist-weight, the impact sensor triggers safety triage, defaulting to a species suitable to absorb kinetic impact."
  },
  {
    id: "master_control",
    question: "How does Master Control function and how is it unlocked?",
    category: "Omnitrix Systems",
    tags: ["master control", "unlimited", "instant", "voice code", "switch", "timeout"],
    answer: "Master Control bypasses all dial rotations, timeout cooling cycles, and manual activations. Transformations occur via instantaneous neural thought or voice command ('Omnitrix, Four Arms!'). It was locked because an immature host would inevitably exhaust their biological stamina or corrupt their neural synapse through continuous rapid re-sequencing."
  },
  {
    id: "failsafe",
    question: "Does the Omnitrix prevent the host from dying?",
    category: "Omnitrix Systems",
    tags: ["immortal", "failsafe", "death", "die", "protection", "annihilation"],
    answer: "The Complete Omnitrix possesses a tachyon-synchronized life preservation protocol. If the host is exposed to fatal atmospheric vacuum, planetary disintegrators, or even the Big Bang itself, the fail-safe activates faster than light, cycling through the entire 1,000,912 species to select the precise biological morphology required to survive."
  },
  {
    id: "self_destruct",
    question: "What happens when the Omnitrix Self-Destruct is armed?",
    category: "Omnitrix Systems",
    tags: ["self destruct", "sdd", "explosion", "destroy universe", "countdown"],
    answer: "When armed, the core builds an exponential energy cascade over multiple diurnal cycles. If uncancelled, the resulting energy resonance will not merely level a city—it will trigger a subspace shockwave that unravels the quantum fabric of the entire universe. A sobering reminder of why such power must never fall into lesser hands."
  },
  {
    id: "primus",
    question: "Where is the physical Codon Stream stored?",
    category: "Omnitrix Systems",
    tags: ["primus", "codon stream", "dna storage", "planet", "database", "where"],
    answer: "The physical DNA codestream is housed in an artificial volcanic bio-matrix on planetoid Primus. The Omnitrix acts as a real-time quantum transceiver, pulling genetic samples via subspace telemetry. Even across light-years, the connection remains instantaneous."
  },
  {
    id: "yellow_scan",
    question: "How does the DNA Capture Scanner work?",
    category: "Omnitrix Systems",
    tags: ["scan", "yellow", "dna capture", "sampling", "new alien"],
    answer: "When the Omnitrix encounters an uncataloged sentient genome within tactical proximity, the core pops up and emits a yellow quantum scanning beam. The subject's genetic structure is mapped, verified for sentient cognitive capacity, and appended to the active codestream within 2.4 seconds."
  },

  // 2. Alien Biology & Canon Aliens
  {
    id: "alienx",
    question: "Why can't Alien X solve every problem instantly?",
    category: "Alien Biology",
    tags: ["alien x", "celestialsapien", "bellicus", "serena", "god", "reality"],
    answer: "Celestialsapiens transcend linear space-time and possess infinite omnipotence, but their consciousness is fractured. Alien X requires unanimous consensus between Bellicus (Rage), Serena (Compassion), and Ben. Without two matching votes, the body remains utterly frozen in physical reality for centuries while inner debates rage."
  },
  {
    id: "feedback",
    question: "Why is Feedback so deeply connected to Ben?",
    category: "Alien Biology",
    tags: ["feedback", "conductoid", "malware", "loss", "annihilargh"],
    answer: "Conductoids possess specialized hyper-conductive nerve plugs that process energy as pure sensation. For Ben, transforming into Feedback was pure euphoria. When Malware severed Feedback's DNA, Tennyson felt genuine phantom limb trauma. Years later, Ben reclaimed the DNA and used Feedback to absorb the Annihilargh—the primordial spark of universal creation."
  },
  {
    id: "heatblast",
    question: "What is the science behind Pyronite plasma generation?",
    category: "Alien Biology",
    tags: ["heatblast", "pyros", "fire", "plasma", "pyronite"],
    answer: "Pyronites from Pyros are silicon-based magma entities encased in volcanic crust. Their internal core operates as a biological nuclear fusion furnace, projecting controlled thermonuclear plasma streams exceeding 9,000 Kelvin without combusting their own cellular matrix."
  },
  {
    id: "fourarms",
    question: "How does a Tetramand generate immense physical force?",
    category: "Alien Biology",
    tags: ["four arms", "tetramand", "khoros", "strength", "clap"],
    answer: "Tetramands from Khoros possess dense hyper-fibril muscle fibers and a redundant secondary cardiovascular system. A synchronized four-palm acoustic compression ('Sonic Clap') creates a displaced shockwave exceeding Mach 3, flattening armored structures within a thirty-meter radius."
  },
  {
    id: "xlr8",
    question: "How does XLR8 achieve hyper-speed without friction damage?",
    category: "Alien Biology",
    tags: ["xlr8", "kineceleran", "kinet", "speed", "fast"],
    answer: "Kinecelerans from Kinet channel biological friction into magnetic rolling spherical foot-pads. Their helmet visor shields sensory organs from atmospheric ablation while manipulating localized inertia, allowing directional turns at 500 mph without shedding kinetic velocity."
  },
  {
    id: "diamondhead",
    question: "What is the crystalline structure of a Petrosapien?",
    category: "Alien Biology",
    tags: ["diamondhead", "petrosapien", "petropia", "crystals", "taydenite"],
    answer: "Petrosapiens are composed of an organic silicon carbide matrix closely related to Taydenite. They can rapidly nucleate crystal formations at will. Their crystalline facets refract photonic energy blasts back toward the origin point, though harmonic sonic vibrations remain their structural vulnerability."
  },
  {
    id: "grey_matter",
    question: "How does Galvan intelligence compare to Cerebrocrustaceans?",
    category: "Alien Biology",
    tags: ["grey matter", "galvan", "brainstorm", "intelligence", "cerebrocrustacean", "smart"],
    answer: "A Galvan's brain possesses Level-19 synaptical density—we synthesize solutions through pure intuition and mechanical elegance. Cerebrocrustaceans (Brainstorm) possess immense electrical intellect, but their intolerable arrogance and pompous speech patterns consume 40% of their cognitive bandwidth!"
  },
  {
    id: "upgrade",
    question: "How was the Galvanic Mechamorph species born?",
    category: "Alien Biology",
    tags: ["upgrade", "mechamorph", "galvan b", "creation", "helix"],
    answer: "An accidental miracle. When we terraformed Galvan's lifeless moon (Galvan B) using the Creation Helix, the self-replicating nanites bonded with the mineral soup, achieving sentience as Galvanic Mechamorphs. They can physically liquefy and interface with any technological architecture."
  },

  // 3. Cosmic Threats & Adversaries
  {
    id: "vilgax",
    question: "What makes Vilgax obsessed with the Omnitrix?",
    category: "Cosmic Threats",
    tags: ["vilgax", "conqueror", "villain", "warlord", "threat"],
    answer: "Vilgax is a warlord whose megalomania is matched only by his stubbornness. He perceives the Omnitrix not as an instrument of peace, but as an ultimate mass-production weapon to generate legions of bio-engineered foot soldiers. A narrow, barbaric vision unworthy of level-20 engineering."
  },
  {
    id: "malware",
    question: "What was Malware and why did his code corrupt?",
    category: "Cosmic Threats",
    tags: ["malware", "corrupt", "creation helix", "tragedy", "regret"],
    answer: "Malware was born from an incomplete life-code during the activation of the Creation Helix. Unlike his brethren, his nanites could not upgrade—only corrupt and consume. I promised to cure him, but in his impatience and madness, he grew to despise his creator and sought to steal the Omnitrix to rewrite his agony."
  },
  {
    id: "albedo",
    question: "Why was Albedo mutated into a duplicate of Ben Tennyson?",
    category: "Cosmic Threats",
    tags: ["albedo", "clone", "red", "ultimatrix", "chili fries", "apprentice"],
    answer: "Albedo was my most brilliant assistant, yet poisoned by vanity. When he built a bootleg Omnitrix, the device synchronized with the Codon Stream where Ben Tennyson's human DNA was stored as the baseline default template. Albedo's Galvan body was rewritten into a human clone—complete with an unshakeable chemical craving for junk food."
  },
  {
    id: "highbreed",
    question: "How did the Omnitrix stop the Highbreed universal war?",
    category: "Cosmic Threats",
    tags: ["highbreed", "dna repair", "inbreeding", "war", "alien force"],
    answer: "The Highbreed believed themselves to be the pristine first species of the cosmos, yet millennia of genetic inbreeding left their immune systems on the brink of extinction. Tennyson used the Omnitrix's genetic repair wave to infuse them with diverse alien DNA, ending their crusade through the gift of biological renewal."
  },

  // 4. Galvan History & Azmuth Biography
  {
    id: "creator_intent",
    question: "Why did you build the Omnitrix in the first place?",
    category: "Galvan Secrets",
    tags: ["why", "purpose", "peace", "creation", "history", "zenith"],
    answer: "After the tragedy of creating the sword Ascalon—which shattered entire worlds—my beloved Zenith departed, heartbroken by my weapons. In remorse, I dedicated six centuries to creating the opposite of a weapon: a device that allows any sentient being to walk in the physical reality of another species, fostering universal empathy."
  },
  {
    id: "ascalon",
    question: "What is Ascalon and what power does it hold?",
    category: "Galvan Secrets",
    tags: ["ascalon", "sword", "george", "weapon", "power"],
    answer: "Ascalon was my first great creation—a blade capable of manipulating the fundamental forces of the cosmos. In the hands of Sir George, it slew the extra-dimensional beast Dagon, but the weapon was far too dangerous for any sentient hand to wield responsibly."
  },
  {
    id: "level_20",
    question: "What defines Level-20 Galvan Technology?",
    category: "Galvan Secrets",
    tags: ["level 20", "technology", "galvan tech", "advanced", "scale"],
    answer: "Technology is rated on an interstellar scale. Earth is approximately Level 2 or 3. The Plumbers operate at Level 4 to 5. Galvan Prime operates at Level 20—the apex threshold where machinery, quantum mechanics, and organic consciousness become indistinguishable."
  },
  {
    id: "ben_assessment",
    question: "What is your true opinion of Ben Tennyson?",
    category: "Galvan Secrets",
    tags: ["ben", "tennyson", "opinion", "hero", "kid", "worth"],
    answer: "He is reckless, noisy, perpetually disobedient, and treats a multi-millennium masterpiece like a video game toy! ...Yet, in the darkest hours of the universe, his innate compassion and willingness to sacrifice himself proves time and again that the Omnitrix found its rightful bearer."
  }
];

export const DIRECTIVES_HELP = [
  { cmd: "help", desc: "List all terminal directives and protocols." },
  { cmd: "status", desc: "Display Galvan Prime Codon Stream real-time telemetry." },
  { cmd: "diagnostics", desc: "Run hardware integrity checks on host Omnitrix." },
  { cmd: "aliens", desc: "Catalog active canon aliens in the local matrix." },
  { cmd: "master control", desc: "Simulate Galvan Level-20 Master Control authorization." },
  { cmd: "clear", desc: "Clear current terminal log display." }
];

/**
 * Intelligent Galvan Matcher: analyzes user text and resolves the best response.
 */
export function queryAzmuthBrain(userInput, aliensList = []) {
  if (!userInput || !userInput.trim()) return null;
  const raw = userInput.trim();
  const q = raw.toLowerCase();

  // 1. Directives & Commands
  if (q === "help" || q === "commands" || q === "directives") {
    return {
      type: "command",
      title: "GALVAN COMMAND DIRECTIVES",
      category: "Terminal Protocols",
      text: `AVAILABLE DIRECTIVES:\n${DIRECTIVES_HELP.map((d) => `• ${d.cmd.toUpperCase().padEnd(16)} — ${d.desc}`).join("\n")}\n\nAlternatively, inquire about any alien, villain, or engineering protocol in natural language.`
    };
  }

  if (q === "status" || q === "telemetry") {
    return {
      type: "command",
      title: "CODON STREAM TELEMETRY [GALVAN PRIME]",
      category: "Network Sync",
      text: "STATUS: NOMINAL // LINK: SUB-SPACE TACHYON RELAY ACTIVE\n• Active Species Samples: 1,000,912\n• Signal Latency: 0.00042 ms\n• Bio-Matrix Core: Stable (99.98%)\n• Codon Stream Location: Primus Sector 04\n• Current Host Registered: Benjamin Kirby Tennyson (Earth-1)"
    };
  }

  if (q === "diagnostics" || q === "check" || q === "test") {
    return {
      type: "command",
      title: "OMNITRIX HARDWARE DIAGNOSTIC REPORT",
      category: "Hardware Integrity",
      text: "RUNNING LEVEL-20 INTEGRITY SCAN...\n[✓] Touch-Capacitive Bezel: Calibrated\n[✓] Nanite Transformation Core: Online\n[✓] Universal Extinction Fail-Safe: Armed\n[!] Kinetic Impact Sensor: Warning — Dial slammed with 480 N force in last 24 hours. Stop slamming the core, Tennyson!"
    };
  }

  if (q.includes("master control") || q.includes("override")) {
    return {
      type: "command",
      title: "MASTER CONTROL SIMULATION MATRIX",
      category: "Security Lockout",
      text: "AUTHORIZATION CODE DETECTED: [AZMUTH-000-RELEASE-COUPLING-0]\nVerification: Host brainwave does not match Galvan Prime registry.\nResult: Master Control locked. As if I would hand absolute multiversal power to an unverified terminal user! Earn it through discipline and heroic empathy."
    };
  }

  if (q === "aliens" || q === "roster" || q === "species") {
    const list = aliensList.map((a) => `• ${a.name} (${a.species}) — DNA: ${a.dna}`).join("\n");
    return {
      type: "alien_list",
      title: "ACTIVE CANON DNA PLAYLIST (10 SAMPLES)",
      category: "DNA Codestream",
      text: `PRIMARY CODON PLAYLIST:\n${list}\n\nType any alien name to retrieve in-depth Galvan biological dossiers.`
    };
  }

  // 2. Alien Species Specific Analysis (check aliens list)
  const matchedAlien = aliensList.find(
    (a) => q.includes(a.id) || q.includes(a.name.toLowerCase()) || q.includes(a.species.toLowerCase())
  );

  if (matchedAlien) {
    const powersStr = matchedAlien.powers.map((p) => p.name).join(", ");
    return {
      type: "alien_dossier",
      title: `Species Dossier: ${matchedAlien.name}`,
      category: "Galvan DNA Analysis",
      alien: matchedAlien,
      text: `SUBJECT: ${matchedAlien.name.toUpperCase()}\nSpecies: ${matchedAlien.species} // Homeworld: ${matchedAlien.homeworld}\nOmnitrix DNA Index: ${matchedAlien.dna} // Accent Spectrum: ${matchedAlien.accent}\n\nBIOLOGY & LORE:\n${matchedAlien.bio}\n\nTACTICAL PROFILE:\n• Combat Strengths: ${powersStr}\n• Primary Vulnerability: ${matchedAlien.weakness}\n• Combat Rating: STR ${matchedAlien.stats.strength} | SPD ${matchedAlien.stats.speed} | INT ${matchedAlien.stats.intelligence} | DUR ${matchedAlien.stats.durability}\n\nAZMUTH'S NOTE: ${matchedAlien.name} represents a fine biological specimen from ${matchedAlien.world.name}. Treat its cellular matrix with respect.`
    };
  }

  // 3. Keyword / Semantic Search across Knowledge Base
  let bestScore = 0;
  let bestTopic = null;

  const queryWords = q.split(/\s+/).filter((w) => w.length > 2);

  for (const topic of AZMUTH_TOPICS) {
    let score = 0;
    const qLower = topic.question.toLowerCase();
    const aLower = topic.answer.toLowerCase();

    // Check tags
    if (topic.tags) {
      for (const tag of topic.tags) {
        if (q.includes(tag)) score += 6;
      }
    }

    // Check query words
    for (const word of queryWords) {
      if (qLower.includes(word)) score += 3;
      if (aLower.includes(word)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  if (bestScore >= 3 && bestTopic) {
    return {
      type: "knowledge",
      title: bestTopic.question,
      category: bestTopic.category,
      text: bestTopic.answer
    };
  }

  // 4. Intelligent Galvan Fallback Responses (Dynamic Persona)
  const fallbacks = [
    `Fascinating inquiry regarding '${raw}'. While my Level-20 intellect processes millions of multiversal variables every second, your query lacks specificity. Inquire about the Omnitrix protocols, canonical species like Heatblast or XLR8, or type 'help' for terminal directives.`,
    `Query '${raw}' acknowledged. If you are asking about Omnitrix engineering, consider whether you understand the fundamental distinction between level-5 Earth technology and Level-20 Galvan engineering. Try querying 'Master Control', 'Alien X', or 'Self-Destruct'.`,
    `A typical primate query: '${raw}'. The Omnitrix was constructed to preserve universal peace across 1,000,912 species. Select any classified topic from the matrix below, or ask me about villains such as Vilgax, Malware, or Albedo.`
  ];

  const pick = fallbacks[Math.abs(hashString(q)) % fallbacks.length];

  return {
    type: "fallback",
    title: `Galvan Inquiry: "${raw}"`,
    category: "Galvan Cognition",
    text: pick
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
