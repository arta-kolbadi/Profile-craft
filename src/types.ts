/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BlockType =
  | 'header'
  | 'banner'
  | 'typing'
  | 'about'
  | 'skills'
  | 'languages'
  | 'stats'
  | 'top_langs'
  | 'visitor_badge'
  | 'github_followers'
  | 'projects'
  | 'timeline'
  | 'experience'
  | 'education'
  | 'socials'
  | 'buttons'
  | 'image'
  | 'gif'
  | 'badge_builder'
  | 'markdown'
  | 'html_block'
  | 'code_block'
  | 'table'
  | 'list'
  | 'quote'
  | 'callout'
  | 'separator'
  | 'youtube'
  | 'spotify'
  | 'discord'
  | 'contact'
  | 'footer';

export interface Block {
  id: string;
  type: BlockType;
  visible: boolean;
  props: {
    title?: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    paddingY?: number; // rem-like or px multiplier
    marginY?: number;
    // Theme overridable properties
    color?: string;
    textColor?: string;
    bgColor?: string;
    bgGradient?: string;
    borderRadius?: string;
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    animation?: 'none' | 'fade' | 'slide' | 'bounce' | 'scale';
    
    // Header & BannerSpecific
    bannerUrl?: string;
    bannerHeight?: number;
    capsuleText?: string;
    capsuleTheme?: string;
    
    // Typing SVG Specific
    typingLines?: string[];
    typingSpeed?: number;
    typingColor?: string;

    // About Me Specific
    aboutText?: string;
    workText?: string;
    learningText?: string;
    collabText?: string;
    funFactText?: string;

    // Skills & Languages Specific
    skillsList?: string[]; // strings or ids
    skillsTheme?: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic' | 'social';
    skillsColor?: string;

    // Stats Specific
    githubUser?: string;
    showStats?: boolean;
    showCommits?: boolean;
    showPRs?: boolean;
    showStars?: boolean;
    showIssues?: boolean;
    showContribs?: boolean;
    statsTheme?: string;
    statsBgColor?: string;
    statsTextColor?: string;
    statsTitleColor?: string;
    statsIconColor?: string;
    hideRank?: boolean;

    // Pinned Repos Specific
    reposCount?: number;
    reposList?: string[];

    // Visitor badge / Followers
    badgeStyle?: string;
    badgeColor?: string;
    badgeLabel?: string;

    // Social Links & Buttons
    socialLinks?: { platform: string; username: string; url?: string }[];
    customButtons?: { text: string; url: string; style: string; color: string }[];

    // Projects, Timeline, Experience, Education
    items?: {
      id: string;
      title: string;
      subtitle?: string;
      description?: string;
      date?: string;
      link?: string;
      image?: string;
    }[];

    // Generic Rich Text blocks (Markdown, Code, HTML, Quote, Callout)
    content?: string;
    language?: string; // for code block
    calloutType?: 'info' | 'warning' | 'success' | 'danger' | 'tip';

    // Multimedia
    embedId?: string; // YouTube ID or Spotify ID or Discord Server ID
    imageUrl?: string;
    imageWidth?: string;
    imageHeight?: string;
    imageCaption?: string;

    // Table
    headers?: string[];
    rows?: string[][];

    // Lists
    listStyle?: 'disc' | 'decimal' | 'check';
    listItems?: string[];
  };
}

export interface AppTheme {
  id: string;
  name: string;
  nameFa: string;
  class: string;
  previewBg: string;
  previewText: string;
  previewAccent: string;
  // Style properties
  bg: string;
  card: string;
  text: string;
  textMuted: string;
  accent: string;
  border: string;
  button: string;
  buttonText: string;
  shadow: string;
  glow: string;
}

export interface READMEProject {
  id: string;
  name: string;
  blocks: Block[];
  themeId: string;
  lang: 'en' | 'fa';
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  nameFa: string;
  description: string;
  descriptionFa: string;
  category: string;
  categoryFa: string;
  blocks: Block[];
  themeId: string;
}

export interface UserAccount {
  email: string;
  username: string;
  isLoggedIn: boolean;
}
