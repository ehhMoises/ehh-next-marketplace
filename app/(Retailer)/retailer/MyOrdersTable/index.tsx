'use client';

import { FC } from 'react';
import { columns } from './columns';
import { data } from './data';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/DataTable';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const MyOrdersTable: FC = () => {
  const router = useRouter();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="bg-orange-500 p-4 text-white">My Orders Table</AccordionTrigger>
        <AccordionContent>
          <DataTable columns={columns} data={data} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
