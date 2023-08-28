'use client';

import { FC, useEffect } from 'react';
import ModalTransparent from '../../../../components/ModalTransparent';
import { Input } from '../../../../components/ui/input';
import { DialogFooter, DialogTitle } from '../../../../components/ui/dialog';
import { Button, buttonVariants } from '../../../../components/ui/button';
import style from './Style.module.css';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import { Calendar } from '../../../../components/ui/calendar';
import useBreakpoint, { Breakpoints } from '@/lib/hooks/useBreakpoint';
import { useFormik } from 'formik';
import PotentialGrowersSchema, { getPotentialGrowersInitalValues } from '../../lib/potentialGrowersSchema';

interface OrderModalProps {
  openModal: boolean;
  onOpenModal?: (open: boolean) => void;
  commodity: string;
  variety: string;
  growingMethodId: number;
}
export const OrderModal: FC<OrderModalProps> = ({ commodity, growingMethodId, variety, onOpenModal, openModal }) => {
  const { is2xl } = useBreakpoint(Breakpoints.DOUBLE_XL);
  const { isXl } = useBreakpoint(Breakpoints.XL);
  const { isLg } = useBreakpoint(Breakpoints.LG);
  const { isMd } = useBreakpoint(Breakpoints.MD);
  const router = useRouter();

  const { setFieldValue, handleChange, handleSubmit, errors, values, touched, dirty } = useFormik({
    initialValues: getPotentialGrowersInitalValues({
      commodity,
      growingMethod: growingMethodId,
      variety,
    }),
    validationSchema: PotentialGrowersSchema,
    onSubmit: (values) => {
      const deliveryDate = new Date(values?.deliveryDateUtc ?? '').getTime();
      router.push(
        `/orders?commodity=${commodity}&growingMethod=${growingMethodId}&variety=${variety}&quantity=${values.quantity}&deliveryDateUtc=${deliveryDate}`
      );
    },
  });

  useEffect(() => {
    setFieldValue('commodity', commodity);
    setFieldValue('variety', variety);
    setFieldValue('growingMethod', growingMethodId);
  }, [commodity, growingMethodId, setFieldValue, variety]);

  console.log('errors', errors);
  console.log('values', values);

  const getSideCalendar = (): 'top' | 'right' | 'bottom' | 'left' => {
    if (is2xl || isXl) {
      return 'right';
    }

    if (isLg) {
      return 'bottom';
    }

    return 'top';
  };

  return (
    <ModalTransparent
      open={openModal}
      onOpenChange={onOpenModal}
      className={cn('sm:max-w-[720px] min-h-[30rem]', is2xl || isXl ? 'mt-0' : 'mt-16')}
      title={
        <DialogTitle className="text-white text-[2.5rem] text-center mt-4">
          To ensure accurate pricing enter order specifics below
        </DialogTitle>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4 px-2 md:px-10">
          <div className="grid grid-cols-1">
            <Input
              id="quantity"
              name="quantity"
              // {...getFieldProps('quantity')}
              placeholder="Quantity Needed"
              type="number"
              className={cn(
                style.input,
                'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white text-xl text-center'
              )}
              onChange={handleChange}
              onBlur={handleChange}
            />
            {(touched.quantity || (errors.quantity && dirty)) && (
              <p className="text-zinc-300 mt-3 text-xl">{errors.quantity}</p>
            )}
          </div>
          <div className="grid grid-cols-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    style.input,
                    'w-full h-20 bg-opacity-80 bg-transparent border-2 text-white  text-center'
                  )}
                >
                  <div className="w-10/12 flex flex-col items-center">
                    {values.deliveryDateUtc ? (
                      <span className="text-2xl ml-0 sm:ml-24">{format(new Date(values.deliveryDateUtc), 'PPP')}</span>
                    ) : (
                      <span className="text-2xl ml-10 md:ml-20">Deliver Date</span>
                    )}
                  </div>
                  <div className="w-2/12 flex flex-col items-end">
                    <CalendarIcon className="mr-2 h-[2.4rem] w-[2.4rem]" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" side={getSideCalendar()} align="center">
                <Calendar
                  classNames={{
                    head_cell: cn('text-muted-foreground font-normal text-[0.8rem] w-full'),
                    day: cn(
                      buttonVariants({ variant: 'ghost' }),
                      'p-0 font-normal aria-selected:opacity-100',
                      is2xl || isXl ? 'h-14 w-14' : isLg ? 'h-[2.7rem] w-[2.7rem]' : isMd ? 'h-12 w-12' : 'h-9 w-9'
                    ),
                    day_selected:
                      'bg-marketplace text-primary-foreground hover:bg-marketplace hover:text-white focus:bg-marketplace-foreground focus:text-marketplace-foreground',
                  }}
                  mode="single"
                  selected={new Date(values.deliveryDateUtc ?? '')}
                  onSelect={(value) => {
                    if (value) {
                      setFieldValue('deliveryDateUtc', value?.toString());
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
              {touched.deliveryDateUtc && errors.deliveryDateUtc && (
                <p className="text-zinc-300 mt-3 text-xl">{errors.deliveryDateUtc}</p>
              )}
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <div className="px-0 md:px-10 w-full">
            <Button className="w-full h-20" type="submit">
              <span className="text-xl">Submit</span>
            </Button>
            <p className="p-4 text-white text-center">All fields are required</p>
          </div>
        </DialogFooter>
      </form>
    </ModalTransparent>
  );
};
