import React from 'react';
import { Users, Target, TrendingUp, BarChart3, PieChart as PieIcon, Layers, Calendar } from 'lucide-react';
import { AnalyticsSummary, Lead } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Cell, PieChart, Pie } from 'recharts';

interface AnalyticsViewProps {
  analytics: AnalyticsSummary | null;
  leads: Lead[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics, leads }) => {
  if (!analytics) return <div className="text-center py-12 text-slate-400">Loading analytics data...</div>;

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6'];

  return (
    <div className="space-y-6">
      
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
              Total Visitors
            </span>
            <span className="text-2xl font-bold text-white tracking-tight">
              {analytics.totalVisitors.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium block mt-1">
              ↑ 12% from last week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
              Total Captured Leads
            </span>
            <span className="text-2xl font-bold text-white tracking-tight">
              {analytics.totalLeads}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium block mt-1">
              Auto-saved in CRM
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
              Conversion Rate
            </span>
            <span className="text-2xl font-bold text-emerald-400 tracking-tight">
              {analytics.conversionRate}%
            </span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              Visitors → Qualified Leads
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
              Converted Deals
            </span>
            <span className="text-2xl font-bold text-amber-300 tracking-tight">
              {analytics.statusCounts.Converted || 0}
            </span>
            <span className="text-[11px] text-purple-300 font-medium block mt-1">
              {analytics.statusCounts['Follow Up'] || 0} in active follow-up
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Trend Area Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-white text-sm">Lead & Visitor Acquisition Trend</h4>
              <p className="text-slate-400 text-xs">Daily visitor traffic vs saved leads</p>
            </div>
            <BarChart3 className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.dailyTrend}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="leads" stroke="#6366f1" fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Distribution Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-white text-sm">Service Demand Breakdown</h4>
              <p className="text-slate-400 text-xs">Most requested agency services</p>
            </div>
            <PieIcon className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.serviceDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                <Bar dataKey="count" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Source Breakdown Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <h4 className="font-bold text-white text-sm mb-1">Lead Source Attribution</h4>
        <p className="text-slate-400 text-xs mb-4">Channels generating the highest quality leads</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {analytics.sourceDistribution.map((src, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-slate-400 text-xs font-medium block mb-1">{src.name}</span>
              <span className="text-xl font-bold text-indigo-300 block">{src.count} Leads</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {((src.count / analytics.totalLeads) * 100).toFixed(0)}% of total
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
