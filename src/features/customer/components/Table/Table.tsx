// libraries
import React, { FC } from 'react';
import {
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table';
import { compareItems, RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { Input, Select } from 'antd';

// styles
import { ButtonRTStyled, FooterTableStyled, PaginationStyled, TabFooter } from './Table.styles';

// Components
import Filter from 'src/features/customer/components/Filter/Filter';

interface TableProps {
  columns: any[];
  defaultData: any;
  onFilter: any;
}

const items = [
  { value: 10, label: 'Show 10' },
  { value: 20, label: 'Show 20' },
  { value: 30, label: 'Show 30' },
  { value: 40, label: 'Show 40' },
];
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }

  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!,
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
const TableCustom: FC<TableProps> = ({ columns, defaultData, onFilter }) => {
  const rerender = React.useReducer(() => ({}), {})[1];
  //  const [data, setData] = useState<Student[]>(defaultData);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data: defaultData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const handleChange = e => {
    const pageSize = Number(e.target?.value);
    if (!isNaN(pageSize)) {
      table.setPageSize(pageSize);
    }
  };
  console.log('Testing table:', table.getHeaderGroups(), table.getRowModel());
  return (
    <>
      <table style={{ tableLayout: 'auto' }}>
        <colgroup></colgroup>
        <thead className="ant-table-thead">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className="ant-table-cell">
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none ant-table-cell'
                              : 'ant-table-cell',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} onFilter={onFilter} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="ant-table-tbody">
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id} className="ant-table-row ant-table-row-level-0">
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} className="ant-table-cell">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <FooterTableStyled className="flex items-center gap-2">
        <PaginationStyled>
          <ButtonRTStyled
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </ButtonRTStyled>
          <ButtonRTStyled
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </ButtonRTStyled>
          <ButtonRTStyled
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </ButtonRTStyled>
          <ButtonRTStyled
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </ButtonRTStyled>
        </PaginationStyled>
        <TabFooter>
          <div className={'title'}>Page:</div>
          <div className={'content'}>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
        </TabFooter>
        <TabFooter>
          <span className={'title'}>Go to page: </span>
          <Input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </TabFooter>
        <Select
          value={table.getState().pagination.pageSize}
          onChange={handleChange}
          options={items}
        />
        <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      </FooterTableStyled>
    </>
  );
};

export default TableCustom;
