/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationSet {
  brand: string;
  slogan: string;
  exportMd: string;
  exportJson: string;
  importJson: string;
  importMd: string;
  copyMd: string;
  copied: string;
  copyHtml: string;
  undo: string;
  redo: string;
  clearAll: string;
  saveProject: string;
  saved: string;
  loadProject: string;
  deleteProject: string;
  themeSelector: string;
  components: string;
  templates: string;
  theme: string;
  badgeBuilder: string;
  userCenter: string;
  
  // Tabs & panels
  editorTitle: string;
  previewTitle: string;
  propertiesTitle: string;
  markdownCode: string;
  liveView: string;
  emptyEditorPlaceholder: string;
  
  // Right panel properties
  propTitle: string;
  propSubtitle: string;
  propAlign: string;
  propMargin: string;
  propPadding: string;
  propUser: string;
  propColor: string;
  propBadgeStyle: string;
  propBadgeLabel: string;
  propStatsTheme: string;
  propStatsOptions: string;
  propItems: string;
  addItem: string;
  removeItem: string;
  propContent: string;
  propLanguage: string;
  propCalloutType: string;
  propBannerUrl: string;
  propBannerHeight: string;
  propTypingLines: string;
  propImgUrl: string;
  propImgWidth: string;
  propImgHeight: string;

  // Categories
  catHeader: string;
  catBio: string;
  catSkills: string;
  catStats: string;
  catSocials: string;
  catMultimedia: string;
  catContent: string;
  catFooter: string;

  // Account
  login: string;
  logout: string;
  signUp: string;
  welcome: string;
  accountDesc: string;
  localProjects: string;
  cloudSync: string;
  createAccount: string;
  mockLoginBtn: string;
  userEmail: string;
  userName: string;

  // Extra helper text
  helpTitle: string;
  helpText: string;
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
  templatesCount: string;
  badgeCopied: string;
}

