import { MessageCircle, X, Send, MessageSquare } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  'beginner': 'Our Basics course covers fundamental trading concepts including market structure, order types, and risk management. Perfect for getting started!',
  'intermediate': 'The Intermediate level teaches technical analysis, chart patterns, and trading psychology. It builds on the foundation from Basics.',
  'pro': 'Pro Level dives into advanced strategies, money management, and institutional trading techniques used by professional traders.',
  'forex': 'We offer comprehensive Forex trading education covering currency pairs, trends, and real-world trading strategies.',
  'crypto': 'Our cryptocurrency section teaches digital asset trading with proper risk management and portfolio strategies.',
  'indian': 'Indian Markets training covers NSE and BSE trading, stock selection, and technical analysis specific to Indian stocks.',
  'cost': 'Pricing varies by course level. Start with our free Basics introduction and upgrade as you progress.',
  'hours': 'You can learn at your own pace. Most students spend 5-10 hours weekly for structured progress.',
  'support': 'We offer email support at support@investify.com and live Q&A sessions during course weeks.',
  'certificate': 'Upon completing each course level, you receive a certificate of completion that you can share on your profile.',
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: 'welcome',
        type: 'bot',
        text: 'Welcome to Invest!fy Support! How can I help you today? Try asking about our courses, pricing, or trading strategies.',
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }

    return "Thanks for your question! For detailed information, please reach out to our team at support@investify.com or explore our courses to learn more.";
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        text: findResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-96 max-w-sm h-96 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-bold text-white">Invest!fy Support</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 bg-gray-900">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500 placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 text-white rounded-lg transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
