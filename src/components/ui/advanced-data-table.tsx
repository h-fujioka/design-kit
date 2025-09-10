"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    RowSelectionState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { cva, type VariantProps } from "class-variance-authority"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    RefreshCw,
    Search
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const advancedDataTableVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        brand: "",
        minimal: "",
      },
      size: {
        default: "",
        compact: "",
        spacious: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface AdvancedDataTableProps<TData, TValue> extends VariantProps<typeof advancedDataTableVariants> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  
  // 検索・フィルタ機能
  searchKey?: string
  searchPlaceholder?: string
  enableGlobalFilter?: boolean
  enableColumnFilters?: boolean
  
  // ソート機能
  enableSorting?: boolean
  enableMultiSort?: boolean
  
  // ページネーション
  enablePagination?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  
  // 行選択
  enableRowSelection?: boolean
  enableMultiRowSelection?: boolean
  onSelectionChange?: (selectedRows: TData[]) => void
  
  // 列表示
  enableColumnVisibility?: boolean
  enableColumnResizing?: boolean
  
  // エクスポート
  enableExport?: boolean
  onExport?: (data: TData[], format: 'csv' | 'excel' | 'json') => void
  
  // その他
  className?: string
  loading?: boolean
  emptyMessage?: string
  
  // カスタムフィルタ
  customFilters?: {
    key: string
    label: string
    type: 'select' | 'text' | 'date' | 'number'
    options?: { label: string; value: string }[]
  }[]
  
  // アクション
  actions?: React.ReactNode
  onRefresh?: () => void
}

function AdvancedDataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "検索...",
  enableGlobalFilter = true,
  enableColumnFilters = true,
  enableSorting = true,
  enableMultiSort = false,
  enablePagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  enableRowSelection = false,
  enableMultiRowSelection = true,
  onSelectionChange,
  enableColumnVisibility = true,
  enableColumnResizing = false,
  enableExport = false,
  onExport,
  className,
  loading = false,
  emptyMessage = "データが見つかりません",
  customFilters = [],
  actions,
  onRefresh,
  variant = "default",
  size = "default",
}: AdvancedDataTableProps<TData, TValue>) {
  
  // 状態管理
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  })

  // テーブルの初期化
  const table = useReactTable({
    data,
    columns,
    getRowId: (row, index) => {
      return (row as any).id || index.toString();
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: enableMultiRowSelection,
    enableSorting: enableSorting,
    enableMultiSort: enableMultiSort,
    enableColumnResizing: enableColumnResizing,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  })

  // 選択状態の変更を親コンポーネントに通知
  React.useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original)
      onSelectionChange(selectedRows)
    }
  }, [rowSelection, onSelectionChange, table])

  // フィルタクリア機能
  const clearAllFilters = () => {
    setColumnFilters([])
    setGlobalFilter("")
  }

  // エクスポート機能
  const handleExport = (format: 'csv' | 'excel' | 'json') => {
    if (onExport) {
      const selectedData = table.getFilteredSelectedRowModel().rows.length > 0 
        ? table.getFilteredSelectedRowModel().rows.map(row => row.original)
        : table.getFilteredRowModel().rows.map(row => row.original)
      onExport(selectedData, format)
    }
  }

  // アクティブフィルタ数
  const activeFiltersCount = columnFilters.length + (globalFilter ? 1 : 0)

  return (
    <div className={cn(advancedDataTableVariants({ variant, size, className }))}>

      {/* 検索・フィルタエリア */}
      <div className="flex items-center space-x-2">
        {/* グローバル検索 */}
        {enableGlobalFilter && searchKey && (
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-10"
                variant={variant === "brand" ? "brand" : "default"}
              />
            </div>
          </div>
        )}

        {/* カスタムフィルタ */}
        {enableColumnFilters && customFilters.map((filter) => {
          const column = table.getColumn(filter.key)
          return (
            <div key={filter.key}>
              {filter.type === 'select' && filter.options ? (
                <Select
                  value={(column?.getFilterValue() as string) ?? "all"}
                  onValueChange={(value) => column?.setFilterValue(value === "all" ? "" : value)}
                >
                  <SelectTrigger variant={variant === "brand" ? "brand" : "default"}>
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent variant={variant === "brand" ? "brand" : "default"}>
                    <SelectItem value="all" variant={variant === "brand" ? "brand" : "default"}>{filter.label}</SelectItem>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value} variant={variant === "brand" ? "brand" : "default"}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  placeholder={filter.label}
                  value={(column?.getFilterValue() as string) ?? ""}
                  onChange={(event) => column?.setFilterValue(event.target.value)}
                  variant={variant === "brand" ? "brand" : "default"}
                />
              )}
            </div>
          )
        })}

        {/* 列表示切り替え */}
        {enableColumnVisibility && (
          <Select
            value="column-visibility"
            onValueChange={() => {}}
          >
            <SelectTrigger variant={variant === "brand" ? "brand" : "default"}>
              <SelectValue placeholder="列表示" />
            </SelectTrigger>
            <SelectContent variant={variant === "brand" ? "brand" : "default"}>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <SelectItem 
                      key={column.id} 
                      value={column.id}
                      variant={variant === "brand" ? "brand" : "default"}
                      onSelect={() => column.toggleVisibility()}
                    >
                      {column.getIsVisible() ? "✓ " : ""}{column.id}
                    </SelectItem>
                  )
                })}
            </SelectContent>
          </Select>
        )}

      </div>


      {/* テーブル */}
      <div className="rounded-md border">
        <Table variant={variant}>
          <TableHeader variant={variant}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                    読み込み中...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    variant === "brand" && row.getIsSelected() && 
                    "bg-white dark:bg-white"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ページネーション */}
      {enablePagination && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              ページ {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">最初のページに移動</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">前のページに移動</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">次のページに移動</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">最後のページに移動</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { AdvancedDataTable, advancedDataTableVariants, type AdvancedDataTableProps }
