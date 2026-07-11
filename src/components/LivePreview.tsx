/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, FileText, Globe, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Block } from '../types';
import { generateFullMarkdown, markdownToHTML } from '../utils/markdown';
import { TranslationSet } from '../utils/translations';

interface LivePreviewProps {
  blocks: Block[];
  githubUser: string;
  t: TranslationSet;
  lang: 'en' | 'fa';
}

export default function LivePreview({ blocks, githubUser, t, lang }: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'source'>('preview');
  const [copiedText, setCopiedText] = useState<'md' | 'html' | null>(null);

  const fullMarkdown = generateFullMarkdown(blocks, githubUser);
  const htmlContent = markdownToHTML(fullMarkdown);

  const copyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopiedText('md');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const copyHTML = () => {
    // Generate clean HTML proxy
    const htmlExport = `<!-- Generated with ProfileCraft -->\n<div align="center">\n${htmlContent}\n</div>`;
    navigator.clipboard.writeText(htmlExport);
    setCopiedText('html');
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div id="live-preview-panel" className="h-full flex flex-col bg-slate-950/45 border border-slate-800 rounded-2xl overflow-hidden glass-panel">
      {/* Header and Tab Switches */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/80 shrink-0">
        <h3 className="text-xs font-bold text-slate-300 tracking-wider flex items-center gap-2">
          <Globe size={14} className="text-indigo-400" />
          {t.previewTitle}
        </h3>
        
        <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-xs rounded-lg transition-all font-medium flex items-center gap-1.5 ${
              activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={11} /> {t.liveView}
          </button>
          <button
            onClick={() => setActiveTab('source')}
            className={`px-3 py-1 text-xs rounded-lg transition-all font-medium flex items-center gap-1.5 ${
              activeTab === 'source' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText size={11} /> {t.markdownCode}
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-indigo-500/30">
        {activeTab === 'preview' ? (
          <div className="space-y-4">
            {/* Simulation Header Banner warning about GitHub constraints */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400">
              <AlertCircle size={15} className="text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">{lang === 'en' ? 'GitHub Compatible Sandbox:' : 'محیط سازگار با گیت‌هاب:'}</span>{' '}
                {lang === 'en' 
                  ? 'All assets, badges, and stats cards are fully optimized using standard open-source API services.' 
                  : 'تمام دارایی‌ها، نشان‌ها و کارت‌های آماری با استفاده از سرویس‌های متن‌باز گیت‌هاب بهینه‌سازی شده‌اند.'}
              </div>
            </div>

            {/* Simulated README Area */}
            <div 
              className="github-readme-container markdown-body break-words prose prose-invert max-w-none pb-12"
              dangerouslySetInnerHTML={{ __html: htmlContent || `<div class="text-center py-20 text-slate-500 text-xs italic">${t.emptyEditorPlaceholder}</div>` }}
            />
          </div>
        ) : (
          <div className="relative h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 flex gap-2">
              <button
                onClick={copyMarkdown}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-mono font-bold rounded-lg transition-all"
              >
                {copiedText === 'md' ? <Check size={11} /> : <Copy size={11} />}
                {copiedText === 'md' ? t.copied : t.copyMd}
              </button>
              <button
                onClick={copyHTML}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono rounded-lg transition-all border border-slate-700/60"
              >
                {copiedText === 'html' ? <Check size={11} /> : <Copy size={11} />}
                {copiedText === 'html' ? t.copied : t.copyHtml}
              </button>
            </div>
            
            <pre className="flex-1 mt-10 p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap select-all">
              {fullMarkdown || t.emptyEditorPlaceholder}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
