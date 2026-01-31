import { useState, useEffect } from 'react';
import { LogOut, BarChart3, Users, FileText, Link as LinkIcon, Trash2, Plus, Edit2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  pdf_url: string;
  is_published: boolean;
}

interface TrafficData {
  page_url: string;
  visitor_count: number;
  unique_visitors: number;
  date: string;
}

interface BannedUser {
  id: string;
  email: string;
  reason: string;
  banned_by: string;
  created_at: string;
}

export default function Admin({ onNavigate, onLogout }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pages' | 'traffic' | 'banned'>('dashboard');
  const [pages, setPages] = useState<Page[]>([]);
  const [traffic, setTraffic] = useState<TrafficData[]>([]);
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [newBanEmail, setNewBanEmail] = useState('');
  const [banReason, setBanReason] = useState('');
  const [newPage, setNewPage] = useState({ slug: '', title: '', description: '', pdf_url: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pagesRes, trafficRes, bannedRes] = await Promise.all([
        supabase.from('website_pages').select('*').order('order'),
        supabase.from('traffic_analytics').select('*').order('date', { ascending: false }).limit(30),
        supabase.from('banned_users').select('*').order('created_at', { ascending: false }),
      ]);

      if (pagesRes.data) setPages(pagesRes.data);
      if (trafficRes.data) setTraffic(trafficRes.data);
      if (bannedRes.data) setBannedUsers(bannedRes.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPage.slug || !newPage.title) return;

    try {
      const { error } = await supabase.from('website_pages').insert({
        ...newPage,
        is_published: true,
        order: pages.length,
      });

      if (!error) {
        setNewPage({ slug: '', title: '', description: '', pdf_url: '' });
        loadData();
      }
    } catch (err) {
      console.error('Failed to add page:', err);
    }
  };

  const handleDeletePage = async (id: string) => {
    try {
      await supabase.from('website_pages').delete().eq('id', id);
      loadData();
    } catch (err) {
      console.error('Failed to delete page:', err);
    }
  };

  const handleBanUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBanEmail) return;

    try {
      const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');
      await supabase.from('banned_users').insert({
        email: newBanEmail,
        reason: banReason,
        banned_by: adminUser.username || 'Admin',
      });

      setNewBanEmail('');
      setBanReason('');
      loadData();
    } catch (err) {
      console.error('Failed to ban user:', err);
    }
  };

  const handleUnbanUser = async (id: string) => {
    try {
      await supabase.from('banned_users').delete().eq('id', id);
      loadData();
    } catch (err) {
      console.error('Failed to unban user:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('session_token');
    onLogout();
    onNavigate('home');
  };

  const totalVisitors = traffic.reduce((sum, t) => sum + t.visitor_count, 0);
  const totalUniqueVisitors = traffic.reduce((sum, t) => sum + t.unique_visitors, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        <div className="flex space-x-2 mb-8 border-b border-gray-800 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'pages', label: 'Course Pages', icon: FileText },
            { id: 'traffic', label: 'Traffic', icon: LinkIcon },
            { id: 'banned', label: 'Banned Users', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 mb-2">Total Visitors</p>
              <p className="text-4xl font-bold text-green-400">{totalVisitors}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 mb-2">Unique Visitors</p>
              <p className="text-4xl font-bold text-blue-400">{totalUniqueVisitors}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 mb-2">Total Courses</p>
              <p className="text-4xl font-bold text-yellow-400">{pages.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'pages' && (
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add New Course Page</span>
              </h2>
              <form onSubmit={handleAddPage} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Slug (e.g., basics-101)"
                    value={newPage.slug}
                    onChange={e => setNewPage({ ...newPage, slug: e.target.value })}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={newPage.title}
                    onChange={e => setNewPage({ ...newPage, title: e.target.value })}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={newPage.description}
                  onChange={e => setNewPage({ ...newPage, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white h-24"
                />
                <input
                  type="text"
                  placeholder="PDF URL (optional)"
                  value={newPage.pdf_url}
                  onChange={e => setNewPage({ ...newPage, pdf_url: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                >
                  Add Course
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Existing Courses</h2>
              {pages.map(page => (
                <div key={page.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold mb-2">{page.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{page.description}</p>
                    {page.pdf_url && (
                      <a href={page.pdf_url} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1">
                        <LinkIcon className="w-4 h-4" />
                        <span>View PDF</span>
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeletePage(page.id)} className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'traffic' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Website Traffic</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-300">Page URL</th>
                    <th className="px-6 py-3 text-left text-gray-300">Visitors</th>
                    <th className="px-6 py-3 text-left text-gray-300">Unique</th>
                    <th className="px-6 py-3 text-left text-gray-300">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {traffic.map((item, idx) => (
                    <tr key={idx} className="border-t border-gray-800 hover:bg-gray-800/50">
                      <td className="px-6 py-3 text-sm">{item.page_url}</td>
                      <td className="px-6 py-3 text-sm text-green-400">{item.visitor_count}</td>
                      <td className="px-6 py-3 text-sm text-blue-400">{item.unique_visitors}</td>
                      <td className="px-6 py-3 text-sm text-gray-400">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'banned' && (
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Ban User</h2>
              <form onSubmit={handleBanUser} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address to ban"
                  value={newBanEmail}
                  onChange={e => setNewBanEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
                />
                <textarea
                  placeholder="Reason for ban"
                  value={banReason}
                  onChange={e => setBanReason(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white h-20"
                />
                <button type="submit" className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors">
                  Ban User
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Banned Users</h2>
              <div className="space-y-4">
                {bannedUsers.map(user => (
                  <div key={user.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-red-400">{user.email}</h3>
                      <p className="text-gray-400 text-sm mt-2">{user.reason}</p>
                      <p className="text-gray-500 text-xs mt-2">Banned by: {user.banned_by}</p>
                    </div>
                    <button onClick={() => handleUnbanUser(user.id)} className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded transition-colors text-sm">
                      Unban
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
