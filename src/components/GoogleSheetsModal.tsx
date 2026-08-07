import React, { useState, useEffect } from 'react';
import { X, FileSpreadsheet, ExternalLink, Copy, Check, Send, AlertCircle, CheckCircle2, ArrowLeft, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { getGoogleScriptUrl, setGoogleScriptUrl, testGoogleScriptConnection, DEFAULT_GAS_CODE, GOOGLE_SHEET_URL } from '../lib/googleSheetsService';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({ isOpen, onClose }) => {
  const [gasUrl, setGasUrl] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleBackOrClose = () => {
    if (window.history.state?.sheetModalOpen) {
      window.history.back();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setGasUrl(getGoogleScriptUrl());
      setTestStatus(null);
      window.history.pushState({ sheetModalOpen: true }, '');

      const handlePopState = () => {
        onClose();
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleBackOrClose();
        }
      };

      window.addEventListener('popstate', handlePopState);
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setGoogleScriptUrl(gasUrl);
    setTestStatus({ success: true, message: 'Google Apps Script Web App URL saved successfully!' });
  };

  const handleTestConnection = async () => {
    if (!gasUrl.trim()) {
      setTestStatus({ success: false, message: 'Please enter a valid Web App URL first.' });
      return;
    }
    setIsTesting(true);
    setTestStatus(null);
    setGoogleScriptUrl(gasUrl);

    const res = await testGoogleScriptConnection(gasUrl.trim());
    setIsTesting(false);
    setTestStatus(res);
  };

  const copyScriptCode = () => {
    navigator.clipboard.writeText(DEFAULT_GAS_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const copySheetLink = () => {
    navigator.clipboard.writeText(GOOGLE_SHEET_URL);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={handleBackOrClose}
        aria-hidden="true"
      />

      {/* Scroll container for modal */}
      <div className="fixed inset-0 z-10 overflow-y-auto pointer-events-none flex items-center justify-center p-3 sm:p-6">
        <div className="pointer-events-auto bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl my-auto overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Google Sheets Live Sync Integration</h3>
                <p className="text-slate-400 text-xs">Connect website enquiry form directly to Google Sheets</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBackOrClose}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 hover:text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700/60"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleBackOrClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 min-h-0">
            
            {/* Connected Google Sheet Link Banner */}
            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Your Connected Google Sheet</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copySheetLink}
                    className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copiedUrl ? 'Copied' : 'Copy Link'}</span>
                  </button>

                  <a
                    href={GOOGLE_SHEET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-md cursor-pointer"
                  >
                    <span>Open Sheet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="font-mono text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800 break-all select-all">
                {GOOGLE_SHEET_URL}
              </div>
            </div>

            {/* Web App URL Configuration */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div>
                <label htmlFor="gas-url-input" className="block text-xs font-bold text-slate-200 mb-1">
                  Google Apps Script Web App URL <span className="text-orange-400">*</span>
                </label>
                <p className="text-xs text-slate-400 mb-2">
                  Paste the deployment Web App URL generated from Google Apps Script (starts with <code className="text-amber-300">https://script.google.com/macros/s/.../exec</code>)
                </p>
                <input
                  id="gas-url-input"
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={gasUrl}
                  onChange={(e) => {
                    setGasUrl(e.target.value);
                    setTestStatus(null);
                  }}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {testStatus && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                    testStatus.success
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {testStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{testStatus.message}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Save Web App URL
                </button>

                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-orange-400' : ''}`} />
                  <span>{isTesting ? 'Testing...' : 'Test Sync'}</span>
                </button>
              </div>
            </div>

            {/* Google Apps Script Code Generator */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Complete Google Apps Script Code</span>
                  </h4>
                  <p className="text-xs text-slate-400">Copy & paste into Code.gs in Google Apps Script</p>
                </div>

                <button
                  type="button"
                  onClick={copyScriptCode}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Code Copied!' : 'Copy Script Code'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-48 leading-relaxed">
                  {DEFAULT_GAS_CODE}
                </pre>
              </div>
            </div>

            {/* Step-by-Step Google Account Instructions */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <span>Step-by-Step Setup Instructions</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                  <div>
                    <p className="font-semibold text-white mb-0.5">Open Google Sheet</p>
                    <p className="text-slate-400">
                      Open your Google Sheet:{' '}
                      <a href={GOOGLE_SHEET_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                        Open Sheet
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                  <div>
                    <p className="font-semibold text-white mb-0.5">Open Apps Script Editor</p>
                    <p className="text-slate-400">
                      In the Google Sheet top menu, click <strong className="text-slate-200">Extensions</strong> &rarr; <strong className="text-slate-200">Apps Script</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                  <div>
                    <p className="font-semibold text-white mb-0.5">Paste Code & Save</p>
                    <p className="text-slate-400">
                      Delete all existing text in <code className="text-amber-300">Code.gs</code>, click <strong className="text-slate-200">Copy Script Code</strong> above, paste it into the editor, and click the Save floppy icon (💾).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                  <div>
                    <p className="font-semibold text-white mb-0.5">Deploy as Web App</p>
                    <p className="text-slate-400">
                      Click <strong className="text-slate-200">Deploy</strong> (top right) &rarr; <strong className="text-slate-200">New deployment</strong>. Click Gear icon &rarr; select <strong className="text-slate-200">Web app</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">5</span>
                  <div>
                    <p className="font-semibold text-white mb-0.5">Set Access Permissions (CRITICAL)</p>
                    <ul className="list-disc list-inside text-slate-400 space-y-1 mt-1">
                      <li>Set <strong>Execute as</strong>: <code className="text-emerald-300">Me</code></li>
                      <li>Set <strong>Who has access</strong>: <code className="text-orange-300 font-bold">Anyone</code> (Required so public website forms can write)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">6</span>
                  <div>
                    <p className="font-semibold text-white mb-0.5">Authorize & Copy URL</p>
                    <p className="text-slate-400">
                      Click <strong className="text-slate-200">Deploy</strong> &rarr; <strong className="text-slate-200">Authorize access</strong>. Sign in, click <strong className="text-slate-200">Advanced</strong> &rarr; <strong className="text-slate-200">Go to (unsafe)</strong> &rarr; <strong className="text-slate-200">Allow</strong>.
                      Copy the Web App URL (ends with <code className="text-amber-300">/exec</code>) and paste it into the Web App URL box above!
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-400">
              Target Sheet: <span className="font-mono text-emerald-400 font-bold">1dke9jo1YpIpwwE472D0fTb_GDEnJPcJjX_A3atn1yIA</span>
            </span>
            <button
              type="button"
              onClick={handleBackOrClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
