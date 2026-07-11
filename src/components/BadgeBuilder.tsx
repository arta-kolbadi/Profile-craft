/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Shield, Sparkles, Check, Search } from 'lucide-react';
import { POPULAR_SKILLS } from '../constants/components';
import { TranslationSet } from '../utils/translations';

interface BadgeBuilderProps {
  t: TranslationSet;
  lang: 'en' | 'fa';
}

export default function BadgeBuilder({ t, lang }: BadgeBuilderProps) {
  const [label, setLabel] = useState('My Badge');
  const [message, setMessage] = useState('Interactive');
  const [color, setColor] = useState('6366f1');
  const [style, setStyle] = useState('flat-square');
  const [logo, setLogo] = useState('github');
  const [logoColor, setLogoColor] = useState('white');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedType, setCopiedType] = useState<'md' | 'html' | null>(null);

  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color.replace('#', '')}?style=${style}&logo=${encodeURIComponent(logo)}&logoColor=${logoColor}`;
  const markdownCode = `![${label}](${badgeUrl})`;
  const htmlCode = `<img src="${badgeUrl}" alt="${label}" />`;

  const copyToClipboard = (text: string, type: 'md' | 'html') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const filteredIcons = POPULAR_SKILLS.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="badge-builder" className="space-y-6">
      <div className="p-4 rounded-xl glass-panel flex flex-col items-center justify-center min-h-[120px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 bg-indigo-500/10 text-indigo-400 rounded-bl-xl text-[10px] font-mono flex items-center gap-1">
          <Sparkles size={10} /> LIVE PREVIEW
        </div>
        <div className="transform group-hover:scale-105 transition-transform duration-300">
          <img src={badgeUrl} alt="Badge Preview" className="h-8 shadow-md" referrerPolicy="no-referrer" />
        </div>
        <div className="mt-3 text-center text-xs text-slate-400 font-mono select-all truncate max-w-full">
          {badgeUrl}
        </div>
      </div>

      <div className="space-y-4">
        {/* Label and Message */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">{lang === 'en' ? 'Left Label' : 'برچسب چپ'}</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">{lang === 'en' ? 'Right Value' : 'مقدار راست'}</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100"
            />
          </div>
        </div>

        {/* Style and Color */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">{t.propBadgeStyle}</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100"
            >
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="for-the-badge">For the Badge</option>
              <option value="plastic">Plastic</option>
              <option value="social">Social</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">{t.propColor}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={`#${color}`}
                onChange={(e) => setColor(e.target.value.replace('#', ''))}
                className="w-10 h-9 p-0.5 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                maxLength={6}
                className="w-full px-3 py-1.5 text-sm font-mono bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Logo and Logo Color */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Simple Icon Logo</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="e.g. github, react, python"
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Logo Color</label>
            <input
              type="text"
              value={logoColor}
              onChange={(e) => setLogoColor(e.target.value)}
              placeholder="e.g. white, black, ff0000"
              className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100"
            />
          </div>
        </div>

        {/* Popular icons selector helper */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-400">{lang === 'en' ? 'Click to apply popular icon:' : 'کلیک برای اعمال آیکون:'}</label>
          <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-lg px-2.5 py-1">
            <Search size={14} className="text-slate-500" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search icons...' : 'جستجوی آیکون‌ها...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-slate-200 outline-none w-full py-1"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-950/40 rounded-lg border border-slate-800/60">
            {filteredIcons.map((skill) => (
              <button
                key={skill.id}
                onClick={() => {
                  setLogo(skill.logo);
                  setColor(skill.color);
                  setLabel(skill.name);
                }}
                className="px-2 py-1 text-[10px] font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded hover:text-indigo-400 transition-all flex items-center gap-1"
              >
                <img
                  src={`https://simpleicons.org/icons/${skill.logo}.svg`}
                  alt=""
                  className="w-2.5 h-2.5 filter invert"
                  onError={(e) => {
                    // fall back silently if icon doesn't exist on simpleicons directly
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {skill.name}
              </button>
            ))}
          </div>
        </div>

        {/* Copy actions */}
        <div className="pt-2 space-y-2">
          <button
            onClick={() => copyToClipboard(markdownCode, 'md')}
            className="w-full flex items-center justify-between px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition-all"
          >
            <span className="flex items-center gap-2">
              <Shield size={14} />
              {t.copyMd}
            </span>
            {copiedType === 'md' ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
          </button>
          
          <button
            onClick={() => copyToClipboard(htmlCode, 'html')}
            className="w-full flex items-center justify-between px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-all border border-slate-700/60"
          >
            <span className="flex items-center gap-2">
              <CodeCode size={14} />
              {t.copyHtml}
            </span>
            {copiedType === 'html' ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline fallback since Lucide's Code icon might conflict or need naming
function CodeCode({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
