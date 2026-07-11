/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Key, LogIn, LogOut, Folder, Plus, Trash2, Download, CloudLightning, Sparkles, Check, Github } from 'lucide-react';
import { READMEProject, Block, UserAccount } from '../types';
import { TranslationSet } from '../utils/translations';

interface UserDashboardProps {
  blocks: Block[];
  themeId: string;
  lang: 'en' | 'fa';
  t: TranslationSet;
  onLoadProject: (blocks: Block[], themeId: string, projectName: string) => void;
  onSaveCurrentProject: (name: string) => void;
}

export default function UserDashboard({
  blocks,
  themeId,
  lang,
  t,
  onLoadProject,
  onSaveCurrentProject,
}: UserDashboardProps) {
  const [account, setAccount] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('profilecraft_account');
    return saved
      ? JSON.parse(saved)
      : { email: 'guest@profilecraft.io', username: 'github_coder', isLoggedIn: false };
  });

  const [usernameInput, setUsernameInput] = useState(account.username);
  const [emailInput, setEmailInput] = useState(account.email);
  const [projects, setProjects] = useState<READMEProject[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(true);
  const [saveNotify, setSaveNotify] = useState(false);

  useEffect(() => {
    loadSavedProjects();
  }, []);

  const loadSavedProjects = () => {
    const saved = localStorage.getItem('profilecraft_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      // Seed a starter project
      const starter: READMEProject = {
        id: 'starter-id',
        name: lang === 'en' ? 'My First README' : 'فایل خواندنی من',
        blocks: [
          {
            id: 'starter-h',
            type: 'header',
            visible: true,
            props: { title: "Hi, I'm ${username} 👋", subtitle: "Innovating with code.", align: 'center' }
          }
        ],
        themeId: 'github-dark',
        lang: 'en',
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('profilecraft_projects', JSON.stringify([starter]));
      setProjects([starter]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      email: emailInput || 'developer@profilecraft.io',
      username: usernameInput || 'github_user',
      isLoggedIn: true
    };
    setAccount(updated);
    localStorage.setItem('profilecraft_account', JSON.stringify(updated));
  };

  const handleLogout = () => {
    const updated = {
      email: 'guest@profilecraft.io',
      username: 'github_coder',
      isLoggedIn: false
    };
    setAccount(updated);
    localStorage.setItem('profilecraft_account', JSON.stringify(updated));
  };

  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newProj: READMEProject = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      blocks,
      themeId,
      lang,
      updatedAt: new Date().toISOString()
    };

    const savedList = localStorage.getItem('profilecraft_projects');
    const list: READMEProject[] = savedList ? JSON.parse(savedList) : [];
    const updatedList = [newProj, ...list];
    
    localStorage.setItem('profilecraft_projects', JSON.stringify(updatedList));
    setProjects(updatedList);
    setNewProjectName('');
    setSaveNotify(true);
    setTimeout(() => setSaveNotify(false), 3000);
  };

  const deleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const list = projects.filter(p => p.id !== id);
    localStorage.setItem('profilecraft_projects', JSON.stringify(list));
    setProjects(list);
  };

  return (
    <div id="user-dashboard" className="space-y-5">
      {/* Account Info / Mock Auth */}
      <div className="p-4 rounded-xl glass-panel relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1.5 bg-emerald-500/15 text-emerald-400 text-[9px] font-mono rounded-bl-lg flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
          {cloudSyncEnabled ? 'CLOUD SYNC ACTIVE' : 'OFFLINE MODE'}
        </div>

        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <User size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
              {account.isLoggedIn ? account.username : (lang === 'en' ? 'Guest Architect' : 'معمار مهمان')}
              <span className="text-[10px] text-slate-400 font-mono">@{account.username}</span>
            </h4>
            <p className="text-[10px] text-slate-500 font-mono">{account.email}</p>
          </div>
        </div>

        {!account.isLoggedIn ? (
          <form onSubmit={handleLogin} className="space-y-3 pt-2">
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.accountDesc}
            </p>
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">GitHub Username</label>
              <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1">
                <Github size={14} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. torvalds"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="bg-transparent border-none text-xs text-slate-100 outline-none w-full py-0.5"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Email</label>
              <input
                type="email"
                placeholder="developer@profilecraft.io"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all"
            >
              <LogIn size={13} /> {t.createAccount}
            </button>
          </form>
        ) : (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs bg-slate-950/50 border border-slate-800 rounded-lg p-2">
              <span className="text-slate-400 flex items-center gap-1">
                <CloudLightning size={12} className="text-indigo-400" />
                {t.cloudSync}
              </span>
              <button
                onClick={() => setCloudSyncEnabled(!cloudSyncEnabled)}
                className={`w-8 h-4 rounded-full transition-all relative ${cloudSyncEnabled ? 'bg-indigo-600' : 'bg-slate-800'}`}
              >
                <span className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${cloudSyncEnabled ? 'right-0.5' : 'left-0.5'}`}></span>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 text-xs font-semibold rounded-lg transition-all border border-rose-900/40"
            >
              <LogOut size={13} /> {t.logout}
            </button>
          </div>
        )}
      </div>

      {/* Save Project Input */}
      <div className="p-4 rounded-xl glass-panel">
        <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Plus size={14} className="text-indigo-400" />
          {lang === 'en' ? 'Save Current Design' : 'ذخیره طرح فعلی'}
        </h4>
        <form onSubmit={saveProject} className="flex gap-2">
          <input
            type="text"
            placeholder={lang === 'en' ? 'Project Name...' : 'نام پروژه...'}
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all flex items-center shrink-0"
          >
            {t.saveProject.replace('Save to ', '')}
          </button>
        </form>
        {saveNotify && (
          <p className="text-[10px] text-emerald-400 mt-1.5 font-mono flex items-center gap-1">
            <Check size={10} /> {t.saved}
          </p>
        )}
      </div>

      {/* Saved Projects list */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center gap-2">
          <Folder size={14} /> {t.localProjects} ({projects.length})
        </h4>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {projects.length > 0 ? (
            projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onLoadProject(proj.blocks, proj.themeId, proj.name)}
                className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800/80 hover:border-indigo-500/30 cursor-pointer transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors truncate">
                    {proj.name}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {proj.blocks.length} {lang === 'en' ? 'blocks' : 'بلوک'} • {new Date(proj.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const blob = new Blob([JSON.stringify(proj, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${proj.name.toLowerCase().replace(/\s+/g, '_')}_project.json`;
                      a.click();
                    }}
                    title="Export JSON"
                    className="p-1 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 rounded transition-colors"
                  >
                    <Download size={12} />
                  </button>
                  <button
                    onClick={(e) => deleteProject(proj.id, e)}
                    title="Delete"
                    className="p-1 bg-slate-850 hover:bg-slate-850 text-slate-400 hover:text-rose-400 rounded transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-[11px] text-slate-500 italic">
              {lang === 'en' ? 'No saved projects found' : 'هیچ پروژه‌ای ذخیره نشده است'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
