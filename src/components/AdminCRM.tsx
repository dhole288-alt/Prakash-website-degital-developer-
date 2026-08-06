import React, { useState } from 'react';
import { Search, Filter, Download, Upload, RefreshCw, LayoutGrid, List, Phone, MessageSquare, Mail, Calendar, Eye, Trash2, Plus, Sparkles, FileSpreadsheet, Layers, ShieldCheck, LogOut } from 'lucide-react';
import { Lead, LeadStatus, AnalyticsSummary, NotificationLog, AdminUser } from '../types';
import { exportLeadsToExcel, exportLeadsToCSV } from '../lib/excelUtils';
import { openWhatsAppChat, makePhoneCall, sendDirectEmail } from '../lib/whatsappUtils';
import { LeadDetailModal } from './LeadDetailModal';
import { ImportLeadsModal } from './ImportLeadsModal';
import { AnalyticsView } from './AnalyticsView';
import { NotificationLogsView } from './NotificationLogsView';

interface AdminCRMProps {
  adminUser: AdminUser;
  leads: Lead[];
  analytics: AnalyticsSummary | null;
  notificationLogs: NotificationLog[];
  onLogout: () => void;
  onRefreshData: () => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onAddNote: (leadId: string, text: string) => void;
  onDeleteLead: (leadId: string) => void;
}

