
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { UserRole, CheckIn, JournalEntry } from "./types";
import { AFFIRMATIONS } from "./constants";

export const analyzePatterns = async (checkIns: CheckIn[], journals: JournalEntry[]) => {
  if (checkIns.length < 3 && journals.length < 1) {
    return {
      insight: "Continue logging your journey. As you share more, I'll help you spot the hidden rhythms in your recovery.",
      action: null
    };
  }

  const historyString = checkIns.slice(0, 10).map(c => 
    `Date: ${new Date(c.date).toLocaleDateString('en-GB', {weekday: 'long'})}, Mood: ${c.mood}, Cravings: ${c.cravings}, Notes: ${c.notes}`
  ).join(' | ');

  const journalString = journals.slice(0, 5).map(j => 
    `Date: ${new Date(j.date).toLocaleDateString('en-GB', {weekday: 'long'})}, Content: ${j.content}`
  ).join(' | ');

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze this recovery data for patterns. 
        Check-ins: ${historyString}
        Journals: ${journalString}
        
        Rules:
        1. Identify correlations between days of the week, activities, mood, and cravings.
        2. Provide one clear insight and one specific proactive suggestion (e.g., visiting a coffee shop, calling a friend, or breathing exercises).
        3. Be empathetic, non-medical, and concise.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING, description: "A compassionate analysis of patterns found." },
            suggestion: { type: Type.STRING, description: "A specific action the user can take." },
            actionType: { type: Type.STRING, description: "The internal tab name to navigate to if relevant (home, places, wellness, etc.)" }
          },
          required: ["insight", "suggestion"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return {
      insight: data.insight,
      action: data.suggestion,
      target: data.actionType
    };
  } catch (error) {
    return {
      insight: "Every day you log is a data point for your future self. Keep showing up.",
      action: "Review your reasons for staying sober in the Vault.",
      target: "wellness"
    };
  }
};

export const getDeepGuidance = async (query: string, userRole: UserRole) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `User Role: ${userRole}. Query: ${query}`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: "You are a senior compassionate recovery companion. Provide deep, structured, non-medical advice. Focus on psychological resilience, connection, and boundaries."
      },
    });
    return response.text;
  } catch (error) {
    return "Let's focus on one small, safe action you can take right now.";
  }
};

export const searchSupportResources = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: { tools: [{ googleSearch: {} }] }
    });
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    return { text: "I couldn't reach the search network. Try checking the Recovery Phone Book.", sources: [] };
  }
};

export const searchLocalSupport = async (query: string, lat?: number, lng?: number) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Find local support resources for: ${query}`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: (lat && lng) ? { latitude: lat, longitude: lng } : undefined
          }
        }
      }
    });
    return {
      text: response.text,
      maps: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    return { text: "Location search unavailable. Check the manual Resource contacts.", maps: [] };
  }
};

export const generateHealingImage = async (prompt: string, aspectRatio: string = "1:1") => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: `A calming, healing image: ${prompt}` }] },
      config: { 
        imageConfig: { 
          aspectRatio: aspectRatio as any, 
          imageSize: "1K" 
        } 
      }
    });
    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return imagePart?.inlineData?.data;
  } catch (error: any) {
    if (error?.message?.includes("Requested entity was not found.")) {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        (window as any).aistudio.openSelectKey();
      }
    }
  }
};

export const generateAffirmation = async (role: UserRole) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `Compassionate recovery affirmation for role: ${role}. Under 12 words.`,
    });
    return response.text || AFFIRMATIONS[0];
  } catch (error) {
    return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  }
};

export const generateSpeech = async (text: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Speak warmly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
  } catch (error) {
    console.error("TTS failed", error);
    return null;
  }
};

export async function playBase64Audio(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
}
