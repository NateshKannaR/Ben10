const premiere = "And Then There Were 10";
const washington = "Washington B.C.";
const retirement = "Permanent Retirement";

export const roster = [
  {
    id: "heatblast", name: "Heatblast", species: "Pyronite", planet: "Pyros", accent: "#ff824e",
    debut: premiere, abilities: ["Fire projection", "Heat absorption", "Fire propulsion"],
    description: "Ben’s first transformation. Heatblast shapes fire and absorbs heat, and can propel himself through the air with flames.",
    terrain: "volcanic"
  },
  {
    id: "wildmutt", name: "Wildmutt", species: "Vulpimancer", planet: "Vulpin", accent: "#ffac56",
    debut: premiere, abilities: ["Enhanced smell", "Enhanced hearing", "Climbing"],
    description: "Wildmutt has no eyes. He tracks his surroundings through smell and hearing and moves on all fours.",
    terrain: "banded"
  },
  {
    id: "diamondhead", name: "Diamondhead", species: "Petrosapien", planet: "Petropia", accent: "#62ebbd",
    debut: premiere, abilities: ["Crystal growth", "Crystal projectiles", "Durable crystal body"],
    description: "Diamondhead shapes his crystal body into weapons and can grow large crystal formations to block or trap opponents.",
    terrain: "crystal"
  },
  {
    id: "xlr8", name: "XLR8", species: "Kineceleran", planet: "Kinet", accent: "#63d9ff",
    debut: premiere, abilities: ["Super speed", "Rapid reflexes", "Wall running"],
    description: "XLR8 rolls on ball-shaped feet and uses his tail for balance. His helmet visor closes when he runs.",
    terrain: "banded"
  },
  {
    id: "grey-matter", name: "Grey Matter", species: "Galvan", planet: "Galvan Prime", accent: "#b6d899",
    debut: washington, abilities: ["Scientific reasoning", "Technical improvisation", "Small-space access"],
    description: "Grey Matter’s tiny size lets him get inside machinery. His intelligence helps Ben diagnose and modify technology.",
    terrain: "terrestrial"
  },
  {
    id: "four-arms", name: "Four Arms", species: "Tetramand", planet: "Khoros", accent: "#ff655e",
    debut: washington, abilities: ["Super strength", "Powerful leaps", "Shockwave claps"],
    description: "Four Arms uses all four limbs to lift heavy objects and can send a shockwave through the air by clapping.",
    terrain: "terracotta"
  },
  {
    id: "stinkfly", name: "Stinkfly", species: "Lepidopterran", planet: "Lepidopterra", accent: "#d5ec65",
    debut: washington, abilities: ["Flight", "Adhesive slime", "Mobile eyestalks"],
    description: "Stinkfly can maneuver through the air and shoot sticky slime. His eyestalks let him look in multiple directions.",
    terrain: "terrestrial"
  },
  {
    id: "ripjaws", name: "Ripjaws", species: "Piscciss Volann", planet: "Piscciss", accent: "#5edadd",
    debut: "The Krakken", abilities: ["Underwater breathing", "Powerful bite", "Fast swimming"],
    description: "Ripjaws changes his legs into a tail for swimming. He needs water and dehydrates rapidly on land.",
    terrain: "ocean"
  },
  {
    id: "upgrade", name: "Upgrade", species: "Galvanic Mechamorph", planet: "Galvan B", accent: "#92ff60",
    debut: retirement, abilities: ["Machine integration", "Technology enhancement", "Eye beam"],
    description: "Upgrade merges with machines and reshapes them to improve their capabilities. Galvan B is a moon of Galvan Prime.",
    terrain: "circuit"
  },
  {
    id: "ghostfreak", name: "Ghostfreak", species: "Ectonurite", planet: "Anur Phaetos", accent: "#c3a5ff",
    debut: retirement, abilities: ["Intangibility", "Invisibility", "Flight"],
    description: "An original transformation whose DNA retained the consciousness of Zs’Skayr. He breaks free of the Omnitrix in “Ghostfreaked Out.”",
    terrain: "crater", archiveOnly: true, source: "https://ben10.fandom.com/wiki/Ghostfreak"
  },
  {
    id: "cannonbolt", name: "Cannonbolt", species: "Arburian Pelarota", planet: "Arburia", accent: "#ffd66a",
    debut: "The Big Tick", abilities: ["Armored shell", "Rolling attack", "Ricochet"],
    description: "Unlocked after the original ten. Cannonbolt curls into an armored ball and rolls into obstacles or rebounds off surfaces.",
    terrain: "crater", later: true, source: "https://ben10.fandom.com/wiki/Cannonbolt_(Classic)"
  }
];

export const sources = {
  episodes: "https://en.wikipedia.org/wiki/List_of_Ben_10_(2005_TV_series)_episodes",
  omnitrix: "https://ben10.fandom.com/wiki/Omnitrix_(Original)",
  premiere: "https://tv.apple.com/gb/season/season-1/umc.cmc.6ch9nuewbf34o2vlm7a6sedeu?showId=umc.cmc.1vgxcrs7n1wt84y56xv4xn818"
};

export const asset = (path) => new URL(path, document.baseURI).href;
