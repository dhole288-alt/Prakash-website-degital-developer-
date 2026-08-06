import React, { useState } from 'react';
import { X, Phone, MessageSquare, Mail, Calendar, MapPin, Building, Globe, DollarSign, Clock, ShieldAlert, FileText, Send, User, Trash2 } from 'lucide-react';
import { Lead, LeadStatus } from '../types';
import { openWhatsAppChat, makePhoneCall, sendDirectEmail } from '../lib/whatsappUtils';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onAddNote: (leadId: string, noteText: string) => void;
  onDeleteLead: (leadId: string) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onUpdateStatus,
  onAddNote,
  onDeleteLead
}) => {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  if (!lead) return null;

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setIsAddingNote(true);
    onAddNote(lead.id, newNote.trim());
    setNewNote('');
    setIsAddingNote(false);
  };

  const statusColors: Record<LeadStatus, string> = {
    New: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Contacted: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Follow Up': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Converted: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Closed: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 font-bold text-lg">
              {lead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-lg">{lead.name}</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${statusColors[lead.status]}`}>
                  {lead.status}
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                {lead.businessName} • Captured {lead.dateTime} ({lead.source})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete lead "${lead.name}"?`)) {
                  onDeleteLead(lead.id);
                  onClose();
                }
              }}
              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Delete Lead Record"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Action Toolbar (One-Click Call, WhatsApp, Email) */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">
            Click-To-Contact:
          </span>

          <button
            onClick={() => makePhoneCall(lead.mobile)}
            className="flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {lead.mobile}</span>
          </button>

          <button
            onClick={() => openWhatsAppChat(lead.mobile, lead.name, lead.service)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Chat</span>
          </button>

          <button
            onClick={() => sendDirectEmail(lead.email, lead.name, lead.service)}
            className="flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Client</span>
          </button>

          {/* Change Status Dropdown */}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400">Update Status:</span>
            <select
              value={lead.status}
              onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
              className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Lead Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>Contact Details</span>
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-400">Mobile Number:</span>
                <span className="font-mono text-indigo-300">{lead.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email Address:</span>
                <span className="font-mono text-slate-200">{lead.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Business Name:</span>
                <span className="text-slate-200 font-medium">{lead.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">City / Location:</span>
                <span className="text-slate-200">{lead.city}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-800 pb-2 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Requirements & Metadata</span>
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-400">Service Required:</span>
                <span className="font-medium text-emerald-400">{lead.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Budget:</span>
                <span className="font-medium text-amber-300">{lead.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Captured Source:</span>
                <span className="text-slate-200">{lead.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Visitor IP Address:</span>
                <span className="font-mono text-slate-400">{lead.ipAddress}</span>
              </div>
            </div>
          </div>

          {/* Questionnaire Specifications Card (If available) */}
          {lead.questionnaire && (
            <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-xl p-4">
              <h4 className="font-semibold text-indigo-300 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Scope Builder Questionnaire Answers</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Business Type</span>
                  <span className="text-white font-medium">{lead.questionnaire.businessType || 'N/A'}</span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Pages Count</span>
                  <span className="text-white font-medium">{lead.questionnaire.pagesCount || 'N/A'}</span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Domain / Hosting / Logo</span>
                  <span className="text-white font-medium">
                    {lead.questionnaire.needDomain === 'Yes' ? 'Domain,' : ''} {lead.questionnaire.needHosting === 'Yes' ? 'Hosting,' : ''} {lead.questionnaire.needLogo === 'Yes' ? 'Logo' : ''}
                  </span>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Delivery Date</span>
                  <span className="text-indigo-300 font-medium">{lead.questionnaire.expectedDelivery || 'Flexible'}</span>
                </div>
              </div>
              {lead.questionnaire.additionalReqs && (
                <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block font-semibold mb-0.5">Additional Requirements:</span>
                  <span>{lead.questionnaire.additionalReqs}</span>
                </div>
              )}
            </div>
          )}

          {/* Client Message */}
          {lead.message && (
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Enquiry Message
              </h4>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed">
                "{lead.message}"
              </div>
            </div>
          )}

          {/* Notes & Timeline History */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Internal Notes & Timeline ({lead.notes?.length || 0})
            </h4>

            {/* Add Note Form */}
            <form onSubmit={handleAddNoteSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Type internal follow-up note..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!newNote.trim() || isAddingNote}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {lead.notes?.map(note => (
                <div key={note.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs flex justify-between items-start gap-4">
                  <div>
                    <span className="font-semibold text-indigo-300">{note.author}: </span>
                    <span className="text-slate-200">{note.text}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0 font-mono">{note.createdAt}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
