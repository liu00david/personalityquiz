// HCER Personality Quiz Question Bank
// Each question uses a weights matrix: [IR, PE, SV, FC]
// Positive = left trait: [I]dealist, [P]hysical, [S]ocial, [F]orgiving
// Negative = right trait: [R]ealist, [E]motional, Pri[v]ate, [C]ritical
// Values typically range from -2 to 2, with 0 meaning no effect on that dimension

const questions = [
  // I/R Dimension focused questions
  { text: "A person’s past matters to me when thinking about a relationship.", weights: [0.75, 0, 0, 0] },
  { text: "I enjoy spontaneous, grand romantic gestures.", weights: [1, 1, 0, 0] },
  { text: "I get easily disappointed when things don't go as I hoped.", weights: [0.75, 0, 0, 0] },
  { text: "I want clear expectations early in a relationship.", weights: [-1, -0.5, 0, 0] },
  { text: "I prefer gifts that are practical.", weights: [-1.25, 1, 0, 0] },
  { text: "When in the talking phase, it's important to keep my options open.", weights: [1, 0, 0, 0] },
  { text: "If my friends or family disapprove, I would reconsider the relationship.", weights: [-1.25, 0, 1, 0] },
  { text: "My big worry is what happens after the honeymoon phase.", weights: [0.75, 0, 0, 0] },
  { text: "I believe true soulmates exist.", weights: [1, -0.5, 0, 0] },
  { text: "It's possible to meet the right person at the wrong time.", weights: [1, -0.5, 0, 0] },

  // P/E Dimension focused questions
  { text: "I don't need a defined relationship to be intimate with someone.", weights: [0.5, 1.5, 0, 0] },
  { text: "Sometimes I overlook flaws if I find someone very attractive.", weights: [0, 1, 0, -0.5] },
  { text: "I’m drawn to a very particular physical look.", weights: [0, 1, 0, 0] },
  { text: "I’m particular about the moment and place of a first kiss.", weights: [0, -1.5, 0, 0] },
  { text: "I often reflect on my beliefs and values.", weights: [0, -1, -0.5, 0] },
  { text: "I want my first date feel upscale, not casual.", weights: [0, 1, 0.5, 0] },
  { text: "I care a lot about how I look to others.", weights: [0, 0.5, 1, 0] },
  { text: "I enjoy deep or niche conversations with my partner.", weights: [0, -1, 0, 0] },
  { text: "I often help people, including strangers, even when it’s not convenient.", weights: [0, -1, 0, 1] },
  { text: "Sometimes my feelings are hard to contain or rationalize.", weights: [1, 1, 0, 0] },

  // S/V Dimension focused questions
  { text: "Having my friends meet my partner matters a lot to me.", weights: [0, 0, 0.75, 0] },
  { text: "I enjoy giving or receiving public displays of affection.", weights: [0, 1, 0.75, 0] },
  { text: "How my partner presents themselves in public matters to me.", weights: [0, 0, 0.75, 0] },
  { text: "I act very differently when my partner and I are alone.", weights: [0, 0, -1.25, 0] },
  { text: "I like talking about the details of my relationship with friends.", weights: [0, 0, 0.75, 0] },
  { text: "If my partner and I disagree, I go to my friends for advice.", weights: [0, 0, 0.75, -0.5] },
  { text: "I sometimes feel envious of other relationships.", weights: [0.5, 0, 0.5, 0] },
  { text: "I don't usually bring my partner up when I’m talking with others.", weights: [0, 0, -0.75, 0] },
  { text: "My lifestyle is very different when I'm single vs dating.", weights: [0, 0.5, -1.25, 0] },
  { text: "I would post my partner on social media often.", weights: [0, 0, 1, 0] },

  // F/C Dimension focused questions
  { text: "If my date is late to dinner, I must ask and know why.", weights: [0, 0, 0, -0.75] },
  { text: "In arguments, I feel there's usually a clear right and wrong.", weights: [-0.5, 0, 0, -0.75] },
  { text: "When someone apologizes, I sometimes question if they mean it.", weights: [0, 0, 0, -0.75] },
  { text: "It's better when my partner says sorry first.", weights: [0, 0, 0, -0.75] },
  { text: "Sometimes I raise my voice when frustrated.", weights: [0, 0, 0.5, -0.75] },
  { text: "I rarely hold grudges.", weights: [0, 0, 0, 1.25] },
  { text: "If my partner drops something, I ask why they weren't more careful.", weights: [0, 0.5, 0, -0.75] },
  { text: "I easily understand where others are coming from, even when I disagree.", weights: [0, -0.5, 0, 1.25] },
  { text: "If I'm proven right, an 'I told you so' feels fair.", weights: [0, 0, 0, -1] },
  { text: "The same mistake should never happen twice.", weights: [-0.5, 0, 0, -0.75] },
];

