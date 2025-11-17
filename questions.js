// IRSP Personality Quiz Question Bank
// Each question maps to one of 4 dimensions with a direction

const questions = [
  // I/R Dimension (Idealist vs Realist) - 10 questions
  { text: "My partner's dating history matters to me.", dimension: "IR", direction: "I" },
  { text: "I enjoy spontaneous, grand romantic gestures.", dimension: "IR", direction: "I" },
  { text: "I get disappointed easily when things don’t go as I hoped.", dimension: "IR", direction: "I" },
  { text: "I set clear long-term expectations early in a relationship.", dimension: "IR", direction: "R" },
  { text: "I usually prefer gifts that are practical.", dimension: "IR", direction: "R" },
  { text: "When looking to date, I feel it’s important to keep my options open.", dimension: "IR", direction: "I" },
  { text: "If my friends or family disapprove of my partner, I would reconsider the relationship.", dimension: "IR", direction: "R" },
  { text: "I worry about what happens after the honeymoon phase.", dimension: "IR", direction: "I" },
  { text: "I believe soulmates exist.", dimension: "IR", direction: "I" },
  { text: "I believe you can meet the right person at the wrong time.", dimension: "IR", direction: "I" },

  // P/E Dimension (Physical vs Emotional) - 10 questions
  { text: "I don’t need a defined relationship to be intimate with someone.", dimension: "PE", direction: "P" },
  { text: "I sometimes overlook flaws if I find someone very attractive.", dimension: "PE", direction: "P" },
  { text: "I tend to have a consistent physical type.", dimension: "PE", direction: "P" },
  { text: "I like to romanticize my first kiss with someone.", dimension: "PE", direction: "E" },
  { text: "I often reflect on my beliefs and values.", dimension: "PE", direction: "E" },
  { text: "A first date needs to feel upscale, not casual.", dimension: "PE", direction: "P" },
  { text: "I care a lot about how I look to others.", dimension: "PE", direction: "P" },
  { text: "I enjoy deep or niche conversations with my partner.", dimension: "PE", direction: "E" },
  { text: "I often go out of my way to help people.", dimension: "PE", direction: "E" },
  { text: "I only develop feelings when I’m confident our personalities are compatible.", dimension: "PE", direction: "E" },

  // S/V Dimension (Social vs Private) - 10 questions
  { text: "My friends often see me be affectionate with my partner.", dimension: "SV", direction: "S" },
  { text: "I am comfortable with PDA.", dimension: "SV", direction: "S" },
  { text: "How my partner presents themselves in public matters to me.", dimension: "SV", direction: "S" },
  { text: "I act very differently when my partner and I are alone.", dimension: "SV", direction: "V" },
  { text: "I like talking about my relationship with friends.", dimension: "SV", direction: "S" },
  { text: "If my partner and I disagree, I want my friends’ input.", dimension: "SV", direction: "S" },
  { text: "I need time with my friends, away from my partner.", dimension: "SV", direction: "S" },
  { text: "I bring up my partner often in conversations.", dimension: "SV", direction: "S" },
  { text: "My lifestyle changes depending on whether I’m single or dating.", dimension: "SV", direction: "V" },
  { text: "I like posting my partner on social media.", dimension: "SV", direction: "S" },

  // F/C Dimension (Forgiving vs Critical) - 10 questions
  { text: "If my partner is late to dinner, I need to know why.", dimension: "FC", direction: "C" },
  { text: "In arguments, I feel there’s usually a clear right and wrong.", dimension: "FC", direction: "C" },
  { text: "When someone apologizes, I sometimes question if they mean it.", dimension: "FC", direction: "C" },
  { text: "If my partner forgets my food order, I would feel disappointed.", dimension: "FC", direction: "C" },
  { text: "Sometimes I raise my voice when frustrated.", dimension: "FC", direction: "C" },
  { text: "I rarely hold grudges.", dimension: "FC", direction: "F" },
  { text: "If my partner drops something, my first thought is why they weren’t more careful.", dimension: "FC", direction: "C" },
  { text: "I find it easy to understand people’s motivations.", dimension: "FC", direction: "F" },
  { text: "If I’m proven right during a disagreement, saying 'I told you so' feels fair.", dimension: "FC", direction: "C" },
  { text: "I believe the same mistake shouldn't happen twice.", dimension: "FC", direction: "C" },
];

