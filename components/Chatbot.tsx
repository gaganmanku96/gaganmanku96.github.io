import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateChatInput } from '@/lib/input-validation';

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

interface MessageBubbleProps {
  message: Message;
  onSuggestedQuestionClick?: (question: string) => void;
}

interface ParsedMessage {
  content: string;
  suggestions: string[];
}

// Function to parse assistant messages and extract suggestions
const parseMessageContent = (content: string): ParsedMessage => {
  const suggestionMarker = '---SUGGESTIONS---';
  
  if (content.includes(suggestionMarker)) {
    const [mainContent, suggestionsSection] = content.split(suggestionMarker);
    
    // Extract suggestions (numbered list format)
    const suggestions = suggestionsSection
      .split('\n')
      .filter(line => line.trim().match(/^\d+\./)) 
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(suggestion => suggestion.length > 0);
    
    return {
      content: mainContent.trim(),
      suggestions: suggestions.slice(0, 3) // Only take first 3 suggestions
    };
  }
  
  return {
    content: content.trim(),
    suggestions: []
  };
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onSuggestedQuestionClick }) => {
  const [copied, setCopied] = useState(false);
  
  // Parse message content to extract suggestions for assistant messages
  const parsedMessage = message.role === 'assistant' ? parseMessageContent(message.content) : null;

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
      <div className="relative max-w-[85%]">
        {message.role === 'assistant' && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
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
              ? 'bg-primary-600 text-white rounded-br-md font-medium'
              : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-md font-medium'
          }`}
        >
          {message.role === 'assistant' && parsedMessage ? (
            <div className="leading-relaxed text-sm font-medium">
              <div 
                dangerouslySetInnerHTML={{
                  __html: parsedMessage.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1">$1</h3>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-base font-bold text-slate-900 dark:text-white mb-2">$1</h2>')
                    .replace(/^# (.*$)/gm, '<h1 class="text-lg font-bold text-slate-900 dark:text-white mb-2">$1</h1>')
                    .replace(/^\d+\. /gm, '<li class="text-slate-700 dark:text-slate-300">')
                    .replace(/^- /gm, '<li class="text-slate-700 dark:text-slate-300">')
                    .replace(/\n/g, '<br />')
                }}
              />
            </div>
          ) : (
            <p className="leading-relaxed whitespace-pre-wrap text-sm font-medium text-slate-700 dark:text-slate-300">
              {message.role === 'assistant' && parsedMessage ? parsedMessage.content : message.content}
            </p>
          )}
          
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

        {/* Suggested Questions for assistant messages */}
        {message.role === 'assistant' && parsedMessage && parsedMessage.suggestions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">You might also ask:</p>
            
            {/* Mobile: Horizontal scroll with 2 visible suggestions */}
            <div className="block sm:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {parsedMessage.suggestions.slice(0, 2).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestedQuestionClick?.(suggestion)}
                    className="flex-shrink-0 min-w-[250px] text-left p-3 text-sm bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-600/50 rounded-lg transition-all duration-200 border border-slate-200/50 dark:border-slate-600/50 hover:border-primary-300 dark:hover:border-primary-600"
                  >
                    <span className="text-primary-600 dark:text-primary-400 font-medium mr-2">Q:</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {suggestion.length > 40 ? `${suggestion.substring(0, 37)}...` : suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Vertical stack with all 3 suggestions */}
            <div className="hidden sm:block">
              <div className="space-y-2">
                {parsedMessage.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestedQuestionClick?.(suggestion)}
                    className="block w-full text-left p-3 text-sm bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-600/50 rounded-lg transition-all duration-200 border border-slate-200/50 dark:border-slate-600/50 hover:border-primary-300 dark:hover:border-primary-600"
                  >
                    <span className="text-primary-600 dark:text-primary-400 font-medium mr-2">Q:</span>
                    <span className="text-slate-700 dark:text-slate-300">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
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

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close chat
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  // Popup timing logic
  useEffect(() => {
    // Check if popup was previously dismissed
    const dismissed = localStorage.getItem('chat-popup-dismissed');
    if (dismissed || hasInteracted) return;

    // Show popup after 5 seconds
    const initialTimer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [hasInteracted]);

  // Auto-hide popup after 3 seconds, then re-show periodically
  useEffect(() => {
    if (!showPopup) return;

    const hideTimer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(hideTimer);
  }, [showPopup]);

  // Re-show popup every 15 seconds if user hasn't interacted
  useEffect(() => {
    if (hasInteracted || showPopup) return;

    const interval = setInterval(() => {
      const dismissed = localStorage.getItem('chat-popup-dismissed');
      if (!dismissed && !isOpen) {
        setShowPopup(true);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [hasInteracted, showPopup, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Validate input before sending
    const validation = validateChatInput(input);
    if (!validation.isValid) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry, ${validation.error}. Please try again with a different message.` 
      }]);
      setInput('');
      return;
    }

    const userMessage = { role: 'user' as const, content: validation.sanitized || input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Clean messages to only include role and content (remove timestamp)
      const cleanMessages = [...messages, userMessage].map(({ role, content }) => ({ role, content }));
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: cleanMessages,
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

      // Add only the complete message
      if (assistantMessage.trim()) {
        setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage.trim(), timestamp: Date.now() }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.';
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSuggestedQuestionClick = (question: string) => {
    setInput(question);
    // Trigger submit after a brief delay to ensure input is set
    setTimeout(() => {
      const form = document.querySelector('form[data-chatbot-form]');
      if (form) {
        (form as HTMLFormElement).requestSubmit();
      }
    }, 100);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // Simple chat configuration with responsive positioning
  const chatConfig = {
    position: 'fixed',
    size: 'w-[calc(100vw-1rem)] max-w-sm sm:w-96 h-[32rem] max-h-[80vh]',
    backdrop: false,
    padding: '',
    glass: false,
    zIndex: 'z-50',
    style: {
      position: 'fixed' as const,
      bottom: '7rem',
      right: '0.5rem',
      zIndex: 9999,
      transform: 'none',
      left: 'auto',
      top: 'auto'
    }
  };

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
      {/* Popup message */}
      <AnimatePresence>
        {showPopup && !isOpen && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 10,
              transition: { duration: 0.2 }
            }}
            className="fixed bottom-20 right-6 sm:bottom-24 sm:right-12 z-40 max-w-[200px] sm:max-w-[250px]"
          >
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 sm:p-4 shadow-xl relative">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 text-center">
                Ask me anything! 💬
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">
                About Gagan's work & skills
              </div>
              {/* Arrow pointing to chat button */}
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700 transform rotate-45"></div>
              {/* Close button */}
              <button
                onClick={() => {
                  setShowPopup(false);
                  setHasInteracted(true);
                  localStorage.setItem('chat-popup-dismissed', 'true');
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-slate-400 hover:bg-slate-500 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                aria-label="Dismiss popup"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating chat button */}
      <motion.button
        onClick={() => {
          onToggle();
          setHasInteracted(true);
          setShowPopup(false);
        }}
        className={`fixed bottom-6 right-4 z-50 w-14 h-14 sm:w-16 sm:h-16 sm:bottom-8 sm:right-8 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-primary-600 hover:bg-primary-700'
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
            className={`${chatConfig.size} bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl flex flex-col overflow-hidden`}
            style={chatConfig.style}
          >
            {/* Chat header */}
            <div className="bg-primary-600 text-white p-4 flex items-center justify-between border-b border-white/10">
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
                
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs opacity-90">Online</span>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900/50">
              <div 
                ref={messagesContainerRef} 
                className="flex-1 overflow-y-scroll p-4 space-y-4"
                style={{ 
                  scrollBehavior: 'auto',
                  overscrollBehavior: 'contain',
                  height: '350px'
                }}
              >
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
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
                            const form = document.querySelector('form[data-chatbot-form]');
                            if (form) {
                              (form as HTMLFormElement).requestSubmit();
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
                  onSuggestedQuestionClick={handleSuggestedQuestionClick}
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
                      <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">AI Assistant is thinking...</span>
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
            <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-white dark:bg-slate-800">
              <form onSubmit={handleSubmit} className="flex space-x-3" data-chatbot-form>
                <div className="flex-1 relative">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about Gagan's work & expertise..."
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 dark:text-white transition-all duration-200 text-sm font-medium"
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
                  className="px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;