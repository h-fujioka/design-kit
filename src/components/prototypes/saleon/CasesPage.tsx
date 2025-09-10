"use client";

import { Footer } from '@/components/shared/footer';
import { FullWidthBreadcrumb } from '@/components/shared/full-width-breadcrumb';
import { Header } from '@/components/shared/header';
import { SaleOnPageHeader } from '@/components/shared/saleon-page-header';
import { SaleOnSidebar } from '@/components/shared/saleon-sidebar';
import { AdvancedDataTable } from '@/components/ui/advanced-data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { advancedDataTablePresets } from '@/lib/constants/advanced-data-table-presets';
import { ColumnDef } from "@tanstack/react-table";
import { Bookmark, Mail, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Case, getCases, statusColors, statusLabels } from './data';


const columns: ColumnDef<Case>[] = [
  {
    id: "select",
    header: ({ table }) => {
      console.log('Header checkbox state:', table.getIsAllPageRowsSelected());
      console.log('All rows selection state:', table.getRowModel().rows.map(row => ({ id: row.id, selected: row.getIsSelected() })));
      return (
        <div 
          className="flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Header cell clicked');
          }}
        >
          <Checkbox
            variant="brand"
            checked={Boolean(table.getIsAllPageRowsSelected())}
            onCheckedChange={(value) => {
              console.log('Header checkbox clicked:', value);
              console.log('Before toggle all - all selected:', table.getIsAllPageRowsSelected());
              table.toggleAllPageRowsSelected(!!value);
              console.log('After toggle all - all selected:', table.getIsAllPageRowsSelected());
            }}
            aria-label="すべて選択"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Header checkbox direct click');
            }}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      console.log('Row selection state:', row.getIsSelected(), 'for row:', row.original.id, 'row.id:', row.id);
      return (
        <div 
          className="flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Cell clicked for row:', row.original.id, 'row.id:', row.id);
          }}
        >
          <Checkbox
            variant="brand"
            checked={Boolean(row.getIsSelected())}
            onCheckedChange={(value) => {
              console.log('Checkbox clicked:', value, 'for row:', row.original.id, 'row.id:', row.id);
              console.log('Before toggle - row.getIsSelected():', row.getIsSelected());
              row.toggleSelected(!!value);
              console.log('After toggle - row.getIsSelected():', row.getIsSelected());
            }}
            aria-label="行を選択"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Checkbox direct click for row:', row.original.id, 'row.id:', row.id);
            }}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 40,
    minSize: 40,
    maxSize: 40,
  },
  {
    accessorKey: "title",
    header: "案件名",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link 
          href={`/prototypes/saleon/cases/${row.original.id}`}
          className="text-sm font-medium text-link hover:text-link-hover hover:underline"
        >
          {row.getValue("title")}
        </Link>
        {row.original.isBookmarked && (
          <Bookmark className="h-4 w-4 text-warning fill-current" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "company",
    header: "企業名",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-900">{row.getValue("company")}</span>
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
    accessorKey: "customerContact",
    header: "顧客主担当者",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.getValue("customerContact")}</span>
    ),
  },
  {
    accessorKey: "salesRep",
    header: "営業主担当者",
    cell: ({ row }) => {
      const salesRep = row.getValue("salesRep") as Case['salesRep'];
      return (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-900">
            {salesRep.avatar}
          </div>
          <span className="text-sm text-gray-900">{salesRep.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastEmailReceived",
    header: "最終メール受信日時",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-gray-500" />
        <span className="text-xs text-gray-600">{row.getValue("lastEmailReceived")}</span>
      </div>
    ),
  },
];

export function CasesPage() {
  const [cases] = useState<Case[]>(getCases());
  const [activeTab, setActiveTab] = useState("assigned");
  const [selectedCases, setSelectedCases] = useState<Case[]>([]);


  return (
    <>
      <Header />
      <div 
        className="min-h-screen"
        style={{ backgroundColor: 'oklch(0.97 0.005 240)' }}
      >
        <div className="container-full">
          <main className="polaris-main">
            {/* ページタイトル */}
            <PageHeader
              title="案件一覧"
              showDescription={false}
              action={
                <Button variant="brand" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  新規案件
                </Button>
              }
            />

            {/* レベル1: ページセクション間 (24px) */}
            <section className="polaris-section space-y-400">
              {/* タブとフィルタエリアを横並び */}
              <div className="flex items-center justify-between gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList variant="brand">
                    <TabsTrigger variant="brand" value="assigned">担当案件</TabsTrigger>
                    <TabsTrigger variant="brand" value="all">すべて</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {/* フィルタエリア（タブの右側に配置） */}
                <div className="flex items-center gap-2">
                  {/* 検索バー */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      variant="brand"
                      placeholder="案件名、企業名、担当者で検索..."
                      className="pl-10 w-80"
                    />
                  </div>
                  
                  {/* ステータスフィルタ */}
                  <Select>
                    <SelectTrigger variant="brand" className="w-32">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent variant="brand">
                      <SelectItem variant="brand" value="all">すべて</SelectItem>
                      <SelectItem variant="brand" value="active">進行中</SelectItem>
                      <SelectItem variant="brand" value="proposal">提案中</SelectItem>
                      <SelectItem variant="brand" value="closing">クロージング</SelectItem>
                      <SelectItem variant="brand" value="closed-won">契約済</SelectItem>
                      <SelectItem variant="brand" value="lead">リード獲得</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* 列表示セレクタ */}
                  <Select defaultValue="columns">
                    <SelectTrigger variant="brand" className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent variant="brand">
                      <SelectItem variant="brand" value="columns">列表示</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* テーブルコンテンツ */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="assigned">
                  <AdvancedDataTable
                    columns={columns}
                    data={cases}
                    {...advancedDataTablePresets.cases}
                    onSelectionChange={setSelectedCases}
                  />
                </TabsContent>
                
                <TabsContent value="all">
                  <AdvancedDataTable
                    columns={columns}
                    data={cases}
                    {...advancedDataTablePresets.cases}
                    onSelectionChange={setSelectedCases}
                  />
                </TabsContent>
              </Tabs>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

// サイドバー付きの案件一覧ページコンポーネント
export function CasesPageWithSidebar() {
  const [cases] = useState<Case[]>(getCases());
  const [activeTab, setActiveTab] = useState("assigned");
  const [selectedCases, setSelectedCases] = useState<Case[]>([]);


  return (
    <div 
      className="h-[calc(100vh-3.5rem)] flex"
      style={{ backgroundColor: 'oklch(0.97 0.005 240)' }}
    >
      {/* 左サイドバー - ナビゲーション */}
      <SaleOnSidebar activeItem="cases" />

      {/* メインコンテンツエリア */}
      <main 
        className="flex-1 overflow-auto overflow-x-hidden"
        style={{ backgroundColor: 'oklch(0.97 0.005 240)' }}
      >
        <div className="p-6 overflow-x-hidden">
          <div className="polaris-section">
            {/* パンクズエリア */}
            <FullWidthBreadcrumb
              size="sm"
              items={[
                { label: 'ホーム', href: '/prototypes/saleon' },
                { label: '案件一覧' }
              ]}
            />
            
            {/* ページヘッダー */}
            <SaleOnPageHeader
              title="案件一覧"
              actions={
                <Button variant="brand" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  新規案件
                </Button>
              }
            />


            {/* タブとフィルタエリアを横並び */}
            <div className="flex items-center justify-between gap-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList variant="brand">
                  <TabsTrigger variant="brand" value="assigned">担当案件</TabsTrigger>
                  <TabsTrigger variant="brand" value="all">すべて</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* フィルタエリア（タブの右側に配置） */}
              <div className="flex items-center gap-2">
                {/* 検索バー */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    variant="brand"
                    placeholder="案件名、企業名、担当者で検索..."
                    className="pl-10 w-80"
                  />
                </div>
                
                {/* ステータスフィルタ */}
                <Select>
                  <SelectTrigger variant="brand" className="w-32">
                    <SelectValue placeholder="ステータス" />
                  </SelectTrigger>
                  <SelectContent variant="brand">
                    <SelectItem variant="brand" value="all">すべて</SelectItem>
                    <SelectItem variant="brand" value="active">進行中</SelectItem>
                    <SelectItem variant="brand" value="proposal">提案中</SelectItem>
                    <SelectItem variant="brand" value="closing">クロージング</SelectItem>
                    <SelectItem variant="brand" value="closed-won">契約済</SelectItem>
                    <SelectItem variant="brand" value="lead">リード獲得</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* 列表示セレクタ */}
                <Select defaultValue="columns">
                  <SelectTrigger variant="brand" className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent variant="brand">
                    <SelectItem variant="brand" value="columns">列表示</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* テーブルコンテンツ */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="assigned">
                <AdvancedDataTable
                  columns={columns}
                  data={cases}
                  {...advancedDataTablePresets.cases}
                  onSelectionChange={setSelectedCases}
                />
              </TabsContent>
              
              <TabsContent value="all">
                <AdvancedDataTable
                  columns={columns}
                  data={cases}
                  {...advancedDataTablePresets.cases}
                  onSelectionChange={setSelectedCases}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}