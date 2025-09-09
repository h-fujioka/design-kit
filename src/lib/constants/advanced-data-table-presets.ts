import { CustomFilter } from "@/components/ui/advanced-data-table";

// Advanced Data Tableの共通設定プリセット
export const advancedDataTablePresets = {
  // デフォルト設定
  default: {
    searchKey: "name",
    searchPlaceholder: "検索...",
    variant: "brand" as const,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
    enableMultiSort: true,
    enablePagination: true,
    pageSize: 10,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableColumnVisibility: true,
    enableColumnResizing: false,
    enableExport: false,
    emptyMessage: "データが見つかりません",
  },

  // 案件管理用設定
  cases: {
    searchKey: "title",
    searchPlaceholder: "案件名、企業名、担当者で検索...",
    variant: "brand" as const,
    enableGlobalFilter: false,
    enableColumnFilters: false,
    enableSorting: true,
    enableMultiSort: true,
    enablePagination: true,
    pageSize: 10,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableColumnVisibility: false,
    enableColumnResizing: false,
    enableExport: false,
    emptyMessage: "案件が見つかりません",
  },

  // スタイルガイド用設定
  styleguide: {
    searchKey: "name",
    searchPlaceholder: "案件名、企業名、担当者で検索...",
    variant: "brand" as const,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
    enableMultiSort: true,
    enablePagination: true,
    pageSize: 10,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableColumnVisibility: true,
    enableColumnResizing: false,
    enableExport: false,
    customFilters: [
      {
        key: "status",
        label: "ステータス",
        type: "select" as const,
        options: [
          { label: '進行中', value: 'active' },
          { label: '提案中', value: 'proposal' },
          { label: 'クロージング', value: 'closing' },
          { label: '契約済', value: 'closed-won' },
          { label: 'リード獲得', value: 'lead' },
        ],
      },
    ] as CustomFilter[],
    emptyMessage: "案件が見つかりません",
  },
} as const;

// 型定義
export type AdvancedDataTablePreset = typeof advancedDataTablePresets[keyof typeof advancedDataTablePresets];
