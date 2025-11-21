// HCER Personality Quiz Question Bank
// Each question uses a weights matrix: [IR, PE, SV, FC]
// Positive = left trait: [I]dealist, [P]hysical, [S]ocial, [F]orgiving
// Negative = right trait: [R]ealist, [E]motional, Pri[v]ate, [C]ritical
// Values typically range from -2 to 2, with 0 meaning no effect on that dimension

const questions = [
  // I/R Dimension focused questions
  { text: "My friends think that I’m picky.", weights: [1, 0, 0, 0] },
  { text: "I enjoy spontaneous and grand romantic gestures.", weights: [1, 0, 0, 0] },
  { text: "I get easily disappointed when things don't go as planned.", weights: [1, 0, 0, 0] },
  { text: "I want to set clear expectations early in a relationship.", weights: [-1.25, -0.5, 0, 0] },
  { text: "I prefer gifts that are practical.", weights: [-0.75, 0, 0, 0] },
  { text: "I keep my options open until a relationship becomes exclusive.", weights: [1.25, 0, 0, 0] },
  { text: "If my friends or family disapprove, I would reconsider the relationship.", weights: [-1.25, 0, 1, 0] },
  { text: "I worry about what happens after the honeymoon phase of dating.", weights: [0.75, 0, 0, 0] },
  { text: "I believe that true soulmates exist.", weights: [0.75, -0.5, 0, 0] },
  { text: "It matters to me how my partner handles their money.", weights: [-1, 0, 0, 0] },

  // P/E Dimension focused questions
  { text: "I need a defined relationship to be intimate with someone.", weights: [0, -1.5, 0, 0] },
  { text: "At times, I overlook red flags in people.", weights: [0, 1, 0, -0.5] },
  { text: "I’m attracted to a variety of physical types.", weights: [0, 1, 0, 0] },
  { text: "I care about how my first kiss will go with someone.", weights: [0, -1, 0, 0] },
  { text: "I spend time reflecting on my beliefs and values.", weights: [0, -1, 0, 0] },
  { text: "I like first dates that feel more upscale than casual.", weights: [0, 0.75, 0.50, 0] },
  { text: "I aim to dress my best no matter the occasion.", weights: [0, 0.75, 0.75, 0] },
  { text: "I enjoy having deep, niche conversations with my partner.", weights: [0, -1, 0, 0] },
  { text: "I often help people, including strangers, even when it’s inconvenient.", weights: [0, -0.75, 0.5, 0] },
  { text: "Sometimes my feelings are hard to express or rationalize.", weights: [0.75, 1, 0, 0] },

  // S/V Dimension focused questions
  { text: "I include my partner in friend group hangouts.", weights: [0, 0, 1, 0] },
  { text: "I enjoy sharing public displays of affection.", weights: [0, 0.75, 1, 0] },
  { text: "I enjoy doing simple, everyday activities with my partner more than going out.", weights: [0.5, 0, -1, 0] },
  { text: "It takes some time before I share a relationship publicly.", weights: [0, 0, -1.25, 0] },
  { text: "I talk openly about my relationship with friends.", weights: [0, 0, 0.75, 0] },
  { text: "If my partner and I argue, I go to others for advice.", weights: [0, 0, 0.75, -0.5] },
  { text: "I compare my dating life to other people.", weights: [0.5, 0, 1, 0] },
  { text: "I bring my partner up in conversations a lot.", weights: [0, 0, 1, 0] },
  { text: "I keep up with nightlife even when in a relationship.", weights: [0, 0.5, 1, 0] },
  { text: "I like posting my partner on social media.", weights: [0.5, 0, 1, 0] },

  // F/C Dimension focused questions
  { text: "If my date is late to dinner, I want them to explain why.", weights: [0, 0, 0, -1] },
  { text: "During arguments, there's usually a clear right and wrong.", weights: [0, 0, 0, -1] },
  { text: "I look for the deeper meaning behind someone's actions.", weights: [0, -0.5, 0, -0.75] },
  { text: "I am usually the first one to apologize.", weights: [0, 0, 0, 1] },
  { text: "When I'm frustrated, my voice or tone changes easily.", weights: [0, 0, 0, -1] },
  { text: "I don't hold grudges.", weights: [0, 0, 0, 1] },
  { text: "If my partner drops something, I point out that they should be more careful.", weights: [0, 0, 0, -1] },
  { text: "I easily understand where others are coming from, even when I disagree.", weights: [0, 0, 0, 1.25] },
  { text: "I tend to speak faster than I think.", weights: [0, 0, 0, -1] },
  { text: "The same mistake shouldn't happen twice.", weights: [0, 0, 0, -1] },
];

