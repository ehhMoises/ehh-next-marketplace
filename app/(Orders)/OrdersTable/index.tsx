import { FC } from 'react';
import { DataTable } from './DataTable';
import { columns } from './columns';
import { data } from './data';

export const OrdersTable: FC = () => {
  return (
    <div className="m-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