// Personality type descriptions
const typeDescriptions = {
  IPSF: {
    name: "The Glow",
    archetype: "Warm, hopeful, affectionate, openly loving",
    description: "Radiates optimism and warmth in relationships, naturally creating a welcoming and affectionate atmosphere. This type tends to be highly idealistic, believing in soulmates and romantic possibilities, and often enjoys spontaneous gestures and shared experiences that feel magical. Physical touch and open displays of affection come easily, making partners feel cherished. A forgiving and easy-going approach helps maintain harmony, though it can sometimes lead to overlooking incompatibilities or postponing necessary conversations. Socially, they enjoy sharing their love with friends and in public settings, which reinforces their sense of connection. While emotionally generous, they may occasionally struggle with grounding expectations and may feel disappointment when reality falls short of their ideal vision."
  },
  IPSC: {
    name: "The Spark",
    archetype: "Charming, seductive, idealistic with standards",
    description: "Charismatic and confident, this type blends physical attraction with a sense of idealism, thriving on passion and romantic energy. Drawn to grand gestures and memorable first dates, they often imagine how love could unfold and pursue partners who inspire excitement. Socially present and outgoing, they enjoy sharing their relationships with others and engaging in visible displays of affection. High standards and clear expectations guide their romantic choices, which can sometimes feel intense or demanding to partners. Forgiving yet discerning, they balance idealism with the need for compatibility, although disappointments may be felt sharply when relationships don’t match their envisioned narrative."
  },
  IPVF: {
    name: "The Ember",
    archetype: "Quiet warmth, steady affection, gentle optimism",
    description: "Prefers intimate, private expressions of affection, finding comfort in small gestures and meaningful touch rather than grand public displays. Optimistic and idealistic, they often focus on potential and enjoy romantic fantasies, yet they value consistency and patience over spontaneity. Naturally forgiving, they avoid conflict and may defer difficult conversations, prioritizing emotional peace and security. Socially reserved, they may feel more comfortable nurturing relationships in private settings, and their introspective nature can lead to deep understanding of partners’ emotional needs. At times, subtlety in expressing love may be underappreciated by those seeking more outward demonstrations."
  },
  IPVC: {
    name: "The Forge",
    archetype: "Idealistic but disciplined, grounded, purposeful",
    description: "Combines romantic hope with a pragmatic approach, building relationships intentionally and with clear expectations. Enjoys planning and structuring love life, preferring meaningful gestures that align with practical realities. Balances idealism with realism, ensuring relationships are sustainable, but may hold themselves and partners to high standards that can feel rigid. Shows love through consistent effort and thoughtful action rather than spontaneous displays, and is often socially moderate—comfortable sharing affection in selected contexts. While forgiving in nature, this type may struggle when plans or expectations are disrupted, requiring partners to respect boundaries and structure."
  },
  IESF: {
    name: "The Muse",
    archetype: "Emotionally inspiring, expressive, empathetic",
    description: "Draws people into deep emotional connection through expressive vulnerability and empathy. Highly attuned to partners’ feelings, they enjoy rich conversations, shared introspection, and emotionally resonant experiences. Romantic idealism motivates them to see the best in partners and pursue meaningful gestures that create intimacy. Physically affectionate and socially expressive, they may enjoy public displays or celebrating relationships with friends. Their forgiving nature allows them to maintain harmony, though they can sometimes overextend in patience or compromise. Emotional intensity may lead to disappointment if partners cannot match their depth or attentiveness."
  },
  IESC: {
    name: "The Flame",
    archetype: "Intense, passionate, idealistic with drive",
    description: "Exudes energy and passion in both emotional and physical realms of romance. Drawn to idealized connections, they value chemistry, shared vision, and romantic excitement. Socially confident, they enjoy sharing their relationships openly and creating memorable experiences, often with a flair for dramatic gestures or attention to first-date impressions. High standards and clear expectations guide their choices, which can occasionally feel overwhelming or demanding to partners. Forgiving yet discerning, they strive for emotional depth, but unmet ideals may cause frustration or disillusionment when reality doesn’t align with their vision of love."
  },
  IEVF: {
    name: "The Poet",
    archetype: "Reflective, deeply romantic, attuned to symbolism",
    description: "Highly introspective and emotionally nuanced, finding meaning in subtle gestures, unspoken connection, and shared understanding. Physical affection is expressed thoughtfully rather than exuberantly, often in private settings. Idealistic and emotionally attentive, they enjoy exploring compatibility, beliefs, and shared values with partners. Forgiving and patient, they create a safe environment for emotional expression but may overanalyze or dwell in imagination, sometimes neglecting practical relationship concerns. Socially private, they prefer intimate settings over public displays, and their subtle romance may be most appreciated by partners who notice and value quiet depth."
  },
  IEVC: {
    name: "The Oracle",
    archetype: "Insightful, intuitive, quiet but perceptive",
    description: "Perceptive and emotionally intelligent, often noticing subtleties others miss. Prioritizes meaningful compatibility and emotional authenticity, blending idealism with realistic assessment. Tends to express affection selectively, valuing depth over showiness, and prefers private or socially restrained interactions. High standards and analytical tendencies can occasionally feel critical or distant, and they may struggle with spontaneous displays of love. Forgiving in principle, they carefully weigh actions and intentions, ensuring emotional alignment with their partner."
  },
  RPSF: {
    name: "The Anchor",
    archetype: "Stable, dependable, warm, socially present",
    description: "Provides steady presence and reassurance, grounding relationships with consistency and warmth. Physically affectionate and socially comfortable, they enjoy expressing care openly while maintaining harmony. Tend to be forgiving and patient, prioritizing reliability and loyalty over drama. Idealism is tempered with practicality, focusing on realistic expectations. Occasionally, their preference for stability may limit flexibility or spontaneity, and complex emotional situations may require conscious effort to navigate."
  },
  RPSC: {
    name: "The Commander",
    archetype: "Direct, practical, social, strong-willed",
    description: "Leads relationships with clarity, structure, and decisiveness. Comfortable expressing expectations and holding standards, fostering security and predictability. Socially outgoing, they enjoy sharing relationships and maintaining presence among friends. Critical when necessary, they value honesty and accountability, though bluntness may sometimes challenge partners’ feelings. Physical affection and tangible acts of care are important, but emotional ambiguity or spontaneity can feel uncomfortable."
  },
  RPVF: {
    name: "The Shelter",
    archetype: "Private, solid, nurturing, quietly reassuring",
    description: "Offers dependable support and consistent care, often expressing love through actions more than words. Prefers private, intimate settings for affection, providing a safe space for partners to be themselves. Forgiving and emotionally loyal, they create trust over time, but reserved nature may require partners to encourage verbal or physical expression. Enjoys spending time with friends and partners selectively, balancing social engagement with private reassurance."
  },
  RPVC: {
    name: "The Architect",
    archetype: "Disciplined, realistic, structured, self-reliant",
    description: "Approaches relationships with careful planning and clear boundaries, valuing stability and mutual reliability. Prefers practical gestures and consistency over spontaneous romantic displays. Strong personal standards guide decisions, which can feel rigid or unemotional to more expressive partners. Forgiving but disciplined, they work to build trust and secure connection, though flexibility and adapting to emotional unpredictability may require conscious effort."
  },
  RESF: {
    name: "The Compass",
    archetype: "Emotionally steady, expressive, gentle",
    description: "Balances emotional insight with realistic expectations, offering warmth and patience in interactions. Values communication and emotional availability, often sharing feelings openly and seeking harmony. Forgiving and understanding, they create smooth, supportive dynamics, though setting firm boundaries or addressing conflict directly may sometimes be challenging. Socially expressive, they enjoy shared experiences with partners and friends, contributing to a sense of stability."
  },
  RESC: {
    name: "The Analyst",
    archetype: "Insightful, communicative, structured, social",
    description: "Excels at noticing patterns and providing guidance for relationship growth, blending practical evaluation with emotional awareness. Comfortable sharing observations and offering constructive feedback. Critical tendencies may sometimes feel intense, and focus on problem-solving can overshadow presence in the moment. Socially open, they enjoy discussions and sharing insights, balancing emotional connection with realistic assessment."
  },
  REVF: {
    name: "The Guardian",
    archetype: "Private, emotionally loyal, empathetic yet steady",
    description: "Builds relationships through deep loyalty, reliability, and empathy. Creates private, stable spaces where partners feel secure and cared for. Forgiving and patient, they focus on long-term connection, though social vulnerability may require effort and communication. Physical affection and quiet reassurance are valued over public displays. May be reserved in sharing needs or feelings, but their consistency fosters lasting trust."
  },
  REVC: {
    name: "The Strategist",
    archetype: "Insightful, grounded, private, decisive",
    description: "Combines deep understanding of partners with intentional action, creating structured, purposeful relationships. Values compatibility, realistic expectations, and meaningful connection over spontaneity. Analytical and discerning, they may seem distant or cautious in emotional expression, but their clarity ensures alignment and stability. Prefers private, subtle displays of affection and thrives when partners respect their need for intentionality and predictability."
  }
};
