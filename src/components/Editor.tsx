/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Block, BlockType } from '../types';
import { ArrowUp, ArrowDown, Eye, EyeOff, Copy, Trash2, Sliders, GripVertical, Plus, Import, AlertCircle, FileCode } from 'lucide-react';
import { TranslationSet } from '../utils/translations';
import { COMPONENT_PRESETS } from '../constants/components';

interface EditorProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onUpdateBlockOrder: (blocks: Block[]) => void;
  onUpdateBlockVisibility: (id: string, visible: boolean) => void;
  onDuplicateBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
  onClearAll: () => void;
  onImportMarkdown: (markdown: string) => void;
  zoomScale: number;
  t: TranslationSet;
  lang: 'en' | 'fa';
}

export default function Editor({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlockOrder,
  onUpdateBlockVisibility,
  onDuplicateBlock,
  onDeleteBlock,
  onClearAll,
  onImportMarkdown,
  zoomScale,
  t,
  lang,
}: EditorProps) {
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Reorder helper
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...blocks];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    
    onUpdateBlockOrder(reordered);
  };

  // HTML5 Drag and Drop Handlers for seamless dragging!
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const reordered = [...blocks];
    const draggedItem = reordered[draggedIndex];
    reordered.splice(draggedIndex, 1);
    reordered.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    onUpdateBlockOrder(reordered);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const triggerMarkdownImport = () => {
    if (!importText.trim()) return;
    onImportMarkdown(importText);
    setImportText('');
    setImportModalOpen(false);
  };

  return (
    <div id="editor-workspace" className="h-full flex flex-col justify-between">
      {/* Top Header Actions Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 shrink-0 rounded-t-2xl">
        <h3 className="text-xs font-bold text-slate-300 tracking-wider flex items-center gap-2">
          <Sliders size={14} className="text-indigo-400" />
          {t.editorTitle}
          <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded-lg">
            {blocks.length} {lang === 'en' ? 'Elements' : 'آیتم'}
          </span>
        </h3>

        <div className="flex gap-2">
          {/* Import Markdown modal trigger */}
          <button
            onClick={() => setImportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-all border border-slate-700/60"
          >
            <Import size={12} />
            {t.importMd}
          </button>
          
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 text-xs font-medium rounded-lg transition-all border border-rose-900/40"
          >
            {t.clearAll}
          </button>
        </div>
      </div>

      {/* Editor Main Board Area with scaling transform */}
      <div className="flex-1 bg-slate-950/20 overflow-y-auto p-4 md:p-6 select-none relative scrollbar-thin">
        {blocks.length > 0 ? (
          <div 
            className="space-y-3 transition-transform origin-top-center pb-20"
            style={{ transform: `scale(${zoomScale})` }}
          >
            {blocks.map((block, idx) => {
              const isSelected = selectedBlockId === block.id;
              const isVisible = block.visible;

              return (
                <div
                  key={block.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onSelectBlock(block.id)}
                  className={`group rounded-xl relative border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-600/5'
                      : 'bg-slate-900/55 border-slate-800/80 hover:border-slate-700'
                  } ${!isVisible ? 'opacity-40 border-dashed' : ''} ${draggedIndex === idx ? 'opacity-30' : ''}`}
                >
                  {/* Grid layout containing reordering tabs & details */}
                  <div className="flex items-center justify-between p-3.5">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Vertical drag handle */}
                      <div className="text-slate-600 group-hover:text-slate-400 cursor-grab active:cursor-grabbing">
                        <GripVertical size={16} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">
                            {block.type.replace('_', ' ')}
                          </span>
                          {!isVisible && (
                            <span className="text-[9px] font-mono font-bold bg-slate-800 text-slate-400 px-1 py-0.5 rounded">
                              HIDDEN
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono truncate max-w-xs md:max-w-md">
                          {block.props.title || block.props.content || block.props.bannerUrl || (lang === 'en' ? 'Click to configure content...' : 'برای تنظیمات محتوا کلیک کنید...')}
                        </p>
                      </div>
                    </div>

                    {/* Quick Action triggers */}
                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      {/* Up and Down reorder triggers */}
                      <button
                        onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'up'); }}
                        disabled={idx === 0}
                        className="p-1.5 text-slate-500 hover:text-slate-200 disabled:opacity-30 rounded hover:bg-slate-800"
                        title={lang === 'en' ? 'Move Up' : 'انتقال به بالا'}
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'down'); }}
                        disabled={idx === blocks.length - 1}
                        className="p-1.5 text-slate-500 hover:text-slate-200 disabled:opacity-30 rounded hover:bg-slate-800"
                        title={lang === 'en' ? 'Move Down' : 'انتقال به پایین'}
                      >
                        <ArrowDown size={13} />
                      </button>

                      {/* Visibility trigger */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onUpdateBlockVisibility(block.id, !isVisible); }}
                        className="p-1.5 text-slate-500 hover:text-slate-200 rounded hover:bg-slate-800"
                        title={isVisible ? (lang === 'en' ? 'Hide' : 'پنهان کردن') : (lang === 'en' ? 'Show' : 'نمایش')}
                      >
                        {isVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onDuplicateBlock(block.id); }}
                        className="p-1.5 text-slate-500 hover:text-indigo-400 rounded hover:bg-slate-800"
                        title={lang === 'en' ? 'Duplicate' : 'تکثیر'}
                      >
                        <Copy size={13} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteBlock(block.id); }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800"
                        title={lang === 'en' ? 'Delete' : 'حذف'}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center items-center py-24 text-center max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 animate-pulse-slow">
              <FileCode size={28} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              {t.emptyEditorPlaceholder}
            </p>
          </div>
        )}
      </div>

      {/* Import Markdown raw modal portal */}
      {importModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-850 border-b border-slate-800/80 flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-300 tracking-wider flex items-center gap-2">
                <Import size={14} className="text-indigo-400" />
                {lang === 'en' ? 'Paste existing Markdown code' : 'جایگذاری کدهای مارک‌داون قبلی'}
              </h3>
              <button
                onClick={() => setImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-100 text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800 text-[10.5px] text-slate-400">
                <AlertCircle size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                <p>
                  {lang === 'en' 
                    ? 'Our parser will automatically break down headers, lists, code snippets, and social badges into interactive blocks that you can customize.' 
                    : 'تجزیه‌کننده ما به طور خودکار عناوین، کدهای برنامه‌نویسی و آیکون‌های شما را به بلوک‌های بصری و تعاملی تفکیک می‌کند.'}
                </p>
              </div>
              <textarea
                rows={10}
                placeholder="# Hi there! I am a fullstack dev..."
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-xl font-mono text-slate-200 outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  onClick={() => setImportModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg"
                >
                  {lang === 'en' ? 'Cancel' : 'لغو'}
                </button>
                <button
                  onClick={triggerMarkdownImport}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg"
                >
                  {lang === 'en' ? 'Import Blocks' : 'وارد کردن به بورد'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
