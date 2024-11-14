import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import FastImage from 'react-native-fast-image';

const LiveChatScreen = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const user = useSelector(state => state.auth.user);
  const flatListRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentInfo, setAgentInfo] = useState(null);
  const [chatStatus, setChatStatus] = useState('connecting'); // connecting, active, ended

  useEffect(() => {
    // Initialize chat connection
    initializeChat();
    return () => {
      // Cleanup chat connection
      endChat();
    };
  }, []);

  const initializeChat = async () => {
    try {
      // Simulate connecting to chat service
      setChatStatus('connecting');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate agent connection
      setAgentInfo({
        name: 'Sarah Johnson',
        name_ar: 'سارة جونسون',
        avatar: 'https://example.com/agent-avatar.jpg',
        status: 'online',
      });
      
      setChatStatus('active');
      
      // Add welcome message
      addMessage({
        id: Date.now(),
        type: 'agent',
        text: t('chat.welcome'),
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Chat initialization error:', error);
      setChatStatus('error');
    }
  };

  const endChat = () => {
    setChatStatus('ended');
    // Cleanup logic here
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 100);
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    addMessage({
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    });

    setInputMessage('');
    simulateAgentResponse();
  };

  const simulateAgentResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: Date.now(),
        type: 'agent',
        text: t('chat.autoResponse'),
        timestamp: new Date(),
      });
    }, 2000);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.type === 'user';
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.agentMessage,
        isRTL && (isUser ? styles.userMessageRTL : styles.agentMessageRTL),
      ]}>
        {!isUser && (
          <FastImage
            source={{ uri: agentInfo?.avatar }}
            style={styles.agentAvatar}
          />
        )}
        <View style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.agentBubble,
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? styles.userText : styles.agentText,
            isRTL && styles.textRTL,
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.timestamp,
            isRTL && styles.textRTL,
          ]}>
            {format(new Date(item.timestamp), 'HH:mm', {
              locale: isRTL ? ar : enUS,
            })}
          </Text>
        </View>
      </View>
    );
  };

  const renderChatHeader = () => (
    <View style={styles.chatHeader}>
      {agentInfo && (
        <>
          <FastImage
            source={{ uri: agentInfo.avatar }}
            style={styles.headerAvatar}
          />
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, isRTL && styles.textRTL]}>
              {isRTL ? agentInfo.name_ar : agentInfo.name}
            </Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={[styles.statusText, isRTL && styles.textRTL]}>
                {t('chat.online')}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {renderChatHeader()}

      {chatStatus === 'connecting' ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#E91E63" />
          <Text style={[styles.statusMessage, isRTL && styles.textRTL]}>
            {t('chat.connecting')}
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.messagesList}
          />

          {isTyping && (
            <View style={[styles.typingIndicator, isRTL && styles.typingIndicatorRTL]}>
              <Text style={[styles.typingText, isRTL && styles.textRTL]}>
                {t('chat.typing')}
              </Text>
              <ActivityIndicator size="small" color="#666" />
            </View>
          )}

          <View style={[styles.inputContainer, isRTL && styles.inputContainerRTL]}>
            <TextInput
              style={[styles.input, isRTL && styles.inputRTL]}
              placeholder={t('chat.inputPlaceholder')}
              value={inputMessage}
              onChangeText={setInputMessage}
              multiline
              textAlign={isRTL ? 'right' : 'left'}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSend}
              disabled={!inputMessage.trim()}
            >
              <Icon 
                name="send" 
                size={24} 
                color="#fff"
                style={isRTL ? styles.iconRTL : null}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusMessage: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  agentMessage: {
    alignSelf: 'flex-start',
  },
  userMessageRTL: {
    alignSelf: 'flex-start',
  },
  agentMessageRTL: {
    alignSelf: 'flex-end',
  },
  agentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#E91E63',
  },
  agentBubble: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  userText: {
    color: '#fff',
  },
  agentText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: 16,
  },
  typingIndicatorRTL: {
    flexDirection: 'row-reverse',
    marginLeft: 0,
    marginRight: 16,
  },
  typingText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  inputContainerRTL: {
    flexDirection: 'row-reverse',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    maxHeight: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    fontSize: 16,
  },
  inputRTL: {
    marginRight: 0,
    marginLeft: 8,
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRTL: {
    transform: [{ scaleX: -1 }],
  },
  textRTL: {
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
});

export default LiveChatScreen;