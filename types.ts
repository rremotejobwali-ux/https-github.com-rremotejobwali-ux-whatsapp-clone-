export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: string; // e.g., "online", "busy", "At the gym"
  phone: string;
  systemInstruction?: string; // For Gemini persona
}

export interface Chat {
  id: string;
  userId: string;
  messages: Message[];
  unreadCount: number;
  lastMessageTime: string; // ISO string for sorting
  isTyping?: boolean;
}

export interface ChatWithUser extends Chat {
  user: User;
}