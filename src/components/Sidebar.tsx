/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { COMPONENT_PRESETS } from '../constants/components';
import { THEMES } from '../constants/themes';
import { Block, AppTheme } from '../types';
import { LayoutGrid, Palette, LayoutTemplate, Shield, FolderGit2, Search, Sparkles, Plus } from 'lucide-react';
import { TranslationSet } from '../utils/translations';
import BadgeBuilder from './BadgeBuilder';
import TemplateGallery from './TemplateGallery';
import UserDashboard from './UserDashboard';

interface SidebarProps {
  onAddBlock: (presetId: string) => void;
  onSelectTheme: (themeId: string) => void;
  activeThemeId: string;
  onSelectTemplate: (blocks: Block[], themeId: string) => void;
  blocks: Block[];
  lang: 'en' | 'fa';
  t: TranslationSet;
  onLoadProject: (blocks: Block[], themeId: string, projectName: string) => void;
}

type TabType = 'components' | 'templates' | 'themes' | 'badge' | 'account';

export default function Sidebar({
  onAddBlock,
  onSelectTheme,
  activeThemeId,
  onSelectTemplate,
  blocks,
  lang,
  t,
  onLoadProject,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>('components');
  const [componentSearch, setComponentSearch] = useState('');

  // Groups and categories
  const categories = useMemo(() => {
    return [
      { id: 'header', label: t.catHeader, color: 'text-sky-400 bg-sky-500/10' },
      { id: 'bio', label: t.catBio, color: 'text-emerald-400 bg-emerald-500/10' },
      { id: 'skills', label: t.catSkills, color: 'text-amber-400 bg-amber-500/10' },
      { id: 'stats', label: t.catStats, color: 'text-rose-400 bg-rose-500/10' },
      { id: 'socials', label: t.catSocials, color: 'text-violet-400 bg-violet-500/10' },
      { id: 'multimedia', label: t.catMultimedia, color: 'text-pink-400 bg-pink-500/10' },
      { id: 'content', label: t.catContent, color: 'text-teal-400 bg-teal-500/10' },
      { id: 'footer', label: t.catFooter, color: 'text-indigo-400 bg-indigo-500/10' }
    ];
  }, [t]);

  const filteredPresets = useMemo(() => {
    return COMPONENT_PRESETS.filter(p => {
      const name = lang === 'en' ? p.name : p.nameFa;
      const desc = lang === 'en' ? p.description : p.descriptionFa;
      return (
        name.toLowerCase().includes(componentSearch.toLowerCase()) ||
        desc.toLowerCase().includes(componentSearch.toLowerCase())
      );
    });
  }, [componentSearch, lang]);

  return (
    <div id="sidebar-panel" className="h-full flex bg-slate-950/45 border border-slate-800 rounded-2xl overflow-hidden glass-panel shrink-0">
      {/* Icon Dock Column */}
      <div className="w-[64px] bg-slate-900 border-r border-slate-800/80 flex flex-col items-center py-4 gap-4 justify-between shrink-0">
        <div className="flex flex-col gap-3.5 items-center w-full">
          {/* Main Logo icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center transform hover:rotate-3 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-bold text-base font-display">
              PC
            </div>
          </div>
          
          <div className="w-8 h-[1px] bg-slate-800/60 my-1"></div>

          {/* Tab Button list */}
          <button
            onClick={() => setActiveTab('components')}
            title={t.components}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'components'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutGrid size={18} />
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            title={t.templates}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'templates'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutTemplate size={18} />
          </button>

          <button
            onClick={() => setActiveTab('themes')}
            title={t.theme}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'themes'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Palette size={18} />
          </button>

          <button
            onClick={() => setActiveTab('badge')}
            title={t.badgeBuilder}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'badge'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Shield size={18} />
          </button>
        </div>

        <div>
          <button
            onClick={() => setActiveTab('account')}
            title={t.userCenter}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'account'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FolderGit2 size={18} />
          </button>
        </div>
      </div>

      {/* Detail Panel Column */}
      <div className="flex-1 w-[320px] p-4 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {activeTab === 'components' && t.components}
              {activeTab === 'templates' && t.templates}
              {activeTab === 'themes' && t.theme}
              {activeTab === 'badge' && t.badgeBuilder}
              {activeTab === 'account' && t.userCenter}
            </h3>
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1] animate-pulse"></span>
          </div>

          {/* Tab Content Render */}
          {activeTab === 'components' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
                <Search size={14} className="text-slate-400" />
                <input
                  type="text"
                  placeholder={lang === 'en' ? 'Search items...' : 'جستجوی اجزا...'}
                  value={componentSearch}
                  onChange={(e) => setComponentSearch(e.target.value)}
                  className="bg-transparent border-none text-xs text-slate-100 outline-none w-full"
                />
              </div>

              {/* Categorized List */}
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const presets = filteredPresets.filter(p => p.category === cat.id);
                  if (presets.length === 0) return null;

                  return (
                    <div key={cat.id} className="space-y-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider ${cat.color} uppercase`}>
                        {cat.label}
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {presets.map((preset) => (
                          <div
                            key={preset.id}
                            onClick={() => onAddBlock(preset.id)}
                            className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-indigo-500/10 border border-slate-800/80 hover:border-indigo-500/30 cursor-pointer transition-all"
                          >
                            <div className="flex-1 pr-2 text-left min-w-0">
                              <h5 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors truncate">
                                {lang === 'en' ? preset.name : preset.nameFa}
                              </h5>
                              <p className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors truncate">
                                {lang === 'en' ? preset.description : preset.descriptionFa}
                              </p>
                            </div>
                            <button className="p-1 bg-slate-800/50 group-hover:bg-indigo-600 rounded-lg text-slate-400 group-hover:text-white transition-all">
                              <Plus size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <TemplateGallery onSelectTemplate={onSelectTemplate} t={t} lang={lang} />
          )}

          {activeTab === 'themes' && (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              <p className="text-[10px] text-slate-400 italic mb-2 leading-relaxed">
                {lang === 'en' ? 'Select a visual personality preset to apply instantly across your full profile README.' : 'یک پوسته رنگی انتخاب کنید تا فوراً روی ساختار کل بورد مارک‌داون اعمال شود.'}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {THEMES.map((theme) => {
                  const isActive = activeThemeId === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => onSelectTheme(theme.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-indigo-600/10 border-indigo-500'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-semibold text-slate-100">
                          {lang === 'en' ? theme.name : theme.nameFa}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`w-3.5 h-3.5 rounded-full ${theme.previewBg} border border-white/10`}></span>
                          <span className={`w-3.5 h-3.5 rounded-full ${theme.previewAccent} border border-white/10`}></span>
                        </div>
                      </div>
                      
                      {isActive && (
                        <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider bg-indigo-500 text-white rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'badge' && (
            <BadgeBuilder t={t} lang={lang} />
          )}

          {activeTab === 'account' && (
            <UserDashboard
              blocks={blocks}
              themeId={activeThemeId}
              lang={lang}
              t={t}
              onLoadProject={onLoadProject}
              onSaveCurrentProject={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
}
