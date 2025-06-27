interface RateLimitEntry {
  count: number;
  resetTime: number;
  lastRequest: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private maxRequests: number;
  private windowMs: number;
  private cleanupInterval: NodeJS.Timeout;

  constructor(maxRequests = 10, windowMs = 60000) { // 10 requests per minute by default
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    const entries = Array.from(this.store.entries());
    for (const [key, entry] of entries) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  private getClientId(req: any): string {
    // Try to get IP from various headers (for proxies, load balancers)
    const forwarded = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];
    const ip = forwarded ? forwarded.split(',')[0] : realIp || req.connection.remoteAddress || req.socket.remoteAddress;
    
    // Add user agent as additional identifier to prevent simple IP spoofing
    const userAgent = req.headers['user-agent'] || 'unknown';
    return `${ip}:${userAgent.substring(0, 50)}`; // Limit UA length
  }

  public check(req: any): { allowed: boolean; remaining: number; resetTime: number } {
    const clientId = this.getClientId(req);
    const now = Date.now();
    
    let entry = this.store.get(clientId);
    
    if (!entry || now > entry.resetTime) {
      // New window or expired entry
      entry = {
        count: 1,
        resetTime: now + this.windowMs,
        lastRequest: now
      };
      this.store.set(clientId, entry);
      
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime: entry.resetTime
      };
    }
    
    // Check for suspicious rapid requests (potential bot)
    const timeSinceLastRequest = now - entry.lastRequest;
    if (timeSinceLastRequest < 1000) { // Less than 1 second between requests
      entry.count += 2; // Penalize rapid requests
    } else {
      entry.count += 1;
    }
    
    entry.lastRequest = now;
    this.store.set(clientId, entry);
    
    const allowed = entry.count <= this.maxRequests;
    const remaining = Math.max(0, this.maxRequests - entry.count);
    
    return {
      allowed,
      remaining,
      resetTime: entry.resetTime
    };
  }

  public destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.store.clear();
  }
}

// Create singleton instance
export const rateLimiter = new RateLimiter(
  15, // 15 requests per window
  60000 // 1 minute window
);

// Security middleware for chat API
export function withRateLimit(handler: any) {
  return async (req: any, res: any) => {
    const { allowed, remaining, resetTime } = rateLimiter.check(req);
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', 15);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', new Date(resetTime).toISOString());
    
    if (!allowed) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'You have exceeded the rate limit. Please try again later.',
        retryAfter: Math.ceil((resetTime - Date.now()) / 1000)
      });
    }
    
    return handler(req, res);
  };
}