/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import RightPanel from './components/RightPanel';
import LivePreview from './components/LivePreview';
import { TRANSLATIONS } from './utils/translations';
import { Block, BlockType } from './types';
import { COMPONENT_PRESETS } from './constants/components';
import { THEMES } from './constants/themes';
import { generateFullMarkdown } from './utils/markdown';
import { parseMarkdownToBlocks } from './utils/importer';

// Beautiful starting layout with realistic information
const INITIAL_BLOCKS: Block[] = [
  {
    id: 'b-start-banner',
    type: 'banner',
    visible: true,
    props: {
      bannerUrl: 'https://capsule-render.vercel.app/api?type=waving&color=auto&height=180&section=header&text=ProfileCraft%20Space&fontSize=40&animation=fadeIn',
      bannerHeight: 180,
      align: 'center',
      marginY: 1,
    }
  },
  {
    id: 'b-start-h1',
    type: 'header',
    visible: true,
    props: {
      title: "Hi there, I'm ${username} 👋",
      subtitle: "A creative Frontend Architect & Open Source Contributor.",
      align: 'left',
      marginY: 1,
    }
  },
  {
    id: 'b-start-typing',
    type: 'typing',
    visible: true,
    props: {
      typingLines: ['Building Scalable Design Systems', 'Writing Clean React Architecture', 'Designing Stunning Developer Tools'],
      typingColor: '6366f1',
      align: 'left',
      marginY: 1,
    }
  },
  {
    id: 'b-start-about',
    type: 'about',
    visible: true,
    props: {
      title: 'About Me 🚀',
      aboutText: 'I am a highly driven Software Architect focusing on creating beautiful visual products, optimizing user experiences, and contributing to decentralized web utilities.',
      workText: 'Interactive profile builders and dark UI micro-frontends.',
      learningText: 'Multi-threaded client compilers and model quantization.',
      funFactText: 'I solve bugs faster when listening to retro synth-wave loops!',
      align: 'left',
      marginY: 1,
    }
  },
  {
    id: 'b-start-skills',
    type: 'skills',
    visible: true,
    props: {
      title: 'Expertise & Tech Stack 🛠️',
      skillsList: ['react', 'nextjs', 'typescript', 'tailwindcss', 'nodejs', 'postgresql', 'docker'],
      skillsTheme: 'flat-square',
      align: 'left',
      marginY: 1,
    }
  },
  {
    id: 'b-start-stats',
    type: 'stats',
    visible: true,
    props: {
      title: 'GitHub Statistics 📊',
      githubUser: 'username',
      statsTheme: 'radical',
      showStats: true,
      showCommits: true,
      showStars: true,
      showPRs: true,
      align: 'center',
      marginY: 1,
    }
  }
];

