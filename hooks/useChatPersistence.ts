import { useState, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  lastActiveTime: number;
}

const STORAGE_KEY = 'portfolio-chat-state';
const MAX_STORAGE_AGE = 24 * 60 * 60 * 1000; // 24 hours
const MAX_MESSAGES = 50; // Limit stored messages

export function useChatPersistence() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedState: ChatState = JSON.parse(stored);
        const now = Date.now();
        
        // Check if stored data is not too old
        if (now - parsedState.lastActiveTime < MAX_STORAGE_AGE) {
          setMessages(parsedState.messages || []);
          setIsOpen(parsedState.isOpen || false);
        } else {
          // Clear expired data
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.warn('Failed to load chat state from localStorage:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const state: ChatState = {
        messages: messages.slice(-MAX_MESSAGES), // Only keep recent messages
        isOpen,
        lastActiveTime: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save chat state to localStorage:', error);
    }
  }, [messages, isOpen]);

  const addMessage = useCallback((message: Message) => {
    const messageWithTimestamp = {
      ...message,
      timestamp: Date.now(),
    };
    setMessages(prev => {
      // Remove any empty assistant messages before adding new one
      const filteredMessages = prev.filter(msg => 
        !(msg.role === 'assistant' && (!msg.content || msg.content.trim() === ''))
      );
      return [...filteredMessages, messageWithTimestamp];
    });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const cleanDuplicates = useCallback(() => {
    setMessages(prev => {
      const filtered = prev.filter(msg => 
        !(msg.role === 'assistant' && (!msg.content || msg.content.trim() === ''))
      );
      // Only update if there's actually a change
      return filtered.length !== prev.length ? filtered : prev;
    });
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    messages,
    isOpen,
    setMessages,
    setIsOpen,
    addMessage,
    clearMessages,
    cleanDuplicates,
    toggleChat,
  };
}