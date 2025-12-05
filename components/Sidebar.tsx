import React from 'react';
import { ChatWithUser, User } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  chats: ChatWithUser[];
  currentUser: User;
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  chats, 
  currentUser, 
  activeChatId, 
  onSelectChat,
  className = "" 
}) => {
  
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  return (
    <div className={`flex flex-col h-full border-r border-gray-200 bg-white ${className}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-[#f0f2f5] border-b border-gray-200 flex-shrink-0 h-[60px]">
        <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <img src={currentUser.avatar} alt="Me" className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-5 text-[#54656f]">
           <button><span className="sr-only">New Chat</span><Icons.Plus /></button>
           <button><span className="sr-only">Menu</span><Icons.Menu /></button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-2 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-center bg-[#f0f2f5] rounded-lg px-3 py-1.5 h-9">
          <div className="text-[#54656f] mr-4 scale-75">
             <Icons.Search />
          </div>
          <input 
            type="text" 
            placeholder="Search or start new chat" 
            className="bg-transparent w-full text-sm placeholder:text-[#54656f] focus:outline-none"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        {chats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1];
          const isActive = chat.id === activeChatId;

          return (
            <div 
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center px-3 py-3 cursor-pointer transition-colors relative
                ${isActive ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]'}
              `}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 mr-3">
                <img 
                  src={chat.user.avatar} 
                  alt={chat.user.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-center border-b border-gray-100 pb-3 -mb-3 h-full">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="text-[17px] text-[#111b21] font-normal truncate">
                    {chat.user.name}
                  </h3>
                  <span className={`text-xs ${chat.unreadCount > 0 ? 'text-[#00a884] font-medium' : 'text-[#667781]'}`}>
                    {lastMessage ? formatTime(lastMessage.timestamp) : ''}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center overflow-hidden">
                    {lastMessage?.sender === 'me' && (
                       <span className="mr-1 scale-75 flex-shrink-0">
                         <Icons.DoubleCheck color={lastMessage.status === 'read' ? '#53bdeb' : '#8696a0'} />
                       </span>
                    )}
                    <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-[#111b21] font-medium' : 'text-[#667781]'}`}>
                      {chat.isTyping ? <span className="text-[#00a884]">typing...</span> : (lastMessage?.text || "Start a conversation")}
                    </p>
                  </div>
                  
                  {chat.unreadCount > 0 && (
                    <span className="bg-[#25d366] text-white text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center flex-shrink-0 ml-1">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="py-8 text-center text-xs text-gray-400">
          <p>Your personal messages are end-to-end encrypted (simulated).</p>
        </div>
      </div>
    </div>
  );
};