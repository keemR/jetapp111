import io from 'socket.io-client';
import { API_URL } from '@env';

class ChatService {
  constructor() {
    this.socket = null;
    this.callbacks = {
      onMessage: null,
      onTyping: null,
      onAgentJoin: null,
      onAgentLeave: null,
      onError: null,
    };
  }

  connect(userId, language) {
    this.socket = io(`${API_URL}/chat`, {
      query: {
        userId,
        language,
      },
    });

    this.setupListeners();
  }

  setupListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    this.socket.on('message', (message) => {
      if (this.callbacks.onMessage) {
        this.callbacks.onMessage(message);
      }
    });

    this.socket.on('agent:typing', () => {
      if (this.callbacks.onTyping) {
        this.callbacks.onTyping();
      }
    });

    this.socket.on('agent:join', (agent) => {
      if (this.callbacks.onAgentJoin) {
        this.callbacks.onAgentJoin(agent);
      }
    });

    this.socket.on('agent:leave', () => {
      if (this.callbacks.onAgentLeave) {
        this.callbacks.onAgentLeave();
      }
    });

    this.socket.on('error', (error) => {
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
    });
  }

  sendMessage(message) {
    if (this.socket) {
      this.socket.emit('message', message);
    }
  }

  sendTyping() {
    if (this.socket) {
      this.socket.emit('user:typing');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    this.callbacks[event] = callback;
  }

  off(event) {
    this.callbacks[event] = null;
  }
}

export default new ChatService(); 