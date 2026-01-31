import { Brain, Shield, TrendingUp, Target } from 'lucide-react';
import AdSense from '../components/AdSense';

interface ConceptCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  keyPoints: string[];
  color: string;
}

function ConceptCard({ title, icon, description, keyPoints, color }: ConceptCardProps) {
  return (
    <div className={`bg-gray-900 border border-${color}-500/30 rounded-xl p-8 hover:border-${color}-500/50 transition-all`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className={`w-16 h-16 bg-${color}-500/20 rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <p className="text-gray-300 text-lg mb-6 leading-relaxed">{description}</p>

      <div className={`border-t border-${color}-500/30 pt-6`}>
        <h3 className="text-xl font-bold mb-4">Key Concepts:</h3>
        <div className="space-y-3">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-6 h-6 bg-${color}-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <span className={`text-${color}-500 text-sm font-bold`}>{index + 1}</span>
              </div>
              <p className="text-gray-300">{point}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-6 p-4 bg-${color}-500/10 border border-${color}-500/30 rounded-lg`}>
        <p className="text-sm text-gray-300">
          <span className={`text-${color}-400 font-semibold`}>Pro Tip:</span> Practice these concepts on a demo account before applying them with real capital.
        </p>
      </div>
    </div>
  );
}

export default function Intermediate() {
  const concepts = [
    {
      title: 'Smart Money Concept',
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      color: 'purple',
      description: 'Learn how institutional traders and market makers move the market. Understanding smart money concepts helps you trade with the big players instead of against them.',
      keyPoints: [
        'Order Blocks - Areas where institutions place large orders',
        'Liquidity Pools - Where stop losses cluster and get hunted',
        'Market Structure Shifts - Identifying trend changes early',
        'Fair Value Gaps - Imbalances in price that often get filled',
        'Premium and Discount Zones - Optimal entry and exit areas'
      ]
    },
    {
      title: 'Risk Management',
      icon: <Shield className="w-8 h-8 text-red-500" />,
      color: 'red',
      description: 'The foundation of profitable trading. Protect your capital first, make profits second. Without proper risk management, even the best strategy will fail.',
      keyPoints: [
        'Never risk more than 1-2% of your capital per trade',
        'Always use stop loss orders to protect your capital',
        'Position sizing based on account size and risk tolerance',
        'Risk-to-reward ratio of minimum 1:2 or higher',
        'Diversification across different assets and strategies'
      ]
    },
    {
      title: 'Fibonacci Retracement',
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      color: 'green',
      description: 'Powerful tool for identifying potential support and resistance levels. Markets often retrace to Fibonacci levels before continuing the main trend.',
      keyPoints: [
        'Key levels: 23.6%, 38.2%, 50%, 61.8%, 78.6%',
        'The 61.8% (Golden Ratio) is the most significant level',
        'Draw from swing low to swing high in uptrends',
        'Draw from swing high to swing low in downtrends',
        'Use with other indicators for confluence'
      ]
    },
    {
      title: 'Fibonacci Extensions',
      icon: <Target className="w-8 h-8 text-blue-500" />,
      color: 'blue',
      description: 'Project potential profit targets beyond the current price movement. Essential for setting realistic take-profit levels.',
      keyPoints: [
        'Key extension levels: 127.2%, 161.8%, 200%, 261.8%',
        'Use to identify where price may go after a retracement',
        'The 161.8% level is most commonly watched by traders',
        'Combine with support/resistance for stronger targets',
        'Great for setting multiple take-profit levels'
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
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">Intermediate Level</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-yellow-400">Market Structure & Risk</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced concepts for understanding market dynamics and protecting your capital
          </p>
        </div>

        <div className="space-y-12">
          {concepts.map((concept, index) => (
            <ConceptCard key={index} {...concept} />
          ))}
        </div>

        <div className="my-12">
          <AdSense slot="1234567892" format="auto" />
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 border border-gray-800 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready for Pro Level?</h2>
              <p className="text-gray-300 mb-6">
                Unlock advanced strategies, exclusive indicators, and personalized mentorship.
                Take your trading to the professional level.
              </p>
              <div className="flex items-center space-x-2 text-green-400">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">One-time payment, lifetime access</span>
              </div>
            </div>
            <div className="text-center">
              <button className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-green-500/20">
                Unlock Pro Content
              </button>
              <p className="text-sm text-gray-400 mt-3">Join 1000+ professional traders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
