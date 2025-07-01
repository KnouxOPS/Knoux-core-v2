"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { toast, Toaster } from "@/components/ui/sonner"
import {
  FaMagic,
  FaLanguage,
  FaRobot,
  FaCopy,
  FaCheck,
  FaMoon,
  FaSun,
  FaCode,
  FaGithub,
  FaTwitter,
  FaRegLightbulb,
  FaRegEye,
  FaRegClock,
  FaRegStar,
  FaRegQuestionCircle,
  FaRegKeyboard,
  FaRegFileCode,
  FaRegCommentDots,
  FaRegUserCircle,
  FaRegBell,
  FaRegHeart,
  FaTrashAlt,
  FaBookmark,
  FaBookmark as FaBookmarkSolid,
  FaDownload,
  FaUpload,
  FaShare,
  FaExclamationTriangle,
  FaLock,
  FaUnlock,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
  FaCodeBranch,
  FaExchangeAlt,
  FaTag,
  FaPlus,
  FaMinus,
  FaEllipsisH,
  FaPalette,
  FaFont,
  FaCog,
  FaSearch,
  FaPlay,
  FaStop,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaInfoCircle,
  FaBug,
  FaWrench,
  FaTerminal,
  FaDatabase,
  FaTable,
  FaChartBar,
  FaRegClipboard,
  FaRegSave,
  FaRegEdit,
  FaRegTrashAlt,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion"
import { useHotkeys } from "react-hotkeys-hook"
import confetti from "canvas-confetti"
import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-ruby"
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-php"
import "prismjs/components/prism-swift"
import "prismjs/components/prism-kotlin"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-powershell"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-json"
import "prismjs/components/prism-graphql"
import "prismjs/components/prism-regex"
import "prismjs/components/prism-dart"
import "prismjs/components/prism-scala"
import "prismjs/components/prism-haskell"
import "prismjs/components/prism-lua"
import "prismjs/components/prism-r"
import "prismjs/components/prism-matlab"
import "prismjs/components/prism-perl"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.js"
import "prismjs/plugins/line-highlight/prism-line-highlight.css"
import "prismjs/plugins/line-highlight/prism-line-highlight.js"
import "prismjs/plugins/toolbar/prism-toolbar.css"
import "prismjs/plugins/toolbar/prism-toolbar.js"
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js"
import "prismjs/plugins/show-language/prism-show-language.js"

// النوع الخاص بعناصر السجل
type HistoryItem = {
  id: string
  code: string
  output: string
  language: string
  date: string
  favorite?: boolean
  tags?: string[]
  notes?: string
  executionTime?: number
  codeSize?: number
  complexity?: 'simple' | 'medium' | 'complex'
}

// النوع الخاص بالمستخدم
type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'free' | 'premium' | 'admin'
  preferences: {
    theme: 'dark' | 'light' | 'system'
    fontSize: number
    fontFamily: string
    autoSave: boolean
    notifications: boolean
    telemetry: boolean
    experimentalFeatures: boolean
    codeCompletion: boolean
    lineNumbers: boolean
    wordWrap: boolean
    tabSize: number
    indentWithTabs: boolean
    language: 'ar' | 'en'
  }
}

// النوع الخاص بالمشروع
type Project = {
  id: string
  name: string
  description?: string
  files: {
    id: string
    name: string
    content: string
    language: string
    lastModified: string
  }[]
  createdAt: string
  updatedAt: string
  isPublic: boolean
  collaborators?: string[]
  tags?: string[]
}

// النوع الخاص بالإعدادات
type Settings = {
  theme: 'dark' | 'light' | 'system'
  fontSize: number
  fontFamily: string
  autoSave: boolean
  notifications: boolean
  telemetry: boolean
  experimentalFeatures: boolean
  codeCompletion: boolean
  lineNumbers: boolean
  wordWrap: boolean
  tabSize: number
  indentWithTabs: boolean
  language: 'ar' | 'en'
  customThemes: {
    id: string
    name: string
    colors: {
      background: string
      foreground: string
      primary: string
      secondary: string
      accent: string
      border: string
      muted: string
    }
  }[]
}

// النوع الخاص بالإشعارات
type Notification = {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  date: string
  action?: {
    label: string
    url: string
  }
}

// النوع الخاص بالإحصائيات
type Statistics = {
  codeEnhanced: number
  favoriteCode: number
  projectsCreated: number
  totalCharacters: number
  languagesUsed: Record<string, number>
  timeSpent: number
  lastActive: string
}