// Personality type descriptions
// Personality type descriptions
const typeDescriptions = {
  IPSF: {
    name: "The Glow",
    archetype: "Warm, hopeful, affectionate, openly loving",
    description: "You radiate optimism and physical warmth, naturally drawing people in with your affectionate presence. You express love openly through touch and shared moments, making partners feel valued. Your forgiving and easy-going nature creates harmony, but you may overlook incompatibilities or avoid difficult conversations, sometimes prioritizing emotional comfort over clarity."
  },
  IPSC: {
    name: "The Spark",
    archetype: "Charming, seductive, idealistic with standards",
    description: "You bring energy, charm, and a magnetic presence to your relationships, blending physical attraction with high standards. You thrive on passion and grand gestures, making connections exciting and memorable. At times, your intensity and expectations may feel demanding or overwhelming to partners, especially when reality doesn’t meet your ideal vision."
  },
  IPVF: {
    name: "The Ember",
    archetype: "Quiet warmth, steady affection, gentle optimism",
    description: "You offer consistent, understated affection and create a safe, private space for intimacy. Your calm and forgiving demeanor makes partners feel nurtured and cared for. However, you may struggle to voice your needs or confront conflict, and your subtle expressions of love can be overlooked by those who prefer more outward displays."
  },
  IPVC: {
    name: "The Forge",
    archetype: "Idealistic but disciplined, grounded, purposeful",
    description: "You approach relationships with intention and effort, combining a hopeful outlook with practical planning. You value reliability and structure, often building strong foundations. While this creates stability, your high standards and focus on structure may feel rigid, and spontaneity or emotional unpredictability may be challenging for you to navigate."
  },
  IESF: {
    name: "The Muse",
    archetype: "Emotionally inspiring, expressive, empathetic",
    description: "You excel at creating deep emotional resonance, drawing partners into meaningful connection through shared vulnerability. Your empathy and expressive nature inspire trust and closeness. At times, your desire for emotional intensity can lead to disappointment, and you may overextend in forgiveness or lose yourself in others’ experiences."
  },
  IESC: {
    name: "The Flame",
    archetype: "Intense, passionate, idealistic with drive",
    description: "You pursue emotional and physical connection with passion and conviction, creating powerful, memorable relationships. Your idealism and high standards foster deep engagement, but your intensity can overwhelm partners or make ordinary moments feel insufficient. You thrive on meaningful gestures but may struggle when reality fails to match your vision."
  },
  IEVF: {
    name: "The Poet",
    archetype: "Reflective, deeply romantic, attuned to symbolism",
    description: "You notice subtle gestures and cherish emotional nuance, creating intimacy through thoughtfulness and reflection. Your introspective nature brings depth to relationships, though you may overthink or dwell in your inner world, sometimes losing sight of practical realities. You are drawn to what could be, which can create distance if partners are more grounded."
  },
  IEVC: {
    name: "The Oracle",
    archetype: "Insightful, intuitive, quiet but perceptive",
    description: "You read emotional undercurrents with ease and provide a thoughtful, perceptive presence in relationships. You value authenticity and understanding, creating clarity and insight for your partner. However, your tendency to analyze or judge patterns can come across as critical or distant, and you may struggle to accept imperfection or ambiguity."
  },
  RPSF: {
    name: "The Anchor",
    archetype: "Stable, dependable, warm, socially present",
    description: "You bring stability and comfort through consistent presence and supportive actions. Your reliability and social ease make you a reassuring partner. At times, your focus on steadiness may limit flexibility, and navigating complex emotional situations may feel challenging, though your commitment and practical care provide a strong foundation."
  },
  RPSC: {
    name: "The Commander",
    archetype: "Direct, practical, social, strong-willed",
    description: "You provide structure, clarity, and confidence in relationships, leading with decisiveness and clear standards. Your forthright nature fosters accountability and security. However, your bluntness can feel harsh, and a focus on control or practical outcomes may make emotional ambiguity or vulnerability harder for you to navigate."
  },
  RPVF: {
    name: "The Shelter",
    archetype: "Private, solid, nurturing, quietly reassuring",
    description: "You offer a safe, steady space for partners, showing love through quiet actions and consistent support. Your private, nurturing approach builds trust and loyalty. You may be perceived as distant by those seeking more verbal or public affection, and expressing needs directly can sometimes be a challenge, despite your deeply caring nature."
  },
  RPVC: {
    name: "The Architect",
    archetype: "Disciplined, realistic, structured, self-reliant",
    description: "You approach love methodically, creating stable, thoughtfully constructed relationships. Your independence and clear expectations foster trust and reliability. At times, your focus on structure may feel rigid or unemotional, and spontaneous emotional expression may not come naturally, though your partners can count on consistency and clarity."
  },
  RESF: {
    name: "The Compass",
    archetype: "Emotionally steady, expressive, gentle",
    description: "You balance emotional intelligence with realistic expectations, guiding relationships with warmth and clarity. Your gentle, expressive nature makes communication smooth and reassuring. You may avoid confrontation or suppress boundaries to maintain harmony, yet your patient approach helps partners feel supported and understood."
  },
  RESC: {
    name: "The Analyst",
    archetype: "Insightful, communicative, structured, social",
    description: "You excel at noticing patterns, communicating insights, and fostering growth in relationships. Your analytical approach helps solve challenges and clarify expectations. However, an emphasis on identifying issues can feel critical or overbearing, and being present without analyzing may sometimes be difficult."
  },
  REVF: {
    name: "The Guardian",
    archetype: "Private, emotionally loyal, empathetic yet steady",
    description: "You offer deep emotional loyalty and protective care, creating a stable, trustworthy partnership. Your empathy and steadiness build security for your partner. At times, your reserved nature may require partners to initiate connection or emotional expression, and social vulnerability may not come easily."
  },
  REVC: {
    name: "The Strategist",
    archetype: "Insightful, grounded, private, decisive",
    description: "You combine emotional insight with careful planning, building relationships with purpose and depth. Your clarity and decisiveness foster meaningful connections. However, your analytical approach can feel calculated or distant, and you may struggle with partners seeking spontaneity or outward displays of affection."
  }
};
