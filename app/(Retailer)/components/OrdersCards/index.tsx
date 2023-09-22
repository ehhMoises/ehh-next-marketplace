'use client';

import { FC } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useGetDashboardQuery } from '@/app/(Grower)/hooks/queries/useDashboard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { AwesomeLoaderSize } from '@/components/Loaders/loader-size.constant';

export const OrdersCards: FC = () => {
  const { data, isLoading, isError } = useGetDashboardQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <SpinClockwiseLoader loaderSize={AwesomeLoaderSize.LARGE} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg m-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error loading Dashboard, please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <Accordion type="single" collapsible typeof="single" defaultValue="item-1">
        <AccordionItem value="item-1" className="bg-white p-4">
          <AccordionTrigger className="text-xl uppercase">Completed</AccordionTrigger>
          <AccordionContent className="pt-4 text-orange-500">
            <p className="text-3xl text-orange-600">{data.completed}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible typeof="single" defaultValue="item-1">
        <AccordionItem value="item-1" className="bg-white p-4">
          <AccordionTrigger className="text-xl uppercase">In Transit</AccordionTrigger>
          <AccordionContent className="pt-4 text-orange-500">
            <p className="text-3xl text-orange-600">{data.inTransit}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible typeof="single" defaultValue="item-1">
        <AccordionItem value="item-1" className="bg-white p-4">
          <AccordionTrigger className="text-xl uppercase">Fulfillment</AccordionTrigger>
          <AccordionContent className="pt-4 text-orange-500">
            <p className="text-3xl text-orange-600">{data.fulfillment}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible typeof="single" defaultValue="item-1">
        <AccordionItem value="item-1" className="bg-white p-4">
          <AccordionTrigger className="text-xl uppercase">Pending</AccordionTrigger>
          <AccordionContent className="pt-4 text-orange-500">
            <p className="text-3xl text-orange-600">{data.pending}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
