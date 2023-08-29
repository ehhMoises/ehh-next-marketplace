'use client';

import { FC } from 'react';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Data } from './data';

export const PackSizeTable: FC = () => {
  return (
    <div>
      <div className="bg-orange-500 p-4 text-white">Pack Size Table</div>
      <DataTable columns={columns} data={Data} />
    </div>
  );
};
