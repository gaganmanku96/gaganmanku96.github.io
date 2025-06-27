import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateChatInput } from '@/lib/input-validation';
import { useChatPersistence } from '@/hooks/useChatPersistence';

interface ChatbotProps {
  // Remove isOpen and onToggle - now handled by persistence hook
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

interface MessageBubbleProps {
  message: Message;
  isExpanded: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isExpanded }) => {
  const [copied, setCopied] = useState(false);

  const copyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
    >
      <div className={`relative max-w-[85%] ${isExpanded ? 'max-w-[75%]' : ''}`}>
        {message.role === 'assistant' && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">AI Assistant</span>
          </div>
        )}
        
        <div
          className={`relative p-4 rounded-2xl shadow-sm ${
            message.role === 'user'
              ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-br-md'
              : 'bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm rounded-bl-md'
          }`}
        >
          <p className={`leading-relaxed whitespace-pre-wrap ${isExpanded ? 'text-base' : 'text-sm'}`}>
            {message.content}
          </p>
          
          {/* Copy button */}
          {message.role === 'assistant' && (
            <button
              onClick={copyMessage}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
              title="Copy message"
            >
              {copied ? (
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          )}
        </div>
        
        {message.role === 'user' && (
          <div className="flex items-center justify-end space-x-1 mt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">You</span>
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

type ChatMode = 'compact' | 'expanded';

const Chatbot: React.FC<ChatbotProps> = () => {
  const { messages, isOpen, addMessage, toggleChat, clearMessages, cleanDuplicates } = useChatPersistence();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>('compact');
  const [userScrolled, setUserScrolled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && !userScrolled) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
      setUserScrolled(!isAtBottom);
    }
  };

  useEffect(() => {
    // Only auto-scroll for new messages, not on mount
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]); // Re-attach when chat opens

  // Clean up any duplicate/empty messages on mount
  useEffect(() => {
    cleanDuplicates();
  }, [cleanDuplicates]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close chat
      if (e.key === 'Escape' && isOpen) {
        toggleChat();
      }
      // Ctrl/Cmd + K to toggle chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'k' && e.shiftKey) {
        e.preventDefault();
        toggleChat();
      }
      // Ctrl/Cmd + Enter to expand/collapse
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && isOpen) {
        e.preventDefault();
        setChatMode(prev => prev === 'compact' ? 'expanded' : 'compact');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Validate input before sending
    const validation = validateChatInput(input);
    if (!validation.isValid) {
      addMessage({ 
        role: 'assistant', 
        content: `Sorry, ${validation.error}. Please try again with a different message.` 
      });
      setInput('');
      return;
    }

    const userMessage = { role: 'user' as const, content: validation.sanitized || input };
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const errorData = await response.json();
          throw new Error(`Rate limit exceeded. ${errorData.message}`);
        }
        if (response.status === 500) {
          throw new Error('Server error. Please try again in a moment.');
        }
        if (response.status === 400) {
          throw new Error('Invalid request. Please try rephrasing your question.');
        }
        throw new Error(`Request failed with status ${response.status}. Please try again.`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let assistantMessage = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;
      }

      // Add only the complete message (no empty message first)
      if (assistantMessage.trim()) {
        addMessage({ role: 'assistant', content: assistantMessage.trim() });
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.';
      addMessage({ 
        role: 'assistant', 
        content: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Get chat dimensions and position based on mode
  const getChatConfig = () => {
    switch (chatMode) {
      case 'expanded':
        return {
          position: 'fixed inset-6',
          size: 'w-auto h-auto max-w-5xl mx-auto',
          backdrop: true,
          padding: '',
          glass: true
        };
      default: // compact
        return {
          position: 'fixed bottom-28 right-8',
          size: 'w-96 h-[32rem] max-h-[80vh]',
          backdrop: false,
          padding: '',
          glass: false
        };
    }
  };

  const chatConfig = getChatConfig();

  const chatVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
  };

  return (
    <>
      {/* Backdrop for modal/fullscreen modes */}
      <AnimatePresence>
        {isOpen && chatConfig.backdrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
            onClick={() => setChatMode('compact')}
          />
        )}
      </AnimatePresence>

      {/* Floating chat button */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
              className="w-6 h-6 text-white mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 180 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
              className="w-6 h-6 text-white mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${chatConfig.position} ${chatConfig.size} ${chatConfig.backdrop ? 'z-50' : 'z-40'} ${chatConfig.padding} ${
              chatConfig.glass 
                ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-black/20' 
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl'
            } rounded-2xl flex flex-col overflow-hidden`}
          >
            {/* Expanded mode close button - positioned outside header */}
            {chatMode === 'expanded' && (
              <button
                onClick={() => setChatMode('compact')}
                className="absolute -top-2 -right-2 z-20 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg border-2 border-white dark:border-slate-800"
                title="Close expanded view"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Chat header */}
            <div className={`${
              chatConfig.glass 
                ? 'bg-gradient-to-r from-primary-600/90 to-secondary-600/90 backdrop-blur-sm' 
                : 'bg-gradient-to-r from-primary-600 to-secondary-600'
            } text-white p-4 flex items-center justify-between border-b border-white/10`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs opacity-90">Ask me about Gagan's work</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Clear chat button */}
                {messages.length > 0 && (
                  <button
                    onClick={clearMessages}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    title="Clear conversation"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}

                {/* Scroll to bottom button */}
                {userScrolled && (
                  <button
                    onClick={() => {
                      setUserScrolled(false);
                      if (messagesContainerRef.current) {
                        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
                      }
                    }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    title="Scroll to bottom"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                )}
                
                {/* Mode toggle button */}
                <button
                  onClick={() => setChatMode(prev => prev === 'compact' ? 'expanded' : 'compact')}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  title={chatMode === 'compact' ? 'Expand chat' : 'Minimize chat'}
                >
                  {chatMode === 'compact' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 14H4m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2m16 4v5M4 14V9" />
                    </svg>
                  )}
                </button>
                
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-90">Online</span>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className={`flex-1 flex flex-col overflow-hidden ${
              chatConfig.glass 
                ? 'bg-gradient-to-b from-slate-50/50 to-white/30 dark:from-slate-900/30 dark:to-slate-800/20' 
                : 'bg-slate-50 dark:bg-slate-900/50'
            }`}>
              <div 
                ref={messagesContainerRef} 
                className="flex-1 overflow-y-scroll p-4 space-y-4"
                style={{ 
                  scrollBehavior: 'auto',
                  overscrollBehavior: 'contain',
                  height: chatMode === 'expanded' ? 'calc(100vh - 250px)' : '350px'
                }}
              >
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Welcome! I'm Gagan's AI Assistant
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                    Ask me about his projects, experience, or technical expertise!
                  </p>
                  
                  {/* Suggested prompts */}
                  <div className="grid grid-cols-1 gap-2 max-w-sm mx-auto">
                    {[
                      "Tell me about Gagan's experience",
                      "What are his main projects?",
                      "What technologies does he use?",
                      "How can I contact him?"
                    ].map((prompt, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          setInput(prompt);
                          // Trigger submit after a brief delay to ensure input is set
                          setTimeout(() => {
                            const form = document.querySelector('form');
                            if (form) {
                              form.requestSubmit();
                            }
                          }, 100);
                        }}
                        className="text-left px-4 py-3 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm text-slate-700 dark:text-slate-300 transition-all duration-200 hover:shadow-md backdrop-blur-sm"
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <MessageBubble 
                  key={index} 
                  message={message} 
                  isExpanded={chatMode === 'expanded'}
                />
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start group"
                >
                  <div className="relative max-w-[85%]">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">AI Assistant is typing...</span>
                    </div>
                    
                    <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-4 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input area */}
            <div className={`p-4 border-t border-slate-200/50 dark:border-slate-700/50 ${
              chatConfig.glass 
                ? 'bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm' 
                : 'bg-white dark:bg-slate-800'
            }`}>
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder={`Ask about Gagan's ${chatMode === 'expanded' ? 'projects, experience, skills, or anything else' : 'work & expertise'}...`}
                    className={`w-full px-4 py-3 ${
                      chatConfig.glass 
                        ? 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50' 
                        : 'bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 dark:text-white transition-all duration-200 ${
                      chatMode === 'expanded' ? 'text-base' : 'text-sm'
                    }`}
                    disabled={isLoading}
                  />
                  {input && (
                    <button
                      type="button"
                      onClick={() => setInput('')}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`${
                    chatMode === 'expanded' ? 'px-6 py-3' : 'px-4 py-3'
                  } bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </motion.button>
              </form>
              
              {/* Quick actions for expanded mode */}
              {chatMode === 'expanded' && (
                <div className="flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-4">
                    <span>Press Enter to send • Shift+Enter for new line</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Powered by DeepSeek R1</span>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;