// Libraries
import React, { FC } from 'react';
import { ColumnDef } from '@tanstack/react-table';

// Models
import { Student } from 'src/models';

// Components
import TableSkeleton from 'src/components/commoms/Skeleton/TableSkeleton';
import TableCustom from 'src/features/customer/components/Table/Table';

// Hooks
import { useCustomerQueries } from 'src/features/customer/customerQuery';

const ManageCustomerPage: FC = () => {
  // query
  const query = useCustomerQueries();

  // tans tack table
  const columns = React.useMemo<ColumnDef<Student, any>[]>(
    () => [
      {
        header: 'Name',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'first_name',
            header: 'First Name',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.last_name,
            id: 'lastName',
            header: 'Last Name',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            accessorFn: row => `${row.first_name} ${row.last_name}`,
            id: 'fullName',
            header: 'Full Name',
            cell: info => info.getValue(),
            footer: props => props.column.id,
            filterFn: 'fuzzy',
            // sortingFn: fuzzySort,
          },
        ],
      },

      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'phone',
            header: () => 'Phone',
            footer: props => props.column.id,
          },
          {
            accessorKey: 'mail',
            header: () => <span>Email</span>,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'address',
            header: 'Address',
            footer: props => props.column.id,
          },
        ],
      },
    ],
    [],
  );

  return (
    <div>
      {query.isLoading ? (
        <TableSkeleton />
      ) : (
        <TableCustom columns={columns} defaultData={query.data} />
      )}
    </div>
  );
};

export default ManageCustomerPage;