export const AdminCRM: React.FC<AdminCRMProps> = ({
  adminUser,
  leads,
  analytics,
  notificationLogs,
  onLogout,
  onRefreshData,
  onUpdateStatus,
  onAddNote,
  onDeleteLead
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'notifications'>('leads');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [dateRangeFilter, setDateRangeFilter] = useState('All');

  // Modals state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Services & Sources options derived dynamically
  const availableServices = Array.from(new Set(leads.map(l => l.service))).filter(Boolean);
  const availableSources = Array.from(new Set(leads.map(l => l.source))).filter(Boolean);

  // Filter leads logic
  const filteredLeads = leads.filter(lead => {
    // Search query match
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.mobile.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.businessName.toLowerCase().includes(q) ||
      lead.city.toLowerCase().includes(q);

    // Status match
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    // Service match
    const matchesService = serviceFilter === 'All' || lead.service.toLowerCase() === serviceFilter.toLowerCase();

    // Source match
    const matchesSource = sourceFilter === 'All' || lead.source.toLowerCase() === sourceFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesService && matchesSource;
  });

  const statusColors: Record<LeadStatus, string> = {
    New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Contacted: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Follow Up': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Converted: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Closed: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  };

  const statusList: LeadStatus[] = ['New', 'Contacted', 'Follow Up', 'Converted', 'Closed'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 space-y-6">
      
      {/* Top Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 text-white flex items-center justify-center shadow-lg font-bold text-xl">
            CRM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Agency Lead Management CRM
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-mono border border-emerald-500/30">
                Live Data Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Logged in as <span className="text-slate-200 font-semibold">{adminUser.name}</span> ({adminUser.email})
            </p>
          </div>
        </div>

        {/* Action Controls Header */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onRefreshData}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
            title="Refresh CRM Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Import Excel</span>
          </button>

          <button
            onClick={() => exportLeadsToExcel(filteredLeads)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Excel (.xlsx)</span>
          </button>

          <button
            onClick={() => exportLeadsToCSV(filteredLeads)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
            <span>CSV</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'leads'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Leads Directory ({filteredLeads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Analytics & Performance</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'notifications'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Notification Dispatches ({notificationLogs.length})</span>
          </button>
        </div>

        {activeTab === 'leads' && (
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'kanban' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: LEADS DIRECTORY & PIPELINE */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          
          {/* Search & Filters Toolbar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search leads by Name, Phone, Email, Business, or City..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Filter by Status */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Statuses</option>
                {statusList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Filter by Service */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Service:</span>
              <select
                value={serviceFilter}
                onChange={e => setServiceFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 max-w-[160px]"
              >
                <option value="All">All Services</option>
                {availableServices.map((svc, i) => (
                  <option key={i} value={svc}>{svc}</option>
                ))}
              </select>
            </div>

            {/* Filter by Source */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Source:</span>
              <select
                value={sourceFilter}
                onChange={e => setSourceFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Sources</option>
                {availableSources.map((src, i) => (
                  <option key={i} value={src}>{src}</option>
                ))}
              </select>
            </div>

          </div>

          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Lead Name & Business</th>
                      <th className="p-3.5">Contact Details</th>
                      <th className="p-3.5">Service & Budget</th>
                      <th className="p-3.5">Captured Date / IP</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Click-To-Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-500">
                          No lead records match your active search or filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors group">
                          
                          {/* Name & Business */}
                          <td className="p-3.5">
                            <div className="font-bold text-white text-sm flex items-center gap-2">
                              <span>{lead.name}</span>
                              {lead.questionnaire && (
                                <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.2 rounded-full border border-purple-500/30">
                                  Scope Built
                                </span>
                              )}
                            </div>
                            <div className="text-slate-400 text-xs">
                              {lead.businessName} • {lead.city}
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="p-3.5">
                            <div className="font-mono text-indigo-300">{lead.mobile}</div>
                            <div className="font-mono text-slate-400">{lead.email}</div>
                          </td>

                          {/* Service & Budget */}
                          <td className="p-3.5">
                            <div className="font-medium text-emerald-400">{lead.service}</div>
                            <div className="text-amber-300 font-medium">{lead.budget}</div>
                          </td>

                          {/* Date / IP / Source */}
                          <td className="p-3.5 text-slate-400 font-mono">
                            <div>{lead.dateTime}</div>
                            <div className="text-[10px] text-slate-500">{lead.source} ({lead.ipAddress})</div>
                          </td>

                          {/* Status */}
                          <td className="p-3.5">
                            <select
                              value={lead.status}
                              onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold focus:outline-none cursor-pointer ${statusColors[lead.status]}`}
                            >
                              {statusList.map(s => (
                                <option key={s} value={s} className="bg-slate-900 text-white">
                                  {s}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* One-Click Action Buttons */}
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              
                              <button
                                onClick={() => makePhoneCall(lead.mobile)}
                                className="p-2 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 rounded-lg transition-colors cursor-pointer"
                                title="Click to Call"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => openWhatsAppChat(lead.mobile, lead.name, lead.service)}
                                className="p-2 bg-green-600/20 hover:bg-green-600/40 text-green-300 rounded-lg transition-colors cursor-pointer"
                                title="Click to WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => sendDirectEmail(lead.email, lead.name, lead.service)}
                                className="p-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg transition-colors cursor-pointer"
                                title="Click to Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
                                title="View Details & Notes"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* KANBAN BOARD VIEW */}
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
              {statusList.map(st => {
                const colLeads = filteredLeads.filter(l => l.status === st);
                return (
                  <div key={st} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col space-y-3 min-w-[240px]">
                    
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColors[st]}`}>
                        {st}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {colLeads.length}
                      </span>
                    </div>

                    {/* Lead Cards */}
                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                      {colLeads.map(l => (
                        <div
                          key={l.id}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 shadow-md hover:border-slate-700 transition-all space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-white text-xs">{l.name}</h4>
                              <p className="text-[11px] text-slate-400">{l.businessName}</p>
                            </div>
                            <button
                              onClick={() => setSelectedLead(l)}
                              className="text-slate-400 hover:text-white p-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] font-mono text-indigo-300">
                            {l.service}
                          </div>

                          <div className="text-[11px] text-slate-400">
                            Budget: <span className="text-amber-300 font-semibold">{l.budget}</span>
                          </div>

                          {/* Direct Actions */}
                          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
                            <button
                              onClick={() => makePhoneCall(l.mobile)}
                              className="p-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors"
                              title="Call"
                            >
                              <Phone className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => openWhatsAppChat(l.mobile, l.name, l.service)}
                              className="p-1.5 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => sendDirectEmail(l.email, l.name, l.service)}
                              className="p-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg hover:bg-indigo-500/30 transition-colors"
                              title="Email"
                            >
                              <Mail className="w-3 h-3" />
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: ANALYTICS */}
      {activeTab === 'analytics' && (
        <AnalyticsView analytics={analytics} leads={leads} />
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <NotificationLogsView logs={notificationLogs} />
      )}

      {/* LEAD DETAIL MODAL */}
      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={(id, st) => {
          onUpdateStatus(id, st);
          if (selectedLead && selectedLead.id === id) {
            setSelectedLead({ ...selectedLead, status: st });
          }
        }}
        onAddNote={(id, txt) => {
          onAddNote(id, txt);
          onRefreshData();
        }}
        onDeleteLead={onDeleteLead}
      />

      {/* IMPORT LEADS MODAL */}
      <ImportLeadsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportSuccess={onRefreshData}
      />

    </div>
  );
};
