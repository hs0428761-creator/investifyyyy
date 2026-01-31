import { useState, useEffect } from 'react';
import { Lock, Check, Crown, Star, TrendingUp, Mail, QrCode, Timer, MessageCircle } from 'lucide-react';

export default function ProLevel() {
  const [email, setEmail] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (showPayment && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showPayment, timeLeft]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowPayment(true);
    }
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '9039982159';
    const message = 'Hi, I am interested in the Pro Level Trading course. Please provide more details.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePaymentConfirm = () => {
    setPaymentComplete(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    'Advanced trading strategies and setups',
    'Exclusive indicators and tools',
    'Live market analysis sessions',
    'Personalized mentorship program',
    'Private community access',
    'Weekly trading signals',
    'Risk management calculator',
    'Lifetime course updates'
  ];

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-12">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-green-400">Payment Successful!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Welcome to the Pro Level trading community
            </p>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Course materials sent to:</span>
              </div>
              <p className="text-xl font-semibold text-green-400">{email}</p>
            </div>
            <p className="text-gray-400 mb-4">
              Check your inbox for the complete Pro Level trading course PDF and access instructions.
            </p>
            <p className="text-sm text-gray-500">
              If you don't see the email, please check your spam folder.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Complete Your Payment</h1>
            <p className="text-gray-300">Scan the QR code to unlock Pro Level content</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-yellow-500/30 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Payment Details</h2>
                <div className="flex items-center space-x-2 text-yellow-400">
                  <Timer className="w-5 h-5" />
                  <span className="font-bold text-xl">{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl mb-6">
                <div className="flex items-center justify-center mb-4">
                  <QrCode className="w-48 h-48 text-gray-900" />
                </div>
                <p className="text-center text-gray-900 text-sm font-semibold">
                  Scan with any UPI app
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Course Fee:</span>
                  <span className="font-bold text-white">₹499</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Processing Fee:</span>
                  <span className="font-bold text-white">₹0</span>
                </div>
                <div className="border-t border-gray-800 pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total Amount:</span>
                  <span className="font-bold text-green-400">₹499</span>
                </div>
              </div>

              <button
                onClick={handlePaymentConfirm}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all"
              >
                I've Completed Payment
              </button>
            </div>

            <div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-6">
                <h3 className="text-xl font-bold mb-4">Your Pro Access Includes:</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3 text-blue-400">Delivery Information</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  After payment confirmation, the complete Pro Level course PDF will be automatically
                  sent to <span className="font-semibold text-white">{email}</span> within 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 pb-20">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Premium Content</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-yellow-400">Pro Level Trading</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform into a professional trader with advanced strategies and exclusive tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900/50 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">{feature}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/30 rounded-2xl p-12 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Unlock Pro Level Access</h2>
              <div className="flex items-center justify-center space-x-3 mb-2">
                <span className="text-4xl font-bold text-yellow-400">₹499</span>
                <span className="text-gray-400 line-through">₹9,999</span>
              </div>
              <p className="text-green-400 font-semibold">Limited Time Offer - 95% Off</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300">
                  Enter your email to receive the course
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="submit"
                  className="py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Payment</span>
                  <TrendingUp className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-green-500/20 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">1000+</div>
            <p className="text-gray-400">Active Students</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">4.9/5</div>
            <p className="text-gray-400">Average Rating</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
            <p className="text-gray-400">Community Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
