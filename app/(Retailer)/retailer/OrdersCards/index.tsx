import { FC } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { IRetailerOrders } from '../orders/data';

export const OrdersCards: FC<IRetailerOrders> = ({ title, description, value, footer }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="bg-white p-4">
        <AccordionTrigger className="text-xl uppercase">{title}</AccordionTrigger>
        <AccordionContent className="pt-4 text-orange-500">
          <p className="text-lg mb-4 strong">{description}</p>
          <p className="text-3xl text-orange-600">{value}</p>
          <p>{footer}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
