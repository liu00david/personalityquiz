// IRSP Personality Quiz Question Bank
// Each question maps to one of 4 dimensions with a direction

const questions = [
  // I/R Dimension (Idealist vs Realist) - 10 questions
  { text: "I only develop feelings for someone if I am sure about our compatibility.", dimension: "IR", direction: "R" },
  { text: "I enjoy spontaneous, grand romantic gestures.", dimension: "IR", direction: "I" },
  { text: "I get easily disappointed when things don't go the way I want.", dimension: "IR", direction: "I" },
  { text: "I need to set clear relationship expectations from the start.", dimension: "IR", direction: "R" },
  { text: "Gifts should serve a functional purpose.", dimension: "IR", direction: "R" },
  { text: "For dating, i's important to keep my options open.", dimension: "IR", direction: "I" },
  { text: "If my friends and family disapprove of my partner, I would rethink my relationship.", dimension: "IR", direction: "R" },
  { text: "I get worried about what happens after the honeymoon phase.", dimension: "IR", direction: "I" },
  { text: "I have ", dimension: "IR", direction: "I" },
  { text: "", dimension: "IR", direction: "I" },

  // P/E Dimension (Physical vs Emotional) - 10 questions
  { text: "I don't need to define the relationship to be intimate with someone.", dimension: "PE", direction: "P" },
  { text: "I can see past someone's flaws if they are really attractive.", dimension: "PE", direction: "P" },
  { text: "I can easily get the ick from how someone behaves.", dimension: "PE", direction: "P" },
  { text: "Where and when my first kiss is with someone matters a lot.", dimension: "PE", direction: "E" },
  { text: "I often think about my beliefs and perspectives in life.", dimension: "PE", direction: "E" },
  { text: "If someone asks me what I like about my partner, it's easy to list.", dimension: "PE", direction: "E" },
  { text: "My friends think I'm good at listening and giving personal advice.", dimension: "PE", direction: "E" },
  { text: "I enjoy having important and difficult conversations.", dimension: "PE", direction: "E" },
  { text: "I enjoy a decent amount of PDA.", dimension: "PE", direction: "P" },
  { text: "My lifestyle is different when I'm single vs dating.", dimension: "PE", direction: "P" },

  // S/V Dimension (Social vs Private) - 10 questions
  { text: "My friends often see me be affectionate with my partner.", dimension: "SV", direction: "S" },
  { text: "", dimension: "SV", direction: "V" },
  { text: "It matters to me how my partner presents themselves in public.", dimension: "SV", direction: "S" },
  { text: "I have a separate personality when I'm alone with my partner.", dimension: "SV", direction: "V" },
  { text: "I like to talk about relationship details with friends.", dimension: "SV", direction: "S" },
  { text: "If my partner and I disagree, I want the opinion of my friends.", dimension: "SV", direction: "S" },
  { text: "", dimension: "SV", direction: "S" },
  { text: "I bring up my partner in conversations", dimension: "SV", direction: "S" },
  { text: "My lifestyle is different when I'm single vs dating.", dimension: "SV", direction: "V" },
  { text: "I like posting my significant other on social media.", dimension: "SV", direction: "S" },

  // F/C Dimension (Forgiving vs Critical) - 10 questions
  { text: "When my partner is late to dinner, I need to know why they were late.", dimension: "FC", direction: "C" },
  { text: "There is always a right and wrong.", dimension: "FC", direction: "F" },
  { text: "If someone apologies to me, I often still think about what they did.", dimension: "FC", direction: "C" },
  { text: "If my partner gets my food order wrong, I would be a bit disappointed.", dimension: "FC", direction: "C" },
  { text: "I might raise my voice when I'm frustrated.", dimension: "FC", direction: "C" },
  { text: "It's rare for me to hold grudges.", dimension: "FC", direction: "F" },
  { text: "If my significant other drops something, my first thought is why they weren't more careful.", dimension: "FC", direction: "C" },
  { text: "It's easy for me to understand others' actions.", dimension: "FC", direction: "F" },
  { text: "", dimension: "FC", direction: "C" },
  { text: "I believe the same mistake shouldn't happen twice.", dimension: "FC", direction: "C" },
];

