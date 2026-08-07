import React, { useState, useEffect } from 'react';
import { X, Upload, FileSpreadsheet, CheckCircle2, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { parseExcelOrCSVFile } from '../lib/excelUtils';
import { Lead } from '../types';

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

export const ImportLeadsModal: React.FC<ImportLeadsModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess
}) => {
  const [parsedLeads, setParsedLeads] = useState<Partial<Lead>[]>([]);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleBackOrClose = () => {
    if (window.history.state?.importModalOpen) {
      window.history.back();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ importModalOpen: true }, '');

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const leads = await parseExcelOrCSVFile(file);
      if (leads.length === 0) {
        setErrorMsg('No valid rows found in the selected spreadsheet file.');
      } else {
        setParsedLeads(leads);
      }
    } catch (err) {
      setErrorMsg('Failed to parse Excel/CSV file. Please ensure it is a valid .xlsx or .csv document.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadToSystem = async () => {
    if (parsedLeads.length === 0) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/leads/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: parsedLeads })
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMsg(data.message);
        onImportSuccess();
        setTimeout(() => {
          onClose();
          setParsedLeads([]);
          setFileName('');
          setSuccessMsg('');
        }, 1500);
      } else {
        setErrorMsg(data.message || 'Error saving imported leads.');
      }
    } catch (err) {
      setErrorMsg('Network error while uploading leads.');
    } finally {
      setIsLoading(false);
    }
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
        <div className="pointer-events-auto bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl my-auto overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[85vh]">
          
          {/* Header */}
          <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Import Leads from Excel / CSV</h3>
                <p className="text-slate-400 text-xs">Bulk upload lead spreadsheets into the CRM database</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBackOrClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer border border-slate-700/60 shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleBackOrClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

        <div className="p-6 overflow-y-auto space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 text-center bg-slate-950/50 transition-colors relative">
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">Click or drag Excel / CSV file here</p>
            <p className="text-xs text-slate-400 mt-1">Supports .xlsx, .xls, and .csv files</p>
            {fileName && (
              <span className="inline-block mt-3 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-mono border border-emerald-500/30">
                Selected: {fileName}
              </span>
            )}
          </div>

          {/* Preview Parsed Rows */}
          {parsedLeads.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Parsed Lead Preview ({parsedLeads.length} Records)
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto border border-slate-800 rounded-xl text-xs bg-slate-950">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 sticky top-0 border-b border-slate-800">
                    <tr>
                      <th className="p-2">Name</th>
                      <th className="p-2">Mobile</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Service</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {parsedLeads.slice(0, 10).map((l, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-2 font-medium text-white">{l.name}</td>
                        <td className="p-2 text-slate-300">{l.mobile}</td>
                        <td className="p-2 text-slate-300">{l.email}</td>
                        <td className="p-2 text-indigo-300">{l.service}</td>
                        <td className="p-2 text-emerald-400">{l.status || 'New'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsedLeads.length > 10 && (
                <p className="text-[11px] text-slate-500 mt-1 text-center">
                  Showing first 10 of {parsedLeads.length} total rows
                </p>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadToSystem}
            disabled={parsedLeads.length === 0 || isLoading}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {isLoading ? 'Processing...' : `Confirm Import (${parsedLeads.length} Leads)`}
          </button>
        </div>

      </div>
    </div>
  </div>
);
};
