// IRSP Personality Quiz Question Bank
// Each question maps to one of 4 dimensions with a direction

const questions = [
  // I/R Dimension (Idealist vs Realist) - 13 questions
  { text: "When starting a relationship, I focus more on future possibilities than current compatibility", dimension: "IR", direction: "I" },
  { text: "I prefer spontaneous romantic gestures over carefully planned ones", dimension: "IR", direction: "I" },
  { text: "When considering a relationship, I prioritize how well we align on practical matters", dimension: "IR", direction: "R" },
  { text: "I often develop crushes or feel drawn to multiple people rather than focusing on one", dimension: "IR", direction: "I" },
  { text: "I need clear communication about relationship expectations from the start", dimension: "IR", direction: "R" },
  { text: "When dating someone, I'm drawn to their potential more than their current situation", dimension: "IR", direction: "I" },
  { text: "I appreciate when a partner follows through on commitments more than grand romantic gestures", dimension: "IR", direction: "R" },
  { text: "I often imagine symbolic moments I'd like to experience with a partner", dimension: "IR", direction: "I" },
  { text: "When evaluating a relationship, I focus on patterns of behavior over isolated romantic moments", dimension: "IR", direction: "R" },
  { text: "I believe the magic and chemistry matters more than checking compatibility boxes", dimension: "IR", direction: "I" },
  { text: "I prefer discussing relationship milestones and timelines rather than letting things unfold", dimension: "IR", direction: "R" },
  { text: "When my partner plans a date, I'm more charmed by the thoughtfulness than the practicality", dimension: "IR", direction: "I" },
  { text: "I notice inconsistencies in what a partner says versus does early on", dimension: "IR", direction: "R" },

  // P/E Dimension (Physical vs Emotional) - 13 questions
  { text: "After a long day apart, I reconnect better through physical closeness than talking", dimension: "PE", direction: "P" },
  { text: "I feel most understood when my partner discusses feelings rather than just being present", dimension: "PE", direction: "E" },
  { text: "When comforting my partner, my instinct is to hold them rather than ask questions", dimension: "PE", direction: "P" },
  { text: "I need to understand the deeper meaning behind my partner's actions and choices", dimension: "PE", direction: "E" },
  { text: "Sitting in comfortable silence together feels more intimate to me than deep conversations", dimension: "PE", direction: "P" },
  { text: "I connect more through discussing our values and beliefs than through shared activities", dimension: "PE", direction: "E" },
  { text: "When showing affection, I reach for a hug before I reach for words", dimension: "PE", direction: "P" },
  { text: "I need my partner to share their inner emotional experiences for me to feel close", dimension: "PE", direction: "E" },
  { text: "Doing chores or practical tasks together feels romantic to me", dimension: "PE", direction: "P" },
  { text: "I'd rather spend a date exploring each other's perspectives than doing an activity", dimension: "PE", direction: "E" },
  { text: "A gentle touch on the shoulder means more to me than verbal affirmations", dimension: "PE", direction: "P" },
  { text: "I feel disconnected if we're physically intimate but not emotionally vulnerable", dimension: "PE", direction: "E" },
  { text: "When stressed, I prefer my partner's presence over talking about my feelings", dimension: "PE", direction: "P" },

  // S/V Dimension (Social vs Private) - 12 questions
  { text: "I enjoy when friends see me being affectionate with my partner", dimension: "SV", direction: "S" },
  { text: "I prefer celebrating relationship milestones just the two of us rather than with others", dimension: "SV", direction: "V" },
  { text: "When we have good news, I want to share it socially rather than keep it between us", dimension: "SV", direction: "S" },
  { text: "I feel most romantic during private, intimate moments away from others", dimension: "SV", direction: "V" },
  { text: "I would feel hurt if my partner doesn't post about me on their social media", dimension: "SV", direction: "S" },
  { text: "I rarely discuss relationship details with friends and family", dimension: "SV", direction: "V" },
  { text: "When I have a problem with my partner, I talk to friends or family for advice", dimension: "SV", direction: "S" },
  { text: "I express affection more freely when we're alone than when others are around", dimension: "SV", direction: "V" },
  { text: "I want my partner integrated into my friend groups and social activities", dimension: "SV", direction: "S" },
  { text: "The most meaningful moments happen in private, away from social settings", dimension: "SV", direction: "V" },
  { text: "I'm comfortable posting about my relationship on social media", dimension: "SV", direction: "S" },
  { text: "I show love through small private gestures rather than public displays", dimension: "SV", direction: "V" },

  // F/C Dimension (Forgiving vs Critical) - 12 questions
  { text: "When my partner is late to meet me, I assume something came up rather than feeling disrespected", dimension: "FC", direction: "F" },
  { text: "When my partner is late to meet me, I expect an explanation and apology", dimension: "FC", direction: "C" },
  { text: "When there's conflict, I try to put myself in my partner's shoes", dimension: "FC", direction: "F" },
  { text: "After an argument, I need to discuss what went wrong and how to prevent it", dimension: "FC", direction: "C" },
  { text: "When my partner forgets something minor, I would be visibly disappointed", dimension: "FC", direction: "C" },
  { text: "If my partner snaps at me when stressed, I sometimes let it go without addressing it", dimension: "FC", direction: "F" },
  { text: "If I'm proven right in a disagreement with my partner, it's fair to say 'I told you so'", dimension: "FC", direction: "C" },
  { text: "I rarely hold grudges in relationships", dimension: "FC", direction: "F" },
  { text: "If my significant other drops their food, I wonder why they weren't more careful", dimension: "FC", direction: "C" },
  { text: "I believe addressing problems directly, even if uncomfortable, strengthens relationships", dimension: "FC", direction: "C" },
  { text: "If my partner snaps at me when stressed, I expect them to acknowledge it later", dimension: "FC", direction: "C" },
  { text: "I believe the same mistake should never happen twice", dimension: "FC", direction: "C" },
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
