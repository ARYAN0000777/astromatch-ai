import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PersonInput {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

interface KootaResult {
  name: string;
  sanskrit: string;
  score: number;
  max: number;
  description: string;
  icon: string;
}

// ─── Ashtakoot Mock Engine ────────────────────────────────────────────────────
// In a production app, replace this with a real Jyotish calculation library
// e.g. https://github.com/naturalstupidity/astrology or a paid API like AstroSage
function calculateAshtakoot(boy: PersonInput, girl: PersonInput): KootaResult[] {
  // Use DOBs as seed for deterministic (but different) scores per pair
  const seed = (boy.dob + girl.dob + boy.pob + girl.pob)
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const pseudo = (offset: number, max: number) => {
    const val = Math.sin(seed * (offset + 1) * 0.1273) * 0.5 + 0.5;
    return Math.round(val * max);
  };

  const kootas: Omit<KootaResult, "score">[] = [
    { name: "Varna", sanskrit: "वर्ण", max: 1, icon: "👑", description: "Spiritual development compatibility. Relates to spiritual evolution and ego compatibility between partners." },
    { name: "Vashya", sanskrit: "वश्य", max: 2, icon: "🤝", description: "Power and dominance compatibility. Indicates the level of mutual attraction and influence between the couple." },
    { name: "Tara", sanskrit: "तारा", max: 3, icon: "⭐", description: "Birth star compatibility. Relates to health and well-being of the couple after marriage." },
    { name: "Yoni", sanskrit: "योनि", max: 4, icon: "🌙", description: "Biological and intimate compatibility. Indicates physical intimacy, sexual compatibility, and mutual love." },
    { name: "Graha Maitri", sanskrit: "ग्रह मैत्री", max: 5, icon: "🌟", description: "Planetary friendship compatibility. Indicates intellectual and emotional bonding between partners." },
    { name: "Gana", sanskrit: "गण", max: 6, icon: "🔥", description: "Temperament compatibility. Classifies personalities into Deva, Manushya, and Rakshasa groups." },
    { name: "Bhakut", sanskrit: "भकूट", max: 7, icon: "💫", description: "Moon sign compatibility. One of the most important factors affecting love, health, and progeny." },
    { name: "Nadi", sanskrit: "नाडी", max: 8, icon: "🧬", description: "Genetic compatibility. The most important koota; indicates health of offspring and genetic harmony." },
  ];

  return kootas.map((k, i) => ({
    ...k,
    score: pseudo(i, k.max),
  }));
}

function getCompatibilityLabel(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.75) return "Excellent";
  if (pct >= 0.60) return "Good";
  if (pct >= 0.40) return "Average";
  return "Challenging";
}

