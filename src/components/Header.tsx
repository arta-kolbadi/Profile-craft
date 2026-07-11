/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Globe, Download, Undo2, Redo2, RefreshCw, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { TranslationSet } from '../utils/translations';

interface HeaderProps {
  lang: 'en' | 'fa';
  onToggleLang: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onExportMarkdown: () => void;
  onExportJSON: () => void;
  zoomScale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  t: TranslationSet;
}

export default function Header({
  lang,
  onToggleLang,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onExportMarkdown,
  onExportJSON,
  zoomScale,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  t,
}: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0 gap-4">
      {/* Brand Logo & Slogan */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-bold text-lg font-display">
            PC
          </div>
        </div>
        
        <div>
          <h1 className="text-base font-extrabold text-slate-100 tracking-tight font-display flex items-center gap-2">
            {t.brand}
            <span className="px-1.5 py-0.5 text-[8.5px] font-mono tracking-wider bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20 uppercase font-medium">
              V3.0 PRODUCTION
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 font-medium">
            {t.slogan}
          </p>
        </div>
      </div>

      {/* Center Actions - Zoom & History */}
      <div className="flex items-center gap-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
        {/* Undo & Redo */}
        <div className="flex items-center gap-0.5 border-r border-slate-800 pr-1.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title={t.undo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Undo2 size={14} />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title={t.redo}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <Redo2 size={14} />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={onZoomOut}
            title={t.zoomOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
          >
            <ZoomOut size={13} />
          </button>
          <button
            onClick={onZoomReset}
            title={t.zoomReset}
            className="px-2 py-1 text-[9px] font-mono font-bold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-lg transition-colors min-w-12 text-center"
          >
            {Math.round(zoomScale * 100)}%
          </button>
          <button
            onClick={onZoomIn}
            title={t.zoomIn}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
          >
            <ZoomIn size={13} />
          </button>
        </div>
      </div>

      {/* Right Actions - Lang Switch & Exports */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Language Switcher */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700/50"
        >
          <Globe size={13} className="text-indigo-400" />
          <span>{lang === 'en' ? 'فارسی (RTL)' : 'English (LTR)'}</span>
        </button>

        {/* Export JSON backup */}
        <button
          onClick={onExportJSON}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700/40"
        >
          {t.exportJson}
        </button>

        {/* Export README.md */}
        <button
          onClick={onExportMarkdown}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10"
        >
          <Download size={13} />
          {t.exportMd}
        </button>
      </div>
    </header>
  );
}
