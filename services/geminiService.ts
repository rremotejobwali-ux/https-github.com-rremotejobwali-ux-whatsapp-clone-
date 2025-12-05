import { GoogleGenAI } from "@google/genai";
import { Message, User } from "../types";

// Safety check for API key availability to prevent crashes if not set
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateResponse = async (
  user: User,
  history: Message[]
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Error: API Key missing.";

  // Format history for the model
  // We only take the last 10 messages to save tokens and keep context relevant
  const recentHistory = history.slice(-10);
  const conversationString = recentHistory.map(m => 
    `${m.sender === 'me' ? 'User' : user.name}: ${m.text}`
  ).join('\n');

  const systemPrompt = `
    You are roleplaying as ${user.name}.
    Your persona instructions are: ${user.systemInstruction || 'Be a helpful assistant.'}
    
    Here is the recent conversation history:
    ${conversationString}
    
    User just sent the last message. Reply directly as ${user.name}. 
    Do not prefix your response with "Mom:" or "${user.name}:". 
    Keep it relatively short, like a text message.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: systemPrompt, // In a real app, we'd structure this as proper chat history, but for roleplay, a system prompt with context blob works well.
    });
    return response.text || "...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I can't reply right now (Network Error).";
  }
};