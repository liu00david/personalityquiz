# HCER Relationship Typology  
*A four-letter lens for romantic styles and expectations*

The **HCER Typology** is a dating-focused personality framework built for this quiz experience.  
Every result is a **4-letter type** that selects one trait from each of the four dichotomies:

1. **H – Hope Dimension:** Idealist (I) vs Realist (R)  
2. **C – Connection Dimension:** Physical (P) vs Emotional (E)  
3. **E – Expression Dimension:** Social (S) vs Private (V)  
4. **R – Resolution Dimension:** Forgiving (F) vs Critical (C)

Together, the letters describe how someone dreams about love, bonds day-to-day, shares their relationships with others, and repairs conflict.

---

## Contents
1. [Dimensions](#dimensions)  
2. [The 16 HCER Types](#the-16-hcer-types)  
3. [How the Quiz Generates Results](#how-the-quiz-generates-results)  
4. [Color System](#color-system)

---

# Dimensions

## 1. Hope — Idealist (I) vs Realist (R)

**Idealist (I) — “The Dreamer”**  
Leads with optimism and future vision. They romanticize quickly, see symbolic meaning in small moments, and assume relationships are growth journeys.  
*Strengths:* inspiring, resilient, heartfelt.  
*Tension points:* expectations can outrun reality; difficult conversations may get postponed.

**Realist (R) — “The Grounded One”**  
Prefers clarity, structure, and data. They establish expectations early, track logistics, and believe intentional effort keeps love steady.  
*Strengths:* dependable, pragmatic, discerning.  
*Tension points:* may seem guarded or overly critical of “grand gestures.”

---

## 2. Connection — Physical (P) vs Emotional (E)

**Physical (P) — “The Tangible Lover”**  
Bonds through touch, presence, and acts of service. Their affection is obvious in the way they show up, handle logistics, and create sensory experiences.  
*Strengths:* grounded intimacy, reliable effort.  
*Tension points:* feelings may go unspoken or deeper processing may be avoided.

**Emotional (E) — “The Inner Connector”**  
Feels closeness through conversation, shared beliefs, and emotional candor. They seek partners who will sit in the feeling, not just the moment.  
*Strengths:* intuitive, empathic, meaning-driven.  
*Tension points:* may expect constant vulnerability or read too much into subtle cues.

---

## 3. Expression — Social (S) vs Private (V)

**Social (S) — “The Outward Lover”**  
Loves out loud, looping friends and family into their story. Comfortable with PDA, social media shoutouts, and big group plans.  
*Strengths:* enthusiastic, connective, energizing.  
*Tension points:* quieter partners can feel overwhelmed or exposed.

**Private (V) — “The Inner Circle Lover”**  
Keeps romance contained to trusted spaces. Prefers one-on-one rituals, slow reveals, and subtle displays of affection.  
*Strengths:* focused, intimate, steady.  
*Tension points:* others may misread their quiet as distance or disinterest.

---

## 4. Resolution — Forgiving (F) vs Critical (C)

**Forgiving (F) — “The Soft-Hearted”**  
Values harmony and emotional safety. They empathize quickly, extend second chances, and soothe tension through reassurance.  
*Strengths:* patient, compassionate, restorative.  
*Tension points:* boundaries can blur; problems may be smoothed over without fully resolving them.

**Critical (C) — “The Standard-Holder”**  
Pairs care with accountability. They strive for improvement, name issues directly, and prefer plans over apologies.  
*Strengths:* clear, growth-minded, protective.  
*Tension points:* feedback can land as harsh, and vulnerability may feel scripted.

---

# The 16 HCER Types

| Type | Archetype | Vibe Snapshot |
|------|-----------|---------------|
| **IPSF** | The Glow | Cinematic idealist who leads with touch, social warmth, and easy forgiveness. |
| **IPSC** | The Spark | Bold planner chasing epic chemistry, visible affection, and principled follow-through. |
| **IPVF** | The Ember | Quiet dreamer who builds cozy rituals and forgives faster than they speak up. |
| **IPVC** | The Forge | Intentional romantic who scripts loving routines and edits conflict like a project plan. |
| **IESF** | The Muse | Expressive empath who narrates feelings openly and celebrates partners out loud. |
| **IESC** | The Flame | High-intensity romantic mixing big feelings, social flourish, and sharp standards. |
| **IEVF** | The Poet | Introspective connector who relishes symbolism, playlists, and gentle reconciliation. |
| **IEVC** | The Oracle | Insightful analyst who trusts intuition but keeps affection private and precise. |
| **RPSF** | The Anchor | Steady realist who shows up physically, loves community, and smooths conflict softly. |
| **RPSC** | The Commander | Organized leader who plans the date, sets the agenda, and expects accountability. |
| **RPVF** | The Shelter | Protective partner offering hands-on care, privacy, and a calm reset button. |
| **RPVC** | The Architect | Disciplined builder whose affection lives in structure, logistics, and honest critique. |
| **RESF** | The Compass | Heart-forward realist balancing emotional fluency with social warmth and patience. |
| **RESC** | The Analyst | Articulate partner blending emotional insight, social savvy, and precise feedback. |
| **REVF** | The Guardian | Loyal observer who protects intimacy quietly and forgives once sincerity is clear. |
| **REVC** | The Strategist | Measured planner who invests carefully, tracks progress, and communicates expectations. |

Each archetype’s long-form description lives in `questions.js` under `typeDescriptions`, which also powers the copy on `results.html`.

---

# How the Quiz Generates Results

1. **Question Weights**  
   - `questions.js` stores 50 Likert items, each with a four-value weight array `[IR, PE, SV, FC]`.  
   - Responses are scored from strong disagree (−2) to strong agree (+2).  
   - Multiplying answers by weights creates raw scores for every dimension pair.

2. **Scoring Logic**  
   - `quiz.js` aggregates raw scores and determines the dominant side of each dichotomy to assemble the 4-letter type.  
   - `results.js` converts raw scores into normalized percentages, so users can see both sides of each pair (e.g., 62 % Idealist / 38 % Realist).

3. **Results Experience**  
   - A pixel avatar is generated with CSS-based trait colors pulled from `colors.css`.  
   - The breakdown section highlights dominant traits, balanced dimensions, and personalized insights.  
   - Users can share a generated PNG that mirrors the on-page visualization.

---

# Color System

The same palette drives avatars, bars, and documentation visuals:

| Trait | Hex | Usage |
|-------|-----|-------|
| Idealist (I) | `#ffc6ff` | hopeful accents, Hope bars when I dominates |
| Realist (R) | `#caffbf` | practical accents, Hope bars when R dominates |
| Physical (P) | `#ffadad` | tactile cues, Connection bars when P dominates |
| Emotional (E) | `#bdb2ff` | conversational cues, Connection bars when E dominates |
| Social (S) | `#ffd6a5` | group energy, Expression bars when S dominates |
| Private (V) | `#9bf6ff` | quiet hues, Expression bars when V dominates |
| Forgiving (F) | `#a0c4ff` | restorative notes, Resolution bars when F dominates |
| Critical (C) | `#fdffb6` | analytical notes, Resolution bars when C dominates |

Dimension background gradients (`--dimension-hope`, etc.) live in `colors.css` and provide defaults if a trait color is unavailable.

---

Questions, copy, and visuals were all authored specifically for romantic contexts, so feel free to adapt the HCER framework to other interpersonal products if you credit the source.  
Happy typing! 💘
