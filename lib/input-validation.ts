// Input validation and sanitization utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: string;
}

export function validateChatInput(input: string): ValidationResult {
  // Check if input exists
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'Input is required' };
  }

  // Trim whitespace
  const trimmed = input.trim();
  
  // Check length limits
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Input cannot be empty' };
  }
  
  if (trimmed.length > 1000) {
    return { isValid: false, error: 'Input too long (max 1000 characters)' };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /(?:ignore|disregard|forget).{0,20}(?:previous|above|instructions|prompt)/i,
    /(?:you are|you're).{0,50}(?:now|instead|actually)/i,
    /(?:system|admin|root|developer).{0,20}(?:prompt|message|instruction)/i,
    /<script|javascript:|data:|vbscript:/i,
    /\b(?:sql|union|select|insert|delete|drop|create|alter)\b/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(trimmed)) {
      return { 
        isValid: false, 
        error: 'Input contains potentially harmful content' 
      };
    }
  }

  // Basic sanitization - remove potentially dangerous characters
  const sanitized = trimmed
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .substring(0, 1000); // Ensure max length

  return { isValid: true, sanitized };
}

export function validateMessages(messages: any[]): ValidationResult {
  if (!Array.isArray(messages)) {
    return { isValid: false, error: 'Messages must be an array' };
  }

  if (messages.length > 50) {
    return { isValid: false, error: 'Too many messages in conversation' };
  }

  for (const message of messages) {
    if (!message || typeof message !== 'object') {
      return { isValid: false, error: 'Invalid message format' };
    }

    if (!message.role || !['user', 'assistant'].includes(message.role)) {
      return { isValid: false, error: 'Invalid message role' };
    }

    if (!message.content || typeof message.content !== 'string') {
      return { isValid: false, error: 'Invalid message content' };
    }

    // Only validate length for user messages, assistant messages can be longer
    if (message.role === 'user') {
      const validation = validateChatInput(message.content);
      if (!validation.isValid) {
        return validation;
      }
    } else {
      // For assistant messages, just check basic content requirements
      if (message.content.length > 5000) {
        return { isValid: false, error: 'Assistant message too long' };
      }
    }
  }

  return { isValid: true };
}