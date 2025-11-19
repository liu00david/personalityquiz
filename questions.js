// HCER Personality Quiz Question Bank
// Each question uses a weights matrix: [IR, PE, SV, FC]
// Positive = left trait: [I]dealist, [P]hysical, [S]ocial, [F]orgiving
// Negative = right trait: [R]ealist, [E]motional, Pri[v]ate, [C]ritical
// Values typically range from -2 to 2, with 0 meaning no effect on that dimension

const questions = [
  // I/R Dimension focused questions
  { text: "People often say I’m picky.", weights: [1.25, 0, 0, 0] },
  { text: "I enjoy spontaneous, grand romantic gestures.", weights: [0.75, 1, 0, 0] },
  { text: "I get easily disappointed when things don't go as planned.", weights: [1, 0, 0, 0] },
  { text: "I want to set clear expectations early in a relationship.", weights: [-1, -0.5, 0, 0] },
  { text: "I prefer gifts that are practical.", weights: [-0.5, 1, 0, 0] },
  { text: "I keep my options open until a relationship becomes exclusive.", weights: [1.5, 0, 0, 0] },
  { text: "If my friends or family disapprove, I would reconsider the relationship.", weights: [-1.25, 0, 1, 0] },
  { text: "I worry what would happen after the honeymoon phase.", weights: [0.75, 0, 0, 0] },
  { text: "I believe that true soulmates exist.", weights: [0.75, -0.5, 0, 0] },
  { text: "It matters to me how my partner handles their money.", weights: [-1, 0, 0, 0] },

  // P/E Dimension focused questions
  { text: "I need a defined relationship in order to be intimate with someone.", weights: [-0.5, -1.5, 0, 0] },
  { text: "Occasionally, I overlook red flags in people.", weights: [0, 1, 0, -0.5] },
  { text: "I’m attracted to a very particular physical look.", weights: [0, 1, 0, 0] },
  { text: "I care about the moment and place of a first kiss.", weights: [0, -1.5, 0, 0] },
  { text: "I often reflect on my beliefs and values.", weights: [0, -1, -0.5, 0] },
  { text: "I prefer my first date to feel upscale, not casual.", weights: [0, 1, 0.5, 0] },
  { text: "I usually dress my best, no matter the occasion.", weights: [0, 0.5, 1, 0] },
  { text: "I enjoy deep or niche conversations with my partner.", weights: [0, -1, 0, 0] },
  { text: "I often help people, including strangers, even when it’s not convenient.", weights: [0, -1, 0, 1] },
  { text: "Sometimes my feelings are hard to contain or rationalize.", weights: [1, 1, 0, 0] },

  // S/V Dimension focused questions
  { text: "Having my friends meet my partner matters a lot to me.", weights: [0, 0, 0.75, 0] },
  { text: "I don't mind public displays of affection.", weights: [0, 1, 0.75, 0] },
  { text: "I enjoy doing simple, everyday activities with my partner more than going out.", weights: [0, 0, -1, 0] },
  { text: "It takes some time before I share a relationship publicly.", weights: [0, 0, -1.25, 0] },
  { text: "I like going into the details of my dating life with friends.", weights: [0, 0, 0.75, 0] },
  { text: "If my partner and I argue, I would go to my friends for advice.", weights: [0, 0, 0.75, -0.5] },
  { text: "I sometimes compare my relationship to others.", weights: [0.5, 0, 1, 0] },
  { text: "I always bring my partner up in conversations with others.", weights: [0, 0, 1, 0] },
  { text: "My lifestyle is very different when I'm single vs dating.", weights: [0, 0.5, -0.5, 0] },
  { text: "I like to post my partner on social media often.", weights: [0, 0, 1.25, 0] },

  // F/C Dimension focused questions
  { text: "If my date is late to dinner, I must ask and find out why.", weights: [0, 0, 0, -0.75] },
  { text: "In arguments, there's usually a clear right and wrong.", weights: [-0.5, 0, 0, -0.75] },
  { text: "When someone apologizes, I sometimes question if they mean it.", weights: [0, 0, 0, -0.75] },
  { text: "I'm usually the one to say sorry first.", weights: [0, 0, 0, 0.75] },
  { text: "I might raise my voice when frustrated.", weights: [0, 0, 0.5, -0.75] },
  { text: "I don't hold grudges.", weights: [0, 0, 0, 1.25] },
  { text: "If my partner drops something, I point out that they should be more careful.", weights: [0, 0.5, 0, -0.75] },
  { text: "I easily understand where others are coming from, even when I disagree.", weights: [0, -0.5, 0, 1.25] },
  { text: "I’m quick to point out when something isn’t right.", weights: [0, 0, 0, -1] },
  { text: "The same mistake should never happen twice.", weights: [0, 0, 0, -0.75] },
];

