'use client';

import { FC, useState } from 'react';
import ModalTransparent from '../ModalTransparent';
import { Input } from '../ui/input';
import { DialogFooter, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import style from './Style.module.css';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface OrderModalProps {
  openModal: boolean;
  onOpenModal?: (open: boolean) => void;
}
export const OrderModal: FC<OrderModalProps> = ({ onOpenModal, openModal }) => {
  const [date, setDate] = useState<Date>();
  return (
    <ModalTransparent
      open={openModal}
      onOpenChange={onOpenModal}
      className="sm:max-w-[720px] min-h-[30rem]"
      title={
        <DialogTitle className="text-white  text-[2.5rem] text-center mt-4">
          To ensure accurate pricing enter order specifics below
        </DialogTitle>
      }
      // description={
      //   <DialogDescription className="text-white text-xl text-center">
      //     Connecting Growers + Retailers + Carriers
      //   </DialogDescription>
      // }
    >
      <div className="grid gap-4 py-4 px-10">
        <div className="grid grid-cols-1">
          <Input
            id="quantity"
            type="number"
            name="quantity"
            className={cn(
              style.input,
              'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
            )}
            placeholder="Quantity Needed"
          />
        </div>
        <div className="grid grid-cols-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  style.input,
                  'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <DialogFooter>
        <div className="px-10 w-full">
          <Button className="w-full h-20" type="submit">
            <span className="text-xl">Submit</span>
          </Button>
          <p className="p-4 text-white text-center">All fields are required</p>
        </div>
      </DialogFooter>
    </ModalTransparent>
  );
};
