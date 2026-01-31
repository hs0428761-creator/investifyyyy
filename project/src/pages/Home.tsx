import { TrendingUp, Shield, Target, Brain, ArrowRight, BarChart3 } from 'lucide-react';
import AdSense from '../components/AdSense';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-950 dark:bg-gray-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-red-900/10 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-green-500/30 rounded-full px-6 py-2 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Live Trading Education</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-yellow-400">Invest!fy</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-12">
                Learn Trading the Smart Way
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('basics')}
                  className="group px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-500/20"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('basics')}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all border border-gray-700"
                >
                  View Curriculum
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-1 h-12 bg-green-500"></div>
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Forex Trading</h3>
                <p className="text-gray-400">Master global currency markets with proven strategies</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-1 h-12 bg-blue-500"></div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Indian Markets</h3>
                <p className="text-gray-400">Navigate NSE and BSE with expert guidance</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-1 h-12 bg-yellow-500"></div>
                  <Target className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cryptocurrency</h3>
                <p className="text-gray-400">Trade digital assets with confidence and discipline</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              About <span className="text-yellow-400">Invest!fy</span>
            </h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 backdrop-blur-sm">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Invest!fy is a comprehensive trading education platform designed to take you from beginner to professional trader.
                We cover Forex, Indian stock markets, and Cryptocurrency trading with a focus on capital management and trading discipline.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our approach emphasizes real market logic over hype, smart money concepts, and capital protection.
                Learn the strategies that institutional traders use to consistently profit from the markets.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Why <span className="text-yellow-400">Invest!fy?</span>
            </h2>
            <p className="text-center text-gray-400 mb-16">Professional trading education built on proven principles</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-gray-900 border border-green-500/30 rounded-xl p-6 h-full hover:border-green-500/50 transition-all">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Structured Roadmap</h3>
                  <p className="text-gray-400">Clear path from beginner to professional trader</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-gray-900 border border-blue-500/30 rounded-xl p-6 h-full hover:border-blue-500/50 transition-all">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Real Market Logic</h3>
                  <p className="text-gray-400">No hype, just proven strategies that work</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-gray-900 border border-yellow-500/30 rounded-xl p-6 h-full hover:border-yellow-500/50 transition-all">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Smart Money</h3>
                  <p className="text-gray-400">Learn institutional trading concepts</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-gray-900 border border-red-500/30 rounded-xl p-6 h-full hover:border-red-500/50 transition-all">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Capital Protection</h3>
                  <p className="text-gray-400">Risk management and discipline first</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <AdSense slot="1234567890" format="auto" />
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Founders of <span className="text-yellow-400">Invest!fy</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500/30 transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold">SZ</span>
                </div>
                <h3 className="text-xl font-bold">Syed Zaim Ali</h3>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500/30 transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold">AP</span>
                </div>
                <h3 className="text-xl font-bold">Aaradhy Parashar</h3>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500/30 transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold">SK</span>
                </div>
                <h3 className="text-xl font-bold">Sanskaar Singh Kourav</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Trading Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of traders who have transformed their trading with Invest!fy
            </p>
            <button
              onClick={() => onNavigate('basics')}
              className="group px-10 py-5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2 mx-auto shadow-lg shadow-green-500/20"
            >
              <span>Begin Your Education</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