// Personality type descriptions
const typeDescriptions = {
  IPSF: {
    name: "The Glow",
    archetype: "Radiant, Hopeful, Tender, Buoyant",
    description: "Radiates optimism and warmth, chasing magical moments and shared experiences that feel cinematic. Affection flows easily—touch, praise, and public celebration reinforce the bond. Forgiving and hopeful, they keep relationships sunny and learn that grounding expectations only makes the magic last longer.",
    struggles: "Gently remembering to ground their dreamy optimism in day-to-day details."
  },
  IPSC: {
    name: "The Spark",
    archetype: "Magnetic, Bold, Luminous, Daring",
    description: "Charisma meets high standards here—chemistry must sizzle and plans should feel cinematic. They relish bold dates, visible affection, and partners who match their energy. Forgiving yet discerning, they steady themselves by finding excitement in both the sparks and the slower embers.",
    struggles: "Letting relationships breathe when the spark shifts into a steadier glow."
  },
  IPVF: {
    name: "The Ember",
    archetype: "Gentle, Steady, Quiet, Devoted",
    description: "Prefers quiet rooms, long hugs, and gentle rituals over big productions. Hopeful and patient, they nurture potential with steady affection and rarely rush tough talks. Naming their needs out loud helps ensure their quiet devotion lands exactly as intended.",
    struggles: "Sharing needs directly instead of assuming loved ones can sense them."
  },
  IPVC: {
    name: "The Forge",
    archetype: "Purposeful, Crafted, Calm, Composed",
    description: "Builds love like a craft—part vision board, part project plan. Meaningful rituals, steady effort, and clear expectations keep everything on track. Caring yet structured, they shine brightest when surprise is invited into the plan rather than thrown against it.",
    struggles: "Rolling with surprise detours instead of rushing to fix them."
  },
  IESF: {
    name: "The Muse",
    archetype: "Expressive, Lyrical, Empathic, Vibrant",
    description: "Leads with emotion and empathy, inviting partners into rich conversations, creative dates, and expressive affection. Forgiving and enthusiastic, they celebrate love out loud and feel deeply when energy isn’t matched, which simply cues them to seek spaces where their tempo is welcomed.",
    struggles: "Finding spaces where their emotional tempo is matched without self-dimming."
  },
  IESC: {
    name: "The Flame",
    archetype: "Fiery, Driven, Dramatic, Passionate",
    description: "All in, all the time—this type blends big feelings, high standards, and visible passion. They chase epic chemistry, dramatic gestures, and partners who keep up with their vision. Their intensity becomes a gift when they channel it toward creating room for both fireworks and calm.",
    struggles: "Balancing high intensity with gentler rhythms for partners who move slower."
  },
  IEVF: {
    name: "The Poet",
    archetype: "Reflective, Poetic, Soft, Dreamy",
    description: "Finds romance in subtext - the shared glance, the late-night playlist, the quiet touch. Private yet expressive, they explore meaning, values, and symbolism with patient curiosity. Forgiveness runs deep, and pairing their daydreams with practical check-ins keeps their stories rooted.",
    struggles: "Keeping their poetic daydreams tied to practical follow-through."
  },
  IEVC: {
    name: "The Oracle",
    archetype: "Perceptive, Measured, Quiet, Observant",
    description: "Notices subtleties others miss and weighs every gesture for sincerity. Prefers quiet conversations, intentional affection, and partners who value emotional logic. High standards keep the bond authentic, and practicing playful spontaneity lets their insight feel even more accessible.",
    struggles: "Letting warmth show in the moment instead of quietly analyzing everything."
  },
  RPSF: {
    name: "The Anchor",
    archetype: "Grounded, Warm, Loyal, Steady",
    description: "Reliability is their love language—steady touch, thoughtful check-ins, and a calm social presence. They prioritize loyalty, harmony, and tangible support. Practical expectations keep drama low, and sprinkling in intentional surprises keeps their steadiness feeling fresh.",
    struggles: "Mixing in spontaneity so their comforting routines keep feeling alive."
  },
  RPSC: {
    name: "The Commander",
    archetype: "Decisive, Social, Direct, Commanding",
    description: "Takes charge with clear plans, decisive communication, and social confidence. They voice expectations openly, show care through action, and push for accountability. When they soften their delivery, their leadership helps everyone relax into the plan.",
    struggles: "Softening directives so accountability lands as care, not critique."
  },
  RPVF: {
    name: "The Shelter",
    archetype: "Protective, Private, Gentle, Soothing",
    description: "Offers calm protection through acts of service, loyal presence, and private affection. Creates safe, intimate spaces where partners can exhale. Forgiveness is generous, and invitations to share feelings give their quiet heart a chance to speak.",
    struggles: "Letting loved ones into their inner world before being asked twice."
  },
  RPVC: {
    name: "The Architect",
    archetype: "Disciplined, Practical, Ordered, Reliable",
    description: "Builds dependable structures around love—clear boundaries, practical support, and thoughtful logistics. Consistency shows devotion more than spontaneous flair. Their loyalty shines even brighter when they let emotion peek through the blueprint.",
    struggles: "Showing emotion openly rather than assuming consistency says it all."
  },
  RESF: {
    name: "The Compass",
    archetype: "Balanced, Caring, Gentle, Harmonious",
    description: "Combines emotional fluency with grounded expectations, making partners feel heard and supported. Communicates feelings openly, forgives quickly, and brings people together socially. Practicing firmer boundaries only deepens the safe haven they already create.",
    struggles: "Holding clear boundaries even when harmony feels easier."
  },
  RESC: {
    name: "The Analyst",
    archetype: "Insightful, Vocal, Precise, Analytical",
    description: "Reads relational patterns quickly and offers constructive feedback with a social, communicative flair. Enjoys thoughtful debates, troubleshooting, and sharing insights with friends. Their clarity lands best when wrapped in warmth, turning critique into inspiration.",
    struggles: "Wrapping sharp insights in reassurance so they inspire, not intimidate."
  },
  REVF: {
    name: "The Guardian",
    archetype: "Loyal, Quiet, Steady, Protective",
    description: "Protects intimacy through loyalty, empathy, and quiet steadiness. Prefers private reassurance over public displays, yet feels deeply invested in long-term security. Forgiving and patient, they flourish when invited to voice their own needs alongside everyone else's.",
    struggles: "Sharing their own needs while still protecting everyone else's hearts."
  },
  REVC: {
    name: "The Strategist",
    archetype: "Measured, Intentional, Private, Strategic",
    description: "Approaches love like a thoughtful plan: assess, align, then invest. Values compatibility, realistic goals, and privacy, showing care through intentional decisions more than gushiness. Their clarity inspires trust, and letting emotion surface in small doses only strengthens the strategy.",
    struggles: "Letting emotion peek through without feeling off-script."
  }
};
