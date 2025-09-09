"use client"

import {
    ColumnDef,
    ColumnFiltersState,
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
import { Filter, Save, Search, X } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
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

const dataTableVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        brand: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface DataTableProps<TData, TValue> extends VariantProps<typeof dataTableVariants> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  showColumnVisibility?: boolean
  showPagination?: boolean
  showAdvancedFilters?: boolean
  className?: string
  onSelectionChange?: (selectedRows: TData[]) => void
  enableRowSelection?: boolean
  // フィルタ関連のprops
  filterOptions?: {
    status?: { label: string; value: string }[]
    dateRange?: boolean
    customFilters?: { key: string; label: string; options: { label: string; value: string }[] }[]
  }
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "検索...",
  showColumnVisibility = true,
  showPagination = true,
  showAdvancedFilters = true,
  variant = "default",
  className,
  onSelectionChange,
  enableRowSelection = false,
  filterOptions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [savedFilters, setSavedFilters] = React.useState<Record<string, any>>({})

  const table = useReactTable({
    data,
    columns,
    getRowId: (row, index) => {
      // データにidプロパティがある場合はそれを使用、なければindexを使用
      return (row as any).id || index.toString();
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: enableRowSelection,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
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

  // 保存済みフィルタ機能
  const saveCurrentFilters = () => {
    const filterName = prompt("フィルタ名を入力してください:")
    if (filterName) {
      setSavedFilters(prev => ({
        ...prev,
        [filterName]: {
          columnFilters,
          globalFilter,
        }
      }))
    }
  }

  const applySavedFilter = (filterName: string) => {
    const savedFilter = savedFilters[filterName]
    if (savedFilter) {
      setColumnFilters(savedFilter.columnFilters)
      setGlobalFilter(savedFilter.globalFilter)
    }
  }

  const activeFiltersCount = columnFilters.length + (globalFilter ? 1 : 0)

  // デバッグ用ログ
  console.log('DataTable variant:', variant)
  console.log('DataTable enableRowSelection:', enableRowSelection)
  console.log('DataTable rowSelection:', rowSelection)
  console.log('DataTable selected rows count:', table.getFilteredSelectedRowModel().rows.length)
  console.log('DataTable all rows:', table.getRowModel().rows.map(row => ({ id: row.id, selected: row.getIsSelected() })))

  return (
    <div className={cn(dataTableVariants({ variant, className }))}>
      {/* フィルタ・検索エリア */}
      <div className="space-y-4">
        {/* 検索バー */}
        <div className="flex items-center gap-4">
          {searchKey && (
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
          
          {/* フィルタボタン */}
          {showAdvancedFilters && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="brandOutline" className="relative" data-variant="brandOutline">
                  <Filter className="mr-2 h-4 w-4" />
                  フィルタ
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>フィルタオプション</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* ステータスフィルタ */}
                {filterOptions?.status && (
                  <div className="p-2">
                    <label className="text-sm font-medium mb-2 block">ステータス</label>
                    <Select
                      value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                      onValueChange={(value) => table.getColumn("status")?.setFilterValue(value)}
                      data-variant="brand"
                    >
                      <SelectTrigger variant="brand" className="w-full" data-variant="brand">
                        <SelectValue placeholder="すべてのステータス" />
                      </SelectTrigger>
                      <SelectContent variant="brand" data-variant="brand">
                        <SelectItem value="" variant="brand" data-variant="brand">すべてのステータス</SelectItem>
                        {filterOptions.status.map((option) => (
                          <SelectItem key={option.value} value={option.value} variant="brand" data-variant="brand">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* カスタムフィルタ */}
                {filterOptions?.customFilters?.map((filter) => {
                  // 列を取得（accessorKeyまたはidで検索）
                  const column = table.getColumn(filter.key) || 
                    table.getAllColumns().find(col => 
                      (col.columnDef as any).accessorKey === filter.key || 
                      col.id === filter.key
                    )
                  
                  return (
                  <div key={filter.key} className="p-2">
                    <label className="text-sm font-medium mb-2 block">{filter.label}</label>
                    <Select
                      value={(column?.getFilterValue() as string) ?? ""}
                      onValueChange={(value) => column?.setFilterValue(value)}
                      data-variant="brand"
                    >
                      <SelectTrigger variant="brand" className="w-full" data-variant="brand">
                        <SelectValue placeholder={`すべての${filter.label}`} />
                      </SelectTrigger>
                      <SelectContent variant="brand" data-variant="brand">
                        <SelectItem value="" variant="brand" data-variant="brand">すべての{filter.label}</SelectItem>
                        {filter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value} variant="brand" data-variant="brand">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  )
                })}

                <DropdownMenuSeparator />
                
                {/* フィルタ操作 */}
                <div className="p-2 space-y-2">
                  <Button
                    variant="brandOutline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="w-full"
                  >
                    <X className="mr-2 h-4 w-4" />
                    フィルタをクリア
                  </Button>
                  
                  <Button
                    variant="brandOutline"
                    size="sm"
                    onClick={saveCurrentFilters}
                    className="w-full"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    フィルタを保存
                  </Button>
                </div>

                {/* 保存済みフィルタ */}
                {Object.keys(savedFilters).length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>保存済みフィルタ</DropdownMenuLabel>
                    {Object.keys(savedFilters).map((filterName) => (
                      <DropdownMenuItem
                        key={filterName}
                        onClick={() => applySavedFilter(filterName)}
                      >
                        {filterName}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* 列表示切り替え */}
          {showColumnVisibility && (
            <Select
              value=""
              onValueChange={(value) => {
                if (value === "all") {
                  table.getAllColumns().forEach(column => column.toggleVisibility(true))
                } else if (value === "none") {
                  table.getAllColumns().forEach(column => column.toggleVisibility(false))
                } else {
                  const column = table.getColumn(value)
                  if (column) {
                    column.toggleVisibility()
                  }
                }
              }}
              data-variant="brand"
            >
              <SelectTrigger variant="brand" className="w-32" data-variant="brand">
                <SelectValue placeholder="列表示" />
              </SelectTrigger>
              <SelectContent variant="brand" data-variant="brand">
                <SelectItem value="all" variant="brand" data-variant="brand">すべて表示</SelectItem>
                <SelectItem value="none" variant="brand" data-variant="brand">すべて非表示</SelectItem>
                <SelectItem value="separator" variant="brand" data-variant="brand" disabled>────────</SelectItem>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <SelectItem 
                        key={column.id} 
                        value={column.id} 
                        variant="brand" 
                        data-variant="brand"
                        className={column.getIsVisible() ? "bg-brand-50 dark:bg-brand-900/20" : ""}
                      >
                        {column.getIsVisible() ? "✓ " : ""}{column.id}
                      </SelectItem>
                    )
                  })}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* アクティブフィルタ表示 */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">アクティブフィルタ:</span>
            {globalFilter && (
              <Badge variant="secondary" className="gap-1">
                検索: {globalFilter}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setGlobalFilter("")}
                />
              </Badge>
            )}
            {columnFilters.map((filter) => (
              <Badge key={filter.id} variant="secondary" className="gap-1">
                {filter.id}: {String(filter.value)}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => table.getColumn(filter.id)?.setFilterValue("")}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mt-300">
        {/* テーブル */}
        <div className="rounded-md border">
          <Table variant={variant} className={cn("bg-white [&_tr]:bg-white [&_tr:hover]:bg-white [&_th]:bg-white", className)}>
            <TableHeader variant={variant}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                        key={header.id} 
                        className="px-3"
                        style={{
                          width: header.getSize(),
                          minWidth: header.column.columnDef.minSize,
                          maxWidth: header.column.columnDef.maxSize,
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      variant === "brand" && row.getIsSelected() && 
                      "bg-brand-100 dark:bg-brand-900/20 ring-2 ring-brand-500/50"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        className="px-3"
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.columnDef.minSize,
                          maxWidth: cell.column.columnDef.maxSize,
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
                    className="h-24 text-center p-2"
                  >
                    結果が見つかりません
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ページネーション */}
      {showPagination && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} / {" "}
            {table.getFilteredRowModel().rows.length} 行選択中
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">
              ページ {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              前へ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              次へ
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataTable, dataTableVariants, type DataTableProps }