// لغات البرمجة المدعومة
const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: 'js' },
  { id: 'typescript', name: 'TypeScript', icon: 'ts' },
  { id: 'python', name: 'Python', icon: 'py' },
  { id: 'java', name: 'Java', icon: 'java' },
  { id: 'csharp', name: 'C#', icon: 'cs' },
  { id: 'cpp', name: 'C++', icon: 'cpp' },
  { id: 'php', name: 'PHP', icon: 'php' },
  { id: 'ruby', name: 'Ruby', icon: 'rb' },
  { id: 'go', name: 'Go', icon: 'go' },
  { id: 'rust', name: 'Rust', icon: 'rs' },
  { id: 'swift', name: 'Swift', icon: 'swift' },
  { id: 'kotlin', name: 'Kotlin', icon: 'kt' },
  { id: 'dart', name: 'Dart', icon: 'dart' },
  { id: 'html', name: 'HTML', icon: 'html' },
  { id: 'css', name: 'CSS', icon: 'css' },
  { id: 'sql', name: 'SQL', icon: 'sql' },
  { id: 'bash', name: 'Bash', icon: 'sh' },
  { id: 'powershell', name: 'PowerShell', icon: 'ps1' },
  { id: 'markdown', name: 'Markdown', icon: 'md' },
  { id: 'yaml', name: 'YAML', icon: 'yaml' },
  { id: 'json', name: 'JSON', icon: 'json' },
  { id: 'graphql', name: 'GraphQL', icon: 'gql' },
  { id: 'regex', name: 'RegEx', icon: 'regex' },
  { id: 'scala', name: 'Scala', icon: 'scala' },
  { id: 'haskell', name: 'Haskell', icon: 'hs' },
  { id: 'lua', name: 'Lua', icon: 'lua' },
  { id: 'r', name: 'R', icon: 'r' },
  { id: 'matlab', name: 'MATLAB', icon: 'matlab' },
  { id: 'perl', name: 'Perl', icon: 'pl' },
  { id: 'objectivec', name: 'Objective-C', icon: 'm' },
]

// أنماط الترميز المدعومة
const CODE_THEMES = [
  { id: 'okaidia', name: 'Okaidia (Default)' },
  { id: 'tomorrow', name: 'Tomorrow Night' },
  { id: 'solarized', name: 'Solarized Dark' },
  { id: 'dracula', name: 'Dracula' },
  { id: 'nord', name: 'Nord' },
  { id: 'material', name: 'Material' },
  { id: 'one-dark', name: 'One Dark' },
  { id: 'github', name: 'GitHub Light' },
  { id: 'vs', name: 'Visual Studio' },
  { id: 'xcode', name: 'Xcode' },
]

// إنشاء معرف فريد
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// تنسيق الكود حسب اللغة
const formatCode = (code: string, language: string) => {
  try {
    // هنا يمكن استخدام مكتبات تنسيق الكود مثل prettier
    return code
  } catch (error) {
    console.error('Error formatting code:', error)
    return code
  }
}

// تحليل تعقيد الكود
const analyzeCodeComplexity = (code: string): 'simple' | 'medium' | 'complex' => {
  const lines = code.split('\n').length
  const characters = code.length
  const functions = (code.match(/function/g) || []).length
  const classes = (code.match(/class/g) || []).length
  const loops = (code.match(/for|while|do/g) || []).length
  const conditionals = (code.match(/if|else|switch|case/g) || []).length

  const score = lines * 0.1 + characters * 0.01 + functions * 2 + classes * 3 + loops * 2 + conditionals * 1.5

  if (score < 20) return 'simple'
  if (score < 50) return 'medium'
  return 'complex'
}

// تقدير وقت التنفيذ
const estimateExecutionTime = (code: string, language: string): number => {
  const complexity = analyzeCodeComplexity(code)
  const baseTime = 100 // بالمللي ثانية

  switch (complexity) {
    case 'simple':
      return baseTime
    case 'medium':
      return baseTime * 3
    case 'complex':
      return baseTime * 10
    default:
      return baseTime
  }
}

