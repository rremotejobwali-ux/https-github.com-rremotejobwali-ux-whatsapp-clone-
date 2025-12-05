import React from 'react';
import { User, Chat } from './types';

export const USERS: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    name: 'Mom',
    avatar: 'https://picsum.photos/id/64/200/200',
    status: 'Love you! ❤️',
    phone: '+1 (555) 010-9999',
    systemInstruction: 'You are a caring, slightly overprotective mother who uses too many emojis. Keep responses short.'
  },
  'user-2': {
    id: 'user-2',
    name: 'Tech Recruiter',
    avatar: 'https://picsum.photos/id/1025/200/200',
    status: 'Hiring React Wizards 🧙‍♂️',
    phone: '+1 (555) 023-4567',
    systemInstruction: 'You are a professional tech recruiter. You are formal but enthusiastic about hiring the user for a Senior React role.'
  },
  'user-3': {
    id: 'user-3',
    name: 'Pizza Place 🍕',
    avatar: 'https://picsum.photos/id/292/200/200',
    status: 'Open 10am - 11pm',
    phone: '+1 (555) 999-0000',
    systemInstruction: 'You are a pizza shop order bot. You allow ordering pizza. You are helpful and hungry.'
  },
  'user-4': {
    id: 'user-4',
    name: 'Bestie',
    avatar: 'https://picsum.photos/id/338/200/200',
    status: 'Living my best life',
    phone: '+1 (555) 777-1234',
    systemInstruction: 'You are the users best friend. You are casual, use slang like "fr", "ngl", "lol", and support everything they say.'
  }
};

export const INITIAL_CHATS: Chat[] = [
  {
    id: 'chat-1',
    userId: 'user-1',
    unreadCount: 2,
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    messages: [
      { id: 'm1', text: 'Did you eat lunch yet?', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), status: 'read' },
      { id: 'm2', text: 'Call me when you can!', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), status: 'delivered' }
    ]
  },
  {
    id: 'chat-2',
    userId: 'user-2',
    unreadCount: 0,
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    messages: [
      { id: 'm3', text: 'Hi! I saw your GitHub profile.', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'read' },
      { id: 'm4', text: 'Thanks! I am interested.', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), status: 'read' }
    ]
  },
  {
    id: 'chat-4',
    userId: 'user-4',
    unreadCount: 0,
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    messages: [
      { id: 'm5', text: 'Going to the party tonight?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), status: 'read' },
      { id: 'm6', text: 'Yesss cant wait!', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(), status: 'read' }
    ]
  },
  {
    id: 'chat-3',
    userId: 'user-3',
    unreadCount: 0,
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    messages: [
      { id: 'm7', text: 'Your order has been delivered.', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), status: 'read' }
    ]
  }
];

// Reusable SVG Icons
export const Icons = {
  Back: () => React.createElement("svg", { viewBox: "0 0 24 24", width: "24", height: "24", className: "" },
    React.createElement("path", { fill: "currentColor", d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" })
  ),
  Search: () => React.createElement("svg", { viewBox: "0 0 24 24", width: "24", height: "24", className: "" },
    React.createElement("path", { fill: "currentColor", d: "M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.256l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.608 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z" })
  ),
  Menu: () => React.createElement("svg", { viewBox: "0 0 24 24", width: "24", height: "24", className: "" },
    React.createElement("path", { fill: "currentColor", d: "M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z" })
  ),
  Smiley: () => React.createElement("svg", { viewBox: "0 0 24 24", width: "24", height: "24", className: "" },
    React.createElement("path", { fill: "currentColor", d: "M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.333 6.089-5.858 6.063-5.551a.076.076 0 0 0-.076-.074c-.457-.038-.909.062-1.226.312-.317.25-.505.626-.505 1.026.023 2.502-1.385 4.38-4.256 4.288-2.871.092-4.279-1.786-4.256-4.288 0-.4-.188-.776-.505-1.026a1.533 1.533 0 0 0-1.226-.312.076.076 0 0 0-.076.074zm12.518-1.362c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })
  ),
  Plus: () => React.createElement("svg", { viewBox: "0 0 24 24", width: "24", height: "24", className: "" },
    React.createElement("path", { fill: "currentColor", d: "M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z" })
  ),
  Mic: () => React.createElement("svg", { viewBox: "0 0 24 24", width: "24", height: "24", className: "" },
    React.createElement("path", { fill: "currentColor", d: "M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm4.338-9.195h-1.441c.028.256.058.514.058.769 0 2.759-2.241 5.002-4.999 5.002s-4.998-2.243-4.998-5.002c0-.255.029-.513.056-.769H3.531c-.028.254-.057.512-.057.769 0 4.226 3.172 7.689 7.218 8.196v3.29h2.611v-3.29c4.048-.507 7.22-3.97 7.22-8.196 0-.257-.027-.515-.056-.769z" })
  ),
  Send: () => React.createElement("svg", { viewBox: "0 0 24 24", width: "24", height: "24", className: "" },
    React.createElement("path", { fill: "currentColor", d: "M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" })
  ),
  DoubleCheck: ({ color = '#53bdeb' }: { color?: string }) => React.createElement("svg", { viewBox: "0 0 16 11", width: "16", height: "11", className: "" },
    React.createElement("path", { fill: color, d: "M11.55 0L10.3 1.25L13.55 4.5L14.8 3.25L11.55 0ZM8.55 3L7.3 4.25L10.55 7.5L11.8 6.25L8.55 3ZM4.55 3L0.8 6.75L2.05 8L4.55 5.5L7.05 8L8.3 6.75L4.55 3ZM11.05 7L10.55 7.5L11.8 8.75L15.55 5L14.3 3.75L11.05 7Z" })
  ),
};
