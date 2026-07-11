/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Block } from '../types';
import { COMPONENT_PRESETS, POPULAR_SKILLS } from '../constants/components';

export function blockToMarkdown(block: Block, githubUserDefault: string = 'username'): string {
  if (!block.visible) return '';

  const { props, type } = block;
  const username = props.githubUser || githubUserDefault;
  const align = props.align || 'left';
  const marginStr = '\n'.repeat(props.marginY !== undefined ? props.marginY : 1);

  // Helper to wrap content with HTML alignment if needed
  const alignWrapper = (content: string): string => {
    if (align === 'center') {
      return `<div align="center">\n\n${content}\n\n</div>`;
    }
    if (align === 'right') {
      return `<div align="right">\n\n${content}\n\n</div>`;
    }
    return content;
  };

  switch (type) {
    case 'header': {
      const titleText = (props.title || "Hi there! 👋").replace('${username}', username);
      const subText = props.subtitle || '';
      
      let headerMd = '';
      if (props.capsuleText) {
        const theme = props.capsuleTheme || 'synthwave';
        headerMd = `![Capsule Header](https://capsule-render.vercel.app/api?type=rect&color=${theme}&height=120&text=${encodeURIComponent(titleText)}&fontSize=30)\n\n`;
        if (subText) {
          headerMd += `${subText}\n`;
        }
      } else {
        headerMd = `# ${titleText}\n\n`;
        if (subText) {
          headerMd += `### ${subText}\n`;
        }
      }

      return alignWrapper(headerMd) + marginStr;
    }

    case 'banner': {
      if (!props.bannerUrl) return '';
      const height = props.bannerHeight || 200;
      const imgTag = `<img src="${props.bannerUrl}" height="${height}" alt="Banner" style="max-width: 100%; border-radius: 8px;" />`;
      return alignWrapper(imgTag) + marginStr;
    }

    case 'typing': {
      const lines = props.typingLines || ['Senior Software Engineer', 'Creative Architect'];
      const linesParam = lines.map(l => encodeURIComponent(l)).join(';');
      const speed = props.typingSpeed || 400;
      const color = props.typingColor || '6366f1';
      const centerBool = align === 'center' ? 'true' : 'false';
      
      const typingUrl = `https://readme-typing-svg.demolab.com?font=Fira+Code&duration=3000&pause=1000&color=${color}&center=${centerBool}&vCenter=true&width=500&height=50&lines=${linesParam}`;
      
      const typingMd = `[![Typing SVG](${typingUrl})](https://git.io/typing-svg)`;
      return alignWrapper(typingMd) + marginStr;
    }

    case 'about': {
      let aboutMd = '';
      if (props.title) {
        aboutMd += `## ${props.title}\n\n`;
      }
      if (props.aboutText) {
        aboutMd += `${props.aboutText}\n\n`;
      }
      
      // Structure additional list items
      const details: string[] = [];
      if (props.workText) details.push(`- 🔭 I’m currently working on **${props.workText}**`);
      if (props.learningText) details.push(`- 🌱 I’m currently learning **${props.learningText}**`);
      if (props.collabText) details.push(`- 🤝 I’m looking to collaborate on **${props.collabText}**`);
      if (props.funFactText) details.push(`- ⚡ Fun fact: **${props.funFactText}**`);

      if (details.length > 0) {
        aboutMd += details.join('\n') + '\n';
      }

      return alignWrapper(aboutMd) + marginStr;
    }

    case 'skills':
    case 'languages': {
      let skillsMd = '';
      if (props.title) {
        skillsMd += `## ${props.title}\n\n`;
      }

      const list = props.skillsList || [];
      if (list.length === 0) return '';

      const isBadgeStyle = props.skillsTheme && (props.skillsTheme as string) !== 'simple';

      if (isBadgeStyle) {
        // shields.io badges or skillicons.dev
        const isSkillicons = props.skillsTheme === 'flat' || props.skillsTheme === 'flat-square';
        
        if (isSkillicons) {
          const themeStr = props.skillsTheme === 'flat-square' ? 'light' : 'dark';
          const iconUrl = `https://skillicons.dev/icons?i=${list.join(',')}&theme=${themeStr}`;
          skillsMd += `[![My Skills](${iconUrl})](https://skillicons.dev)`;
        } else {
          // Individual Shields.io badges
          const badges = list.map(skillId => {
            const skillObj = POPULAR_SKILLS.find(s => s.id === skillId);
            const label = skillObj ? skillObj.name : skillId;
            const logo = skillObj ? skillObj.logo : skillId;
            const color = skillObj ? skillObj.color : '6366f1';
            const style = props.skillsTheme || 'flat';
            return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=${style}&logo=${encodeURIComponent(logo)}&logoColor=white)`;
          });
          skillsMd += badges.join(' ');
        }
      } else {
        // Simple text-based tags
        skillsMd += list.map(skillId => {
          const skillObj = POPULAR_SKILLS.find(s => s.id === skillId);
          return `\`${skillObj ? skillObj.name : skillId}\``;
        }).join('  ');
      }

      skillsMd += '\n';
      return alignWrapper(skillsMd) + marginStr;
    }

    case 'stats': {
      let statsMd = '';
      if (props.title) {
        statsMd += `## ${props.title}\n\n`;
      }
      
      const theme = props.statsTheme || 'radical';
      const hideRank = props.hideRank ? 'true' : 'false';
      const hideParams = [
        !props.showCommits && 'commits',
        !props.showPRs && 'prs',
        !props.showStars && 'stars',
        !props.showIssues && 'issues',
        !props.showContribs && 'contribs',
      ].filter(Boolean).join(',');

      let statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&hide_rank=${hideRank}`;
      if (hideParams) {
        statsUrl += `&hide=${hideParams}`;
      }
      if (props.statsBgColor) statsUrl += `&bg_color=${props.statsBgColor.replace('#', '')}`;
      if (props.statsTextColor) statsUrl += `&text_color=${props.statsTextColor.replace('#', '')}`;
      if (props.statsTitleColor) statsUrl += `&title_color=${props.statsTitleColor.replace('#', '')}`;
      if (props.statsIconColor) statsUrl += `&icon_color=${props.statsIconColor.replace('#', '')}`;

      statsMd += `[![GitHub Stats](${statsUrl})](https://github.com/anuraghazra/github-readme-stats)`;
      
      return alignWrapper(statsMd) + marginStr;
    }

    case 'top_langs': {
      let langsMd = '';
      if (props.title) {
        langsMd += `## ${props.title}\n\n`;
      }
      const theme = props.statsTheme || 'radical';
      const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}`;
      
      langsMd += `[![Top Langs](${langsUrl})](https://github.com/anuraghazra/github-readme-stats)`;
      return alignWrapper(langsMd) + marginStr;
    }

    case 'visitor_badge': {
      let visitorMd = '';
      if (props.title) {
        visitorMd += `### ${props.title}\n\n`;
      }
      const label = encodeURIComponent(props.badgeLabel || 'Profile Views');
      const color = props.badgeColor || '007acc';
      const style = props.badgeStyle || 'flat-square';
      const badgeUrl = `https://komarev.com/normal-badge/?username=${username}&color=${color}&style=${style}&label=${label}`;
      
      visitorMd += `![Visitor Badge](${badgeUrl})`;
      return alignWrapper(visitorMd) + marginStr;
    }

    case 'github_followers': {
      const style = props.badgeStyle || 'social';
      const color = props.badgeColor || '121212';
      const followersMd = `![Followers](https://img.shields.io/github/followers/${username}?label=Followers&style=${style}&color=${color})`;
      return alignWrapper(followersMd) + marginStr;
    }

    case 'socials': {
      let socialMd = '';
      if (props.title) {
        socialMd += `## ${props.title}\n\n`;
      }
      const links = props.socialLinks || [];
      if (links.length === 0) return '';

      const items = links.map(link => {
        const platform = link.platform.toLowerCase();
        const user = link.username;
        const colorMap: Record<string, string> = {
          linkedin: '0077B5',
          twitter: '1DA1F2',
          medium: '121212',
          youtube: 'FF0000',
          instagram: 'E4405F',
          facebook: '1877F2',
          devto: '0A0A0A',
          stackoverflow: 'F48024',
          discord: '5865F2',
          twitch: '9146FF',
        };
        const color = colorMap[platform] || '121212';
        const urlMap: Record<string, string> = {
          linkedin: `https://linkedin.com/in/${user}`,
          twitter: `https://twitter.com/${user}`,
          medium: `https://medium.com/@${user}`,
          youtube: `https://youtube.com/@${user}`,
          instagram: `https://instagram.com/${user}`,
          facebook: `https://facebook.com/${user}`,
          devto: `https://dev.to/${user}`,
          stackoverflow: `https://stackoverflow.com/users/${user}`,
          discord: `https://discord.gg/${user}`,
          twitch: `https://twitch.tv/${user}`,
        };
        const targetUrl = link.url || urlMap[platform] || `https://${platform}.com/${user}`;
        const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(link.platform)}-${color}?style=for-the-badge&logo=${encodeURIComponent(platform)}&logoColor=white`;
        
        return `[![${link.platform}](${badgeUrl})](${targetUrl})`;
      });

      socialMd += items.join(' ');
      return alignWrapper(socialMd) + marginStr;
    }

    case 'buttons': {
      const buttons = props.customButtons || [];
      if (buttons.length === 0) return '';
      const items = buttons.map(btn => {
        const style = btn.style || 'flat';
        const color = (btn.color || '6366f1').replace('#', '');
        const text = encodeURIComponent(btn.text);
        const badgeUrl = `https://img.shields.io/badge/${text}-${color}?style=${style}`;
        return `[![${btn.text}](${badgeUrl})](${btn.url})`;
      });
      return alignWrapper(items.join(' ')) + marginStr;
    }

    case 'projects': {
      let pMd = '';
      if (props.title) {
        pMd += `## ${props.title}\n\n`;
      }
      const items = props.items || [];
      items.forEach(item => {
        pMd += `### [${item.title}](${item.link || '#'})`;
        if (item.subtitle) {
          pMd += ` — *${item.subtitle}*\n`;
        } else {
          pMd += `\n`;
        }
        if (item.description) {
          pMd += `${item.description}\n`;
        }
        pMd += `\n`;
      });
      return alignWrapper(pMd) + marginStr;
    }

    case 'experience':
    case 'education':
    case 'timeline': {
      let expMd = '';
      if (props.title) {
        expMd += `## ${props.title}\n\n`;
      }
      const items = props.items || [];
      items.forEach(item => {
        expMd += `#### ${item.title}\n`;
        if (item.subtitle || item.date) {
          expMd += `> **${item.subtitle || ''}** *(${item.date || ''})*\n\n`;
        }
        if (item.description) {
          expMd += `${item.description}\n\n`;
        }
      });
      return alignWrapper(expMd) + marginStr;
    }

    case 'markdown': {
      return (props.content || '') + marginStr;
    }

    case 'code_block': {
      let codeMd = '';
      if (props.title) {
        codeMd += `## ${props.title}\n\n`;
      }
      const lang = props.language || 'typescript';
      codeMd += `\`\`\`${lang}\n${props.content || ''}\n\`\`\``;
      return alignWrapper(codeMd) + marginStr;
    }

    case 'html_block': {
      return (props.content || '') + marginStr;
    }

    case 'quote': {
      let qMd = '';
      if (props.content) {
        qMd += `> ${props.content}\n`;
        if (props.subtitle) {
          qMd += `> — *${props.subtitle}*\n`;
        }
      }
      return qMd + marginStr;
    }

    case 'callout': {
      const type = props.calloutType || 'tip';
      const typeHeader = type.toUpperCase();
      const contentText = props.content || '';
      
      // Modern GitHub admonitions format: > [!NOTE] or > [!TIP] or > [!WARNING]
      let calloutMd = `> [!${typeHeader}]\n`;
      if (props.title) {
        calloutMd += `> **${props.title}**\n`;
      }
      calloutMd += `> ${contentText.split('\n').join('\n> ')}`;
      return calloutMd + marginStr;
    }

    case 'separator': {
      return '\n---\n';
    }

    case 'image':
    case 'gif': {
      if (!props.imageUrl) return '';
      const width = props.imageWidth ? ` width="${props.imageWidth}"` : '';
      const height = props.imageHeight ? ` height="${props.imageHeight}"` : '';
      const caption = props.imageCaption ? `\n\n*${props.imageCaption}*` : '';
      const imgMd = `<img src="${props.imageUrl}"${width}${height} alt="Image" style="border-radius: 8px; max-width:100%;" />${caption}`;
      return alignWrapper(imgMd) + marginStr;
    }

    case 'youtube': {
      if (!props.embedId) return '';
      const id = props.embedId;
      const title = props.title || 'YouTube Video';
      const ytUrl = `https://www.youtube.com/watch?v=${id}`;
      const imgUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      const ytMd = `[![${title}](${imgUrl})](${ytUrl})`;
      return alignWrapper(ytMd) + marginStr;
    }

    case 'spotify': {
      let spotMd = '';
      if (props.title) {
        spotMd += `## ${props.title}\n\n`;
      }
      // novatorem.vercel.app or generic spotify card link
      const spotUrl = `https://novatorem.vercel.app/api/spotify?background_color=0d1117&border_color=30363d&text_color=c9d1d9&theme=radical&username=${username}`;
      spotMd += `[![Spotify](${spotUrl})](https://open.spotify.com)`;
      return alignWrapper(spotMd) + marginStr;
    }

    case 'discord': {
      if (!props.embedId) return '';
      const dcUrl = `https://discord.com/api/guilds/${props.embedId}/embed.png?style=banner2`;
      const discordMd = `[![Discord Server](${dcUrl})](https://discord.gg)`;
      return alignWrapper(discordMd) + marginStr;
    }

    case 'footer': {
      const footText = props.content || 'Made with ProfileCraft';
      return alignWrapper(footText) + marginStr;
    }

    default:
      return '';
  }
}