// ─── Gemini AI Integration ────────────────────────────────────────────────────
async function generateAIReport(
  boy: PersonInput,
  girl: PersonInput,
  kootas: KootaResult[],
  totalScore: number,
  maxScore: number,
  compatibility: string
): Promise<{ verdict: string; deepDive: string; remedies: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback mock if no key provided
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return generateMockReport(boy, girl, totalScore, maxScore, compatibility);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const kootaData = kootas
    .map(k => `  - ${k.name} (${k.sanskrit}): ${k.score}/${k.max}`)
    .join("\n");

  const prompt = `You are an expert Vedic Astrologer and modern relationship counselor. 
Analyze this Kundali matching data for ${boy.name} (born ${boy.dob} at ${boy.tob} in ${boy.pob}) 
and ${girl.name} (born ${girl.dob} at ${girl.tob} in ${girl.pob}):

ASHTAKOOT SCORE: ${totalScore}/${maxScore} (${compatibility})

KOOTA BREAKDOWN:
${kootaData}

Write a compatibility report in exactly this JSON format (no extra text, just valid JSON):
{
  "verdict": "A single powerful sentence verdict about this match",
  "deepDive": "3-4 sentences of psychological and emotional compatibility analysis. Reference specific high and low scoring kootas. Be modern, insightful, and encouraging.",
  "remedies": "3-4 sentences of practical Vedic remedies and modern relationship advice tailored to their specific weak areas. Include at least one traditional remedy and one modern tip."
}

Keep the tone modern, warm, encouraging but honest. Address both partners by name. Avoid archaic language.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      verdict: parsed.verdict || "This union holds cosmic promise.",
      deepDive: parsed.deepDive || "The stars align in meaningful ways for this couple.",
      remedies: parsed.remedies || "Regular communication and mutual respect will strengthen this bond.",
    };
  } catch {
    // Fallback to mock if Gemini fails
    return generateMockReport(boy, girl, totalScore, maxScore, compatibility);
  }
}

function generateMockReport(
  boy: PersonInput,
  girl: PersonInput,
  totalScore: number,
  maxScore: number,
  compatibility: string
): { verdict: string; deepDive: string; remedies: string } {
  const pct = Math.round((totalScore / maxScore) * 100);
  
  const verdicts: Record<string, string> = {
    Excellent: `${boy.name} and ${girl.name} share a remarkably harmonious cosmic bond that promises a deeply fulfilling and spiritually enriching partnership.`,
    Good: `${boy.name} and ${girl.name} are blessed with a strong cosmic connection, with the stars indicating a loving, supportive, and growth-oriented relationship.`,
    Average: `${boy.name} and ${girl.name} have a moderately compatible match — with awareness and effort, they can build a beautiful life despite some celestial challenges.`,
    Challenging: `${boy.name} and ${girl.name} face cosmic friction in their charts, but with deep commitment and the right guidance, their love can transcend the stars.`,
  };

  const deepDives: Record<string, string> = {
    Excellent: `With a stellar **${pct}%** compatibility score, ${boy.name} and ${girl.name} demonstrate exceptional alignment across emotional, intellectual, and spiritual dimensions. Their **Graha Maitri** suggests a profound meeting of minds, while the high **Bhakut** score points to a relationship that nourishes both partners' soul growth. The **Nadi** score indicates genetic harmony, which bodes well for a healthy family life. Together, they are likely to build a home that radiates warmth, mutual admiration, and creative energy.`,
    Good: `Scoring **${pct}%** in compatibility, ${boy.name} and ${girl.name} share a warm, genuine connection with more cosmic allies than foes. Their **Gana** compatibility suggests temperamental harmony — they naturally "get" each other's moods and rhythms. Some variation in the **Yoni** koota indicates they may need to invest in understanding each other's emotional languages, but this is a joyful journey of discovery. The partnership has strong foundations for trust, loyalty, and shared dreams.`,
    Average: `At **${pct}%** compatibility, ${boy.name} and ${girl.name} represent a relationship where love must consciously cultivate what the cosmos did not automatically provide. Their connection is real and sincere, but certain kootas — especially **Tara** and **Bhakut** — call for extra attention. The beauty in this pairing lies in its potential for profound growth: each challenge is an invitation to develop patience, empathy, and deeper understanding. Many deeply happy couples have been forged in the fire of this very path.`,
    Challenging: `A **${pct}%** score reflects significant cosmic friction, calling for extraordinary commitment from both ${boy.name} and ${girl.name}. The lower **Nadi** and **Bhakut** scores indicate areas where the couple may feel misunderstood or struggle to find common ground. However, free will is the most powerful force in the universe — a conscious, loving, and spiritually grounded relationship can and does flourish against such odds. This is not a warning, but an invitation to love with fierce intentionality.`,
  };

  const remedies: Record<string, string> = {
    Excellent: `Strengthen your already powerful bond by performing **joint prayers or meditation** every morning — this channels your cosmic alignment into daily life. Celebrate your connection regularly through rituals that are meaningful to both of you. On the Vedic side, wearing complementary gemstones (consult a Jyotishi) can amplify your natural cosmic harmony. Modern advice: build a shared vision board for your life together — your natural alignment makes this a powerful manifestation exercise.`,
    Good: `To bridge your minor cosmic gaps, consider performing the **Ganesha Puja** together before major life decisions — this removes obstacles and aligns intentions. For your Yoni koota variation, invest in regular, honest emotional check-ins: a weekly "state of us" conversation can work wonders. Vedic tradition recommends wearing **silver jewelry** to enhance Moon-related harmony. Modern tip: take a personality framework (like MBTI or Enneagram) together to appreciate your differences as complementary strengths.`,
    Average: `The **Navagraha Shanti** puja is highly recommended to pacify the planetary challenges in your charts — perform it together on a Saturday for maximum effect. Planting a **Tulsi plant** in your home together is a traditional remedy to invite positive energy and harmony. For the emotional gaps indicated by Tara, establish a daily 10-minute ritual of uninterrupted, phone-free conversation. Modern relationship science strongly recommends **couples journaling** — writing letters to each other monthly builds the deep intimacy your charts need.`,
    Challenging: `A **Mangal Dosha Shanti** puja and regular chanting of the **Maha Mrityunjaya Mantra** together (108 times weekly) can significantly pacify your challenging planetary combinations. Traditional Jyotish also recommends **donating red lentils and jaggery** on Tuesdays to reduce Mangal-related friction. Consider engaging a couples therapist as a modern "relationship Guru" — having a skilled neutral third party is the 21st-century equivalent of seeking an elder's wisdom. Above all, commit to a "no criticism, only curiosity" communication rule: replace "Why do you always...?" with "Help me understand...".`,
  };

  return {
    verdict: verdicts[compatibility] || verdicts.Average,
    deepDive: deepDives[compatibility] || deepDives.Average,
    remedies: remedies[compatibility] || remedies.Average,
  };
}

// ─── API Handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { boy, girl } = body as { boy: PersonInput; girl: PersonInput };

    // Validate inputs
    const required: (keyof PersonInput)[] = ["name", "dob", "tob", "pob"];
    for (const person of [boy, girl]) {
      if (!person) throw new Error("Missing person data");
      for (const field of required) {
        if (!person[field]?.trim()) throw new Error(`Missing field: ${field}`);
      }
    }

    // Calculate Ashtakoot
    const kootas = calculateAshtakoot(boy, girl);
    const totalScore = kootas.reduce((sum, k) => sum + k.score, 0);
    const maxScore = kootas.reduce((sum, k) => sum + k.max, 0);
    const compatibility = getCompatibilityLabel(totalScore, maxScore);

    // Generate AI report
    const aiReport = await generateAIReport(boy, girl, kootas, totalScore, maxScore, compatibility);

    return NextResponse.json({
      totalScore,
      maxScore,
      kootas,
      compatibility,
      aiReport,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