export default function Home() {
  // حالة المحرر الأساسية
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [codeAnalysis, setCodeAnalysis] = useState<{
    complexity: 'simple' | 'medium' | 'complex'
    suggestions: string[]
    warnings: string[]
    performance: 'good' | 'moderate' | 'poor'
  } | null>(null)

  // حالة الواجهة
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")
  const [fontSize, setFontSize] = useState(15)
  const [fontFamily, setFontFamily] = useState("'Fira Mono', 'Cascadia Code', 'Consolas', 'monospace'")
  const [codeTheme, setCodeTheme] = useState("okaidia")
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [wordWrap, setWordWrap] = useState(true)
  const [tabSize, setTabSize] = useState(2)
  const [indentWithTabs, setIndentWithTabs] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [experimentalFeatures, setExperimentalFeatures] = useState(false)
  const [codeCompletion, setCodeCompletion] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [telemetry, setTelemetry] = useState(true)

  // حالة النوافذ المنبثقة
  const [showHistory, setShowHistory] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showCodeAnalysis, setShowCodeAnalysis] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [showLanguages, setShowLanguages] = useState(false)
  const [showThemes, setShowThemes] = useState(false)
  const [showExtensions, setShowExtensions] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  // حالة البيانات
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [notificationsList, setNotificationsList] = useState<Notification[]>([])
  const [statistics, setStatistics] = useState<Statistics>({
    codeEnhanced: 0,
    favoriteCode: 0,
    projectsCreated: 0,
    totalCharacters: 0,
    languagesUsed: {},
    timeSpent: 0,
    lastActive: new Date().toISOString()
  })
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // المراجع
  const outputRef = useRef<HTMLPreElement>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const sessionStartRef = useRef<number>(Date.now())

  // المفضلة
  const favorites = useMemo(() => history.filter((h) => h.favorite), [history])

  // تحميل البيانات من التخزين المحلي
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(true)
      try {
        // تحميل الإعدادات
        const t = localStorage.getItem("knoux-theme")
        if (t === "dark" || t === "light" || t === "system") setTheme(t)
        
        const fs = localStorage.getItem("knoux-fontSize")
        if (fs) setFontSize(Number(fs))
        
        const ff = localStorage.getItem("knoux-fontFamily")
        if (ff) setFontFamily(ff)
        
        const ct = localStorage.getItem("knoux-codeTheme")
        if (ct) setCodeTheme(ct)
        
        const ln = localStorage.getItem("knoux-lineNumbers")
        if (ln) setShowLineNumbers(ln === "true")
        
        const ww = localStorage.getItem("knoux-wordWrap")
        if (ww) setWordWrap(ww === "true")
        
        const ts = localStorage.getItem("knoux-tabSize")
        if (ts) setTabSize(Number(ts))
        
        const iwt = localStorage.getItem("knoux-indentWithTabs")
        if (iwt) setIndentWithTabs(iwt === "true")
        
        const as = localStorage.getItem("knoux-autoSave")
        if (as) setAutoSave(as === "true")
        
        const lang = localStorage.getItem("knoux-language")
        if (lang === "ar" || lang === "en") setLanguage(lang)
        
        const ef = localStorage.getItem("knoux-experimentalFeatures")
        if (ef) setExperimentalFeatures(ef === "true")
        
        const cc = localStorage.getItem("knoux-codeCompletion")
        if (cc) setCodeCompletion(cc === "true")
        
        const notif = localStorage.getItem("knoux-notifications")
        if (notif) setNotifications(notif === "true")
        
        const tel = localStorage.getItem("knoux-telemetry")
        if (tel) setTelemetry(tel === "true")

        // تحميل البيانات
        const h = localStorage.getItem("knoux-history")
        if (h) setHistory(JSON.parse(h))
        
        const p = localStorage.getItem("knoux-projects")
        if (p) setProjects(JSON.parse(p))
        
        const cp = localStorage.getItem("knoux-currentProject")
        if (cp) setCurrentProject(JSON.parse(cp))
        
        const nl = localStorage.getItem("knoux-notifications-list")
        if (nl) setNotificationsList(JSON.parse(nl))
        
        const stats = localStorage.getItem("knoux-statistics")
        if (stats) setStatistics(JSON.parse(stats))
        
        const u = localStorage.getItem("knoux-user")
        if (u) {
          setUser(JSON.parse(u))
          setIsAuthenticated(true)
        }

        // إظهار نافذة الترحيب للمستخدمين الجدد
        const welcomed = localStorage.getItem("knoux-welcomed")
        if (!welcomed) {
          setShowWelcome(true)
          localStorage.setItem("knoux-welcomed", "true")
        }

        // تحديث وقت آخر نشاط
        setStatistics(prev => ({
          ...prev,
          lastActive: new Date().toISOString()
        }))

        // إضافة إشعار ترحيب للمستخدمين الجدد
        if (!welcomed) {
          const welcomeNotification: Notification = {
            id: generateId(),
            title: "مرحباً بك في Knoux-IO!",
            message: "شكراً لاستخدامك محرر الأكواد الذكي Knoux-IO. استكشف المميزات الرائعة واستمتع بتجربة برمجية فريدة!",
            type: "info",
            read: false,
            date: new Date().toISOString(),
            action: {
              label: "استكشاف",
              url: "#features"
            }
          }
          setNotificationsList(prev => [welcomeNotification, ...prev])
        }
      } catch (err) {
        console.error("Error loading data from localStorage:", err)
        setError("حدث خطأ أثناء تحميل البيانات. يرجى تحديث الصفحة.")
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  // حفظ البيانات في التخزين المحلي
  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      // حفظ الإعدادات
      localStorage.setItem("knoux-theme", theme)
      localStorage.setItem("knoux-fontSize", String(fontSize))
      localStorage.setItem("knoux-fontFamily", fontFamily)
      localStorage.setItem("knoux-codeTheme", codeTheme)
      localStorage.setItem("knoux-lineNumbers", String(showLineNumbers))
      localStorage.setItem("knoux-wordWrap", String(wordWrap))
      localStorage.setItem("knoux-tabSize", String(tabSize))
      localStorage.setItem("knoux-indentWithTabs", String(indentWithTabs))
      localStorage.setItem("knoux-autoSave", String(autoSave))
      localStorage.setItem("knoux-language", language)
      localStorage.setItem("knoux-experimentalFeatures", String(experimentalFeatures))
      localStorage.setItem("knoux-codeCompletion", String(codeCompletion))
      localStorage.setItem("knoux-notifications", String(notifications))
      localStorage.setItem("knoux-telemetry", String(telemetry))

      // حفظ البيانات
      localStorage.setItem("knoux-history", JSON.stringify(history))
      localStorage.setItem("knoux-projects", JSON.stringify(projects))
      localStorage.setItem("knoux-currentProject", JSON.stringify(currentProject))
      localStorage.setItem("knoux-notifications-list", JSON.stringify(notificationsList))
      localStorage.setItem("knoux-statistics", JSON.stringify(statistics))
      if (user) localStorage.setItem("knoux-user", JSON.stringify(user))
    }
  }, [
    theme, fontSize, fontFamily, codeTheme, showLineNumbers, wordWrap, tabSize, indentWithTabs,
    autoSave, language, experimentalFeatures, codeCompletion, notifications, telemetry,
    history, projects, currentProject, notificationsList, statistics, user, isLoading
  ])

  // تحديث إحصائيات وقت الاستخدام
  useEffect(() => {
    const updateTimeSpent = () => {
      const now = Date.now()
      const timeSpent = Math.floor((now - sessionStartRef.current) / 1000)
      setStatistics(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + timeSpent,
        lastActive: new Date().toISOString()
      }))
      sessionStartRef.current = now
    }

    const interval = setInterval(updateTimeSpent, 60000) // تحديث كل دقيقة
    
    // تحديث عند إغلاق النافذة
    const handleBeforeUnload = () => {
      updateTimeSpent()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      updateTimeSpent()
    }
  }, [])

  // تهيئة Prism.js لتنسيق الكود
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [output, showHistory, showFavorites])

  // اختصارات لوحة المفاتيح
  useHotkeys('ctrl+enter', () => {
    if (!isProcessing && code) handleCodeEdit()
  }, { enableOnFormTags: true })

  useHotkeys('ctrl+shift+h', () => {
    setShowHistory(prev => !prev)
  })

  useHotkeys('ctrl+shift+k', () => {
    setShowShortcuts(prev => !prev)
  })

  useHotkeys('ctrl+l', () => {
    toggleTheme()
  })

  useHotkeys('ctrl+shift+c', () => {
    handleCopy()
  })

  useHotkeys('ctrl+shift+f', () => {
    setShowFavorites(prev => !prev)
  })

  useHotkeys('ctrl+shift+s', () => {
    setShowSettings(prev => !prev)
  })

  useHotkeys('ctrl+shift+p', () => {
    setShowProjects(prev => !prev)
  })

  useHotkeys('ctrl+shift+n', () => {
    setShowNotifications(prev => !prev)
  })

  useHotkeys('ctrl+shift+a', () => {
    setShowCodeAnalysis(prev => !prev)
  })

  useHotkeys('ctrl+shift+e', () => {
    setShowExport(prev => !prev)
  })

  useHotkeys('ctrl+shift+i', () => {
    setShowImport(prev => !prev)
  })

  useHotkeys('ctrl+shift+x', () => {
    setShowShare(prev => !prev)
  })

  useHotkeys('f1', () => {
    setShowHelp(prev => !prev)
  })

  useHotkeys('ctrl+shift+d', () => {
    setShowStatistics(prev => !prev)
  })

  useHotkeys('ctrl+shift+l', () => {
    setShowLanguages(prev => !prev)
  })

  useHotkeys('ctrl+shift+t', () => {
    setShowThemes(prev => !prev)
  })

  useHotkeys('ctrl+shift+m', () => {
    setShowExtensions(prev => !prev)
  })

  useHotkeys('ctrl+shift+b', () => {
    setShowFeedback(prev => !prev)
  })

  useHotkeys('ctrl+shift+o', () => {
    setShowAbout(prev => !prev)
  })

  // أمثلة مخصصة باسم Knoux-IO
  const examples = {
    ar: `// كود جافاسكريبت مقدم من Knoux-IO
function اجمع(a, b) {
  return a + b;
}

// مثال على استخدام الدالة
console.log(اجمع(5, 10)); // النتيجة: 15

// دالة متقدمة للتعامل مع المصفوفات
function اجمعالمصفوفة(مصفوفة) {
  return مصفوفة.reduce((المجموع, العنصر) => المجموع + العنصر, 0);
}

// مثال على استخدام دالة المصفوفة
const أرقام = [1, 2, 3, 4, 5];
console.log(اجمعالمصفوفة(أرقام)); // النتيجة: 15`,
    en: `// JavaScript code by Knoux-IO
function sum(a, b) {
  return a + b;
}

// Example usage
console.log(sum(5, 10)); // Result: 15

// Advanced function for array operations
function sumArray(array) {
  return array.reduce((total, element) => total + element, 0);
}

// Example with array function
const numbers = [1, 2, 3, 4, 5];
console.log(sumArray(numbers)); // Result: 15`,
    py: `# Python Example by Knoux-IO
def add(a, b):
    """
    Add two numbers and return the result.
    
    Args:
        a: First number
        b: Second number
        
    Returns:
        Sum of a and b
    """
    return a + b

# Example usage
print(add(5, 10))  # Result: 15

# Advanced function for list operations
def sum_list(numbers):
    """Sum all numbers in a list."""
    return sum(numbers)

# Example with list function
numbers = [1, 2, 3, 4, 5]
print(sum_list(numbers))  # Result: 15`,
    cpp: `// C++ Example by Knoux-IO
#include <iostream>
#include <vector>
#include <numeric>

// Function to add two numbers
int sum(int a, int b) {
  return a + b;
}

// Advanced function for vector operations
int sumVector(const std::vector<int>& numbers) {
  return std::accumulate(numbers.begin(), numbers.end(), 0);
}

int main() {
  // Example usage
  std::cout << sum(5, 10) << std::endl;  // Result: 15
  
  // Example with vector function
  std::vector<int> numbers = {1, 2, 3, 4, 5};
  std::cout << sumVector(numbers) << std::endl;  // Result: 15
  
  return 0;
}`,
    java: `// Java Example by Knoux-IO
import java.util.Arrays;
import java.util.List;

public class Example {
    // Function to add two numbers
    public static int sum(int a, int b) {
        return a + b;
    }
    
    // Advanced function for list operations
    public static int sumList(List<Integer> numbers) {
        return numbers.stream().mapToInt(Integer::intValue).sum();
    }
    
    public static void main(String[] args) {
        // Example usage
        System.out.println(sum(5, 10));  // Result: 15
        
        // Example with list function
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println(sumList(numbers));  // Result: 15
    }
}`,
    csharp: `// C# Example by Knoux-IO
using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    // Function to add two numbers
    static int Sum(int a, int b) {
        return a + b;
    }
    
    // Advanced function for list operations
    static int SumList(List<int> numbers) {
        return numbers.Sum();
    }
    
    static void Main() {
        // Example usage
        Console.WriteLine(Sum(5, 10));  // Result: 15
        
        // Example with list function
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        Console.WriteLine(SumList(numbers));  // Result: 15
    }
}`,
    go: `// Go Example by Knoux-IO
package main

import (
    "fmt"
)

// Function to add two numbers
func sum(a, b int) int {
    return a + b
}

// Advanced function for slice operations
func sumSlice(numbers []int) int {
    total := 0
    for _, num := range numbers {
        total += num
    }
    return total
}

func main() {
    // Example usage
    fmt.Println(sum(5, 10))  // Result: 15
    
    // Example with slice function
    numbers := []int{1, 2, 3, 4, 5}
    fmt.Println(sumSlice(numbers))  // Result: 15
}`,
    rust: `// Rust Example by Knoux-IO
fn sum(a: i32, b: i32) -> i32 {
    a + b
}

// Advanced function for vector operations
fn sum_vector(numbers: &Vec<i32>) -> i32 {
    numbers.iter().sum()
}

fn main() {
    // Example usage
    println!("{}", sum(5, 10));  // Result: 15
    
    // Example with vector function
    let numbers = vec![1, 2, 3, 4, 5];
    println!("{}", sum_vector(&numbers));  // Result: 15
}`,
    swift: `// Swift Example by Knoux-IO
// Function to add two numbers
func sum(_ a: Int, _ b: Int) -> Int {
    return a + b
}

// Advanced function for array operations
func sumArray(_ numbers: [Int]) -> Int {
    return numbers.reduce(0, +)
}

// Example usage
print(sum(5, 10))  // Result: 15

// Example with array function
let numbers = [1, 2, 3, 4, 5]
print(sumArray(numbers))  // Result: 15`,
    kotlin: `// Kotlin Example by Knoux-IO
// Function to add two numbers
fun sum(a: Int, b: Int): Int {
    return a + b
}

// Advanced function for list operations
fun sumList(numbers: List<Int>): Int {
    return numbers.sum()
}

fun main() {
    // Example usage
    println(sum(5, 10))  // Result: 15
    
    // Example with list function
    val numbers = listOf(1, 2, 3, 4, 5)
    println(sumList(numbers))  // Result: 15
}`,
  }

  // اختصارات لوحة المفاتيح
  const shortcuts = [
    { key: "Ctrl + Enter", desc: "تحسين الكود" },
    { key: "Ctrl + Shift + H", desc: "عرض/إخفاء السجل" },
    { key: "Ctrl + Shift + K", desc: "عرض/إخفاء الاختصارات" },
    { key: "Ctrl + L", desc: "تبديل الوضع الليلي/الفاتح" },
    { key: "Ctrl + Shift + C", desc: "نسخ الكود المحسن" },
    { key: "Ctrl + Shift + F", desc: "عرض/إخفاء المفضلة" },
    { key: "Ctrl + Shift + S", desc: "إعدادات متقدمة" },
    { key: "Ctrl + Shift + P", desc: "إدارة المشاريع" },
    { key: "Ctrl + Shift + N", desc: "عرض الإشعارات" },
    { key: "Ctrl + Shift + A", desc: "تحليل الكود" },
    { key: "Ctrl + Shift + E", desc: "تصدير الكود" },
    { key: "Ctrl + Shift + I", desc: "استيراد الكود" },
    { key: "Ctrl + Shift + X", desc: "مشاركة الكود" },
    { key: "F1", desc: "عرض المساعدة" },
    { key: "Ctrl + Shift + D", desc: "عرض الإحصائيات" },
    { key: "Ctrl + Shift + L", desc: "تغيير لغة البرمجة" },
    { key: "Ctrl + Shift + T", desc: "تغيير سمة المحرر" },
    { key: "Ctrl + Shift + M", desc: "إدارة الإضافات" },
    { key: "Ctrl + Shift + B", desc: "إرسال تعليق" },
    { key: "Ctrl + Shift + O", desc: "حول Knoux-IO" },
  ]

  // خطوط المحرر
  const fontFamilies = [
    { name: "Fira Code", value: "'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'" },
    { name: "Cascadia Code", value: "'Cascadia Code', 'Fira Code', 'Consolas', 'monospace'" },
    { name: "JetBrains Mono", value: "'JetBrains Mono', 'Fira Code', 'monospace'" },
    { name: "IBM Plex Mono", value: "'IBM Plex Mono', 'Fira Code', 'monospace'" },
    { name: "Source Code Pro", value: "'Source Code Pro', 'Fira Code', 'monospace'" },
    { name: "Roboto Mono", value: "'Roboto Mono', 'Fira Code', 'monospace'" },
    { name: "Ubuntu Mono", value: "'Ubuntu Mono', 'Fira Code', 'monospace'" },
    { name: "Inconsolata", value: "'Inconsolata', 'Fira Code', 'monospace'" },
    { name: "Anonymous Pro", value: "'Anonymous Pro', 'Fira Code', 'monospace'" },
    { name: "Hack", value: "'Hack', 'Fira Code', 'monospace'" },
    { name: "Cairo", value: "'Cairo', 'Tajawal', 'IBM Plex Sans Arabic', 'Vazirmatn', 'Segoe UI', 'sans-serif'" },
    { name: "Tajawal", value: "'Tajawal', 'Cairo', 'IBM Plex Sans Arabic', 'Vazirmatn', 'Segoe UI', 'sans-serif'" },
    { name: "IBM Plex Sans Arabic", value: "'IBM Plex Sans Arabic', 'Cairo', 'Tajawal', 'Vazirmatn', 'Segoe UI', 'sans-serif'" },
  ]

  // معالجة اختيار المثال
  const handleExample = (lang: keyof typeof examples) => {
    setCode(examples[lang])
    setOutput("")
    setSelectedLanguage(lang === "ar" || lang === "en" ? "javascript" : lang)
    
    // تحديث الإحصائيات
    setStatistics(prev => ({
      ...prev,
      languagesUsed: {
        ...prev.languagesUsed,
        [lang]: (prev.languagesUsed[lang] || 0) + 1
      }
    }))

    // إظهار رسالة
    toast.success(language === "ar" ? "تم تحميل المثال بنجاح" : "Example loaded successfully")
  }

  // تحسين الكود (محاكاة AI Knoux-IO)
  const handleCodeEdit = async () => {
    if (!code) return
    
    setIsProcessing(true)
    setProgress(0)
    
    // محاكاة تقدم المعالجة
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 15
      })
    }, 300)
    
    // تقدير وقت التنفيذ
    const estimatedTime = estimateExecutionTime(code, selectedLanguage)
    
    // محاكاة معالجة الذكاء الاصطناعي
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)
      
      // تحليل تعقيد الكود
      const complexity = analyzeCodeComplexity(code)
      
      // إنشاء اقتراحات وتحذيرات وهمية للعرض التوضيحي
      const suggestions = [
        "يمكن تحسين أداء الكود باستخدام هياكل بيانات أكثر كفاءة",
        "استخدم التعليقات لتوثيق الكود بشكل أفضل",
        "يمكن تبسيط المنطق باستخدام تعبيرات أكثر اختصاراً"
      ]
      
      const warnings = []
      if (code.includes("var")) {
        warnings.push("استخدم let أو const بدلاً من var للتصريح عن المتغيرات")
      }
      if (code.includes("console.log")) {
        warnings.push("تأكد من إزالة عبارات console.log قبل الإنتاج")
      }
      
      // تحديد أداء الكود
      let performance: 'good' | 'moderate' | 'poor' = 'good'
      if (complexity === 'medium') performance = 'moderate'
      if (complexity === 'complex') performance = 'poor'
      
      // تعيين تحليل الكود
      setCodeAnalysis({
        complexity,
        suggestions,
        warnings,
        performance
      })
      
      // إنشاء الكود المحسن
      const enhanced = `// 🚀 Knoux-IO AI Enhanced Code (${new Date().toLocaleString("ar-EG")}):
// تم تحليل الكود بواسطة Knoux-IO AI (${selectedLanguage})
// التعقيد: ${complexity === 'simple' ? 'بسيط' : complexity === 'medium' ? 'متوسط' : 'معقد'}
// الأداء: ${performance === 'good' ? 'جيد' : performance === 'moderate' ? 'متوسط' : 'ضعيف'}

${code}

// 💡 اقتراحات التحسين:
${suggestions.map(s => `// - ${s}`).join('\n')}

