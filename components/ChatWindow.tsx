import React, { useRef, useEffect, useState } from 'react';
import { ChatWithUser, Message } from '../types';
import { Icons } from '../constants';

interface ChatWindowProps {
  chat: ChatWithUser | null;
  onBack: () => void; // For mobile
  onSendMessage: (text: string) => void;
  className?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  chat, 
  onBack, 
  onSendMessage,
  className = "" 
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages, chat?.isTyping]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chat) {
    return (
      <div className={`flex flex-col items-center justify-center h-full bg-[#f0f2f5] text-[#41525d] border-b-[6px] border-[#25d366] ${className}`}>
        <div className="max-w-[460px] text-center px-8">
            <h1 className="text-3xl font-light mb-5 text-[#41525d]">WhatsChat Web</h1>
            <p className="text-sm leading-6">Send and receive messages without keeping your phone online.<br/>Use WhatsApp on up to 4 linked devices and 1 phone.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      
      {/* Chat Header */}
      <header className="flex items-center px-4 py-2.5 bg-[#f0f2f5] border-b border-gray-200 h-[60px] flex-shrink-0 z-10">
        <button onClick={onBack} className="md:hidden mr-2 text-[#54656f]">
          <Icons.Back />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 cursor-pointer">
          <img src={chat.user.avatar} alt={chat.user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0 cursor-pointer">
          <h2 className="text-[#111b21] text-[16px] font-normal truncate">{chat.user.name}</h2>
          <p className="text-[13px] text-[#54656f] truncate">
             {chat.isTyping ? <span className="text-[#00a884] font-bold">typing...</span> : chat.user.status}
          </p>
        </div>
        <div className="flex gap-5 text-[#54656f]">
           <button><span className="sr-only">Search</span><Icons.Search /></button>
           <button><span className="sr-only">Menu</span><Icons.Menu /></button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-whatsapp-pattern relative custom-scrollbar p-4 md:px-[8%] lg:px-[8%]">
        
        {/* Encryption Notice */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#fff5c4] text-[#54656f] text-[12.5px] px-3 py-1.5 rounded-lg shadow-sm text-center max-w-[90%]">
             Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
          </div>
        </div>

        {/* Message Bubbles */}
        {chat.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex mb-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              relative px-2 py-1.5 rounded-lg shadow-sm max-w-[85%] sm:max-w-[65%] text-[14.2px] leading-[19px]
              ${msg.sender === 'me' ? 'bg-[#d9fdd3] rounded-tr-none' : 'bg-white rounded-tl-none'}
            `}>
              {/* Message Text */}
              <div className="pr-7 pb-1.5 whitespace-pre-wrap break-words text-[#111b21]">
                {msg.text}
              </div>
              
              {/* Metadata (Time + Ticks) */}
              <div className="absolute bottom-1 right-2 flex items-center space-x-1">
                <span className="text-[11px] text-[#667781] min-w-fit">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.sender === 'me' && (
                  <span className="scale-75">
                    <Icons.DoubleCheck color={msg.status === 'read' ? '#53bdeb' : '#8696a0'} />
                  </span>
                )}
              </div>

              {/* Triangle Tail SVG would go here for perfect accuracy, using CSS corners for now */}
              <div className={`absolute top-0 w-2 h-2 
                  ${msg.sender === 'me' 
                    ? '-right-2 border-l-[10px] border-l-[#d9fdd3] border-b-[10px] border-b-transparent' 
                    : '-left-2 border-r-[10px] border-r-white border-b-[10px] border-b-transparent'}
              `}></div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <footer className="bg-[#f0f2f5] px-2 py-2 flex items-center gap-2 flex-shrink-0 z-10">
        <button className="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition">
          <Icons.Smiley />
        </button>
        <button className="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition">
          <Icons.Plus />
        </button>
        
        <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="w-full text-[15px] placeholder:text-[#54656f] focus:outline-none"
          />
        </div>

        {inputText.trim() ? (
           <button 
             onClick={handleSend}
             className="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition"
           >
             <Icons.Send />
           </button>
        ) : (
          <button className="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition">
             <Icons.Mic />
          </button>
        )}
      </footer>
    </div>
  );
};