export default function App() {
  const [lang, setLang] = useState<'en' | 'fa'>(() => {
    const saved = localStorage.getItem('profilecraft_lang');
    return (saved === 'en' || saved === 'fa') ? saved : 'en';
  });

  const [activeThemeId, setActiveThemeId] = useState<string>(() => {
    return localStorage.getItem('profilecraft_theme_id') || 'github-dark';
  });

  const [blocks, setBlocks] = useState<Block[]>(() => {
    const saved = localStorage.getItem('profilecraft_active_blocks');
    return saved ? JSON.parse(saved) : INITIAL_BLOCKS;
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(1.0);

  // Undo / Redo history tracking state
  const [history, setHistory] = useState<Block[][]>([blocks]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const t = TRANSLATIONS[lang];
  const activeTheme = THEMES.find(th => th.id === activeThemeId) || THEMES[0];

  // Auto-save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('profilecraft_active_blocks', JSON.stringify(blocks));
  }, [blocks]);

  // Set HTML page direction and class
  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    localStorage.setItem('profilecraft_lang', lang);
  }, [lang]);

  // Helper to push blocks and update history
  const updateBlocksState = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
    
    // Save to undo/redo history
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newBlocks);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setBlocks(history[prevIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setBlocks(history[nextIdx]);
    }
  };

  // Add block from a preset
  const handleAddBlock = (presetId: string) => {
    const preset = COMPONENT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    const newBlock: Block = {
      id: `block-${preset.type}-${Date.now()}`,
      type: preset.type,
      visible: true,
      props: { ...preset.defaultProps }
    };

    updateBlocksState([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  // Update specific block props
  const handleUpdateBlockProps = (blockId: string, updatedProps: Record<string, any>) => {
    const nextBlocks = blocks.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          props: {
            ...block.props,
            ...updatedProps
          }
        };
      }
      return block;
    });
    updateBlocksState(nextBlocks);
  };

  // Reorder list
  const handleUpdateBlockOrder = (reorderedBlocks: Block[]) => {
    updateBlocksState(reorderedBlocks);
  };

  // Toggle visibility of a block
  const handleUpdateBlockVisibility = (blockId: string, visible: boolean) => {
    const nextBlocks = blocks.map(block => {
      if (block.id === blockId) {
        return { ...block, visible };
      }
      return block;
    });
    updateBlocksState(nextBlocks);
  };

  // Duplicate block
  const handleDuplicateBlock = (blockId: string) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index === -1) return;

    const source = blocks[index];
    const clone: Block = {
      ...source,
      id: `block-clone-${source.type}-${Date.now()}`,
      props: { ...source.props }
    };

    const nextBlocks = [...blocks];
    nextBlocks.splice(index + 1, 0, clone);
    updateBlocksState(nextBlocks);
    setSelectedBlockId(clone.id);
  };

  // Delete block
  const handleDeleteBlock = (blockId: string) => {
    const nextBlocks = blocks.filter(b => b.id !== blockId);
    updateBlocksState(nextBlocks);
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  // Clear workspace board
  const handleClearAll = () => {
    updateBlocksState([]);
    setSelectedBlockId(null);
  };

  // Switch Visual Theme
  const handleSelectTheme = (themeId: string) => {
    setActiveThemeId(themeId);
    localStorage.setItem('profilecraft_theme_id', themeId);
  };

  // Select pre-configured template gallery item
  const handleSelectTemplate = (templateBlocks: Block[], themeId: string) => {
    const mapped = templateBlocks.map(tb => ({
      ...tb,
      id: `tpl-blk-${tb.type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    }));
    updateBlocksState(mapped);
    setActiveThemeId(themeId);
    localStorage.setItem('profilecraft_theme_id', themeId);
    setSelectedBlockId(null);
  };

  // Load imported or saved projects
  const handleLoadProject = (projectBlocks: Block[], themeId: string, projectName: string) => {
    updateBlocksState(projectBlocks);
    setActiveThemeId(themeId);
    localStorage.setItem('profilecraft_theme_id', themeId);
    setSelectedBlockId(null);
  };

  // Import raw Markdown script
  const handleImportMarkdown = (rawMarkdown: string) => {
    const importedBlocks = parseMarkdownToBlocks(rawMarkdown);
    if (importedBlocks.length > 0) {
      updateBlocksState([...blocks, ...importedBlocks]);
    }
  };

  // Trigger File Download README.md
  const handleExportMarkdown = () => {
    const fullMarkdown = generateFullMarkdown(blocks, 'username');
    const blob = new Blob([fullMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
  };

  // Trigger File Download JSON Backup
  const handleExportJSON = () => {
    const payload = {
      app: 'ProfileCraft',
      version: '3.0',
      themeId: activeThemeId,
      blocks
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profilecraft_project.json';
    a.click();
  };

  // Zoom factors
  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.1, 1.3));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.1, 0.7));
  const handleZoomReset = () => setZoomScale(1.0);

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

  return (
    <div className={`min-h-screen ${activeTheme.bg} flex flex-col transition-colors duration-500 overflow-x-hidden font-sans`}>
      {/* Top Navbar Menu */}
      <Header
        lang={lang}
        onToggleLang={() => setLang(prev => prev === 'en' ? 'fa' : 'en')}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onExportMarkdown={handleExportMarkdown}
        onExportJSON={handleExportJSON}
        zoomScale={zoomScale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        t={t}
      />

      {/* Main Workspace Workspace Layout */}
      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
        {/* Left Column Sidebar */}
        <section className="lg:col-span-3 h-[780px] lg:h-[calc(100vh-120px)] min-h-[500px]">
          <Sidebar
            onAddBlock={handleAddBlock}
            onSelectTheme={handleSelectTheme}
            activeThemeId={activeThemeId}
            onSelectTemplate={handleSelectTemplate}
            blocks={blocks}
            lang={lang}
            t={t}
            onLoadProject={handleLoadProject}
          />
        </section>

        {/* Center Column Visual Drag Workspace */}
        <section className="lg:col-span-5 h-[780px] lg:h-[calc(100vh-120px)] flex flex-col bg-slate-950/45 border border-slate-800 rounded-2xl overflow-hidden glass-panel">
          <Editor
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onUpdateBlockOrder={handleUpdateBlockOrder}
            onUpdateBlockVisibility={handleUpdateBlockVisibility}
            onDuplicateBlock={handleDuplicateBlock}
            onDeleteBlock={handleDeleteBlock}
            onClearAll={handleClearAll}
            onImportMarkdown={handleImportMarkdown}
            zoomScale={zoomScale}
            t={t}
            lang={lang}
          />
        </section>

        {/* Right Column Split - Properties Editor or Live README Render */}
        <section className="lg:col-span-4 h-[780px] lg:h-[calc(100vh-120px)] flex flex-col gap-4">
          {/* Properties configuration panel at top half */}
          <div className="flex-1 min-h-[300px]">
            <RightPanel
              selectedBlock={selectedBlock}
              onUpdateBlockProps={handleUpdateBlockProps}
              onDeleteBlock={handleDeleteBlock}
              t={t}
              lang={lang}
            />
          </div>

          {/* Live Preview rendered beautifully */}
          <div className="flex-1 min-h-[300px]">
            <LivePreview
              blocks={blocks}
              githubUser="username"
              t={t}
              lang={lang}
            />
          </div>
        </section>
      </main>

      {/* Modern instructions footer banner */}
      <footer className="py-4 px-6 border-t border-slate-850/60 bg-slate-900/40 text-center text-[10px] text-slate-500 font-mono flex flex-col md:flex-row items-center justify-between gap-2 shrink-0">
        <div>
          {lang === 'en' ? 'ProfileCraft Builder — Designed for stunning Github portfolios' : 'پروفایل‌کرافت — ساخته شده برای طراحی فایل‌های خواندنی گیت‌هاب'}
        </div>
        <div className="flex items-center gap-2">
          <span>{lang === 'en' ? 'All changes saved locally' : 'همه تغییرات در سیستم شما ذخیره می‌شوند'}</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        </div>
      </footer>
    </div>
  );
}