${warnings.length > 0 ? `// ⚠️ تحذيرات:
${warnings.map(w => `// - ${w}`).join('\n')}` : ''}

// ✅ تم تحسين الكود بواسطة Knoux-IO!`
      
      // تعيين النتيجة
      setOutput(enhanced)
      setExecutionTime(estimatedTime)
      setIsProcessing(false)
      setCopied(false)
      
      // إضافة إلى السجل
      const historyItem: HistoryItem = {
        id: generateId(),
        code,
        output: enhanced,
        language: selectedLanguage,
        date: new Date().toLocaleString("ar-EG"),
        executionTime: estimatedTime,
        codeSize: code.length,
        complexity
      }
      
      setHistory([historyItem, ...history.slice(0, 49)])
      
      // تحديث الإحصائيات
      setStatistics(prev => ({
        ...prev,
        codeEnhanced: prev.codeEnhanced + 1,
        totalCharacters: prev.totalCharacters + code.length,
        languagesUsed: {
          ...prev.languagesUsed,
          [selectedLanguage]: (prev.languagesUsed[selectedLanguage] || 0) + 1
        }
      }))
      
      // التمرير إلى النتيجة
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
      
      // إظهار إشعار نجاح
      toast.success(language === "ar" ? "تم تحسين الكود بنجاح!" : "Code enhanced successfully!")
      
      // تشغيل تأثير الكونفيتي للاحتفال بالنجاح
      if (experimentalFeatures) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }, 2000 + Math.random() * 1000)
  }

  // نسخ الكود المحسن
  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
    
    // إظهار إشعار
    toast.success(language === "ar" ? "تم نسخ الكود بنجاح!" : "Code copied successfully!")
  }

  // تبديل الوضع المظلم/الفاتح
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    
    // تطبيق السمة على العنصر الجذر
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(newTheme)
    }
    
    // إظهار إشعار
    toast.success(language === "ar" 
      ? `تم تغيير السمة إلى ${newTheme === "dark" ? "الوضع الداكن" : "الوضع الفاتح"}`
      : `Theme changed to ${newTheme} mode`
    )
  }

  // تبديل حالة المفضلة
  const toggleFavorite = (idx: number) => {
    setHistory((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, favorite: !item.favorite } : item
      )
    )
    
    // تحديث الإحصائيات
    setStatistics(prev => ({
      ...prev,
      favoriteCode: history[idx].favorite 
        ? prev.favoriteCode - 1 
        : prev.favoriteCode + 1
    }))
    
    // إظهار إشعار
    toast.success(language === "ar"
      ? history[idx].favorite ? "تمت إزالة الكود من المفضلة" : "تمت إضافة الكود إلى المفضلة"
      : history[idx].favorite ? "Removed from favorites" : "Added to favorites"
    )
  }

  // حذف عنصر من السجل
  const deleteHistoryItem = (idx: number) => {
    // تحديث الإحصائيات إذا كان العنصر مفضلاً
    if (history[idx].favorite) {
      setStatistics(prev => ({
        ...prev,
        favoriteCode: prev.favoriteCode - 1
      }))
    }
    
    // حذف العنصر
    setHistory((prev) => prev.filter((_, i) => i !== idx))
    
    // إظهار إشعار
    toast.success(language === "ar" ? "تم حذف العنصر من السجل" : "Item deleted from history")
  }

  // مسح السجل بالكامل
  const clearHistory = () => {
    if (window.confirm(language === "ar" ? "هل أنت متأكد من حذف السجل بالكامل؟" : "Are you sure you want to clear all history?")) {
      // تحديث الإحصائيات
      setStatistics(prev => ({
        ...prev,
        favoriteCode: 0
      }))
      
      // مسح السجل
      setHistory([])
      
      // إظهار إشعار
      toast.success(language === "ar" ? "تم مسح السجل بالكامل" : "History cleared successfully")
    }
  }

  // مسح المفضلة
  const clearFavorites = () => {
    if (window.confirm(language === "ar" ? "هل أنت متأكد من حذف جميع المفضلة؟" : "Are you sure you want to clear all favorites?")) {
      // تحديث الإحصائيات
      setStatistics(prev => ({
        ...prev,
        favoriteCode: 0
      }))
      
      // إزالة علامة المفضلة من جميع العناصر
      setHistory((prev) => prev.map((item) => ({ ...item, favorite: false })))
      
      // إظهار إشعار
      toast.success(language === "ar" ? "تم مسح المفضلة بالكامل" : "Favorites cleared successfully")
    }
  }

  // تصدير الكود
  const exportCode = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      code,
      language: selectedLanguage,
      date: new Date().toISOString(),
      source: "Knoux-IO"
    }))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `knoux-code-${new Date().getTime()}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
    
    // إظهار إشعار
    toast.success(language === "ar" ? "تم تصدير الكود بنجاح" : "Code exported successfully")
  }

  // استيراد الكود
  const importCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const data = JSON.parse(content)
        if (data.code) {
          setCode(data.code)
          if (data.language) setSelectedLanguage(data.language)
          
          // إظهار إشعار
          toast.success(language === "ar" ? "تم استيراد الكود بنجاح" : "Code imported successfully")
        }
      } catch (error) {
        console.error("Error importing code:", error)
        
        // إظهار إشعار خطأ
        toast.error(language === "ar" ? "حدث خطأ أثناء استيراد الكود" : "Error importing code")
      }
    }
    reader.readAsText(file)
  }

  // مشاركة الكود
  const shareCode = () => {
    // محاكاة مشاركة الكود (في التطبيق الحقيقي، يمكن استخدام API للمشاركة)
    const shareUrl = `https://knoux.io/share?code=${encodeURIComponent(code)}&lang=${selectedLanguage}`
    
    // نسخ الرابط إلى الحافظة
    navigator.clipboard.writeText(shareUrl)
    
    // إظهار إشعار
    toast.success(language === "ar" ? "تم نسخ رابط المشاركة إلى الحافظة" : "Share link copied to clipboard")
  }

  // إنشاء مشروع جديد
  const createNewProject = (name: string, description: string) => {
    const newProject: Project = {
      id: generateId(),
      name,
      description,
      files: [{
        id: generateId(),
        name: "main." + (selectedLanguage === "javascript" ? "js" : selectedLanguage === "typescript" ? "ts" : selectedLanguage),
        content: code || "",
        language: selectedLanguage,
        lastModified: new Date().toISOString()
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: false
    }
    
    setProjects([newProject, ...projects])
    setCurrentProject(newProject)
    
    // تحديث الإحصائيات
    setStatistics(prev => ({
      ...prev,
      projectsCreated: prev.projectsCreated + 1
    }))
    
    // إظهار إشعار
    toast.success(language === "ar" ? `تم إنشاء المشروع "${name}" بنجاح` : `Project "${name}" created successfully`)
  }

  // حذف مشروع
  const deleteProject = (id: string) => {
    if (window.confirm(language === "ar" ? "هل أنت متأكد من حذف هذا المشروع؟" : "Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id))
      if (currentProject?.id === id) setCurrentProject(null)
      
      // إظهار إشعار
      toast.success(language === "ar" ? "تم حذف المشروع بنجاح" : "Project deleted successfully")
    }
  }

  // تغيير اللغة
  const changeLanguage = (newLanguage: "ar" | "en") => {
    setLanguage(newLanguage)
    
    // إظهار إشعار
    toast.success(newLanguage === "ar" ? "تم تغيير اللغة إلى العربية" : "Language changed to English")
  }

  // تسجيل الدخول (محاكاة)
  const login = (email: string, password: string) => {
    // محاكاة تسجيل الدخول (في التطبيق الحقيقي، يتم التحقق من بيانات الاعتماد)
    const mockUser: User = {
      id: generateId(),
      name: "مستخدم Knoux-IO",
      email,
      role: 'free',
      preferences: {
        theme,
        fontSize,
        fontFamily,
        autoSave,
        notifications,
        telemetry,
        experimentalFeatures,
        codeCompletion,
        lineNumbers: showLineNumbers,
        wordWrap,
        tabSize,
        indentWithTabs,
        language
      }
    }
    
    setUser(mockUser)
    setIsAuthenticated(true)
    
    // إظهار إشعار
    toast.success(language === "ar" ? "تم تسجيل الدخول بنجاح" : "Logged in successfully")
  }

  // تسجيل الخروج
  const logout = () => {
    if (window.confirm(language === "ar" ? "هل أنت متأكد من تسجيل الخروج؟" : "Are you sure you want to log out?")) {
      setUser(null)
      setIsAuthenticated(false)
      
      // إظهار إشعار
      toast.success(language === "ar" ? "تم تسجيل الخروج بنجاح" : "Logged out successfully")
    }
  }

  // تحديد اتجاه الواجهة بناءً على اللغة
  const direction = language === "ar" ? "rtl" : "ltr"

  // تحديد لغة الواجهة بناءً على اللغة المختارة
  const t = (ar: string, en: string) => language === "ar" ? ar : en

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#1a0025] via-[#2d0036] to-[#4b006e]"
          : "bg-gradient-to-br from-[#f3eaff] via-[#e9d8fd] to-[#f5e0ff]"
      } p-4 md:p-8 font-sans`}
      dir={direction}
      lang={language}
      data-app="knoux-io"
      data-theme={theme}
      style={{
        fontFamily: "'Cairo', 'Tajawal', 'IBM Plex Sans Arabic', 'Vazirmatn', 'Segoe UI', 'sans-serif'",
        letterSpacing: "0.01em",
        minHeight: "100dvh",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Toaster للإشعارات */}
      <Toaster position={language === "ar" ? "top-left" : "top-right"} />
      
      {/* شاشة التحميل */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="text-6xl text-purple-400 mb-4"
            >
              <FaCode />
            </motion.div>
            <h1 className="text-3xl font-bold text-purple-400 mb-2">Knoux-IO</h1>
            <p className="text-gray-300">{t("جاري تحميل محرر الأكواد الذكي...", "Loading AI-powered code editor...")}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* رسالة الخطأ */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 inset-x-4 z-50 bg-red-500/90 text-white p-4 rounded-lg shadow-lg flex items-center justify-between"
            >
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>