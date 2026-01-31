import { TrendingUp, Award, Target } from 'lucide-react';
import AdSense from '../components/AdSense';

interface StoryCardProps {
  name: string;
  profitPercentage: number;
  tradingStyle: string;
  story: string;
  timeframe: string;
  color: string;
}

function StoryCard({ name, profitPercentage, tradingStyle, story, timeframe, color }: StoryCardProps) {
  return (
    <div className={`bg-gray-900 border border-${color}-500/30 rounded-xl overflow-hidden hover:border-${color}-500/50 transition-all`}>
      <div className={`bg-gradient-to-r from-${color}-500/20 to-transparent p-6 border-b border-gray-800`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-full flex items-center justify-center mb-3`}>
              <span className="text-2xl font-bold">{name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{name}</h3>
            <p className="text-gray-400">{tradingStyle}</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold text-${color}-400 mb-1`}>+{profitPercentage}%</div>
            <p className="text-sm text-gray-400">{timeframe}</p>
          </div>
        </div>

        <div className="relative h-32 bg-gray-900/50 rounded-lg overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className={`text-${color}-500`} stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" className={`text-${color}-500`} stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 80 Q 30 70 60 65 T 120 55 T 180 40 T 240 30 L 300 20 L 300 100 L 0 100 Z"
              fill={`url(#gradient-${name})`}
            />
            <path
              d="M 0 80 Q 30 70 60 65 T 120 55 T 180 40 T 240 30 L 300 20"
              fill="none"
              className={`stroke-${color}-500`}
              strokeWidth="2"
            />
          </svg>
          <div className="absolute top-2 right-2 flex items-center space-x-1">
            <TrendingUp className={`w-4 h-4 text-${color}-500`} />
            <span className={`text-xs font-semibold text-${color}-400`}>Growth Trend</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-300 leading-relaxed">{story}</p>
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const stories = [
    {
      name: 'Rahul Sharma',
      profitPercentage: 285,
      tradingStyle: 'Swing Trader',
      timeframe: 'In 6 months',
      color: 'green',
      story: 'Started with zero trading knowledge and ₹50,000 capital. After completing the Invest!fy course and applying risk management principles, I grew my account to ₹1,92,500. The smart money concepts completely changed how I view the markets.'
    },
    {
      name: 'Priya Patel',
      profitPercentage: 165,
      tradingStyle: 'Intraday Trader',
      timeframe: 'In 4 months',
      color: 'blue',
      story: 'As a software engineer, I wanted to diversify my income. The course taught me discipline and proper risk management. Now I consistently make profits trading 2-3 hours daily before work. The key was patience and following the system.'
    },
    {
      name: 'Arjun Reddy',
      profitPercentage: 420,
      tradingStyle: 'Position Trader',
      timeframe: 'In 8 months',
      color: 'purple',
      story: 'I was losing money for years before finding Invest!fy. The Fibonacci and smart money concepts helped me identify high-probability setups. Now I hold positions for weeks and let profits run. Life-changing education.'
    },
    {
      name: 'Sneha Gupta',
      profitPercentage: 195,
      tradingStyle: 'Crypto Trader',
      timeframe: 'In 5 months',
      color: 'yellow',
      story: 'The crypto module gave me the confidence to trade Bitcoin and altcoins systematically. Understanding market structure and liquidity zones made all the difference. I went from gambling to professional trading.'
    },
    {
      name: 'Vikram Singh',
      profitPercentage: 310,
      tradingStyle: 'Forex Trader',
      timeframe: 'In 7 months',
      color: 'cyan',
      story: 'Trading Forex seemed complicated until I took this course. The step-by-step approach and risk management strategies helped me build consistent profits. Now trading is my primary income source.'
    },
    {
      name: 'Anjali Desai',
      profitPercentage: 225,
      tradingStyle: 'Options Trader',
      timeframe: 'In 6 months',
      color: 'red',
      story: 'Started with index options after the intermediate module. The course prepared me well for understanding premium decay and strike selection. My account has more than doubled with disciplined trading.'
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
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Real Results</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-yellow-400">Success Stories</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real traders, real results. See how our students transformed their trading with Invest!fy
          </p>
        </div>

        <div className="grid gap-8 mb-16">
          {stories.map((story, index) => (
            <StoryCard key={index} {...story} />
          ))}
        </div>

        <div className="my-12">
          <AdSense slot="1234567893" format="auto" />
        </div>

        <div className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-gray-800 rounded-2xl p-12">
          <div className="max-w-3xl mx-auto text-center">
            <Target className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Your Success Story Starts Here</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of traders who have transformed their financial future with professional trading education
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <p className="text-gray-400">Student Satisfaction</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
                <p className="text-gray-400">Successful Traders</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">₹50Cr+</div>
                <p className="text-gray-400">Combined Profits</p>
              </div>
            </div>
            <button className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-green-500/20">
              Start Your Journey Today
            </button>
          </div>
        </div>

        <div className="mt-12 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-center text-gray-300">
            <span className="text-yellow-400 font-semibold">Disclaimer:</span> Trading involves risk. Past performance does not guarantee future results.
            These success stories represent individual experiences and may not be typical. Always trade responsibly and never risk more than you can afford to lose.
          </p>
        </div>
      </div>
    </div>
  );
}
