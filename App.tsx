import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { ChatWithUser, Message } from './types';
import { INITIAL_CHATS, USERS } from './constants';
import { generateResponse } from './services/geminiService';

const App: React.FC = () => {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  // Create a combined object of chat data + user details
  const enrichedChats: ChatWithUser[] = useMemo(() => {
    return chats
      .map(chat => ({
        ...chat,
        user: USERS[chat.userId]
      }))
      .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
  }, [chats]);

  const activeChat = useMemo(() => 
    enrichedChats.find(c => c.id === activeChatId) || null
  , [enrichedChats, activeChatId]);

  const handleSendMessage = async (text: string) => {
    if (!activeChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    // 1. Update UI immediately with user message
    setChats(prevChats => prevChats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessageTime: newMessage.timestamp,
          isTyping: true // Set typing status for the bot
        };
      }
      return c;
    }));

    // 2. Trigger AI Response
    // Find the user config for this chat
    const currentChat = chats.find(c => c.id === activeChatId);
    const currentUser = currentChat ? USERS[currentChat.userId] : null;

    if (currentUser) {
      // Small delay to simulate network/typing
      setTimeout(async () => {
        // Prepare history for context (excluding the just added one to avoid dupes in logic if needed, but we pass full history usually)
        // Here we just pass the updated messages list
        const updatedChat = chats.find(c => c.id === activeChatId);
        const history = updatedChat ? [...updatedChat.messages, newMessage] : [newMessage];
        
        const responseText = await generateResponse(currentUser, history);

        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'other',
          timestamp: new Date().toISOString(),
          status: 'read'
        };

        setChats(prevChats => prevChats.map(c => {
          if (c.id === activeChatId) {
            // Update previous user message to read
            const updatedMessages = c.messages.map(m => 
              m.id === newMessage.id ? { ...m, status: 'read' as const } : m
            );
            
            return {
              ...c,
              messages: [...updatedMessages, newMessage, replyMessage],
              lastMessageTime: replyMessage.timestamp,
              isTyping: false,
              unreadCount: activeChatId === c.id ? 0 : c.unreadCount + 1 // logic if we were in a different chat
            };
          }
          return c;
        }));

      }, 1500 + Math.random() * 1000); // Random delay 1.5s - 2.5s
    }
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    // Mark messages as read when entering
    setChats(prev => prev.map(c => {
        if(c.id === id) {
            return { ...c, unreadCount: 0 };
        }
        return c;
    }));
  };

  return (
    <div className="h-screen w-screen bg-[#d1d7db] overflow-hidden flex justify-center items-center relative">
      {/* 
        Green background strip at the top (Desktop only visual flair) 
        WhatsApp Web has a green strip at top background
      */}
      <div className="absolute top-0 w-full h-32 bg-[#00a884] z-0 hidden md:block"></div>

      {/* Main App Container */}
      <div className="bg-white z-10 w-full h-full md:h-[95%] md:w-[90%] md:max-w-[1600px] md:shadow-lg md:rounded-lg overflow-hidden flex">
        
        {/* Left Sidebar */}
        <div className={`
          w-full md:w-[40%] lg:w-[30%] h-full flex flex-col border-r border-gray-200
          ${activeChatId ? 'hidden md:flex' : 'flex'}
        `}>
          <Sidebar 
            chats={enrichedChats} 
            currentUser={{
                id: 'me',
                name: 'My Profile',
                avatar: 'https://picsum.photos/id/65/200/200',
                status: 'Available',
                phone: ''
            }}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* Right Chat Window */}
        <div className={`
          w-full md:w-[60%] lg:w-[70%] h-full bg-[#efeae2]
          ${activeChatId ? 'flex' : 'hidden md:flex'}
        `}>
          <ChatWindow 
            chat={activeChat} 
            onBack={() => setActiveChatId(null)}
            onSendMessage={handleSendMessage}
          />
        </div>

      </div>
    </div>
  );
};

export default App;