// Personality type descriptions
const typeDescriptions = {
  IPSF: {
    name: "The Glow",
    archetype: "Warm, hopeful, affectionate, openly loving",
    description: "You radiate optimism and physical warmth, creating a feel-good romantic energy that draws people in. Your affectionate nature and forgiving heart make you easy to love, though you may sometimes overlook red flags or avoid difficult conversations in favor of keeping the peace. You believe in the best of people and express love freely through touch and public affection."
  },
  IPSC: {
    name: "The Spark",
    archetype: "Charming, seductive, idealistic with standards",
    description: "You light up the room with magnetic charm and physical confidence, blending romantic idealism with clear expectations. Your social presence and high standards make you captivating but can sometimes come across as demanding. You're drawn to grand gestures and passionate connection, though you may struggle when reality doesn't match the vision."
  },
  IPVF: {
    name: "The Ember",
    archetype: "Quiet warmth, steady affection, gentle optimism",
    description: "You burn softly but deeply, offering steady physical affection in private, intimate settings. Your gentle optimism and forgiving nature create a safe haven for your partner, though you may avoid conflict or struggle to express needs directly. You show love through small, tender gestures that may go unnoticed by those seeking more overt displays."
  },
  IPVC: {
    name: "The Forge",
    archetype: "Idealistic but disciplined, grounded, purposeful",
    description: "You build relationships with intention and effort, combining romantic vision with practical action and clear standards. Your disciplined approach to love means you work hard to create the relationship you imagine, though your high expectations can sometimes feel rigid or uncompromising. You value consistency and may struggle with spontaneity or emotional unpredictability."
  },
  IESF: {
    name: "The Muse",
    archetype: "Emotionally inspiring, expressive, empathetic",
    description: "You pull others into a shared romantic story through emotional depth and expressive vulnerability. Your empathetic nature and ability to articulate feelings inspire deep connection, though you may lose yourself in the narrative or forgive too easily. You thrive on emotional resonance but can be disappointed when others don't match your intensity."
  },
  IESC: {
    name: "The Flame",
    archetype: "Intense, passionate, idealistic with drive",
    description: "You burn brightly with conviction, seeking profound emotional connection while holding firm standards. Your intensity and passion create electric relationships, but your high expectations and tendency to seek perfection can overwhelm partners. You're unafraid to express what you want, though you may struggle when love feels ordinary or mundane."
  },
  IEVF: {
    name: "The Poet",
    archetype: "Reflective, deeply romantic, attuned to symbolism",
    description: "You live in emotional layers, finding meaning in subtle gestures and unspoken connection. Your introspective nature and romantic idealism create profound intimacy, though you may dwell in your inner world at the expense of practical matters. You're drawn to what could be rather than what is, sometimes creating distance through overthinking."
  },
  IEVC: {
    name: "The Oracle",
    archetype: "Insightful, intuitive, quiet but perceptive",
    description: "You read between the lines effortlessly, understanding emotional undercurrents others miss. Your perceptive nature and clear standards make you an insightful partner, though your tendency to see patterns can lead to overanalysis or premature judgments. You value emotional authenticity but may struggle to accept imperfection in yourself or others."
  },
  RPSF: {
    name: "The Anchor",
    archetype: "Stable, dependable, warm, socially present",
    description: "You keep relationships grounded through consistent physical presence and steady warmth. Your reliability and social ease make you a comforting partner, though your focus on stability may resist necessary change or growth. You show love through actions and presence, but may struggle to navigate deep emotional complexity or abstract feelings."
  },
  RPSC: {
    name: "The Commander",
    archetype: "Direct, practical, social, strong-willed",
    description: "You lead relationships with clarity, structure, and physical confidence. Your decisive nature and high standards create security but can feel controlling or inflexible. You value honesty and directness, though your bluntness may sometimes hurt feelings. You thrive on clear expectations but may struggle with emotional ambiguity or vulnerability."
  },
  RPVF: {
    name: "The Shelter",
    archetype: "Private, solid, nurturing, quietly reassuring",
    description: "You create safety and comfort through quiet, consistent actions and physical presence. Your steadfast support and forgiving nature provide a refuge, though your private approach may be misread as emotional distance. You prefer showing love through deeds rather than words, which can leave partners craving more verbal affirmation or emotional expression."
  },
  RPVC: {
    name: "The Architect",
    archetype: "Disciplined, realistic, structured, self-reliant",
    description: "You build love thoughtfully and with precision, establishing clear expectations and boundaries. Your methodical approach creates stability, though your focus on structure may feel rigid or unemotional. You value independence and practical demonstrations of commitment, but may struggle with spontaneity or partners who need more emotional processing."
  },
  RESF: {
    name: "The Compass",
    archetype: "Emotionally steady, expressive, gentle",
    description: "You guide with clarity and warmth, balancing emotional intelligence with realistic expectations. Your patient, expressive nature makes you easy to communicate with, though your tendency toward harmony may avoid necessary confrontation. You're socially warm and emotionally available, but may struggle to set firm boundaries when needed."
  },
  RESC: {
    name: "The Analyst",
    archetype: "Insightful, communicative, structured, social",
    description: "You see patterns in relationships and name them clearly, combining emotional understanding with practical improvement. Your analytical nature and social communication skills drive growth, though your focus on what's wrong can feel critical or overwhelming. You excel at problem-solving but may struggle to simply be present without fixing."
  },
  REVF: {
    name: "The Guardian",
    archetype: "Private, emotionally loyal, empathetic yet steady",
    description: "You offer protective devotion through emotional attunement and realistic care. Your quiet loyalty and empathetic understanding create deep trust, though your reserved nature may require partners to draw you out. You're steady and forgiving in private, but may avoid social vulnerability or struggle to express needs directly."
  },
  REVC: {
    name: "The Strategist",
    archetype: "Insightful, grounded, private, decisive",
    description: "You understand people deeply and act with intentional precision, preferring depth over display. Your emotional wisdom and clear standards create purposeful relationships, though your analytical approach can feel calculating or distant. You value private connection and realistic expectations, but may struggle with partners who need more spontaneity or public affection."
  }
};