// Personality type descriptions
const typeDescriptions = {
  IPSF: {
    name: "The Glow",
    archetype: "Radiant, Hopeful, Tender, Buoyant",
    description: "Buoyant idealism meets affectionate physicality here, creating a partner who sees romance as an unfolding adventure and keeps optimism humming in every room. Their social nature draws people in with quick warmth, and their forgiving heart gives fresh starts freely. Loved ones experience them as cinematic, hopeful, and eager to turn daily life into something vivid.\n\nThey shower partners with tactile affection, spontaneous check-ins, and enthusiastic plans that invite friends into the fun. Hearts stay open because they quickly smooth over misunderstandings and return the focus to shared dreams.\n\nExpectations can climb so high that reality feels flat when things slow down. They sometimes assume enthusiasm alone will fix cracks that really need thoughtful conversations.",
    struggles: "Grounding big romantic optimism before it outruns reality."
  },
  IPSC: {
    name: "The Spark",
    archetype: "Magnetic, Bold, Luminous, Daring",
    description: "Magnetic idealism and high standards collide in a type that chases epic chemistry and spotlights their relationships proudly. They thrive on sensory-rich experiences, curated aesthetics, and social validation that confirms the spark is real. Forgiving by nature, they bounce back quickly and look for the next thrill that keeps everyone inspired.\n\nPartners can expect grand gestures, impeccably planned dates, and constant encouragement to join them in bold adventures. They lead the story publicly and privately, savoring the showmanship of affection while resetting gracefully after any misstep.\n\nPace-setting intensity can overwhelm slower-moving partners, and they may equate quiet seasons with fading connection. Detail-focused critiques sneak in when their vision isn’t met, even if the heart behind it is soft.",
    struggles: "Letting relationships breathe when the spotlight dims for a beat."
  },
  IPVF: {
    name: "The Ember",
    archetype: "Gentle, Steady, Quiet, Devoted",
    description: "This type glows softly with idealistic hope, grounded by a love of simple rituals and private connection. Touch, shared routines, and tender humor become their favorite ways to keep relationships feeling safe and sweet. They forgive quickly and stay devoted even when the path meanders.\n\nThey build cozy worlds out of quality time, thoughtful gestures, and the comfort of being fully themselves behind closed doors. Partners feel supported by consistent check-ins and gentle patience when life asks for reinvention.\n\nThey can hesitate to voice needs out loud, hoping loyal actions will speak for them. Because they default to harmony, unspoken disappointments may linger longer than they admit.",
    struggles: "Naming their own needs before they simmer under the surface."
  },
  IPVC: {
    name: "The Forge",
    archetype: "Purposeful, Crafted, Calm, Composed",
    description: "Idealistic vision meets meticulous structure, producing someone who treats love like a craft to be designed with care. They prefer intentional routines, private planning, and clear expectations that let everyone relax. Warmth stays steady because they believe in rebuilding rather than discarding.\n\nActs of service, thoughtfully sequenced milestones, and sensory comforts are their go-to tools for proving devotion. They take quiet pride in refining the relationship’s blueprint and ensuring conversations stay grounded.\n\nFlexibility can feel threatening, so they may default to critique when surprises pop up. Emotional expression sometimes gets edited down to logistics, making it harder for partners to feel the depth humming underneath.",
    struggles: "Staying open to detours they didn’t draft themselves."
  },
  IESF: {
    name: "The Muse",
    archetype: "Expressive, Lyrical, Empathic, Vibrant",
    description: "Emotional charisma and social sparkle define this type, blending poetic conversations with public affection. They invite partners into creative worlds where feelings are named boldly and optimism is contagious. Forgiveness flows easily because they see every setback as part of a larger love story.\n\nHeartfelt talks, handwritten notes, and celebratory outings are constant reminders of their devotion. They rally communities around their relationships, sharing joy and inviting friends to cheer them on.\n\nWhen emotional energy isn’t matched, they can overextend or dramatize to get attention. Boundaries blur because they’d rather keep harmony than admit when someone’s pace feels off.",
    struggles: "Maintaining emotional boundaries while staying effusive."
  },
  IESC: {
    name: "The Flame",
    archetype: "Fiery, Driven, Dramatic, Passionate",
    description: "Passionate idealism fuels this type, pairing big feelings with sharp discernment and a flair for theatrics. They crave partners who can handle visible PDA, bold plans, and spirited debates without flinching. Even when disappointed, their forgiving streak lets them reset fast and chase the next bright idea.\n\nExpect lovingly intense conversations, lavish dates, and fearless declarations that leave no doubt about commitment. They advocate for the relationship publicly, often leading the charge when decisions need to be made.\n\nDirect critiques can sting because they land with dramatic emphasis, even when meant as care. Slower rhythms frustrate them, and they may equate calm with complacency.",
    struggles: "Tempering intensity so passion feels supportive, not overwhelming."
  },
  IEVF: {
    name: "The Poet",
    archetype: "Reflective, Poetic, Soft, Dreamy",
    description: "This private idealist weaves meaning into every glance, preferring symbolic gestures and unhurried intimacy over flashy shows. Emotions run deep yet measured, and they forgive readily because they trust the bigger narrative unfolding. The vibe is dreamy, thoughtful, and tenderly observant.\n\nThey craft playlists, write late-night notes, and hold space for layered conversations about values and inner worlds. Partners feel cherished through deliberate touch and the promise of quiet refuge.\n\nPractical follow-through sometimes lags behind their lyrical intentions. They might retreat into imagination instead of voicing discomfort, leaving others guessing what they really need.",
    struggles: "Pairing poetic intuition with clear requests in real time."
  },
  IEVC: {
    name: "The Oracle",
    archetype: "Perceptive, Measured, Quiet, Observant",
    description: "Analytical idealism anchors this type, combining emotional curiosity with reserved composure. They observe patterns intently, choosing partners who appreciate thoughtful pacing and subtle affection. Forgiveness arrives after they’ve processed everything, ensuring lessons stick gently.\n\nThey favor intimate conversations, strategic reassurance, and calm planning that keeps everyone centered. Care shows up as practical advice, protective instincts, and consistency even when emotions run high.\n\nOveranalysis can make them second-guess genuine warmth, so moments pass without shared joy. Partners may misread their quiet recalibration as disinterest unless they narrate what’s happening inside.",
    struggles: "Letting warmth surface before analysis cools the moment."
  },
  RPSF: {
    name: "The Anchor",
    archetype: "Grounded, Warm, Loyal, Steady",
    description: "Realistic steadiness and tactile affection define this type, keeping relationships rooted in dependable care. Their social ease invites trusted circles into the fold while their forgiving nature softens every transition. The overall vibe is calm, practical, and quietly affectionate.\n\nPartners receive consistent check-ins, thoughtful logistics, and physical closeness that makes ordinary days feel safe. They host dinners, remember small preferences, and keep drama low with pragmatic advice.\n\nBecause they prefer predictability, spontaneity can feel like a disruption rather than an opportunity. They sometimes downplay their own desires, focusing so much on stability that personal growth stalls.",
    struggles: "Reaching for novelty before routines turn stagnant."
  },
  RPSC: {
    name: "The Commander",
    archetype: "Decisive, Social, Direct, Influential",
    description: "A strategic realist with a polished social presence, this type likes to set the tone and keep relationships moving forward. They appreciate clear expectations, visible commitment, and partners who value accountability as much as affection. Their vibe is confident, organized, and fiercely loyal.\n\nThey plan impressive experiences, initiate tough talks early, and show up reliably when life gets complicated. Acts of service and public affirmation signal that they’re all-in and ready to lead together.\n\nDirectness can tilt into critique when others need gentler messaging. They may forget that not everyone processes feelings as quickly as they solve problems.",
    struggles: "Wrapping strong opinions in softness so they land as care."
  },
  RPVF: {
    name: "The Shelter",
    archetype: "Protective, Private, Gentle, Soothing",
    description: "Quiet realism and private devotion make this type feel like a safe harbor. They prefer low-key environments, meaningful routines, and plenty of time to observe before opening up fully. Forgiveness comes easily once sincerity is proven, keeping bonds serene.\n\nThey express care through acts of service, thoughtful planning, and one-on-one moments that feel sacred. Partners feel shielded from chaos because this type handles logistics discreetly and stays steady during storms.\n\nEmotional transparency can lag behind their protective instincts, so others may wait for deeper access. Guardedness sometimes masks needs until they spill out all at once.",
    struggles: "Inviting partners into their inner narrative without multiple prompts."
  },
  RPVC: {
    name: "The Architect",
    archetype: "Disciplined, Practical, Ordered, Reliable",
    description: "This type merges realistic thinking with private focus, building love through structure, planning, and thoughtful restraint. They value reliability over spectacle and prefer to show affection through diligent follow-through. Their tone is composed, intentional, and quietly protective.\n\nExpect detailed plans, proactive problem-solving, and practical comforts that reduce stress for everyone. They honor commitments faithfully and treat relationships like long-term projects worth perfecting.\n\nEmotional spontaneity can feel inefficient, so partners might crave more visible warmth. Critiques surface when systems fail, and soft reassurance can be an afterthought.",
    struggles: "Letting vulnerability interrupt the plan now and then."
  },
  RESF: {
    name: "The Compass",
    archetype: "Balanced, Caring, Gentle, Harmonious",
    description: "Emotionally fluent realism gives this type a calming influence that friends and partners trust. They blend practical advice with social grace, making everyone feel included and understood. Forgiveness arrives quickly because harmony matters more than being right.\n\nThey host thoughtfully, mediate gently, and remember the personal details that make people feel cherished. Physical affection stays warm and grounded, keeping loved ones steady during busy seasons.\n\nBoundaries can soften when they prioritize peace over honesty. Their own needs sometimes stay postponed, which eventually leaves them feeling unseen.",
    struggles: "Holding firm boundaries without worrying it will upset the room."
  },
  RESC: {
    name: "The Analyst",
    archetype: "Insightful, Vocal, Precise, Rational",
    description: "Realistic instincts meet social sharpness, creating someone who reads relationships like patterns waiting to be refined. They enjoy lively debate, value direct communication, and stay optimistic about solutions as long as everyone participates. Their vibe is articulate, curious, and committed to improvement.\n\nThey initiate debriefs after dates, offer thoughtful feedback, and connect partners into their social web with ease. Words of affirmation come with actionable ideas, so loved ones know exactly where they stand.\n\nFeedback can sound like critique when delivery outruns empathy. They sometimes overanalyze feelings instead of letting them be messy in the moment.",
    struggles: "Pairing sharp insight with reassurance so it lands as support."
  },
  REVF: {
    name: "The Guardian",
    archetype: "Loyal, Quiet, Steady, Protective",
    description: "Reserved realism and deep empathy make this type a soft-spoken protector of intimacy. They move carefully, prefer private settings, and listen closely before sharing their own heart. Forgiveness is generous once trust is reestablished, keeping the bond serene.\n\nThey show up with acts of service, quiet check-ins, and patient hugs that say everything without a speech. Partners feel sheltered because they prioritize safety, loyalty, and long-term security.\n\nVulnerability can stay locked away until invited multiple times, leaving others unsure of what’s brewing underneath. They might absorb everyone else’s emotions while sidestepping their own needs.",
    struggles: "Letting their own stories be heard before tension builds."
  },
  REVC: {
    name: "The Strategist",
    archetype: "Measured, Intentional, Private, Achieving",
    description: "Analytical realism, private processing, and high standards combine into a partner who loves thoughtfully and plans ahead. They assess compatibility carefully, prefer intimate settings, and express affection through decisive action. Calm competence gives their relationships a sense of order and security.\n\nThey outline goals, manage logistics, and make decisions that reduce friction for the couple. Affection appears as steady presence, subtle touch, and intentional quality time away from crowds.\n\nEmotions can get edited out when they focus on efficiency, so warmth risks feeling muted. Critiques might surface before reassurance, which can leave partners guessing about their emotional investment.",
    struggles: "Letting emotion peek through the strategy in real time."
  }
};
