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

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isExpanded, onSuggestedQuestionClick }) => {
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
      <div className={`relative max-w-[85%] ${isExpanded ? 'max-w-[75%]' : ''}`}>
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
              ? 'bg-primary-600 text-white rounded-br-md'
              : 'bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm rounded-bl-md'
          }`}
        >
          {message.role === 'assistant' && parsedMessage ? (
            <div className={`leading-relaxed ${isExpanded ? 'text-base' : 'text-sm'}`}>
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
            <p className={`leading-relaxed whitespace-pre-wrap ${isExpanded ? 'text-base' : 'text-sm'} text-slate-700 dark:text-slate-300`}>
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

type ChatMode = 'compact' | 'expanded';

const Chatbot: React.FC<ChatbotProps> = () => {
  const { messages, isOpen, addMessage, toggleChat, clearMessages, cleanDuplicates } = useChatPersistence();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>('compact');
  const [userScrolled, setUserScrolled] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [connectionState, setConnectionState] = useState<'idle' | 'connecting' | 'streaming' | 'complete'>('idle');
  const [typewriterText, setTypewriterText] = useState('');
  const [fullStreamedText, setFullStreamedText] = useState('');
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
    // Auto-scroll for new messages and streaming content
    if (messages.length > 0 || streamingMessage || typewriterText) {
      scrollToBottom();
    }
  }, [messages.length, streamingMessage, typewriterText]);

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
    setConnectionState('connecting');

    try {
      // Clean messages to only include role and content (remove timestamp)
      const cleanMessages = [...messages, userMessage].map(({ role, content }) => ({ role, content }));
      
      console.log('[Chatbot] Sending request with messages:', cleanMessages.length);
      
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
      setStreamingMessage(''); // Reset streaming message
      setConnectionState('streaming'); // Update state to streaming

      let chunkCount = 0;
      const startTime = Date.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        chunkCount++;
        assistantMessage += chunk;
        
        // Debug logging
        console.log(`[Streaming] Chunk ${chunkCount}: ${chunk.length} chars, Total: ${assistantMessage.length} chars`);
        
        // Update streaming message in real-time
        setStreamingMessage(assistantMessage);
        
        // Yield control back to React for re-rendering with increased delay for visibility
        await new Promise(resolve => setTimeout(resolve, 25));
      }

      const streamDuration = Date.now() - startTime;
      console.log(`[Streaming] Complete: ${chunkCount} chunks in ${streamDuration}ms, ${assistantMessage.length} total chars`);

      console.log('[Chatbot] Received complete response, length:', assistantMessage.length);

      // Start typewriter effect for smooth visualization
      if (assistantMessage.trim()) {
        startTypewriter(assistantMessage.trim());
      } else {
        setStreamingMessage('');
        setConnectionState('complete');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.';
      setConnectionState('complete');
      setStreamingMessage('');
      setTypewriterText('');
      addMessage({ 
        role: 'assistant', 
        content: errorMessage
      });
    } finally {
      setIsLoading(false);
      setStreamingMessage(''); // Ensure streaming message is cleared
      // Don't reset connection state here - let typewriter effect handle it
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

  // Typewriter effect for smoother streaming visualization
  const startTypewriter = (fullText: string) => {
    setTypewriterText('');
    setFullStreamedText(fullText);
    
    let currentIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypewriterText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        // Complete the typewriter effect
        setStreamingMessage('');
        setTypewriterText('');
        setConnectionState('complete');
        if (fullText.trim()) {
          addMessage({ role: 'assistant', content: fullText.trim() });
        }
      }
    }, 20); // 20ms per character for smooth effect

    return () => clearInterval(typewriterInterval);
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

      {/* Expanded mode close button - positioned in backdrop layer */}
      {isOpen && chatMode === 'expanded' && (
        <button
          onClick={() => setChatMode('compact')}
          className="fixed top-8 right-8 z-50 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xl border-4 border-white dark:border-slate-900"
          style={{ zIndex: 9999 }}
          title="Close expanded view"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

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

            {/* Chat header */}
            <div className={`${
              chatConfig.glass 
                ? 'bg-primary-600/95 backdrop-blur-sm' 
                : 'bg-primary-600'
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
                  onSuggestedQuestionClick={handleSuggestedQuestionClick}
                />
              ))}

              {/* Streaming message display */}
              {(streamingMessage || typewriterText) && (
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
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        AI Assistant {connectionState === 'streaming' ? '(streaming...)' : ''}
                      </span>
                    </div>
                    
                    <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-4 rounded-2xl rounded-bl-md">
                      <div className={`leading-relaxed ${chatMode === 'expanded' ? 'text-base' : 'text-sm'}`}>
                        <div 
                          dangerouslySetInnerHTML={{
                            __html: (typewriterText || streamingMessage)
                              .split('---SUGGESTIONS---')[0] // Don't show suggestions while streaming
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
                              .replace(/^### (.*$)/gm, '<h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1">$1</h3>')
                              .replace(/^## (.*$)/gm, '<h2 class="text-base font-bold text-slate-900 dark:text-white mb-2">$1</h2>')
                              .replace(/^# (.*$)/gm, '<h1 class="text-lg font-bold text-slate-900 dark:text-white mb-2">$1</h1>')
                              .replace(/\n/g, '<br />')
                          }}
                        />
                        <span className="inline-block w-2 h-4 bg-primary-500 ml-1 animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {isLoading && !streamingMessage && (
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
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        AI Assistant is {connectionState === 'connecting' ? 'connecting...' : 'thinking...'}
                      </span>
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
              <form onSubmit={handleSubmit} className="flex space-x-3" data-chatbot-form>
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
                  } bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl`}
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