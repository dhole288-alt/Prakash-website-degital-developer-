import React from 'react';
import { Mail, MessageSquare, BellRing, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { NotificationLog } from '../types';

interface NotificationLogsViewProps {
  logs: NotificationLog[];
}

export const NotificationLogsView: React.FC<NotificationLogsViewProps> = ({ logs }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <BellRing className="w-5 h-5 text-indigo-400" />
            <span>Automated Notification Logs</span>
          </h3>
          <p className="text-slate-400 text-xs">
            Instant admin email alerts, WhatsApp notification triggers, and client thank-you dispatches
          </p>
        </div>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-mono font-semibold border border-indigo-500/30">
          {logs.length} Total Dispatches
        </span>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          No automated notification logs recorded yet. Submit a new lead on the website to trigger notifications.
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl border shrink-0 ${
                  log.type === 'admin_email'
                    ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                    : log.type === 'admin_whatsapp'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                }`}>
                  {log.type === 'admin_email' && <Mail className="w-5 h-5" />}
                  {log.type === 'admin_whatsapp' && <MessageSquare className="w-5 h-5" />}
                  {log.type === 'client_thankyou' && <CheckCircle2 className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{log.subject}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {log.type.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs mt-1">
                    To: <span className="font-mono text-slate-200">{log.recipient}</span>
                  </p>

                  <div className="text-slate-300 text-xs mt-1 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 font-mono text-[11px] overflow-x-auto">
                    {log.type === 'admin_whatsapp' ? (
                      <a
                        href={log.preview}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>Send WhatsApp Ping to Admin Now</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span>{log.preview}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-slate-500 font-mono block">{log.sentAt}</span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block mt-1">
                  ✓ {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
