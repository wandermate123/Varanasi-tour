import { useState, useCallback, useRef, useEffect } from 'react';

interface N8nAgentConfig {
  workflowName?: string;
  userId?: string;
  language?: string;
  autoConnect?: boolean;
  pollingInterval?: number;
}

interface N8nResponse {
  message: string;
  suggestions?: string[];
  actions?: any[];
  emotion?: string;
  data?: any;
}

interface N8nAgentState {
  isConnected: boolean;
  isLoading: boolean;
  sessionId: string | null;
  lastResponse: N8nResponse | null;
  error: string | null;
}

export function useN8nAgent(config: N8nAgentConfig = {}) {
  const {
    workflowName = 'wandermate-chat',
    userId = 'anonymous',
    language = 'en',
    autoConnect = false,
    pollingInterval = 2000
  } = config;

  const [state, setState] = useState<N8nAgentState>({
    isConnected: false,
    isLoading: false,
    sessionId: null,
    lastResponse: null,
    error: null
  });

  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect();
    }
    
    return () => {
      disconnect();
    };
  }, [autoConnect]);

  // Start polling for responses when connected
  useEffect(() => {
    if (state.isConnected && state.sessionId) {
      startPolling();
    } else {
      stopPolling();
    }
    
    return () => stopPolling();
  }, [state.isConnected, state.sessionId]);

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Generate a new session ID
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionIdRef.current = sessionId;
      
      // Test connection with health check
      const healthResponse = await fetch('/api/n8n-agent?action=health');
      if (!healthResponse.ok) {
        throw new Error('n8n service not available');
      }
      
      const healthData = await healthResponse.json();
      if (!healthData.n8nConfigured) {
        throw new Error('n8n not configured. Please set N8N_WEBHOOK_URL in environment variables.');
      }

      setState(prev => ({
        ...prev,
        isConnected: true,
        isLoading: false,
        sessionId,
        error: null
      }));

      return sessionId;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to n8n agent';
      setState(prev => ({
        ...prev,
        isConnected: false,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  }, []);

  const disconnect = useCallback(async () => {
    stopPolling();
    
    if (sessionIdRef.current) {
      try {
        await fetch(`/api/n8n-agent?sessionId=${sessionIdRef.current}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.warn('Failed to clean up session:', error);
      }
    }

    setState(prev => ({
      ...prev,
      isConnected: false,
      sessionId: null,
      lastResponse: null,
      error: null
    }));
    
    sessionIdRef.current = null;
  }, []);

  const sendMessage = useCallback(async (message: string, context: any = {}) => {
    if (!state.isConnected || !state.sessionId) {
      throw new Error('Not connected to n8n agent');
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch('/api/n8n-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trigger: 'chat_message',
          workflowId: workflowName,
          data: {
            userMessage: message,
            userId,
            sessionId: state.sessionId,
            language,
            context: {
              ...context,
              timestamp: new Date().toISOString()
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const result = await response.json();
      
      setState(prev => ({ ...prev, isLoading: false }));
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  }, [state.isConnected, state.sessionId, workflowName, userId, language]);

  const triggerAction = useCallback(async (action: string, data: any = {}) => {
    if (!state.isConnected || !state.sessionId) {
      throw new Error('Not connected to n8n agent');
    }

    try {
      const response = await fetch('/api/n8n-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trigger: 'action_trigger',
          workflowId: workflowName,
          data: {
            action,
            userId,
            sessionId: state.sessionId,
            ...data
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to trigger action: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to trigger action';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.isConnected, state.sessionId, workflowName, userId]);

  const updateContext = useCallback(async (context: any) => {
    if (!state.sessionId) {
      throw new Error('No active session');
    }

    try {
      const response = await fetch('/api/n8n-agent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: state.sessionId,
          context
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update context: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update context';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.sessionId]);

  const startPolling = useCallback(() => {
    if (pollingRef.current || !state.sessionId) return;

    pollingRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/n8n-agent?sessionId=${state.sessionId}`);
        if (response.ok) {
          const sessionData = await response.json();
          if (sessionData.lastResponse) {
            setState(prev => ({
              ...prev,
              lastResponse: sessionData.lastResponse,
              error: null
            }));
          }
        }
      } catch (error) {
        console.warn('Polling error:', error);
      }
    }, pollingInterval);
  }, [state.sessionId, pollingInterval]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // State
    isConnected: state.isConnected,
    isLoading: state.isLoading,
    sessionId: state.sessionId,
    lastResponse: state.lastResponse,
    error: state.error,
    
    // Actions
    connect,
    disconnect,
    sendMessage,
    triggerAction,
    updateContext,
    clearError,
    
    // Utilities
    isHealthy: state.isConnected && !state.error
  };
} 