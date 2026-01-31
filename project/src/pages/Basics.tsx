import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, Clock, Target, BarChart2, CandlestickChart } from 'lucide-react';
import AdSense from '../components/AdSense';

interface TopicProps {
  title: string;
  icon: React.ReactNode;
  content: string[];
  isOpen: boolean;
  onToggle: () => void;
  color: string;
}

function TopicModule({ title, icon, content, isOpen, onToggle, color }: TopicProps) {
  return (
    <div className={`bg-gray-900 border border-${color}-500/30 rounded-xl overflow-hidden transition-all hover:border-${color}-500/50`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 bg-${color}-500/20 rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className={`text-${color}-500`}>
          {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-800">
          <div className="pt-6 space-y-4">
            {content.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 bg-${color}-500 rounded-full mt-2`}></div>
                <p className="text-gray-300 flex-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Basics() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: 'Swing Trading',
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      color: 'green',
      content: [
        'Understanding market swings and momentum shifts',
        'Identifying key support and resistance levels',
        'Holding positions for days to weeks to capture larger price movements',
        'Using higher timeframes (4H, Daily) for analysis',
        'Risk management strategies for swing positions'
      ]
    },
    {
      title: 'Intraday Trading',
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      color: 'blue',
      content: [
        'Opening and closing positions within the same trading day',
        'Utilizing shorter timeframes (1M, 5M, 15M, 1H)',
        'Quick decision-making and execution skills',
        'Managing risk with tight stop losses',
        'Understanding market sessions and volatility patterns'
      ]
    },
    {
      title: 'Positional Trading',
      icon: <Target className="w-6 h-6 text-yellow-500" />,
      color: 'yellow',
      content: [
        'Long-term trading approach holding positions for weeks to months',
        'Focus on fundamental analysis and major trends',
        'Lower frequency trading with larger position sizes',
        'Patience and discipline for long-term wealth building',
        'Understanding economic cycles and market sentiment'
      ]
    },
    {
      title: 'Chart Patterns',
      icon: <BarChart2 className="w-6 h-6 text-purple-500" />,
      color: 'purple',
      content: [
        'Head and Shoulders (Reversal pattern)',
        'Double Top and Double Bottom patterns',
        'Triangles (Ascending, Descending, Symmetrical)',
        'Flags and Pennants (Continuation patterns)',
        'Cup and Handle patterns for breakout trading'
      ]
    },
    {
      title: 'Candlestick Patterns',
      icon: <CandlestickChart className="w-6 h-6 text-red-500" />,
      color: 'red',
      content: [
        'Doji - Market indecision and potential reversals',
        'Hammer and Hanging Man - Bullish and bearish reversals',
        'Engulfing patterns - Strong reversal signals',
        'Morning Star and Evening Star - Multi-candle reversal patterns',
        'Shooting Star and Inverted Hammer patterns'
      ]
    },
    {
      title: 'Trend Lines',
      icon: <TrendingUp className="w-6 h-6 text-cyan-500" />,
      color: 'cyan',
      content: [
        'Drawing proper trend lines connecting swing highs and lows',
        'Identifying uptrends, downtrends, and sideways markets',
        'Using trend lines for entry and exit points',
        'Trend line breaks as reversal signals',
        'Combining trend lines with other indicators'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Chapter 1</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-yellow-400">Trading Foundations</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master the essential concepts every trader needs to succeed in the markets
          </p>
        </div>

        <div className="grid gap-6">
          {topics.map((topic, index) => (
            <TopicModule
              key={index}
              {...topic}
              isOpen={openTopics.includes(index)}
              onToggle={() => toggleTopic(index)}
            />
          ))}
        </div>

        <div className="my-12">
          <AdSense slot="1234567891" format="auto" />
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-gray-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for the Next Level?</h2>
          <p className="text-gray-300 mb-6">Continue your journey with intermediate trading concepts</p>
          <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all">
            Continue to Intermediate
          </button>
        </div>
      </div>
    </div>
  );
}
