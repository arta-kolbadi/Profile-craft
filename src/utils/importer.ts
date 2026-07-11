/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Block, BlockType } from '../types';

export function parseMarkdownToBlocks(markdown: string): Block[] {
  if (!markdown || !markdown.trim()) return [];

  const lines = markdown.split('\n');
  const blocks: Block[] = [];
  let currentBlock: Block | null = null;
  let blockContentAcc: string[] = [];
  
  const pushCurrentBlock = () => {
    if (currentBlock) {
      if (blockContentAcc.length > 0) {
        currentBlock.props.content = blockContentAcc.join('\n');
      }
      blocks.push(currentBlock);
      currentBlock = null;
      blockContentAcc = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect headers
    if (line.startsWith('# ')) {
      pushCurrentBlock();
      currentBlock = {
        id: `imp-h-${Date.now()}-${i}`,
        type: 'header',
        visible: true,
        props: {
          title: line.replace('# ', '').trim(),
          align: 'left',
          marginY: 1,
        }
      };
      continue;
    }
    
    if (line.startsWith('## ')) {
      pushCurrentBlock();
      currentBlock = {
        id: `imp-h2-${Date.now()}-${i}`,
        type: 'about',
        visible: true,
        props: {
          title: line.replace('## ', '').trim(),
          aboutText: '',
          align: 'left',
        }
      };
      continue;
    }

    // Detect code blocks
    if (line.startsWith('```')) {
      pushCurrentBlock();
      const lang = line.replace('```', '').trim() || 'typescript';
      currentBlock = {
        id: `imp-code-${Date.now()}-${i}`,
        type: 'code_block',
        visible: true,
        props: {
          title: 'Imported Code Block',
          language: lang,
          content: '',
          align: 'left',
        }
      };
      
      // collect code lines
      i++;
      const codeLines = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      currentBlock.props.content = codeLines.join('\n');
      pushCurrentBlock();
      continue;
    }

    // Detect blockquotes / Quote
    if (line.startsWith('> ')) {
      pushCurrentBlock();
      const quoteText = line.replace('> ', '').trim();
      currentBlock = {
        id: `imp-q-${Date.now()}-${i}`,
        type: 'quote',
        visible: true,
        props: {
          content: quoteText,
          align: 'center',
        }
      };
      pushCurrentBlock();
      continue;
    }

    // Detect visual badges / skills
    if (line.includes('https://img.shields.io/badge') || line.includes('https://skillicons.dev')) {
      pushCurrentBlock();
      
      // simple skills representation
      currentBlock = {
        id: `imp-sk-${Date.now()}-${i}`,
        type: 'skills',
        visible: true,
        props: {
          title: 'Tech Stack 🛠️',
          skillsList: ['react', 'typescript', 'nodejs', 'git'],
          skillsTheme: 'flat-square',
          align: 'left',
        }
      };
      pushCurrentBlock();
      continue;
    }

    // Detect capsule banners or badges
    if (line.includes('capsule-render.vercel.app')) {
      pushCurrentBlock();
      // Match image url
      const match = line.match(/\((https:\/\/capsule-render[^)]+)\)/);
      const url = match ? match[1] : 'https://capsule-render.vercel.app/api?type=waving&color=auto&height=180&section=header&text=Welcome';
      currentBlock = {
        id: `imp-b-${Date.now()}-${i}`,
        type: 'banner',
        visible: true,
        props: {
          bannerUrl: url,
          bannerHeight: 180,
          align: 'center',
        }
      };
      pushCurrentBlock();
      continue;
    }

    // fallback plain paragraph line
    if (line.trim()) {
      if (!currentBlock) {
        currentBlock = {
          id: `imp-md-${Date.now()}-${i}`,
          type: 'markdown',
          visible: true,
          props: {
            content: '',
            marginY: 1,
          }
        };
      }
      blockContentAcc.push(line);
    } else {
      pushCurrentBlock();
    }
  }

  pushCurrentBlock();
  
  return blocks.length > 0 ? blocks : [];
}
