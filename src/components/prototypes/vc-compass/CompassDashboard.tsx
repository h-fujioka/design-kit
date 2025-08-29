'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  BarChart3,
  Building,
  Building2,
  Calculator,
  DollarSign,
  Edit,
  ExternalLink,
  FileCheck,
  FileText,
  Handshake,
  Heart,
  Layers,
  Lock,
  Megaphone,
  Presentation,
  Radio,
  Rocket,
  Search,
  Send,
  Settings,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Users2
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// 型定義
interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

interface Skill {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  icon: typeof Search;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'output';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface TaskHistory {
  id: string;
  skillName: string;
  lastMessage: string;
  lastUpdated: Date;
  messages: ChatMessage[];
}

interface Investor {
  id: string;
  name: string;
  stage: string;
  pastInvestments: string[];
  partner: string;
  philosophy: string;
  strength: string;
  contact: string;
  isPriority?: boolean;
}

type Screen = 'categories' | 'skills' | 'task';

// ダミーデータ
const categories: Category[] = [
  {
    id: 'strategy',
    name: '経営戦略・目標設定',
    description: 'ビジョン策定、戦略立案、目標設定',
    emoji: '🎯'
  },
  {
    id: 'funding',
    name: '資金調達・財務',
    description: '投資家との関係構築や財務戦略',
    emoji: '💰'
  },
  {
    id: 'hiring',
    name: '採用・組織構築',
    description: '採用戦略、組織設計、人材マネジメント',
    emoji: '👥'
  },
  {
    id: 'product',
    name: 'プロダクト（PMF維持・拡張）',
    description: 'プロダクト開発、PMF維持・拡張戦略',
    emoji: '🚀'
  },
  {
    id: 'marketing',
    name: 'マーケティング・PR・ブランド',
    description: 'ブランド戦略、PR活動、マーケティング施策',
    emoji: '📢'
  },
  {
    id: 'sales',
    name: 'セールス・リテンション・事業開発',
    description: 'セールス戦略、顧客維持、事業開発',
    emoji: '💼'
  },
  {
    id: 'operations',
    name: 'オペレーション・法務',
    description: '業務効率化、法的リスク管理、コンプライアンス',
    emoji: '⚖️'
  },
  {
    id: 'governance',
    name: '文化・ガバナンス・IR',
    description: '企業文化、コーポレートガバナンス、IR活動',
    emoji: '🏛️'
  }
];

const skills: Skill[] = [
  // 経営戦略・目標設定
  {
    id: 'strategy-1',
    categoryId: 'strategy',
    name: 'ビジョン・ミッション策定',
    description: '企業のビジョンとミッション設定',
    icon: Target
  },
  {
    id: 'strategy-2',
    categoryId: 'strategy',
    name: '事業戦略立案',
    description: '中長期戦略と競合優位性の構築',
    icon: TrendingUp
  },
  {
    id: 'strategy-3',
    categoryId: 'strategy',
    name: '目標設定・KPI管理',
    description: 'OKR設定とKPIダッシュボード構築',
    icon: BarChart3
  },

  // 資金調達・財務（6つのカード）
  {
    id: 'funding-phase-1',
    categoryId: 'funding',
    name: '資本政策/ラウンド設計',
    description: 'ラウンドサイズ、評価額、株式分配の最適化',
    icon: Calculator
  },
  {
    id: 'funding-phase-2',
    categoryId: 'funding',
    name: 'ピッチデック/データ室',
    description: '投資家向け資料とデータルームの準備',
    icon: FileText
  },
  {
    id: 'funding-phase-3',
    categoryId: 'funding',
    name: '投資家開拓',
    description: '条件に合う投資家の発見とアプローチ戦略',
    icon: Search
  },
  {
    id: 'funding-phase-4',
    categoryId: 'funding',
    name: 'DD対応/契約交渉/クロージング',
    description: 'デューデリジェンス対応と条件交渉',
    icon: FileCheck
  },
  {
    id: 'funding-phase-5',
    categoryId: 'funding',
    name: '予算策定/事業計画モデル',
    description: '資金調達後の財務計画と予算管理',
    icon: DollarSign
  },
  {
    id: 'funding-phase-6',
    categoryId: 'funding',
    name: '投資家レポート/取締役会',
    description: '定期レポートと取締役会運営',
    icon: BarChart3
  },

  // 採用・組織構築
  {
    id: 'hiring-1',
    categoryId: 'hiring',
    name: '採用戦略・JD作成',
    description: '職種別採用戦略とジョブディスクリプション',
    icon: Users
  },
  {
    id: 'hiring-2',
    categoryId: 'hiring',
    name: '組織設計・評価制度',
    description: '組織構造設計と人事評価システム',
    icon: Building2
  },
  {
    id: 'hiring-3',
    categoryId: 'hiring',
    name: 'カルチャーフィット判定',
    description: '企業文化に合う人材の見極め方法',
    icon: Heart
  },

  // プロダクト（PMF維持・拡張）
  {
    id: 'product-1',
    categoryId: 'product',
    name: 'PMF検証・改善',
    description: 'プロダクトマーケットフィットの測定と改善',
    icon: Rocket
  },
  {
    id: 'product-2',
    categoryId: 'product',
    name: 'プロダクト拡張戦略',
    description: '新機能開発とプロダクトロードマップ',
    icon: Layers
  },
  {
    id: 'product-3',
    categoryId: 'product',
    name: 'ユーザー体験改善',
    description: 'UX/UI改善とユーザージャーニー最適化',
    icon: Smartphone
  },

  // マーケティング・PR・ブランド
  {
    id: 'marketing-1',
    categoryId: 'marketing',
    name: 'ブランド戦略構築',
    description: 'ブランドポジショニングと認知戦略',
    icon: Megaphone
  },
  {
    id: 'marketing-2',
    categoryId: 'marketing',
    name: 'コンテンツマーケティング',
    description: 'コンテンツ戦略とSEO施策',
    icon: Edit
  },
  {
    id: 'marketing-3',
    categoryId: 'marketing',
    name: 'PR・メディア戦略',
    description: 'メディア露出とPR活動の企画',
    icon: Radio
  },

  // セールス・リテンション・事業開発
  {
    id: 'sales-1',
    categoryId: 'sales',
    name: 'セールス戦略・プロセス',
    description: '営業プロセス設計と成約率向上',
    icon: TrendingUp
  },
  {
    id: 'sales-2',
    categoryId: 'sales',
    name: 'カスタマーサクセス',
    description: '顧客満足度向上とリテンション戦略',
    icon: UserCheck
  },
  {
    id: 'sales-3',
    categoryId: 'sales',
    name: 'パートナーシップ開発',
    description: '戦略的提携と事業開発',
    icon: Handshake
  },

  // オペレーション・法務
  {
    id: 'operations-1',
    categoryId: 'operations',
    name: '業務効率化・自動化',
    description: 'オペレーション改善と業務自動化',
    icon: Settings
  },
  {
    id: 'operations-2',
    categoryId: 'operations',
    name: '法務・コンプライアンス',
    description: '法的リスク管理とコンプライアンス体制',
    icon: Shield
  },
  {
    id: 'operations-3',
    categoryId: 'operations',
    name: 'データ管理・セキュリティ',
    description: 'データ保護とセキュリティ対策',
    icon: Lock
  },

  // 文化・ガバナンス・IR
  {
    id: 'governance-1',
    categoryId: 'governance',
    name: '企業文化醸成',
    description: 'カルチャー構築と社内コミュニケーション',
    icon: Users2
  },
  {
    id: 'governance-2',
    categoryId: 'governance',
    name: 'コーポレートガバナンス',
    description: '取締役会運営と意思決定プロセス',
    icon: Building
  },
  {
    id: 'governance-3',
    categoryId: 'governance',
    name: 'IR・ステークホルダー対応',
    description: '投資家・株主・パートナーとの関係構築',
    icon: Presentation
  }
];

const historyItems = [
  '投資家開拓',
  'ピッチデック作成', 
  '資本政策設計'
];

const initialMessages: { [skillId: string]: ChatMessage[] } = {
  // 1. 資本政策/ラウンド設計
  'funding-phase-1': [
    {
      id: 'phase1-init-1',
      type: 'ai',
      content: 'こんにちは！資本政策・ラウンド設計のお手伝いをします。\n\n最適なラウンドサイズ、評価額、株式分配を設計し、成長戦略に沿った資本政策を策定いたします。',
      timestamp: new Date()
    },
    {
      id: 'phase1-init-2',
      type: 'ai',
      content: '以下の情報を教えてください：\n\n**1. 現在の株主構成**\n**2. 希望調達額**\n**3. 事業成長計画**（今後2-3年の目標）\n**4. 既存株主の意向**（希薄化に対する考え）\n\nこれらをもとに最適な資本政策をご提案します。',
      timestamp: new Date(Date.now() - 60000)
    }
  ],

  // 2. ピッチデック/データ室
  'funding-phase-2': [
    {
      id: 'phase2-init-1',
      type: 'ai',
      content: 'こんにちは！ピッチデック・データ室の準備をお手伝いします。\n\n投資家の関心を引く効果的なピッチデックと、デューデリジェンスに必要なデータ室を準備いたします。',
      timestamp: new Date()
    },
    {
      id: 'phase2-init-2',
      type: 'ai',
      content: 'まず、以下についてお聞かせください：\n\n**1. ピッチデックの目的**（初回面談、詳細説明等）\n**2. 事業の現状**（売上、ユーザー数、成長率）\n**3. 競合優位性**（独自技術、市場ポジション）\n**4. 資金使途**（具体的な投資計画）',
      timestamp: new Date(Date.now() - 60000)
    }
  ],

  // 3. 投資家開拓（既存の投資家リストアップ機能）
  'funding-phase-3': [
    {
      id: 'phase3-init-1',
      type: 'ai',
      content: '投資家開拓を開始します。以下の情報を教えてください：\n\n**1. 業界・事業領域**\n\n**2. ビジネスモデル**\n\n**3. 投資ステージ**\n\n**4. 調達予定額**\n\n**参考例**\n「フィンテック、B2Bサービス、シリーズA、3-5億円」',
      timestamp: new Date()
    }
  ],

  // 4. DD対応/契約交渉/クロージング
  'funding-phase-4': [
    {
      id: 'phase4-init-1',
      type: 'ai',
      content: 'こんにちは！デューデリジェンス対応・契約交渉・クロージングのサポートをいたします。\n\n投資家からのDD要求への対応から、条件交渉、最終的なクロージングまで包括的にお手伝いします。',
      timestamp: new Date()
    },
    {
      id: 'phase4-init-2',
      type: 'ai',
      content: '現在のステージを教えてください：\n\n**1. DD段階**（法務、財務、技術、商業DD）\n**2. 条件交渉段階**（評価額、権利関係の調整）\n**3. クロージング準備**（書類整備、手続き確認）\n\nそれぞれの段階で最適なサポートをご提供します。',
      timestamp: new Date(Date.now() - 60000)
    }
  ],

  // 5. 予算策定/事業計画モデル
  'funding-phase-5': [
    {
      id: 'phase5-init-1',
      type: 'ai',
      content: 'こんにちは！予算策定・事業計画モデルの作成をお手伝いします。\n\n調達資金の効果的な配分と、成長目標を達成するための詳細な事業計画を策定いたします。',
      timestamp: new Date()
    },
    {
      id: 'phase5-init-2',
      type: 'ai',
      content: '以下の情報をお聞かせください：\n\n**1. 調達予定額・時期**\n**2. 主要な資金使途**（人件費、マーケティング、開発等）\n**3. 成長目標**（売上、ユーザー数、市場シェア）\n**4. 事業の特性**（収益モデル、コスト構造）',
      timestamp: new Date(Date.now() - 60000)
    }
  ],

  // 6. 投資家レポート/取締役会
  'funding-phase-6': [
    {
      id: 'phase6-init-1',
      type: 'ai',
      content: 'こんにちは！投資家レポート・取締役会運営のサポートをいたします。\n\n定期的な投資家向けレポート作成と効果的な取締役会運営をお手伝いします。',
      timestamp: new Date()
    },
    {
      id: 'phase6-init-2',
      type: 'ai',
      content: 'レポート・運営についてお聞かせください：\n\n**1. 投資家構成**（VC、エンジェル、その他）\n**2. レポート頻度**（月次、四半期等）\n**3. 重要指標**（KPI、財務指標）\n**4. 課題・相談事項**（成長阻害要因、戦略方針等）',
      timestamp: new Date(Date.now() - 60000)
    }
  ]
};

const mockTaskHistory: TaskHistory[] = [
  {
    id: 'task-1',
    skillName: '投資家開拓',
    lastMessage: 'フィンテック系の投資家リストを作成しました',
    lastUpdated: new Date(Date.now() - 86400000),
    messages: []
  },
  {
    id: 'task-2', 
    skillName: 'ピッチデック/データ室',
    lastMessage: 'シリーズA向けのピッチデッキを準備中',
    lastUpdated: new Date(Date.now() - 172800000),
    messages: []
  },
  {
    id: 'task-3',
    skillName: '資本政策/ラウンド設計',
    lastMessage: '資本政策の最適化提案を完了',
    lastUpdated: new Date(Date.now() - 259200000),
    messages: []
  }
];

const mockInvestorData: Investor[] = [
  {
    id: 'inv-1',
    name: 'GREE Ventures (現: STRIVE)',
    stage: 'シード, シリーズA',
    pastInvestments: ['SmartHR', 'BASE', 'Origami', 'Wantedly'],
    partner: '堤達生',
    philosophy: 'ハンズオン支援を重視、起業家と共に価値創造',
    strength: 'HRTech・フィンテック領域のネットワークとグローバル展開支援、シンガポール・インドネシア進出のサポート',
    contact: 'https://www.strive.vc/'
  },
  {
    id: 'inv-2', 
    name: 'CyberAgent Capital',
    stage: 'シード, シリーズA, シリーズB',
    pastInvestments: ['Cygames', 'AppBrew', 'Luup', 'タイミー'],
    partner: '近藤裕文',
    philosophy: 'メディア・ゲーム領域での事業シナジー活用',
    strength: 'ゲーム・エンタメ・メディア領域での最先端知見、TV・WEBメディアとのシナジー、デジタルマーケティングのノウハウ',
    contact: 'https://www.cyberagent.co.jp/way/info/detail/id=25833'
  },
  {
    id: 'inv-3',
    name: 'Globis Capital Partners',
    stage: 'シリーズA, シリーズB',
    pastInvestments: ['ユーザベース', 'レアジョブ', 'エウレカ', 'チームラボ'],
    partner: '高宮慎一',
    philosophy: '持続可能な成長と社会価値創造を両立',
    strength: 'MBAホルダーにMBAスクールネットワーク、経営コンサルタント出身メンバーによる戦略立案・組織構築支援',
    contact: 'https://www.globiscapital.co.jp/'
  },
  {
    id: 'inv-4',
    name: 'WiL (World Innovation Lab)',
    stage: 'シリーズA, シリーズB, シリーズC',
    pastInvestments: ['メルカリ', 'Spiber', 'オプティム', 'リクルート関連'],
    partner: '伊佐山元',
    philosophy: '日本発の世界的イノベーション創出',
    strength: 'シリコンバレー・日本のバイカルチャー対応、米国大手企業との戦略パートナーシップ介介',
    contact: 'https://wilab.com/'
  },
  {
    id: 'inv-5',
    name: 'DNX Ventures',
    stage: 'シード, シリーズA',
    pastInvestments: ['LayerX', 'Atrae', 'CloudSign', 'SmartDrive'],
    partner: '倉林陽',
    philosophy: '起業家との長期パートナーシップ重視',
    strength: 'シリコンバレー・日本両拠点のクロスボーダー投資、米国市場参入へのコネクション提供',
    contact: 'https://dnx.vc/'
  },
  {
    id: 'inv-6',
    name: 'Beyond Next Ventures',
    stage: 'シード, シリーズA',
    pastInvestments: ['PeptiDream', 'アースアイズ', 'リバーフィールド', 'CuboRex'],
    partner: '伊藤毅',
    philosophy: 'ディープテック・大学発ベンチャー支援',
    strength: '大学発ディープテック・バイオテック領域での豊富な経験、知的財産戦略、規制対応サポート',
    contact: 'https://beyondnextventures.com/'
  },
  {
    id: 'inv-7',
    name: 'JAFCO',
    stage: 'シード, シリーズA, シリーズB',
    pastInvestments: ['ソフトバンク', 'ガンホー', 'ZOZO', 'クックパッド'],
    partner: '三好大介',
    philosophy: '長期投資による企業価値向上',
    strength: '日本最大級のベンチャーキャピタルの実績とネットワーク、IPO准備・上場支援のノウハウ',
    contact: 'https://www.jafco.co.jp/'
  },
  {
    id: 'inv-8',
    name: 'B Dash Ventures',
    stage: 'シード, シリーズA',
    pastInvestments: ['freee', 'ラクスル', 'SmartHR', 'LAPRAS'],
    partner: '渡邉大介',
    philosophy: 'スタートアップエコシステム全体の発展',
    strength: 'SaaS・HRTech領域での首位級投資実績、PMF達成へのプロダクト開発支援、ユーザーグロースハック',
    contact: 'https://bdash.vc/'
  },
  {
    id: 'inv-9',
    name: 'Eight Roads Ventures Japan',
    stage: 'シリーズA, シリーズB, 成長期',
    pastInvestments: ['マネーフォワード', 'ラクスル', 'Sansan', 'ユーザベース'],
    partner: '新村理宣',
    philosophy: 'グローバル視点での成長企業支援',
    strength: 'フィデリティグループのグローバルネットワークと金融業界の深い知見、機関投資家へのアクセス',
    contact: 'https://www.eightroads.com/jp/'
  },
  {
    id: 'inv-10',
    name: 'ANRI',
    stage: 'シード, アーリー',
    pastInvestments: ['メルペイ', 'LayerX', 'Kyash', 'スマートキャンプ'],
    partner: '佐俣アンリ',
    philosophy: 'アーリーステージでの集中的支援',
    strength: 'フィンテック・クリプト・ブロックチェーン領域での最先端事例创出、アーリーステージ集中支援',
    contact: 'https://anri.vc/'
  },
  {
    id: 'inv-11',
    name: 'インキュベイトファンド',
    stage: 'シード, シリーズA',
    pastInvestments: ['クラウドワークス', 'Retty', 'READYFOR', 'atama plus'],
    partner: '本間真彦',
    philosophy: '起業家ファーストの投資姿勢',
    strength: 'プロダクトマネージメント・マーケティング実務支援、エンジニア・デザイナーコミュニティ連携',
    contact: 'https://www.incubatefund.com/'
  },
  {
    id: 'inv-12',
    name: 'East Ventures',
    stage: 'シード, プレA',
    pastInvestments: ['Mercari', 'Traveloka', 'Tokopedia', 'Xendit'],
    partner: '松山太河',
    philosophy: '東南アジア・日本のクロスボーダー投資',
    strength: '東南アジアNo.1の投資実績と現地ネットワーク、インドネシア・ベトナム・タイ・フィリピン進出支援',
    contact: 'https://www.eastventures.com/'
  }
];

export function CompassDashboard() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTaskHistory, setSelectedTaskHistory] = useState<TaskHistory | null>(null);
  
  // 新しいインタラクション用の状態
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [showSideCanvas, setShowSideCanvas] = useState(false);
  const [investorData, setInvestorData] = useState<Investor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    arrRange: 'all',
    region: 'all',
    leadPreference: ''
  });
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [showInvestorDetails, setShowInvestorDetails] = useState(false);
  const [selectedInvestorIds, setSelectedInvestorIds] = useState<Set<string>>(new Set());
  const [selectedInvestors, setSelectedInvestors] = useState<Investor[]>([]);
  const [isInvestorSelectionComplete, setIsInvestorSelectionComplete] = useState(false);
  const [confirmedInvestors, setConfirmedInvestors] = useState<Investor[]>([]);
  const [isPitchTaskActive, setIsPitchTaskActive] = useState(false);
  const [pitchDialogCount, setPitchDialogCount] = useState(0);
  const [pitchContext, setPitchContext] = useState<string>('');
  const [isPitchComplete, setIsPitchComplete] = useState(false);
  const [showPitchCompleteButton, setShowPitchCompleteButton] = useState(false);
  const [pitchUserInput, setPitchUserInput] = useState<string>('');
  const [pitchCoreMessage, setPitchCoreMessage] = useState<string>('');
  const [showPitchOptions, setShowPitchOptions] = useState(false);
  const [pitchOption, setPitchOption] = useState<'A' | 'B' | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideContent, setSlideContent] = useState<{[key: number]: string}>({});
  const [showOutputSelection, setShowOutputSelection] = useState(false);
  const [selectedOutputType, setSelectedOutputType] = useState<string | null>(null);
  const [isGeneratingOutput, setIsGeneratingOutput] = useState(false);
  const [showSlidesActions, setShowSlidesActions] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState<string>('');

  // refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // フィルタリング・優先投資家選定ロジック
  const filteredInvestorData = useMemo(() => {
    let filtered = investorData;
    
    // 検索クエリでフィルタリング
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(investor => 
        investor.name.toLowerCase().includes(query) ||
        investor.stage.toLowerCase().includes(query) ||
        investor.pastInvestments.some(investment => investment.toLowerCase().includes(query)) ||
        investor.strength.toLowerCase().includes(query)
      );
    }

    // 追加フィルターでフィルタリング
    if (advancedFilters.arrRange && advancedFilters.arrRange !== 'all') {
      // ARR範囲でフィルタリング（シンプル実装）
      filtered = filtered.filter(investor => 
        investor.strength.includes(advancedFilters.arrRange)
      );
    }
    if (advancedFilters.region && advancedFilters.region !== 'all') {
      // 地域でフィルタリング
      filtered = filtered.filter(investor => 
        investor.strength.includes(advancedFilters.region)
      );
    }
    if (advancedFilters.leadPreference) {
      // リード希望でフィルタリング
      filtered = filtered.filter(investor => 
        investor.strength.includes(advancedFilters.leadPreference)
      );
    }

    return filtered;
  }, [investorData, searchQuery, advancedFilters]);

  // 優先10社の選定（フィルタリング結果から上位10社）
  const priorityInvestors = useMemo(() => {
    return filteredInvestorData.slice(0, 10);
  }, [filteredInvestorData]);

  // 統合された投資家リスト（優先フラグ付き）
  const combinedInvestorList = useMemo(() => {
    const priorityIds = new Set(priorityInvestors.map(inv => inv.id));
    return filteredInvestorData.map(investor => ({
      ...investor,
      isPriority: priorityIds.has(investor.id)
    }));
  }, [filteredInvestorData, priorityInvestors]);

  // その他の投資家リスト（優先10社以外）
  const otherInvestors = useMemo(() => {
    return filteredInvestorData.slice(10);
  }, [filteredInvestorData]);



  // 投資家選択ハンドラー
  const handleInvestorSelection = (investorId: string, isSelected: boolean) => {
    setSelectedInvestorIds(prevIds => {
      const newSet = new Set(prevIds);
      if (isSelected) {
        newSet.add(investorId);
      } else {
        newSet.delete(investorId);
      }
      
      // selectedInvestorsも更新
      const selectedInvestors = combinedInvestorList.filter(inv => newSet.has(inv.id));
      setSelectedInvestors(selectedInvestors);
      
      return newSet;
    });
  };

  // 投資家詳細表示ハンドラー（useCallbackでメモ化）
  const handleInvestorClick = useCallback((investor: Investor) => {
    setSelectedInvestor(investor);
    setShowInvestorDetails(true);
  }, []);

  // リスト確定処理
  const handleConfirmList = () => {
    // 選択された投資家の情報をチャットに追加
    const confirmMessage = `${selectedInvestors.length}社の投資家を選定しました。次のアクションを選択してください。\n\n**選定投資家:**\n${selectedInvestors.map(inv => `• ${inv.name}`).join('\n')}`;
    
    const newMessage: ChatMessage = {
      id: `confirmed-${Date.now()}`,
      type: 'ai',
      content: confirmMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setShowSideCanvas(false);
    setSelectedInvestorIds(new Set());
    setSelectedInvestors([]);
    setConfirmedInvestors(selectedInvestors);
    setIsInvestorSelectionComplete(true);
  };

  // やり直しハンドラー
  const handleRetry = () => {
    setShowSideCanvas(true);
    setIsInvestorSelectionComplete(false);
  };

  // ピッチ構成作成ハンドラー
  const handleCreatePitch = () => {
    const pitchMessage = `それでは、選定された投資家に響くピッチ構成を作成しましょう。\n\nこのピッチで最も伝えたい核心的なメッセージは何ですか？\n\n（例：革新的な技術、市場での急成長、強固なチームなど）`;
    
    const newMessage: ChatMessage = {
      id: `pitch-start-${Date.now()}`,
      type: 'ai',
      content: pitchMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsInvestorSelectionComplete(false);
    setIsPitchTaskActive(true);
    setPitchDialogCount(0);
    setPitchContext('');
    setIsPitchComplete(false);
    setShowPitchCompleteButton(false);
    setPitchUserInput('');
    setPitchCoreMessage('');
    setShowPitchOptions(false);
    setPitchOption(null);
    setCurrentSlideIndex(0);
    setSlideContent({});
  };



  // アウトプット生成ハンドラー
  const handleOutputGeneration = (outputType: 'slides' | 'qa' | 'summary') => {
    setIsGeneratingOutput(true);
    setSelectedOutputType(outputType);
    setShowOutputSelection(false);
    
    const loadingMessage: ChatMessage = {
      id: `output-loading-${Date.now()}`,
      type: 'ai',
      content: `${outputType === 'slides' ? 'スライド構成案' : outputType === 'qa' ? '想定Q&A' : 'エグゼクティブサマリー'}を生成しています...`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    
    setTimeout(() => {
      let outputContent = '';
      
      if (outputType === 'slides') {
        outputContent = `
<div class="p-6 border border-gray-300 dark:border-gray-600 rounded-lg prose prose-lg dark:prose-invert max-w-none">

## ピッチ構成案

### サマリー
中小企業の経理業務効率化を目指すB2B SaaSです。独自のAI技術と強力なチームで市場を牽引し、シリーズAの資金調達により、さらなる成長を加速させます。

### コアメッセージ
${pitchCoreMessage}

### 基本情報
- **業界・事業領域:** Fintech / B2B SaaS
- **ビジネスモデル:** サブスクリプション型
- **投資ステージ:** シリーズA
- **調達予定額:** 3-5億円

### 事業概要
「経理業務の属人化」の課題を解決する、独自のAIを活用した業務効率化SaaS。特に、月次決算業務の時間を従来の70%削減することに成功しています。

### 対象顧客
従業員数50-500名の中小企業。特に、経理業務のデジタル化が遅れている製造業・サービス業の企業をターゲットとしています。

### チーム・背景
- **【創業者】田中太郎:** 前職はGoogleでAI研究に従事。自然言語処理技術の開発を主導。
- **【創業の想い】** 中小企業での経理業務経験から、属人化による非効率性の課題解決に強い使命感を持ち、創業に至る。

### 実績・牽引力
- **ARR:** 前年比300%成長（現在2億円）
- **ユーザー数:** 大手企業10社を含む、累計150社が導入
- **解約率:** 3%以下（業界平均15%）

### 資金使途
調達資金の主な使い道： 人材採用（セールス・エンジニア）40%、マーケティング費用30%、技術開発への投資30%

### 想定Q&A
- **Q: 競合との差別化ポイントは？** A: 元GoogleのAI研究者が開発した独自の自然言語処理技術と、中小企業の経理業務に特化した深い知見。
- **Q: 市場規模の根拠は？** A: 中小企業庁の調査データと自社で行った潜在顧客1000社へのヒアリング調査に基づく推定（TAM: 1兆円規模）。

</div>
        `;
      } else if (outputType === 'qa') {
        outputContent = `
## 💡 想定Q&A

**Q1: 競合との差別化ポイントは？**
A: [具体的な技術優位性や独自のアプローチを説明]

**Q2: 市場規模の根拠は？**
A: [調査データや類似事例を基にした算出根拠]

**Q3: 収益化の見通しは？**
A: [現在の売上状況と今後の成長計画]

**Q4: チームの実行力は？**
A: [創業者・主要メンバーの実績と専門性]

**Q5: 資金使途の詳細は？**
A: [開発・マーケティング・採用等の具体的な配分]

**Q6: 競合他社の動向は？**
A: [主要競合の状況と御社の優位性]

**Q7: スケーラビリティは？**
A: [事業拡大の可能性と成長戦略]

**Q8: リスク要因は？**
A: [想定されるリスクと対策]

**Q9: 投資家へのリターンは？**
A: [期待される投資リターンとエグジット戦略]

**Q10: 今後のマイルストーンは？**
A: [短期・中期・長期の目標設定]
        `;
      } else if (outputType === 'summary') {
        outputContent = `
## 📋 エグゼクティブサマリー

**事業概要**: ${pitchCoreMessage}

**解決する課題**: [市場の主要な課題・ペインポイント]

**ソリューション**: [御社の独自アプローチ・技術]

**市場機会**: [TAM規模と成長性]

**競合優位性**: [差別化要因・参入障壁]

**ビジネスモデル**: [収益構造・単価設定]

**実績**: [現在のKPI・顧客数等]

**チーム**: [創業者・主要メンバーの経歴]

**財務**: [売上予測・損益計画]

**資金調達**: [希望額・使途・期待リターン]

**投資ハイライト**:
- 成長市場での確固たるポジション
- 実証済みのビジネスモデル
- 経験豊富なチーム
- 明確な成長戦略
- 魅力的な投資リターン
        `;
      }
      
      const resultMessage: ChatMessage = {
        id: `output-result-${Date.now()}`,
        type: 'ai',
        content: outputContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, resultMessage]);
      setIsGeneratingOutput(false);
      
      // スライド構成案の場合はアクションボタンを表示
      if (outputType === 'slides') {
        setShowSlidesActions(true);
      }
    }, 3000);
  };

  // スライド構成案確認ハンドラー
  const handleViewSlides = () => {
    const slidesContent = `
## 🎯 スライド構成案詳細

### 1. オープニング（30秒）
**タイトル**: "${pitchCoreMessage}"
- 会社名・代表者名
- 一言で伝える価値提案
- 今日のアジェンダ

### 2. 問題提起（1分）
- 市場の課題・ペインポイント
- 現状の解決策の限界
- 問題の深刻さを示すデータ

### 3. ソリューション（1分30秒）
- 御社のプロダクト・サービス概要
- 独自の技術・アプローチ
- デモ・実例の紹介

### 4. 市場機会（1分）
- TAM/SAM/SOM
- 成長性・トレンド
- 市場の変化要因

### 5. ビジネスモデル（1分）
- 収益構造
- 単価・LTV
- 収益化のタイムライン

### 6. 牽引力・実績（1分30秒）
- KPI・成長指標
- 顧客事例・導入実績
- パートナーシップ

### 7. 競合優位性（1分）
- 競合比較
- 参入障壁・差別化要因
- 知的財産・技術優位性

### 8. チーム（1分）
- 創業者・主要メンバー
- 実績・専門性
- アドバイザー・投資家

### 9. 財務計画（1分30秒）
- 売上予測
- 損益計画
- ユニットエコノミクス

### 10. 資金調達（1分）
- 調達希望額
- 資金使途
- 投資家へのリターン

### 11. クロージング（30秒）
- ビジョン・将来性
- 次のステップ
- Q&Aセッション
    `;
    
    setSidePanelContent(slidesContent);
    setShowSidePanel(true);
  };

  // 話法メモ作成ハンドラー
  const handleCreateSpeechMemo = () => {
    setIsGeneratingOutput(true);
    setShowSlidesActions(false);
    
    const loadingMessage: ChatMessage = {
      id: `speech-memo-loading-${Date.now()}`,
      type: 'ai',
      content: '話法メモを作成しています...',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    
    setTimeout(() => {
      const speechMemoContent = `
## 🎤 話法メモ

### オープニング（30秒）
**導入フレーズ:**
"本日はお忙しい中、お時間をいただきありがとうございます。${pitchCoreMessage}を提供する[会社名]の[代表者名]と申します。"

**アジェンダ提示:**
"本日は約10分で、私たちの事業概要、市場機会、そして御社との協業の可能性についてお話しさせていただきます。"

### 問題提起（1分）
**課題の提示:**
"現在、[業界/市場]では[具体的な課題]という問題が深刻化しています。"

**共感を得るフレーズ:**
"実際に、私たちがお客様から伺った声では、『[具体的な困りごと]』といったお悩みを多数いただいております。"

**問題の規模感:**
"この課題により、年間[金額/時間]の損失が発生していると推定されます。"

### ソリューション（1分30秒）
**解決策の提示:**
"そこで私たちは、[技術/アプローチ]を活用した${pitchCoreMessage}を開発いたしました。"

**差別化ポイント:**
"従来の解決策と異なり、私たちのサービスは[独自の特徴]により、[具体的な成果]を実現します。"

**実例の紹介:**
"実際に、[顧客事例]では、[具体的な改善結果]を達成しています。"

### 市場機会（1分）
**市場規模の説明:**
"この市場は現在[TAM規模]の規模があり、年率[成長率]%で成長しています。"

**成長要因:**
"特に[トレンド/変化要因]により、今後さらなる拡大が見込まれます。"

### ビジネスモデル（1分）
**収益構造の説明:**
"私たちは[料金体系]により収益を得ており、顧客あたりの平均単価は[金額]です。"

**収益化の見通し:**
"現在[現状]の状況で、[期間]後には[目標数値]を目指しています。"

### 実績・牽引力（1分30秒）
**成長指標の提示:**
"サービス開始から[期間]で、[KPI]を達成しています。"

**顧客の声:**
"お客様からは『[具体的な評価]』といった高い評価をいただいております。"

### 競合優位性（1分）
**競合比較:**
"競合他社と比較して、私たちは[差別化要因]において優位性があります。"

**参入障壁:**
"また、[技術/特許/ネットワーク]により、持続的な競争優位性を構築しています。"

### チーム（1分）
**チーム紹介:**
"私たち経営陣は、[経歴/実績]の経験を持ち、この事業に最適なチームを構成しています。"

**実行力のアピール:**
"これまでに[具体的な実績]を達成しており、確実な実行力を持っています。"

### 財務計画（1分30秒）
**売上予測:**
"今後3年間で、売上[金額]、利益[金額]を目指しています。"

**成長戦略:**
"[具体的な成長施策]により、持続的な成長を実現します。"

### 資金調達（1分）
**調達希望額:**
"この成長を実現するため、[金額]の資金調達を希望しています。"

**資金使途:**
"調達資金は主に[使途1：割合]、[使途2：割合]、[使途3：割合]に活用予定です。"

### クロージング（30秒）
**ビジョンの共有:**
"私たちは[将来ビジョン]の実現を目指しています。"

**協業の提案:**
"ぜひ御社と一緒に、この市場を開拓していきたいと考えております。"

**次のステップ:**
"本日のご質問やご相談事項があれば、お聞かせください。"

---

## 💡 話法のポイント

### 声のトーン
- **自信を持って**: 確信に満ちた声で話す
- **情熱を込めて**: 事業への熱意を伝える
- **聞き取りやすく**: 適度なスピードと明瞭な発音

### ボディランゲージ
- **アイコンタクト**: 聞き手の目を見て話す
- **ジェスチャー**: 適度な手の動きで強調
- **姿勢**: 背筋を伸ばし、堂々とした立ち振る舞い

### 質疑応答の準備
- **想定質問**: 事前に準備した回答を用意
- **データの準備**: 具体的な数値やエビデンスを手元に
- **柔軟な対応**: 予想外の質問にも冷静に対応
      `;
      
      const resultMessage: ChatMessage = {
        id: `speech-memo-result-${Date.now()}`,
        type: 'ai',
        content: speechMemoContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, resultMessage]);
      setIsGeneratingOutput(false);
    }, 3000);
  };

  // アプローチメール作成ハンドラー
  const handleCreateApproachEmail = () => {
    setIsGeneratingOutput(true);
    setShowSlidesActions(false);
    
    const loadingMessage: ChatMessage = {
      id: `approach-email-loading-${Date.now()}`,
      type: 'ai',
      content: 'アプローチメールを作成しています...',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    
    setTimeout(() => {
      const approachEmailContent = `
## 📧 投資家向けアプローチメール

### 件名案
**オプション1（直接的）:**
"[会社名] 資金調達のご相談 - ${pitchCoreMessage}"

**オプション2（関心喚起）:**
"[市場/業界]の課題解決に向けた新しいアプローチについて"

**オプション3（実績重視）:**
"[具体的な成果/実績]を達成したスタートアップからのご提案"

---

### メール本文テンプレート

**[投資家名] 様**

いつもお世話になっております。
[会社名]代表の[代表者名]と申します。

**■ ご挨拶**
この度は、弊社の事業についてご紹介させていただきたく、ご連絡いたしました。
[投資家の投資実績/関心領域]に関する御社の取り組みを拝見し、ぜひ一度お話しさせていただければと思い、メールをお送りしております。

**■ 事業概要**
弊社は、${pitchCoreMessage}を提供するスタートアップです。

[業界/市場]において[具体的な課題]が深刻化する中、私たちは[独自のアプローチ/技術]により、この課題の解決に取り組んでおります。

**■ 主な実績・特徴**
• [KPI/成長指標]: [具体的な数値]
• [顧客実績]: [導入企業数/事例]
• [技術的優位性]: [差別化要因]
• [チームの強み]: [経歴/専門性]

**■ 市場機会**
対象市場は[TAM規模]の規模があり、[成長要因]により年率[成長率]%で拡大しています。
私たちは[市場でのポジション/戦略]により、この成長市場での確固たる地位を築いていきます。

**■ 資金調達について**
現在、事業拡大に向けて[調達希望額]の資金調達を検討しております。
調達資金は主に以下の用途に活用予定です：

1. [使途1]: [具体的な内容と予算配分]
2. [使途2]: [具体的な内容と予算配分]
3. [使途3]: [具体的な内容と予算配分]

**■ お願い**
もしご興味をお持ちいただけましたら、30分程度のお時間をいただき、詳細をご説明させていただければ幸いです。

オンライン・オフラインどちらでも対応可能ですので、ご都合の良い日時をお聞かせください。

**■ 添付資料**
• 事業概要資料（ピッチデック）
• 財務計画書
• チーム紹介資料

何かご質問がございましたら、お気軽にお声がけください。
お忙しい中恐縮ですが、ご検討のほどよろしくお願いいたします。

---
[会社名] 代表取締役
[代表者名]
[連絡先情報]
[会社ウェブサイト]

---

## 📋 メール送信のポイント

### タイミング
- **平日の午前中**: 火曜日〜木曜日の10:00-11:00が最適
- **月曜日は避ける**: 週初めは忙しいため開封率が低い
- **金曜日午後も避ける**: 週末前で注意が散漫になりがち

### パーソナライゼーション
- **投資家の投資実績を調査**: 過去の投資先や関心領域を把握
- **共通点を見つける**: 業界、ステージ、地域などの共通点を強調
- **具体的な理由**: なぜその投資家にアプローチするのかを明確に

### フォローアップ
- **1週間後**: 返信がない場合は丁寧にフォローアップ
- **2週間後**: 再度簡潔にフォローアップ
- **1ヶ月後**: 事業の進捗更新と合わせてアプローチ

### 添付資料
- **ピッチデック**: 10-15スライドの簡潔な資料
- **1ページサマリー**: エグゼクティブサマリー
- **財務計画**: 3年間の売上・利益予測

### 件名の工夫
- **具体性**: 抽象的でなく具体的な内容を含める
- **緊急性**: 適度な緊急感を演出（過度は禁物）
- **個人名**: 可能であれば投資家の名前を含める
      `;
      
      const resultMessage: ChatMessage = {
        id: `approach-email-result-${Date.now()}`,
        type: 'ai',
        content: approachEmailContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, resultMessage]);
      setIsGeneratingOutput(false);
    }, 3000);
  };

  // やり直しハンドラー
  const handleRestart = () => {
    // 全ての状態をリセット
    setPitchCoreMessage('');
    setPitchOption(null);
    setCurrentSlideIndex(0);
    setSlideContent({});
    setShowOutputSelection(false);
    setSelectedOutputType(null);
    setIsGeneratingOutput(false);
    setShowSlidesActions(false);
    setShowSidePanel(false);
    setSidePanelContent('');
    setIsPitchComplete(false);
    setShowPitchCompleteButton(false);
    setShowPitchOptions(false);
    setIsPitchTaskActive(false);
    
    // メッセージをクリア
    setMessages([]);
    
    // 初期メッセージを表示
    const restartMessage: ChatMessage = {
      id: `restart-${Date.now()}`,
      type: 'ai',
      content: 'ピッチ構成作成を再開します。\n\nまず、御社の核心的なメッセージを教えてください。一言で表現するとしたら、どのような価値を提供していますか？\n\n（例：「中小企業の業務効率を3倍向上させるAIツール」「地方創生を支える次世代マッチングプラットフォーム」など）',
      timestamp: new Date()
    };
    
    setMessages([restartMessage]);
    setIsPitchTaskActive(true);
  };

  // ピッチ構成完了ハンドラー
  const handlePitchComplete = () => {
    const completionMessage: ChatMessage = {
      id: `pitch-complete-${Date.now()}`,
      type: 'ai',
      content: `ピッチ案を作成しました。

<div class="p-6 border border-gray-300 dark:border-gray-600 rounded-lg prose prose-lg dark:prose-invert max-w-none">

## ピッチ構成案

### サマリー
中小企業の経理業務効率化を目指すB2B SaaSです。独自のAI技術と強力なチームで市場を牽引し、シリーズAの資金調達により、さらなる成長を加速させます。

### コアメッセージ
市場での急成長

### 基本情報
- **業界・事業領域:** Fintech / B2B SaaS
- **ビジネスモデル:** サブスクリプション型
- **投資ステージ:** シリーズA
- **調達予定額:** 3-5億円

### 事業概要
「経理業務の属人化」の課題を解決する、独自のAIを活用した業務効率化SaaS。特に、月次決算業務の時間を従来の70%削減することに成功しています。

### 対象顧客
従業員数50-500名の中小企業。特に、経理業務のデジタル化が遅れている製造業・サービス業の企業をターゲットとしています。

### チーム・背景
- **【創業者】田中太郎:** 前職はGoogleでAI研究に従事。自然言語処理技術の開発を主導。
- **【創業の想い】** 中小企業での経理業務経験から、属人化による非効率性の課題解決に強い使命感を持ち、創業に至る。

### 実績・牽引力
- **ARR:** 前年比300%成長（現在2億円）
- **ユーザー数:** 大手企業10社を含む、累計150社が導入
- **解約率:** 3%以下（業界平均15%）

### 資金使途
調達資金の主な使い道： 人材採用（セールス・エンジニア）40%、マーケティング費用30%、技術開発への投資30%

### 想定Q&A
- **Q: 競合との差別化ポイントは？** A: 元GoogleのAI研究者が開発した独自の自然言語処理技術と、中小企業の経理業務に特化した深い知見。
- **Q: 市場規模の根拠は？** A: 中小企業庁の調査データと自社で行った潜在顧客1000社へのヒアリング調査に基づく推定（TAM: 1兆円規模）。

</div>

これらの指示に従い、内容の濃い、実践的なピッチ構成案を出力してください。

作成するアウトプットを選択してください。`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, completionMessage]);
    setShowOutputSelection(true);
    setIsPitchComplete(true);
    setShowPitchCompleteButton(false);
    setShowPitchOptions(false);
  };

  // 段階的に作成ハンドラー
  const handlePitchOptionA = () => {
    const optionAMessage = `ありがとうございます。段階的に作成を選択されました。\n\nAIと対話しながら、ピッチの構成要素を一つずつ作り込んでいきます。\n\n最初に「問題提起」について質問させていただきます。\n\n御社が解決しようとしている市場の課題や問題は何ですか？具体的なエピソードがあれば教えてください。\n\n（例：「手作業で3時間かかっていた」「○○の作業が属人化している」など、実際の声）`;
    
    const newMessage: ChatMessage = {
      id: `pitch-option-a-${Date.now()}`,
      type: 'ai',
      content: optionAMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setPitchOption('A');
    setShowPitchOptions(false);
    setCurrentSlideIndex(1);
    setIsPitchTaskActive(true);
  };

  // 一括作成ハンドラー
  const handlePitchOptionB = () => {
    const optionBMessage = `ありがとうございます。一括作成を選択されました。\n\n最小限の情報入力で、全体のドラフトを一度に生成します。\n\n以下の情報をまとめて入力してください：\n\n**1. コアメッセージ**（既に入力済み：${pitchCoreMessage}）\n\n**2. 事業概要**（どのようなサービス・プロダクトか）\n\n**3. 対象顧客**（誰の課題を解決するか）\n\n**4. チームの経歴**（創業者・主要メンバーの背景）\n\n**5. 資金使途**（調達資金の主な使い道）\n\n**6. 業界・事業領域**\n\n**7. ビジネスモデル**\n\n**8. 投資ステージ**\n\n**9. 調達予定額**\n\nこれらの情報を入力していただければ、全体のピッチ構成案を作成いたします。`;
    
    const newMessage: ChatMessage = {
      id: `pitch-option-b-${Date.now()}`,
      type: 'ai',
      content: optionBMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setPitchOption('B');
    setShowPitchOptions(false);
    setIsPitchTaskActive(true);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentScreen('skills');
  };

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill);
    setCurrentScreen('task');
    setMessages(initialMessages[skill.id] || []);
  };



  const handleBackToSkills = () => {
    setCurrentScreen('skills');
  };

  const handleTaskHistorySelect = (task: TaskHistory) => {
    setSelectedTaskHistory(task);
    // ここで過去のメッセージを読み込む処理を追加
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '今日';
    if (days === 1) return '昨日';
    return `${days}日前`;
  };

  const generateAIResponse = (userInput: string, skill: Skill) => {
    // 簡単なAI応答シミュレーション
    if (userInput.toLowerCase().includes('saas') || userInput.toLowerCase().includes('b2b')) {
      return 'SaaS/B2Bビジネスですね。この業界に特化した投資家をリストアップします。\n\n【推奨投資家リスト】\n1. Sequoia Capital - エンタープライズSaaS重点\n2. Andreessen Horowitz - B2B SaaS実績豊富\n3. Bessemer Venture Partners - クラウド専門\n4. Index Ventures - 欧州・米国のB2B投資家\n5. Lightspeed Venture Partners - 成長段階企業支援';
    }
    return `「${userInput}」について承知いたしました。${skill.name}を進めるために、もう少し詳しい情報を教えてください。`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedSkill) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');

    // 特定の入力パターンを検知
    const isInvestorListRequest = currentInput.toLowerCase().includes('フィンテック') && 
                                 currentInput.toLowerCase().includes('b2b') &&
                                 currentInput.toLowerCase().includes('シリーズa');

    // ピッチタスクがアクティブな場合の対話フロー
    if (isPitchTaskActive) {
      // タイピングアニメーション開始
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        
        if (pitchCoreMessage === '' && pitchOption === null) {
          // 核心メッセージの入力段階
          setPitchCoreMessage(currentInput);
          
          const aiResponse = `ありがとうございます。その核心的なメッセージを軸に、ピッチを組み立てます。\n\nどのようにピッチを組み立てますか？`;
          
          const aiMessage: ChatMessage = {
            id: `pitch-options-${Date.now()}`,
            type: 'ai',
            content: aiResponse,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
          setShowPitchOptions(true);
          setIsPitchTaskActive(false);
        } else if (pitchOption === 'A' && currentSlideIndex > 0) {
          // 段階的に作成：対話フロー
          const slides = [
            '問題提起', 'ソリューション', '市場規模', 'ビジネスモデル', '競合優位性',
            'チーム紹介', '実績・牽引力', '成長戦略', '資金調達', 'まとめ'
          ];
          
          setSlideContent(prev => ({...prev, [currentSlideIndex]: currentInput}));
          
          if (currentSlideIndex < slides.length) {
            const nextSlideIndex = currentSlideIndex + 1;
            const nextSlideQuestions: {[key: number]: string} = {
              2: 'ありがとうございます。次に「ソリューション」についてお聞きします。\n\nその課題に対して、御社はどのような解決策を提供していますか？具体的なサービス・プロダクトの特徴を教えてください。',
              3: 'ありがとうございます。次に「市場規模」についてお聞きします。\n\n御社が参入している市場の規模はどの程度ですか？成長性についてもお聞かせください。',
              4: 'ありがとうございます。次に「ビジネスモデル」についてお聞きします。\n\n御社はどのように収益を得ていますか？料金体系や収益構造を教えてください。',
              5: 'ありがとうございます。次に「競合優位性」についてお聞きします。\n\n競合他社と比較して、御社の強みや差別化ポイントは何ですか？',
              6: 'ありがとうございます。次に「チーム紹介」についてお聞きします。\n\n創業者や主要メンバーの経歴、チームの強みを教えてください。'
            };
            
            if (nextSlideIndex <= 6) {
              const aiResponse = nextSlideQuestions[nextSlideIndex] || `ありがとうございます。次に${slides[nextSlideIndex-1]}について教えてください。`;
              
              const aiMessage: ChatMessage = {
                id: `pitch-slide-${nextSlideIndex}-${Date.now()}`,
                type: 'ai',
                content: aiResponse,
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, aiMessage]);
              setCurrentSlideIndex(nextSlideIndex);
              setIsPitchTaskActive(true);
            } else {
              // 全スライド完了
              const aiResponse = `ありがとうございます。御社の事業について詳しく理解できました。\n\nこれらの情報を基に、効果的なピッチ構成案を作成いたします。`;
              
              const aiMessage: ChatMessage = {
                id: `pitch-slides-complete-${Date.now()}`,
                type: 'ai',
                content: aiResponse,
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, aiMessage]);
              setIsPitchTaskActive(false);
              
              setTimeout(() => {
                handlePitchComplete();
              }, 1500);
            }
          }
        } else if (pitchOption === 'B') {
          // 一括作成：情報受け取り後の処理
          const aiResponse = `ありがとうございます。いただいた情報を基に、全体のピッチ構成案を作成いたします。`;
          
          const aiMessage: ChatMessage = {
            id: `pitch-batch-received-${Date.now()}`,
            type: 'ai',
            content: aiResponse,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiMessage]);
          setIsPitchTaskActive(false);
          
          setTimeout(() => {
            handlePitchComplete();
          }, 1500);
        }
      }, 1500);
      
      return;
    }

    if (isInvestorListRequest) {
      // ローディング表示を開始
      setIsLoadingContent(true);
      
      // 確認メッセージを表示
      const loadingMessage: ChatMessage = {
        id: `loading-${Date.now()}`,
        type: 'ai',
        content: '内容を確認しています...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, loadingMessage]);

      // 3秒後にローディング完了とサイドキャンバス表示
      setTimeout(() => {
        setIsLoadingContent(false);
        setInvestorData(mockInvestorData);
        setShowSideCanvas(true);
        
        // 完了メッセージを表示
        const completionMessage: ChatMessage = {
          id: `completion-${Date.now()}`,
          type: 'ai',
          content: 'フィンテック・B2Bサービス・シリーズAステージに適した投資家リストを生成しました。右側のパネルでご確認ください。',
          timestamp: new Date()
        };
        setMessages(prev => prev.filter(m => m.id !== loadingMessage.id).concat([completionMessage]));
      }, 3000);
      
    } else {
      // 通常のAI応答
      setIsTyping(true);
      
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          content: generateAIResponse(currentInput, selectedSkill),
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);



      const renderCategoriesScreen = () => (
      <div className="h-[calc(100vh-3.5rem)] flex">
        {/* 左サイドバー - スキルライブラリ & タスク履歴 */}
        <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* スキルライブラリ */}
          <div className="py-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="px-4 md:px-6 lg:px-8 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              スキルライブラリ
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  className={`w-full px-4 py-2 md:px-6 lg:px-8 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-left ${
                    selectedCategory?.id === category.id 
                      ? 'bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentScreen('skills');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{category.emoji}</span>
                    <span className="flex-1 truncate">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 履歴 */}
          <div className="py-4 flex-1">
            <h3 className="px-4 md:px-6 lg:px-8 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              履歴
            </h3>
            <div className="space-y-1">
              {mockTaskHistory.map((task) => (
                <div 
                  key={task.id}
                  className="px-4 py-2 md:px-6 lg:px-8 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  onClick={() => handleTaskHistorySelect(task)}
                >
                  {task.skillName}
                </div>
              ))}
              {/* 他の履歴項目も追加 */}
              {historyItems.map((item, index) => (
                <div 
                  key={`history-${index}`}
                  className="px-4 py-2 md:px-6 lg:px-8 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-1 py-10 px-8">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                スキルライブラリ
              </h1>
            <p className="text-gray-600 dark:text-gray-400">
              カテゴリーを選択してください
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
                              <Card 
                key={category.id}
                variant="brand"
                className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                onClick={() => handleCategorySelect(category)}
              >
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto group-hover:bg-brand-200 dark:group-hover:bg-brand-800/40 transition-colors">
                    <span className="text-2xl">{category.emoji}</span>
                  </div>
                </CardContent>
                <CardHeader className="text-center">
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );

  const renderSkillsScreen = () => {
    if (!selectedCategory) return null;
    
    const categorySkills = skills.filter(skill => skill.categoryId === selectedCategory.id);

    return (
      <div className="h-[calc(100vh-3.5rem)] flex">
        {/* 左サイドバー - スキルライブラリ & タスク履歴 */}
        <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* スキルライブラリ */}
          <div className="py-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="px-4 md:px-6 lg:px-8 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              スキルライブラリ
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  className={`w-full px-4 py-2 md:px-6 lg:px-8 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-left ${
                    selectedCategory?.id === category.id 
                      ? 'bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentScreen('skills');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{category.emoji}</span>
                    <span className="flex-1 truncate">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 履歴 */}
          <div className="py-4 flex-1">
            <h3 className="px-4 md:px-6 lg:px-8 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              履歴
            </h3>
            <div className="space-y-1">
              {mockTaskHistory.map((task) => (
                <div 
                  key={task.id}
                  className="px-4 py-2 md:px-6 lg:px-8 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  onClick={() => handleTaskHistorySelect(task)}
                >
                  {task.skillName}
                </div>
              ))}
              {/* 他の履歴項目も追加 */}
              {historyItems.map((item, index) => (
                <div 
                  key={`history-${index}`}
                  className="px-4 py-2 md:px-6 lg:px-8 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-1 py-10 px-8">
          <div className="max-w-[1000px] mx-auto">
            {/* ヘッダー */}
            <div className="mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-3xl">{selectedCategory.emoji}</span>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedCategory.name}
                  </h1>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {selectedCategory.description}
                </p>
              </div>
            </div>

            {/* スキル一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorySkills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <Card 
                    key={skill.id}
                    variant="brand"
                    className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                    onClick={() => handleSkillSelect(skill)}
                  >
                    <CardContent className="text-center">
                      <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto group-hover:bg-brand-200 dark:group-hover:bg-brand-800/40 transition-colors">
                        <IconComponent className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                      </div>
                    </CardContent>
                    <CardHeader className="text-center">
                      <CardTitle>{skill.name}</CardTitle>
                      <CardDescription>{skill.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  };

  const renderTaskScreen = () => {
    if (!selectedSkill) return null;

    return (
      <>
        {/* サイドパネル */}
        {showSidePanel && (
          <>
            <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-slate-800 shadow-2xl z-50 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    スライド構成案詳細
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSidePanel(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {sidePanelContent}
                  </div>
                </div>
              </div>
            </div>
            {/* オーバーレイ */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowSidePanel(false)}
            />
          </>
        )}
        
        {/* 全体コンテナ - display: flex, flex-direction: row, プロトタイプヘッダーの高さを考慮 */}
        <div className="h-[calc(100vh-3.5rem)] flex">
        {/* 左サイドバー - スキルライブラリ & タスク履歴 */}
        <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* スキルライブラリ */}
          <div className="py-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="px-4 md:px-6 lg:px-8 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              スキルライブラリ
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  className="w-full px-4 py-2 md:px-6 lg:px-8 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-left"
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentScreen('skills');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{category.emoji}</span>
                    <span className="flex-1 truncate">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 履歴 */}
          <div className="py-4 flex-1">
            <h3 className="px-4 md:px-6 lg:px-8 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              履歴
            </h3>
            <div className="space-y-1">
              {mockTaskHistory.map((task) => (
                <div 
                  key={task.id}
                  className="px-4 py-2 md:px-6 lg:px-8 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  onClick={() => handleTaskHistorySelect(task)}
                >
                  {task.skillName}
                </div>
              ))}
              {/* 他の履歴項目も追加 */}
              {historyItems.map((item, index) => (
                <div 
                  key={`history-${index}`}
                  className="px-4 py-2 md:px-6 lg:px-8 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 右側メインエリア - display: flex, flex-direction: column */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${showSideCanvas ? 'mr-[50%]' : ''}`}>
          {/* ヘッダー - 固定高さ */}
          <header className="flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 px-5">
            <div className="flex items-center gap-2">
              <Button 
                variant="brandGhost" 
                size="sm"
                onClick={handleBackToSkills}
                className="flex items-center justify-center p-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                  {selectedSkill.name}
                </h1>
              </div>
            </div>
          </header>

          {/* メインコンテンツエリア（チャット履歴）- flex-grow: 1, overflow-y: auto */}
          <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 p-8 px-6">
            <div className="max-w-[1000px] mx-auto mb-8">
                          {messages.map((message, index) => (
              <div key={message.id}>
                <div className="flex mb-6">
                  {/* AI/Systemメッセージ */}
                  {message.type !== 'user' && (
                    <div className="flex items-start justify-start w-full">
                      <div className="max-w-2xl">
                        <div className={`${
                          message.type === 'output' 
                            ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg' 
                            : 'bg-transparent'
                        } ${message.type === 'output' ? 'p-4 px-5' : 'py-3'}`}>
                          <MarkdownRenderer 
                            content={message.content}
                            variant="default"
                            className="text-gray-900 dark:text-gray-100"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ユーザーメッセージ */}
                  {message.type === 'user' && (
                    <div className="flex items-start justify-end w-full">
                      <div className="max-w-2xl">
                        <div className="rounded-2xl rounded-tr-md bg-gray-100 dark:bg-gray-800 p-4 px-5">
                          <MarkdownRenderer 
                            content={message.content}
                            variant="default"
                            className="text-gray-900 dark:text-gray-100"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 投資家リスト結果再表示ボタン - 特定メッセージの後に表示 */}
                {investorData.length > 0 && message.type !== 'user' && 
                 message.content.includes('投資家リストを生成しました') && (
                  <div className="flex justify-start w-full mb-6">
                    <div className="max-w-2xl">
                      <Button
                        variant="brandOutline"
                        onClick={() => setShowSideCanvas(true)}
                        disabled={showSideCanvas}
                        className="gap-2"

                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">投資家リストアップ結果を表示</span>
                      </Button>
                    </div>
                  </div>
                )}

                {/* 投資家選定完了後のアクションボタン */}
                {message.type !== 'user' && message.id.startsWith('confirmed-') && isInvestorSelectionComplete && (
                  <div className="flex justify-start w-full mb-6">
                    <div className="max-w-2xl">
                      <div className="flex gap-3">
                        <Button
                          variant="brandOutline"
                          onClick={handleRetry}
                          className="flex items-center gap-2"
  
                        >
                          <span className="text-sm font-medium">やり直す</span>
                        </Button>
                        <Button
                          variant="brand"
                          onClick={handleCreatePitch}
                          className="flex items-center gap-2"
  
                        >
                          <span className="text-sm font-medium">ピッチ構成を作成する</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ピッチ構成オプション選択ボタン */}
                {message.type !== 'user' && message.content.includes('どのようにピッチを組み立てますか？') && showPitchOptions && (
                  <div className="flex justify-start w-full mb-6">
                    <div className="max-w-2xl">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                          variant="brandOutline"
                          onClick={handlePitchOptionA}
                          className="px-6 py-3 text-sm font-medium"
                        >
                          段階的に作成
                        </Button>
                        <Button
                          variant="brand"
                          onClick={handlePitchOptionB}
                          className="px-6 py-3 text-sm font-medium"
                        >
                          一括作成
                        </Button>
                      </div>
                      <div className="mt-3 text-xs text-gray-500 space-y-1">
                        <p><strong>段階的に作成:</strong> AIと対話しながら、スライドごとに細かく作り込みます</p>
                        <p><strong>一括作成:</strong> 最小限の情報入力で、全体のドラフトを一度に生成します</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* アウトプット選択ボタン */}
                {message.type !== 'user' && message.content.includes('作成するアウトプットを選択してください') && showOutputSelection && (
                  <div className="flex justify-start w-full mb-6">
                    <div className="max-w-2xl">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                          variant="brandOutline"
                          onClick={() => handleOutputGeneration('slides')}
                          className="px-6 py-3 text-sm font-medium"
                        >
                          スライド構成案
                        </Button>
                        <Button
                          variant="brandOutline"
                          onClick={() => handleOutputGeneration('qa')}
                          className="px-6 py-3 text-sm font-medium"
                        >
                          想定Q&A
                        </Button>
                        <Button
                          variant="brand"
                          onClick={() => handleOutputGeneration('summary')}
                          className="px-6 py-3 text-sm font-medium"
                        >
                          エグゼクティブサマリー
                        </Button>
                      </div>
                      <div className="mt-3 text-xs text-gray-500 space-y-1">
                        <p><strong>スライド構成案:</strong> プレゼンテーション用のスライド構成を生成</p>
                        <p><strong>想定Q&A:</strong> 投資家からの質問と回答例を生成</p>
                        <p><strong>エグゼクティブサマリー:</strong> 事業概要の要約資料を生成</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* スライド構成案完了後のアクションボタン */}
                {message.type !== 'user' && message.content.includes('## 🎯 スライド構成案') && showSlidesActions && (
                  <div className="flex justify-start w-full mb-6">
                    <div className="max-w-4xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Button
                          variant="brandOutline"
                          onClick={handleViewSlides}
                          className="px-4 py-3 text-sm font-medium"
                        >
                          スライド構成案を確認する
                        </Button>
                        <Button
                          variant="brandOutline"
                          onClick={handleCreateSpeechMemo}
                          className="px-4 py-3 text-sm font-medium"
                        >
                          話法メモを作成
                        </Button>
                        <Button
                          variant="brandOutline"
                          onClick={handleCreateApproachEmail}
                          className="px-4 py-3 text-sm font-medium"
                        >
                          アプローチメールを作成
                        </Button>
                        <Button
                          variant="brandOutline"
                          onClick={handleRestart}
                          className="px-4 py-3 text-sm font-medium"
                        >
                          やり直す
                        </Button>
                      </div>
                      <div className="mt-3 text-xs text-gray-500 space-y-1">
                        <p><strong>スライド構成案を確認する:</strong> 右側パネルで詳細な構成を確認できます</p>
                        <p><strong>話法メモを作成:</strong> プレゼンテーション用の話法とポイントを生成します</p>
                        <p><strong>アプローチメールを作成:</strong> 投資家向けのメールテンプレートを生成します</p>
                        <p><strong>やり直す:</strong> ピッチ構成作成を最初からやり直します</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ピッチ構成完了後のアクションボタン */}
                {message.type !== 'user' && message.content.includes('ピッチ構成案が完成しました') && isPitchComplete && (
                  <div className="flex justify-start w-full mb-6">
                    <div className="max-w-2xl">
                      <div className="flex gap-3">
                        <Button
                          variant="brandOutline"
                          onClick={handleCreateSpeechMemo}
                          className="flex items-center gap-2"
  
                        >
                          <span className="text-sm font-medium">話法メモを作成</span>
                        </Button>
                        <Button
                          variant="brand"
                          onClick={handleCreateApproachEmail}
                          className="flex items-center gap-2"
  
                        >
                          <span className="text-sm font-medium">アプローチメールを作成</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* タイピングインディケーター */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-2xl">
                  <div className="bg-transparent py-2 mb-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* コンテンツ生成中のスケルトンローディング */}
            {isLoadingContent && (
              <div className="flex justify-start mb-6">
                <div className="max-w-2xl w-full">
                  <div className="bg-transparent py-3">
                    <div className="space-y-3 animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <div className="h-2 w-2 bg-brand-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                        <div className="h-2 w-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
              <div ref={messagesEndRef} />
            </div>
          </main>



          {/* 入力インターフェース - Flexboxで画面下部に固定 */}
          <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6">
            <div className="flex items-end max-w-[1000px] mx-auto gap-4">
              <div className="flex-1">
                <Textarea
                  ref={inputRef}
                  variant="brand"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="メッセージを入力してください..."
                  className="w-full min-h-[44px] max-h-32 resize-none py-3.5 px-4 leading-6"
                  rows={1}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="h-11 px-5"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* サイドキャンバス - 投資家リスト（統合テーブル表示） */}
        {showSideCanvas && (
          <div className={`fixed top-[3.5rem] right-0 w-[50%] h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-lg transform transition-transform duration-300 ${
            showSideCanvas ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}>
            {/* 固定ヘッダー：タイトル & フィルター */}
            <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4 px-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 tracking-wide">
                    投資家リストアップ結果
                  </h2>
                </div>
                <Button 
                  variant="brandGhost" 
                  size="sm"
                  onClick={() => setShowSideCanvas(false)}
                  className="p-1.5"
                >
                  ×
                </Button>
              </div>

              {/* 絞り込みフィルター */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  {/* ARR帯フィルター */}
                  <div>
                    <Label variant="brand" size="sm" className="mb-1 block">
                      ARR帯
                    </Label>
                    <Select
                      value={advancedFilters.arrRange}
                      onValueChange={(value) => setAdvancedFilters({...advancedFilters, arrRange: value})}
                    >
                      <SelectTrigger variant="brand" size="sm" className="w-full">
                        <SelectValue placeholder="全て" />
                      </SelectTrigger>
                      <SelectContent variant="brand">
                        <SelectItem variant="brand" value="all">全て</SelectItem>
                        <SelectItem variant="brand" value="3000万円以上">3,000万円以上</SelectItem>
                        <SelectItem variant="brand" value="1億円">1億円〜</SelectItem>
                        <SelectItem variant="brand" value="5億円">5億円〜</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 地域フィルター */}
                  <div>
                    <Label variant="brand" size="sm" className="mb-1 block">
                      地域
                    </Label>
                    <Select
                      value={advancedFilters.region}
                      onValueChange={(value) => setAdvancedFilters({...advancedFilters, region: value})}
                    >
                      <SelectTrigger variant="brand" size="sm" className="w-full">
                        <SelectValue placeholder="全て" />
                      </SelectTrigger>
                      <SelectContent variant="brand">
                        <SelectItem variant="brand" value="all">全て</SelectItem>
                        <SelectItem variant="brand" value="国内">国内</SelectItem>
                        <SelectItem variant="brand" value="北米">北米</SelectItem>
                        <SelectItem variant="brand" value="アジア">アジア</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* リード希望フィルター */}
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 pb-1">
                      <Checkbox
                        variant="brand"
                        size="lg"
                        checked={advancedFilters.leadPreference === 'リード希望'}
                        onCheckedChange={(checked) => setAdvancedFilters({
                          ...advancedFilters, 
                          leadPreference: checked ? 'リード希望' : ''
                        })}
                      />
                      <Label variant="brand" size="sm">
                        リード希望
                      </Label>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            
            {/* 投資家一覧テーブル */}
            <div className="flex-1 overflow-y-auto">
              {combinedInvestorList.length > 0 ? (
                <Table variant="brand">
                  <TableHeader variant="brand">
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          variant="brand"
                          checked={selectedInvestorIds.size === combinedInvestorList.length && combinedInvestorList.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              const allIds = new Set(combinedInvestorList.map(inv => inv.id));
                              setSelectedInvestorIds(allIds);
                              setSelectedInvestors(combinedInvestorList);
                            } else {
                              setSelectedInvestorIds(new Set());
                              setSelectedInvestors([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead className="w-1/4">投資家名</TableHead>
                      <TableHead className="w-1/4">過去投資（抜粋）</TableHead>
                      <TableHead className="w-1/2">強み</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {combinedInvestorList.map((investor) => (
                      <TableRow
                        key={investor.id}
                        className={`transition-all duration-150 ${
                          investor.isPriority 
                            ? 'bg-brand-50/30 dark:bg-brand-900/10' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        } ${
                          selectedInvestorIds.has(investor.id) 
                            ? 'bg-brand-100 dark:bg-brand-900/20 ring-2 ring-brand-500/50' 
                            : ''
                        }`}
                      >
                        <TableCell>
                          <Checkbox
                            variant="brand"
                            checked={selectedInvestorIds.has(investor.id)}
                            onCheckedChange={(checked) => handleInvestorSelection(investor.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {investor.isPriority && (
                              <Badge variant="brand" className="text-xs px-1.5 py-0.5">
                                <span className="text-yellow-400 mr-1">⭐</span>
                                おすすめ
                              </Badge>
                            )}
                            <button
                              onClick={() => handleInvestorClick(investor)}
                              className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-brand-600 underline text-left"
                            >
                              {investor.name}
                            </button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {investor.pastInvestments.slice(0, 1).join(', ')}
                            {investor.pastInvestments.length > 1 && (
                              <span className="text-gray-500"> 他{investor.pastInvestments.length - 1}社</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {investor.strength}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  フィルター条件に一致する投資家が見つかりません
                </div>
              )}
            </div>

            {/* 固定フッター：確定ボタン */}
            <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedInvestors.length > 0 ? `${selectedInvestors.length}社選択中` : '投資家を選択してください'}
                </div>
                <Button
                  variant="brand"
                  size="lg"
                  onClick={handleConfirmList}
                  disabled={selectedInvestors.length === 0}
                  className="px-8 py-3 font-semibold"
                >
                  このリストを確定する
                </Button>
              </div>
            </div>
          </div>
        )}



            {/* 投資家詳細ダイアログ */}
            <Dialog open={showInvestorDetails} onOpenChange={(open) => {
              setShowInvestorDetails(open);
              if (!open) {
                setSelectedInvestor(null);
              }
            }}>
              <DialogContent variant="brand" className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">
                    {selectedInvestor?.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">過去投資実績</h4>
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {selectedInvestor?.pastInvestments.join(', ')}
                    </div>
                  </div>
                  
                  {selectedInvestor?.partner && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">担当パートナー</h4>
                      <p className="text-gray-900 dark:text-gray-100">{selectedInvestor.partner}</p>
                    </div>
                  )}
                  
                  {selectedInvestor?.philosophy && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">投資哲学</h4>
                      <p className="text-gray-900 dark:text-gray-100 leading-relaxed">{selectedInvestor.philosophy}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">強み・特徴</h4>
                    <p className="text-gray-900 dark:text-gray-100 leading-relaxed">{selectedInvestor?.strength}</p>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="brandOutline"
                    onClick={() => {
                      setShowInvestorDetails(false);
                      setSelectedInvestor(null);
                    }}
                  >
                    閉じる
                  </Button>
                  <Button
                    asChild
                    variant="brand"
                    className="gap-2"
                  >
                    <a
                      href={selectedInvestor?.contact}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="投資家の詳細情報を外部サイトで確認"
                    >
                      <ExternalLink className="w-4 h-4" />
                      詳細を見る
                    </a>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </>
    );
  };

  return (
    <>
      {currentScreen === 'task' && renderTaskScreen()}
      {currentScreen === 'categories' && renderCategoriesScreen()}
      {currentScreen === 'skills' && renderSkillsScreen()}
    </>
  );
}