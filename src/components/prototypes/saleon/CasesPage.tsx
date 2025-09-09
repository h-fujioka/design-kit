"use client";

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { PageShell } from '@/components/shared/page-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { PageHeader } from '@/components/ui/page-header';
import { ColumnDef } from "@tanstack/react-table";
import { Bookmark, Calendar, DollarSign, Plus, User } from 'lucide-react';
import { useState } from 'react';

interface Case {
  id: string;
  title: string;
  company: string;
  contact: string;
  status: 'active' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  lastActivity: string;
  isBookmarked: boolean;
}

const mockCases: Case[] = [
  {
    id: '1',
    title: 'CRMシステム導入案件',
    company: '株式会社テックソリューション',
    contact: '田中 太郎',
    status: 'proposal',
    value: 2500000,
    probability: 70,
    lastActivity: '2024-01-15',
    isBookmarked: true,
  },
  {
    id: '2',
    title: 'マーケティング自動化ツール',
    company: 'デジタルマーケティング株式会社',
    contact: '佐藤 花子',
    status: 'negotiation',
    value: 1800000,
    probability: 85,
    lastActivity: '2024-01-14',
    isBookmarked: false,
  },
  {
    id: '3',
    title: '人事管理システム刷新',
    company: 'グローバル企業株式会社',
    contact: '山田 次郎',
    status: 'active',
    value: 3200000,
    probability: 60,
    lastActivity: '2024-01-13',
    isBookmarked: true,
  },
  {
    id: '4',
    title: '在庫管理システム',
    company: '物流ソリューション株式会社',
    contact: '鈴木 一郎',
    status: 'closed-won',
    value: 1500000,
    probability: 100,
    lastActivity: '2024-01-10',
    isBookmarked: false,
  },
  {
    id: '5',
    title: 'ECサイト構築プロジェクト',
    company: '小売業株式会社',
    contact: '高橋 美咲',
    status: 'active',
    value: 4500000,
    probability: 45,
    lastActivity: '2024-01-12',
    isBookmarked: true,
  },
  {
    id: '6',
    title: 'データ分析基盤整備',
    company: '製造業株式会社',
    contact: '伊藤 健太',
    status: 'proposal',
    value: 2800000,
    probability: 75,
    lastActivity: '2024-01-11',
    isBookmarked: false,
  },
  {
    id: '7',
    title: 'セキュリティ強化プロジェクト',
    company: '金融機関株式会社',
    contact: '渡辺 真理',
    status: 'negotiation',
    value: 3800000,
    probability: 80,
    lastActivity: '2024-01-09',
    isBookmarked: true,
  },
  {
    id: '8',
    title: 'モバイルアプリ開発',
    company: 'スタートアップ株式会社',
    contact: '小林 翔太',
    status: 'closed-lost',
    value: 1200000,
    probability: 0,
    lastActivity: '2024-01-08',
    isBookmarked: false,
  },
];

const statusLabels = {
  active: 'アクティブ',
  proposal: '提案中',
  negotiation: '交渉中',
  'closed-won': '受注',
  'closed-lost': '失注',
};

const statusColors = {
  active: 'bg-brand-100 text-brand-800',
  proposal: 'bg-brand-100 text-brand-800',
  negotiation: 'bg-brand-100 text-brand-800',
  'closed-won': 'bg-green-100 text-green-800',
  'closed-lost': 'bg-red-100 text-red-800',
};

const columns: ColumnDef<Case>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        variant="brand"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="全て選択"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        variant="brand"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="行を選択"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "案件名",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div>
          <div className="font-medium">{row.getValue("title")}</div>
          <div className="text-sm text-muted">
            {row.original.company}
          </div>
        </div>
        {row.original.isBookmarked && (
          <Bookmark className="h-4 w-4 text-warning fill-current" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "contact",
    header: "担当者",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted" />
        <span>{row.getValue("contact")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "ステータス",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusLabels;
      return (
        <Badge 
          variant="brand" 
          className={`${statusColors[status]} border-0`}
        >
          {statusLabels[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "value",
    header: "案件金額",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("value"));
      const formatted = new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
      return (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted" />
          <span className="font-medium">{formatted}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "probability",
    header: "確度",
    cell: ({ row }) => {
      const probability = row.getValue("probability") as number;
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-muted rounded-full h-2">
            <div
              className="bg-brand-500 h-2 rounded-full"
              style={{ width: `${probability}%` }}
            />
          </div>
          <span className="text-sm font-medium">{probability}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastActivity",
    header: "最終活動日",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastActivity"));
      const formatted = date.toLocaleDateString("ja-JP");
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted" />
          <span>{formatted}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isBookmarked",
    header: "ブックマーク",
    cell: ({ row }) => {
      const isBookmarked = row.getValue("isBookmarked") as boolean;
      return (
        <div className="flex items-center justify-center">
          {isBookmarked ? (
            <Bookmark className="h-4 w-4 text-warning fill-current" />
          ) : (
            <Bookmark className="h-4 w-4 text-muted" />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "アクション",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="brandGhost" size="sm">
          編集
        </Button>
        <Button variant="brandGhost" size="sm">
          詳細
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export function CasesPage() {
  const [cases] = useState<Case[]>(mockCases);

  // フィルタオプション
  const filterOptions = {
    status: [
      { label: 'アクティブ', value: 'active' },
      { label: '提案中', value: 'proposal' },
      { label: '交渉中', value: 'negotiation' },
      { label: '受注', value: 'closed-won' },
      { label: '失注', value: 'closed-lost' },
    ],
    customFilters: [
      {
        key: 'isBookmarked',
        label: 'ブックマーク',
        options: [
          { label: 'ブックマーク済み', value: 'true' },
          { label: '未ブックマーク', value: 'false' },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <PageShell maxWidth="full">
        <main className="polaris-main">
          {/* レベル1: ページセクション間 (24px) */}
          <section className="polaris-section">
            {/* ページタイトル */}
            <PageHeader
              title="案件管理"
              showDescription={false}
              action={
                <Button variant="brand" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  新規案件
                </Button>
              }
            />

            {/* Advanced Data Table */}
            <DataTable
              columns={columns}
              data={cases}
              searchKey="title"
              searchPlaceholder="案件名、企業名、担当者で検索..."
              variant="brand"
              showColumnVisibility={true}
              showPagination={true}
              showAdvancedFilters={true}
              filterOptions={filterOptions}
            />
          </section>
        </main>
      </PageShell>
      <Footer />
    </>
  );
}