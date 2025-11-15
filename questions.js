// IRSP Personality Quiz Question Bank
// Each question maps to one of 4 dimensions with a direction

const questions = [
  // I/R Dimension (Idealist vs Realist) - 13 questions
  { text: "When starting a relationship, I focus more on future possibilities than current compatibility", dimension: "IR", direction: "I" },
  { text: "I prefer spontaneous romantic gestures over carefully planned ones", dimension: "IR", direction: "I" },
  { text: "When considering a relationship, I prioritize how well we align on practical matters", dimension: "IR", direction: "R" },
  { text: "I'm more excited by what a relationship could become than what it currently is", dimension: "IR", direction: "I" },
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
  { text: "I like when my relationship is visible and acknowledged by our social circles", dimension: "SV", direction: "S" },
  { text: "I rarely discuss relationship details with friends and family", dimension: "SV", direction: "V" },
  { text: "An ideal evening involves going out together rather than staying in", dimension: "SV", direction: "S" },
  { text: "I express affection more freely when we're alone than when others are around", dimension: "SV", direction: "V" },
  { text: "I want my partner integrated into my friend groups and social activities", dimension: "SV", direction: "S" },
  { text: "The most meaningful moments happen in private, away from social settings", dimension: "SV", direction: "V" },
  { text: "I'm comfortable posting about my relationship on social media", dimension: "SV", direction: "S" },
  { text: "I show love through small private gestures rather than public displays", dimension: "SV", direction: "V" },

  // F/C Dimension (Forgiving vs Critical) - 12 questions
  { text: "When my partner is late to meet me, I assume something came up rather than feeling disrespected", dimension: "FC", direction: "F" },
  { text: "When my partner is late to meet me, I expect an explanation and apology", dimension: "FC", direction: "C" },
  { text: "After an argument, I'm ready to move forward before fully processing what happened", dimension: "FC", direction: "F" },
  { text: "After an argument, I need to discuss what went wrong and how to prevent it", dimension: "FC", direction: "C" },
  { text: "When my partner forgets something important to me, I focus on their intent over the impact", dimension: "FC", direction: "F" },
  { text: "When my partner forgets something important to me, I expect them to understand why it matters", dimension: "FC", direction: "C" },
  { text: "If my partner snaps at me when stressed, I let it go without addressing it", dimension: "FC", direction: "F" },
  { text: "If my partner snaps at me when stressed, I expect them to acknowledge it later", dimension: "FC", direction: "C" },
  { text: "When my significant other drops a sandwich, I feel bad for them", dimension: "FC", direction: "F" },
  { text: "When my significant other drops a sandwich, I wonder why they weren't more careful", dimension: "FC", direction: "C" },
  { text: "I prioritize keeping the peace over pointing out every issue that bothers me", dimension: "FC", direction: "F" },
  { text: "I believe addressing problems directly, even if uncomfortable, strengthens relationships", dimension: "FC", direction: "C" },
];

// Personality type descriptions
const typeDescriptions = {
  IPSF: {
    name: "The Tender Romantic",
    description: "You're warm, affectionate, expressive, and forgiving. You approach love with optimism and physical warmth, openly sharing your feelings while maintaining a gentle, understanding approach to conflict."
  },
  IPSC: {
    name: "The Charismatic Idealist",
    description: "You're dreamy yet hands-on, social and principled. You combine romantic idealism with physical expression and clear standards, making you both engaging and grounded."
  },
  IPVF: {
    name: "The Gentle Dreamer",
    description: "You express love through quiet intimacy and physical warmth. You're romantic and idealistic while preferring private, tender moments with your partner."
  },
  IPVC: {
    name: "The Steady Visionary",
    description: "You're calm, idealistic, and structured. You combine romantic hope with practical physical connection and maintain clear standards in private, meaningful ways."
  },
  IESF: {
    name: "The Empathic Storyteller",
    description: "You lead with emotional depth, openness, and tenderness. You connect through vulnerability and meaningful conversation, sharing your inner world with warmth and forgiveness."
  },
  IESC: {
    name: "The Passionate Visionary",
    description: "You're intense, emotional, social, and principled. You seek deep connections while maintaining high standards and expressing yourself openly to the world."
  },
  IEVF: {
    name: "The Deep Romantic",
    description: "You're introspective, connection-seeking, and soft-hearted. You prioritize emotional intimacy in private, gentle settings where vulnerability can flourish."
  },
  IEVC: {
    name: "The Intuitive Critic",
    description: "You're insightful, idealistic, private, and principled. You seek profound emotional understanding while maintaining clear boundaries and high standards."
  },
  RPSF: {
    name: "The Solid Supporter",
    description: "You're grounded, affectionate, expressive, and gentle. You show love through consistent physical presence and open warmth, while maintaining a forgiving nature."
  },
  RPSC: {
    name: "The Realistic Commander",
    description: "You have a strong presence that's practical, social, and structured. You lead with clarity and physical confidence while holding yourself and others to high standards."
  },
  RPVF: {
    name: "The Stoic Nurturer",
    description: "You're stable, physical, private, and forgiving. You show love through quiet, consistent actions and offer steadfast support without judgment."
  },
  RPVC: {
    name: "The Stable Architect",
    description: "You're realistic, physical, private, and principled. You build relationships deliberately with clear expectations and practical demonstrations of commitment."
  },
  RESF: {
    name: "The Open Heart Realist",
    description: "You're emotionally present, expressive, and patient. You combine emotional intelligence with realistic expectations and social warmth."
  },
  RESC: {
    name: "The Analytical Partner",
    description: "You bring emotional intelligence, clarity, and social energy together. You understand feelings deeply while maintaining accountability and engaging openly with the world."
  },
  REVF: {
    name: "The Quiet Protector",
    description: "You offer deep loyalty, private affection, and forgiveness. You're emotionally attuned and realistic, providing steady support in intimate settings."
  },
  REVC: {
    name: "The Insightful Strategist",
    description: "You're realistic, perceptive, private, and principled. You navigate relationships with emotional wisdom and clear standards, preferring depth over display."
  }
};
