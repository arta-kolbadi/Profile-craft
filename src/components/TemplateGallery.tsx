/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Heart, Sparkles, Check, ArrowRight, LayoutTemplate } from 'lucide-react';
import { Template, Block } from '../types';
import { generateTemplatesList } from '../constants/templates';
import { TranslationSet } from '../utils/translations';

interface TemplateGalleryProps {
  onSelectTemplate: (blocks: Block[], themeId: string) => void;
  t: TranslationSet;
  lang: 'en' | 'fa';
}

export default function TemplateGallery({ onSelectTemplate, t, lang }: TemplateGalleryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedTemplates, setLikedTemplates] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('profilecraft_liked_templates');
    return saved ? JSON.parse(saved) : {};
  });
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});

  const templates = useMemo(() => generateTemplatesList(), []);

  // Set up random starting likes for the dynamic templates to simulate a real active hub community!
  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    templates.forEach((tpl) => {
      // seed likes deterministically based on ID
      let hash = 0;
      for (let i = 0; i < tpl.id.length; i++) {
        hash = tpl.id.charCodeAt(i) + ((hash << 5) - hash);
      }
      initialLikes[tpl.id] = Math.abs(hash % 250) + 12;
    });
    setLikesCount(initialLikes);
  }, [templates]);

  // Save liked templates to local storage
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = { ...likedTemplates, [id]: !likedTemplates[id] };
    setLikedTemplates(newLiked);
    localStorage.setItem('profilecraft_liked_templates', JSON.stringify(newLiked));

    // Update simulation count
    setLikesCount(prev => ({
      ...prev,
      [id]: prev[id] + (newLiked[id] ? 1 : -1)
    }));
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    templates.forEach(t => cats.add(lang === 'en' ? t.category : t.categoryFa));
    return ['All', ...Array.from(cats)];
  }, [templates, lang]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(tpl => {
      const name = lang === 'en' ? tpl.name : tpl.nameFa;
      const desc = lang === 'en' ? tpl.description : tpl.descriptionFa;
      const cat = lang === 'en' ? tpl.category : tpl.categoryFa;

      const matchesSearch = 
        name.toLowerCase().includes(search.toLowerCase()) ||
        desc.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || cat === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [templates, search, selectedCategory, lang]);

  return (
    <div id="template-gallery" className="space-y-4">
      <div className="text-xs text-slate-400 font-mono mb-2 flex items-center gap-1.5 bg-indigo-500/5 px-2.5 py-1.5 rounded-lg border border-indigo-500/10">
        <Sparkles size={12} className="text-indigo-400" />
        {t.templatesCount}
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder={lang === 'en' ? 'Search 100+ templates...' : 'جستجو در ۱۰۰+ قالب...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none text-sm text-slate-100 outline-none w-full"
        />
      </div>

      {/* Categories Horizontal scroll */}
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all shrink-0 font-medium ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 gap-3 max-h-[360px] overflow-y-auto pr-1">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((tpl) => {
            const isLiked = !!likedTemplates[tpl.id];
            const likesVal = (likesCount[tpl.id] || 0) + (isLiked ? 1 : 0);

            return (
              <div
                key={tpl.id}
                onClick={() => onSelectTemplate(tpl.blocks, tpl.themeId)}
                className="group p-3.5 rounded-xl glass-panel hover:border-indigo-500/40 cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all"></div>
                
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider bg-indigo-500/10 text-indigo-300 rounded border border-indigo-500/10 uppercase">
                      {lang === 'en' ? tpl.category : tpl.categoryFa}
                    </span>
                    <button
                      onClick={(e) => toggleLike(tpl.id, e)}
                      className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Heart size={13} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
                      <span className="text-[10px] font-mono">{likesVal}</span>
                    </button>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                    {lang === 'en' ? tpl.name : tpl.nameFa}
                  </h4>
                  
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {lang === 'en' ? tpl.description : tpl.descriptionFa}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-indigo-400 transition-colors">
                  <span className="flex items-center gap-1">
                    <LayoutTemplate size={12} /> {tpl.blocks.length} {lang === 'en' ? 'blocks' : 'بلوک'}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    {lang === 'en' ? 'Load Design' : 'بارگذاری طرح'}{' '}
                    <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-xs text-slate-500">
            {lang === 'en' ? 'No templates matching search' : 'هیچ قالبی پیدا نشد'}
          </div>
        )}
      </div>
    </div>
  );
}