export function generateFullMarkdown(blocks: Block[], username: string): string {
  return blocks
    .map(block => blockToMarkdown(block, username))
    .filter(Boolean)
    .join('\n');
}

export function markdownToHTML(markdown: string): string {
  // A clean, simple, light markdown parser that converts headers, blockquotes, code, tables, images, and links to HTML
  if (!markdown) return '';
  
  let html = markdown;

  // Escape HTML entities to prevent rendering issues while preserving existing tags
  // Replace triple code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)\n```/g, (_, lang, code) => {
    return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 font-mono text-xs overflow-x-auto"><div class="text-gray-500 mb-1 text-[10px] uppercase">${lang}</div><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });

  // Replace single backticks
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-800/80 px-1.5 py-0.5 rounded font-mono text-xs text-pink-400">$1</code>');

  // Admonitions / Callouts (GitHub format: > [!TIP])
  html = html.replace(/^> \[\!(\w+)\]\n([\s\S]*?)(?=\n\n|\n[^>])/gm, (_, type, body) => {
    const typeLower = type.toLowerCase();
    const colorMap: Record<string, string> = {
      note: 'border-blue-500 bg-blue-500/10 text-blue-200',
      tip: 'border-emerald-500 bg-emerald-500/10 text-emerald-200',
      warning: 'border-amber-500 bg-amber-500/10 text-amber-200',
      important: 'border-purple-500 bg-purple-500/10 text-purple-200',
      caution: 'border-red-500 bg-red-500/10 text-red-200',
    };
    const colors = colorMap[typeLower] || 'border-indigo-500 bg-indigo-500/10 text-indigo-200';
    const content = body.replace(/^> /gm, '');
    return `<div class="border-l-4 p-4 rounded-r-lg my-4 ${colors}"><strong>${type}</strong><p class="mt-1">${content}</p></div>`;
  });

  // Blockquotes
  html = html.replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-slate-700 pl-4 py-1 my-3 text-slate-400 italic">$1</blockquote>');

  // Headers (H1 - H6)
  html = html.replace(/^# (.*)$/gm, '<h1 class="text-3xl font-bold font-display border-b border-white/10 pb-2 mt-6 mb-4">$1</h1>');
  html = html.replace(/^## (.*)$/gm, '<h2 class="text-2xl font-semibold font-display border-b border-white/10 pb-2 mt-6 mb-4">$1</h2>');
  html = html.replace(/^### (.*)$/gm, '<h3 class="text-xl font-medium mt-5 mb-3">$1</h3>');
  html = html.replace(/^#### (.*)$/gm, '<h4 class="text-lg font-medium mt-4 mb-2">$1</h4>');

  // Div aligns
  html = html.replace(/<div align="center">([\s\S]*?)<\/div>/g, '<div class="text-center">$1</div>');
  html = html.replace(/<div align="right">([\s\S]*?)<\/div>/g, '<div class="text-right">$1</div>');

  // Hyperlinks with images (e.g. [![Alt](ImgUrl)](LinkUrl))
  html = html.replace(/\[\!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, '<a href="$3" target="_blank" rel="noopener noreferrer" class="inline-block hover:scale-[1.02] transition-transform"><img src="$2" alt="$1" class="inline-height" style="max-height: 180px; max-width: 100%;" referrerPolicy="no-referrer" /></a>');

  // Images
  html = html.replace(/\!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-md shadow my-2 inline" referrerPolicy="no-referrer" />');

  // Standard Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-400 hover:underline">$1</a>');

  // HTML images directly (like <img src="..." height="..."/>)
  html = html.replace(/<img([^>]+)>/g, (_, attrs) => {
    return `<img ${attrs} class="inline rounded" referrerPolicy="no-referrer" />`;
  });

  // Bullets
  html = html.replace(/^- (.*)$/gm, '<li class="list-disc ml-6 my-1">$1</li>');

  // Paragraphs (simple lines that are not headings, blockquotes, lists, pre blocks)
  // Clean up excessive double line breaks
  html = html.replace(/\n\n/g, '<br/>');

  return html;
}
