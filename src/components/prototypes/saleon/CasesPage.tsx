"use client";

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { PageShell } from '@/components/shared/page-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { PageHeader } from '@/components/ui/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColumnDef } from "@tanstack/react-table";
import { Bookmark, Mail, Plus } from 'lucide-react';
import { useState } from 'react';
import { Case, getCases, statusColors, statusLabels } from './data';


const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "title",
    header: "案件名",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <a 
          href={`/cases/${row.original.id}`}
          className="font-medium text-brand-600 hover:text-brand-800 hover:underline"
        >
          {row.getValue("title")}
        </a>
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
      <span className="font-medium">{row.getValue("company")}</span>
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
      <span>{row.getValue("customerContact")}</span>
    ),
  },
  {
    accessorKey: "salesRep",
    header: "営業主担当者",
    cell: ({ row }) => {
      const salesRep = row.getValue("salesRep") as Case['salesRep'];
      return (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium text-brand-800">
            {salesRep.avatar}
          </div>
          <span>{salesRep.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastEmailReceived",
    header: "最終メール受信日時",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted" />
        <span className="text-sm">{row.getValue("lastEmailReceived")}</span>
      </div>
    ),
  },
];

export function CasesPage() {
  const [cases] = useState<Case[]>(getCases());
  const [activeTab, setActiveTab] = useState("assigned");

  // フィルタオプション
  const filterOptions = {
    status: [
      { label: '進行中', value: 'active' },
      { label: '提案中', value: 'proposal' },
      { label: 'クロージング', value: 'closing' },
      { label: '契約済', value: 'closed-won' },
      { label: 'リード獲得', value: 'lead' },
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
              title="案件一覧"
              showDescription={false}
              action={
                <Button variant="brand" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  新規案件
                </Button>
              }
            />

            {/* タブ */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-300">
              <TabsList variant="brand">
                <TabsTrigger variant="brand" value="assigned">担当案件</TabsTrigger>
                <TabsTrigger variant="brand" value="all">すべて</TabsTrigger>
              </TabsList>
              
              <TabsContent value="assigned">
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
              </TabsContent>
              
              <TabsContent value="all">
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
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </PageShell>
      <Footer />
    </>
  );
}