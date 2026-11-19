/**
 * Franchise timeline, series breakdown, and era lore
 */

export const series = [
  {
    id: "classic",
    name: "Classic",
    years: "2005 to 2008",
    seasons: "4",
    episodes: "52",
    image: "series-classic",
    blurb: "Ten-year-old Ben Tennyson finds a strange watch on a summer road trip. It locks to his wrist and turns him into ten different aliens, and the holiday turns into a fight to protect the world."
  },
  {
    id: "force",
    name: "Alien Force",
    years: "2008 to 2010",
    seasons: "3",
    episodes: "46",
    image: "series-force",
    blurb: "Five years later, fifteen-year-old Ben puts the Omnitrix back on to search for his missing grandfather. Alongside Gwen and Kevin, he battles a covert invasion by the Highbreed."
  },
  {
    id: "ultimate",
    name: "Ultimate Alien",
    years: "2010 to 2012",
    seasons: "3",
    episodes: "52",
    image: "series-ultimate",
    blurb: "With his secret identity revealed to the world, sixteen-year-old Ben wields the Ultimatrix—capable of evolving alien DNA into more powerful Ultimate forms."
  },
  {
    id: "omniverse",
    name: "Omniverse",
    years: "2012 to 2014",
    seasons: "8",
    episodes: "80",
    image: "series-omniverse",
    blurb: "Armed with the finalized Omnitrix and paired with straight-laced Plumber partner Rook Blonko, Ben explores the alien underworld of Undertown and faces the hunter Khyber."
  }
];

export const eras = [
  {
    id: "classic",
    name: "Classic Era",
    tone: "lime",
    banner: "era-classic",
    intro: "A summer road trip becomes the start of everything. Ben learns what the watch can do, meets the villains who want it and finds out his grandfather has secrets of his own.",
    chapters: [
      {
        title: "The Omnitrix arises",
        when: "Season 1",
        year: "2005",
        details: "Ben finds the pod in the woods, transforms into Heatblast and stops Vilgax's drone scouts."
      },
      {
        title: "Vilgax strikes",
        when: "Season 1 Finale",
        year: "2006",
        details: "The galactic conqueror heals and hunts Ben down to Earth for the watch."
      },
      {
        title: "Kevin 11 emerges",
        when: "Season 2",
        year: "2006",
        details: "A rogue mutant absorbs all ten alien powers into one terrifying hybrid monster."
      },
      {
        title: "Secret of the Omnitrix",
        when: "Movie Event",
        year: "2007",
        details: "The self-destruct mode is triggered. Ben journeys across space to find its creator, Azmuth."
      }
    ]
  },
  {
    id: "force",
    name: "Alien Force",
    tone: "green",
    banner: "era-force",
    intro: "Teenage Ben takes up the mantle again after Grandpa Max disappears, leading an unlikely team against cosmic extinction.",
    chapters: [
      {
        title: "The Re-calibration",
        when: "Season 1",
        year: "2008",
        details: "The watch scans Ben's DNA, recalibrates into a sleek new interface, and unlocks a new roster of ten aliens."
      },
      {
        title: "War of the Worlds",
        when: "Season 2 Finale",
        year: "2009",
        details: "Ben unites the DNAlien resistance and cures the Highbreed species from genetic decay."
      }
    ]
  },
  {
    id: "ultimate",
    name: "Ultimate Alien",
    tone: "red",
    banner: "era-ultimate",
    intro: "The world knows who Ben Tennyson is. Equipped with the Ultimatrix, he can simulate millions of years of simulated war to evolve his aliens.",
    chapters: [
      {
        title: "Fame and Infamy",
        when: "Season 1",
        year: "2010",
        details: "Exposed by Jimmy Jones, Ben handles paparazzi, fans, and vengeful galactic foes."
      },
      {
        title: "The Dagon War",
        when: "Season 3",
        year: "2012",
        details: "Vilgax absorbs ancient interdimensional power; Ben must wield the Sword of Ascalon."
      }
    ]
  },
  {
    id: "omniverse",
    name: "Omniverse",
    tone: "cyan",
    banner: "era-omniverse",
    intro: "A vibrant new chapter. Azmuth gifts Ben the definitive Omnitrix. Exploring alien cities, alternate dimensions, and temporal loops.",
    chapters: [
      {
        title: "Welcome to Undertown",
        when: "Arc 1",
        year: "2012",
        details: "Ben and Rook patrol the sprawling alien metropolis hidden miles beneath Bellwood."
      },
      {
        title: "The Anubian Predator",
        when: "Arc 2",
        year: "2013",
        details: "Khyber unleashes the Nemetrix—turning a predator beast into whatever counters Ben's form."
      }
    ]
  }
];

export const features = [
  {
    id: "archive",
    name: "Alien Archive",
    line: "Search every alien by name, planet or power.",
    image: "/images/site/os-1.webp"
  },
  {
    id: "scanner",
    name: "DNA Scanner",
    line: "Hold to sequence an unknown sample and see what it becomes.",
    image: "/images/site/af-2.webp"
  },
  {
    id: "compare",
    name: "Alien Comparison",
    line: "Put any two aliens head to head and compare abilities.",
    image: "/images/site/ua-2.webp"
  },
  {
    id: "planets",
    name: "Planetary Flight",
    line: "Fly between ten alien homeworlds with procedural skies.",
    image: "/images/site/ua-3.webp"
  },
  {
    id: "moments",
    name: "Key Moments",
    line: "Full-screen iconic scenes and lore from across the universe.",
    image: "/images/site/era-classic.webp"
  },
  {
    id: "lab",
    name: "Omnitrix Lab",
    line: "Take the device apart in 3D, part by part.",
    image: "/images/site/ua-1.webp"
  }
];
