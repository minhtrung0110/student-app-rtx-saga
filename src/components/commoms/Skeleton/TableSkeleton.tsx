import React from 'react';
import { Skeleton, Table } from 'antd';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 3 }) => {
  const skeletonData = Array.from({ length: rows }).map((_, rowIndex) =>
    Array.from({ length: columns }).map((__, colIndex) => ({
      key: `row-${rowIndex}-col-${colIndex}`,
    })),
  );

  return (
    <Table
      dataSource={skeletonData}
      columns={Array.from({ length: columns }).map((_, index) => ({
        dataIndex: `col-${index}`,
        render: () => <Skeleton active />,
      }))}
      pagination={false}
    />
  );
};

export default TableSkeleton;