export const TRANSLATIONS: Record<'en' | 'fa', TranslationSet> = {
  en: {
    brand: 'ProfileCraft',
    slogan: 'The Most Advanced GitHub Profile README Builder',
    exportMd: 'Export README.md',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    importMd: 'Import MD',
    copyMd: 'Copy Markdown',
    copied: 'Copied!',
    copyHtml: 'Copy HTML',
    undo: 'Undo',
    redo: 'Redo',
    clearAll: 'Clear Board',
    saveProject: 'Save to Projects',
    saved: 'Project saved successfully!',
    loadProject: 'Load Project',
    deleteProject: 'Delete Project',
    themeSelector: 'Workspace Theme',
    components: 'Components',
    templates: 'Templates',
    theme: 'App Themes',
    badgeBuilder: 'Badge Builder',
    userCenter: 'Projects Hub',
    
    editorTitle: 'Visual Drag & Drop Board',
    previewTitle: 'Live GitHub Preview',
    propertiesTitle: 'Block Properties',
    markdownCode: 'Markdown Source',
    liveView: 'Live Preview',
    emptyEditorPlaceholder: 'Drag elements from the left panel or select a template to build your stunning README!',
    
    propTitle: 'Title Text',
    propSubtitle: 'Subtitle Text',
    propAlign: 'Text Alignment',
    propMargin: 'Vertical Margin (Y)',
    propPadding: 'Vertical Padding (Y)',
    propUser: 'GitHub Username',
    propColor: 'Accent Color Hex',
    propBadgeStyle: 'Badge Style',
    propBadgeLabel: 'Badge Custom Label',
    propStatsTheme: 'GitHub Stats Theme',
    propStatsOptions: 'Toggle Stats Counters',
    propItems: 'List / Card Items',
    addItem: 'Add New Item',
    removeItem: 'Remove',
    propContent: 'Block Content',
    propLanguage: 'Coding Language',
    propCalloutType: 'Callout Theme Style',
    propBannerUrl: 'Banner URL Link',
    propBannerHeight: 'Banner Height (px)',
    propTypingLines: 'Typing Lines (comma-separated)',
    propImgUrl: 'Image/GIF URL Link',
    propImgWidth: 'Width (px or %)',
    propImgHeight: 'Height (px or %)',

    catHeader: 'Headers & Banners',
    catBio: 'Bio & Introductions',
    catSkills: 'Skills & Tech Stack',
    catStats: 'GitHub Analytics',
    catSocials: 'Social Links & Buttons',
    catMultimedia: 'Multimedia Widgets',
    catContent: 'Content & Experiences',
    catFooter: 'Profile Footers',

    login: 'Log In',
    logout: 'Log Out',
    signUp: 'Sign Up',
    welcome: 'Welcome back',
    accountDesc: 'Create a local workspace profile to save, clone, and manage your custom GitHub README projects.',
    localProjects: 'Saved Projects',
    cloudSync: 'Simulated Cloud Auto-Sync',
    createAccount: 'Initialize Local Account',
    mockLoginBtn: 'Connect Workspace',
    userEmail: 'Workspace Email',
    userName: 'GitHub Username',

    helpTitle: 'How to deploy to your profile?',
    helpText: '1. Create a public repository on GitHub with the exact same name as your GitHub username.\n2. Initialize it with a README.md.\n3. Copy the generated Markdown from ProfileCraft and paste it into that README.md.\n4. Commit the changes and watch your profile come to life!',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    zoomReset: 'Reset Zoom',
    templatesCount: '100+ Ready-to-use Layout Patterns available',
    badgeCopied: 'Badge code copied to clipboard!',
  },
  fa: {
    brand: 'پروفایل‌کرافت (ProfileCraft)',
    slogan: 'پیشرفته‌ترین ابزار ساخت فایل خواندنی گیت‌هاب دسکتاپ',
    exportMd: 'خروجی README.md',
    exportJson: 'خروجی JSON',
    importJson: 'وارد کردن JSON',
    importMd: 'وارد کردن MD',
    copyMd: 'کپی مارک‌داون',
    copied: 'کپی شد!',
    copyHtml: 'کپی کد HTML',
    undo: 'لغو تغییر (Undo)',
    redo: 'انجام مجدد (Redo)',
    clearAll: 'پاکسازی صفحه',
    saveProject: 'ذخیره در پروژه‌ها',
    saved: 'پروژه با موفقیت ذخیره شد!',
    loadProject: 'بارگذاری پروژه',
    deleteProject: 'حذف پروژه',
    themeSelector: 'تم محیط کاربری',
    components: 'اجزا و ابزارها',
    templates: 'قالب‌های آماده',
    theme: 'تم‌های خروجی',
    badgeBuilder: 'نشان‌ساز پویا',
    userCenter: 'مرکز پروژه‌ها',
    
    editorTitle: 'بورد چیدمان تعاملی',
    previewTitle: 'پیش‌نمایش زنده گیت‌هاب',
    propertiesTitle: 'تنظیمات بلوک',
    markdownCode: 'کد مارک‌داون خروجی',
    liveView: 'پیش‌نمایش زنده',
    emptyEditorPlaceholder: 'برای شروع، اجزا را از منوی سمت چپ بکشید و رها کنید یا از زبانه قالب‌ها یک الگوی آماده انتخاب کنید!',
    
    propTitle: 'متن عنوان',
    propSubtitle: 'متن زیرعنوان',
    propAlign: 'چینش متن',
    propMargin: 'حاشیه عمودی (Y)',
    propPadding: 'فاصله داخلی عمودی (Y)',
    propUser: 'نام کاربری گیت‌هاب',
    propColor: 'کد رنگ هگز',
    propBadgeStyle: 'استایل نشان',
    propBadgeLabel: 'برچسب دلخواه نشان',
    propStatsTheme: 'تم کارت آمار',
    propStatsOptions: 'نمایش فیلدهای آماری',
    propItems: 'آیتم‌های لیست / کارت',
    addItem: 'افزودن آیتم جدید',
    removeItem: 'حذف',
    propContent: 'محتوای بلوک',
    propLanguage: 'زبان برنامه‌نویسی',
    propCalloutType: 'استایل کادر کادربندی',
    propBannerUrl: 'لینک تصویر بنر',
    propBannerHeight: 'ارتفاع بنر (پیکسل)',
    propTypingLines: 'خطوط متحرک (جدا شده با کاما)',
    propImgUrl: 'آدرس لینک تصویر یا گیف',
    propImgWidth: 'عرض تصویر (پیکسل یا درصد)',
    propImgHeight: 'ارتفاع تصویر (پیکسل یا درصد)',

    catHeader: 'سربرگ‌ها و بنرها',
    catBio: 'درباره من و بیوگرافی',
    catSkills: 'مهارت‌ها و فناوری‌ها',
    catStats: 'آمارهای پیشرفته گیت‌هاب',
    catSocials: 'شبکه‌های اجتماعی و دکمه‌ها',
    catMultimedia: 'رسانه‌ها و ویجت‌ها',
    catContent: 'محتوا، تجربیات و پروژه‌ها',
    catFooter: 'پاورقی‌های آماده',

    login: 'ورود به سیستم',
    logout: 'خروج',
    signUp: 'ثبت نام',
    welcome: 'خوش آمدید',
    accountDesc: 'یک حساب کاربری محلی برای ذخیره، شبیه‌سازی و مدیریت پروژه‌های شخصی گیت‌هاب بسازید.',
    localProjects: 'پروژه‌های ذخیره‌شده',
    cloudSync: 'همگام‌سازی ابری فرضی',
    createAccount: 'راه‌اندازی حساب کاربری محلی',
    mockLoginBtn: 'اتصال به فضای ابری',
    userEmail: 'ایمیل فضای کاری',
    userName: 'نام کاربری گیت‌هاب',

    helpTitle: 'چگونه این فایل را روی پروفایل گیت‌هاب قرار دهیم؟',
    helpText: '۱. یک مخزن عمومی (Public) در گیت‌هاب دقیقاً هم‌نام با نام کاربری خود بسازید.\n۲. آن را با یک فایل README.md آغاز کنید.\n۳. کد مارک‌داون خروجی را از ProfileCraft کپی کرده و داخل این فایل گیت‌هاب جایگذاری کنید.\n۴. تغییرات را کامیت کنید تا پروفایل جذاب شما زنده شود!',
    zoomIn: 'بزرگنمایی',
    zoomOut: 'کوچکنمایی',
    zoomReset: 'بازنشانی زوم',
    templatesCount: 'بیش از ۱۰۰ الگوی طراحی و چیدمان آماده برای شروع سریع',
    badgeCopied: 'کد مارک‌داون نشان کپی شد!',
  }
};
