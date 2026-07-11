/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Block } from '../types';
import { COMPONENT_PRESETS, POPULAR_SKILLS } from '../constants/components';
import { THEMES } from '../constants/themes';
import { Edit3, Settings, Trash, Plus, Check, ChevronDown, Trash2, Eye, EyeOff } from 'lucide-react';
import { TranslationSet } from '../utils/translations';

interface RightPanelProps {
  selectedBlock: Block | null;
  onUpdateBlockProps: (id: string, updatedProps: Record<string, any>) => void;
  onDeleteBlock: (id: string) => void;
  t: TranslationSet;
  lang: 'en' | 'fa';
}

export default function RightPanel({
  selectedBlock,
  onUpdateBlockProps,
  onDeleteBlock,
  t,
  lang,
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'layout'>('content');

  if (!selectedBlock) {
    return (
      <div id="right-properties-panel" className="h-full flex flex-col justify-center items-center p-6 bg-slate-950/45 border border-slate-800 rounded-2xl text-center text-slate-500 text-xs italic glass-panel">
        <Settings size={28} className="text-slate-600 mb-2 animate-spin-slow" />
        {lang === 'en' ? 'Select any block from the board to edit its advanced properties here.' : 'یکی از بلوک‌ها را در بورد وسط انتخاب کنید تا تنظیمات پیشرفته آن در اینجا نمایان شود.'}
      </div>
    );
  }

  const { id, type, props } = selectedBlock;

  const handleChange = (key: string, value: any) => {
    onUpdateBlockProps(id, { [key]: value });
  };

  // Render block-specific property controls
  return (
    <div id="right-properties-panel" className="h-full flex flex-col bg-slate-950/45 border border-slate-800 rounded-2xl overflow-hidden glass-panel">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/80 shrink-0">
        <h3 className="text-xs font-bold text-slate-300 tracking-wider flex items-center gap-2">
          <Edit3 size={14} className="text-indigo-400" />
          {t.propertiesTitle}
          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono uppercase font-normal">
            {type}
          </span>
        </h3>

        <button
          onClick={() => onDeleteBlock(id)}
          title={lang === 'en' ? 'Delete block' : 'حذف بلوک'}
          className="p-1 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-950 border-b border-slate-900 shrink-0">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'content'
              ? 'border-indigo-500 text-slate-200 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {lang === 'en' ? 'Configuration' : 'پیکربندی محتوا'}
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex-1 py-2 text-xs font-medium border-b-2 transition-all ${
            activeTab === 'layout'
              ? 'border-indigo-500 text-slate-200 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          {lang === 'en' ? 'Layout & Styles' : 'چیدمان و فواصل'}
        </button>
      </div>

      {/* Properties Fields Scroll Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'content' ? (
          <div className="space-y-4">
            {/* Title / Subtitle */}
            {('title' in props) && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{t.propTitle}</label>
                <input
                  type="text"
                  value={props.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {('subtitle' in props) && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{t.propSubtitle}</label>
                <input
                  type="text"
                  value={props.subtitle || ''}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Banner URL specific */}
            {type === 'banner' && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{t.propBannerUrl}</label>
                  <input
                    type="text"
                    value={props.bannerUrl || ''}
                    onChange={(e) => handleChange('bannerUrl', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{t.propBannerHeight}</label>
                  <input
                    type="number"
                    value={props.bannerHeight || 180}
                    onChange={(e) => handleChange('bannerHeight', parseInt(e.target.value) || 100)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 outline-none focus:border-indigo-500"
                  />
                </div>
              </>
            )}

            {/* Custom header capsule options */}
            {type === 'header' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Capsule text</label>
                  <input
                    type="text"
                    value={props.capsuleText || ''}
                    placeholder="e.g. welcome"
                    onChange={(e) => handleChange('capsuleText', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Capsule style</label>
                  <select
                    value={props.capsuleTheme || 'synthwave'}
                    onChange={(e) => handleChange('capsuleTheme', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
                  >
                    <option value="synthwave">Synthwave</option>
                    <option value="transparent">Transparent</option>
                    <option value="waving">Waving</option>
                    <option value="slice">Slice</option>
                    <option value="soft">Soft</option>
                  </select>
                </div>
              </div>
            )}

            {/* Typing SVG lines */}
            {type === 'typing' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{t.propTypingLines}</label>
                <textarea
                  rows={3}
                  value={(props.typingLines || []).join('\n')}
                  onChange={(e) => handleChange('typingLines', e.target.value.split('\n'))}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* About me answers */}
            {type === 'about' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">General Bio Paragraph</label>
                  <textarea
                    rows={2}
                    value={props.aboutText || ''}
                    onChange={(e) => handleChange('aboutText', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">What are you working on?</label>
                  <input
                    type="text"
                    value={props.workText || ''}
                    onChange={(e) => handleChange('workText', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">What are you learning?</label>
                  <input
                    type="text"
                    value={props.learningText || ''}
                    onChange={(e) => handleChange('learningText', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* Skills selection */}
            {type === 'skills' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">Badge Shield Style</label>
                  <select
                    value={props.skillsTheme || 'flat-square'}
                    onChange={(e) => handleChange('skillsTheme', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
                  >
                    <option value="simple">Plain Labels</option>
                    <option value="flat">Dynamic Colors (Flat)</option>
                    <option value="flat-square">Skillicons (Light Grid)</option>
                    <option value="for-the-badge">Big Badges (For the Badge)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">Select Technologies</label>
                  <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto p-2 bg-slate-950 border border-slate-800 rounded-lg">
                    {POPULAR_SKILLS.map((skill) => {
                      const list = props.skillsList || [];
                      const isSelected = list.includes(skill.id);
                      return (
                        <button
                          key={skill.id}
                          onClick={() => {
                            const newList = isSelected
                              ? list.filter(item => item !== skill.id)
                              : [...list, skill.id];
                            handleChange('skillsList', newList);
                          }}
                          className={`px-2 py-1 text-[10px] rounded transition-all font-mono flex items-center gap-1 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
                          }`}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* GitHub Stats Card Config */}
            {type === 'stats' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">{t.propUser}</label>
                  <input
                    type="text"
                    value={props.githubUser || ''}
                    onChange={(e) => handleChange('githubUser', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">{t.propStatsTheme}</label>
                  <select
                    value={props.statsTheme || 'radical'}
                    onChange={(e) => handleChange('statsTheme', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
                  >
                    <option value="radical">Radical Neon</option>
                    <option value="github_dark">GitHub Classic</option>
                    <option value="tokyonight">Tokyo Night</option>
                    <option value="dracula">Dracula</option>
                    <option value="nord">Nord</option>
                    <option value="synthwave">Synthwave</option>
                  </select>
                </div>

                <div className="space-y-1.5 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {t.propStatsOptions}
                  </span>
                  {[
                    { key: 'showCommits', label: 'Commits count' },
                    { key: 'showStars', label: 'Stars accumulated' },
                    { key: 'showPRs', label: 'Pull requests' },
                    { key: 'showContribs', label: 'Contribution graph' },
                  ].map((field) => (
                    <label key={field.key} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!props[field.key as keyof typeof props]}
                        onChange={(e) => handleChange(field.key, e.target.checked)}
                        className="rounded border-slate-800 text-indigo-600 bg-slate-900 w-3.5 h-3.5"
                      />
                      {field.label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Code / Markdown Content blocks */}
            {('content' in props) && !['quote', 'footer'].includes(type) && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{t.propContent}</label>
                {type === 'code_block' && (
                  <div className="mb-2">
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">{t.propLanguage}</label>
                    <select
                      value={props.language || 'typescript'}
                      onChange={(e) => handleChange('language', e.target.value)}
                      className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 font-mono"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="golang">Go</option>
                      <option value="rust">Rust</option>
                      <option value="html">HTML</option>
                      <option value="bash">Bash Terminal</option>
                    </select>
                  </div>
                )}
                <textarea
                  rows={8}
                  value={props.content || ''}
                  onChange={(e) => handleChange('content', e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 font-mono focus:border-indigo-500 outline-none"
                />
              </div>
            )}

            {/* Custom items editor (Projects / Experiences list manager) */}
            {('items' in props) && (
              <div className="space-y-3">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {t.propItems}
                </span>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {(props.items || []).map((item, index) => (
                    <div key={item.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-850 space-y-2 relative">
                      <button
                        onClick={() => {
                          const newList = (props.items || []).filter(i => i.id !== item.id);
                          handleChange('items', newList);
                        }}
                        className="absolute top-2 right-2 text-slate-500 hover:text-rose-400"
                        title={t.removeItem}
                      >
                        <Trash size={12} />
                      </button>

                      <div>
                        <input
                          type="text"
                          value={item.title}
                          placeholder="Item Title"
                          onChange={(e) => {
                            const updatedItems = [...(props.items || [])];
                            updatedItems[index].title = e.target.value;
                            handleChange('items', updatedItems);
                          }}
                          className="w-full bg-transparent border-b border-slate-800 text-xs font-semibold text-slate-200 py-0.5 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={item.subtitle || ''}
                          placeholder="Subtitle / Tech Stack / Company"
                          onChange={(e) => {
                            const updatedItems = [...(props.items || [])];
                            updatedItems[index].subtitle = e.target.value;
                            handleChange('items', updatedItems);
                          }}
                          className="w-full bg-transparent border-b border-slate-800 text-[10px] text-slate-400 py-0.5 outline-none"
                        />
                      </div>
                      <div>
                        <textarea
                          value={item.description || ''}
                          placeholder="Item description text"
                          onChange={(e) => {
                            const updatedItems = [...(props.items || [])];
                            updatedItems[index].description = e.target.value;
                            handleChange('items', updatedItems);
                          }}
                          className="w-full bg-transparent text-[10px] text-slate-400 py-0.5 outline-none resize-none"
                        />
                      </div>
                      {('link' in item) && (
                        <div>
                          <input
                            type="text"
                            value={item.link || ''}
                            placeholder="Link URL"
                            onChange={(e) => {
                              const updatedItems = [...(props.items || [])];
                              updatedItems[index].link = e.target.value;
                              handleChange('items', updatedItems);
                            }}
                            className="w-full bg-transparent text-[10px] text-sky-400 py-0.5 outline-none font-mono"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const newItem = {
                      id: `item-${Date.now()}`,
                      title: 'New List Item',
                      subtitle: 'Tech stacks',
                      description: 'Brief description about this project or work details.',
                      link: 'https://github.com'
                    };
                    handleChange('items', [...(props.items || []), newItem]);
                  }}
                  className="w-full py-1.5 border border-dashed border-slate-800 hover:border-indigo-500 rounded-lg text-slate-400 hover:text-indigo-400 text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Plus size={12} /> {t.addItem}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* --- LAYOUT AND STYLING OPTIONS TAB --- */
          <div className="space-y-4">
            {/* Alignment */}
            {('align' in props) && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{t.propAlign}</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 border border-slate-800 rounded-xl">
                  {['left', 'center', 'right'].map((alignOpt) => (
                    <button
                      key={alignOpt}
                      onClick={() => handleChange('align', alignOpt)}
                      className={`py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                        props.align === alignOpt
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {alignOpt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Vertical Margins */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{t.propMargin}</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={props.marginY !== undefined ? props.marginY : 1}
                  onChange={(e) => handleChange('marginY', parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <span className="text-xs font-mono text-slate-400 min-w-8 text-right">
                  {props.marginY !== undefined ? props.marginY : 1} rem
                </span>
              </div>
            </div>

            {/* Callout type specifics */}
            {type === 'callout' && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{t.propCalloutType}</label>
                <select
                  value={props.calloutType || 'tip'}
                  onChange={(e) => handleChange('calloutType', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100"
                >
                  <option value="note">Standard Info (NOTE)</option>
                  <option value="tip">Aesthetic Emerald (TIP)</option>
                  <option value="warning">Orange Warning (WARNING)</option>
                  <option value="important">Royal Purple (IMPORTANT)</option>
                  <option value="caution">Red Alert (CAUTION)</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
