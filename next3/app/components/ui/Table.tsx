import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  skeletonRows?: number;
  onRowClick?: (item: T) => void;
  className?: string;
  emptyState?: React.ReactNode;
  rowKey: keyof T | ((data: T) => string);
  pagination?: React.ReactNode;
}

export default function Table<T>({
  data,
  columns,
  isLoading = false,
  skeletonRows = 5,
  onRowClick,
  className = '',
  emptyState,
  rowKey,
  pagination,
}: TableProps<T>) {
  // Function to get row key
  const getRowKey = (item: T): string => {
    if (typeof rowKey === 'function') {
      return rowKey(item);
    }
    return String(item[rowKey]);
  };

  // Function to get cell value
  const getCellValue = (item: T, accessor: Column<T>['accessor']): React.ReactNode => {
    if (typeof accessor === 'function') {
      return accessor(item);
    }
    return String(item[accessor as keyof T]);
  };

  // Render loading skeleton
  const renderSkeleton = () => {
    return Array.from({ length: skeletonRows }).map((_, index) => (
      <tr key={`skeleton-${index}`}>
        {columns.map((column, colIndex) => (
          <td key={`skeleton-cell-${colIndex}`}>
            <div className="h-4 bg-base-300 rounded animate-pulse"></div>
          </td>
        ))}
      </tr>
    ));
  };

  // Render empty state
  const renderEmptyState = () => {
    if (emptyState) {
      return (
        <tr>
          <td colSpan={columns.length} className="text-center py-8">
            {emptyState}
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan={columns.length} className="text-center py-8 text-base-content/60">
          No data available
        </td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className={`table ${className}`}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`header-${index}`} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            renderSkeleton()
          ) : data.length === 0 ? (
            renderEmptyState()
          ) : (
            data.map((item) => (
              <tr 
                key={getRowKey(item)} 
                onClick={() => onRowClick && onRowClick(item)}
                className={onRowClick ? 'cursor-pointer hover:bg-base-200' : ''}
              >
                {columns.map((column, index) => (
                  <td key={`cell-${getRowKey(item)}-${index}`} className={column.className}>
                    {getCellValue(item, column.accessor)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && !isLoading && data.length > 0 && (
        <div className="mt-4 flex justify-center">
          {pagination}
        </div>
      )}
    </div>
  );
} 