'use client';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus, Minus, CalendarIcon } from 'lucide-react';
import { FC, ReactNode, useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import ReactSlider from 'react-slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CollapsibleAdvancedFilterBrandProps {
  label: string;
  children: ReactNode;
}
const CollapsibleAdvancedFilterBrand: FC<CollapsibleAdvancedFilterBrandProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <h4 className={cn('text-sm font-semibold', isOpen ? 'text-marketplace' : 'text-stone-400')}>{label}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? <Minus className="h-4 w-4 text-marketplace" /> : <Plus className="h-4 w-4 text-stone-400" />}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2 transition-all">{children}</CollapsibleContent>
    </Collapsible>
  );
};

const AdvancedFilterBrand: FC = () => {
  const [date, setDate] = useState<Date>();
  const [rangePrice, setRangePrice] = useState([1, 560]);

  return (
    <section className="flex flex-col gap-y-3">
      <CollapsibleAdvancedFilterBrand key="commodityAdvancedSearch" label="Commodity">
        <RadioGroup name="commodity-advanced">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="apples-1" id="r1" />
            <Label htmlFor="apples-1" className="text-stone-500">
              Apple
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="apricot-2" id="r2" />
            <Label htmlFor="apricot-2" className="text-stone-500">
              Apricot
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bannana-3" id="r3" />
            <Label htmlFor="bannana-3" className="text-stone-500">
              Bannana
            </Label>
          </div>
        </RadioGroup>
      </CollapsibleAdvancedFilterBrand>

      <CollapsibleAdvancedFilterBrand key="varietyAdvancedSearch" label="Variety">
        <RadioGroup name="variety-advanced">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-1" id="r1" />
            <Label htmlFor="all-1" className="text-stone-500">
              All Varieties
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="granny-smith-2" id="granny-smith-r2" />
            <Label htmlFor="granny-smith-2" className="text-stone-500">
              Granny Smith
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="red-deli-3" id="red-delicious-r3" />
            <Label htmlFor="red-deli-3" className="text-stone-500">
              Red Delicious
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="walla-walla-3" id="walla-walla-r3" />
            <Label htmlFor="walla-walla-3" className="text-stone-500">
              Walla Walla
            </Label>
          </div>
        </RadioGroup>
      </CollapsibleAdvancedFilterBrand>

      <CollapsibleAdvancedFilterBrand key="subVarietyAdvancedSearch" label="Sub Variety">
        <RadioGroup name="sub-variety-advanced">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-sub-varieties" id="r1" />
            <Label htmlFor="all-1" className="text-stone-500">
              All Sub Varieties
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="granny-smith-2" id="granny-smith-r2" />
            <Label htmlFor="granny-smith-2" className="text-stone-500">
              Granny Smith
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="red-deli-3" id="red-delicious-r3" />
            <Label htmlFor="red-deli-3" className="text-stone-500">
              Red Delicious
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="walla-walla-3" id="walla-walla-r3" />
            <Label htmlFor="walla-walla-3" className="text-stone-500">
              Walla Walla
            </Label>
          </div>
        </RadioGroup>
      </CollapsibleAdvancedFilterBrand>

      <CollapsibleAdvancedFilterBrand key="packSizeAdvancedSearch" label="Pack Size">
        <RadioGroup name="pack-size-advanced">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-sub-varieties" id="r1" />
            <Label htmlFor="all-pack-size-1" className="text-stone-500">
              All Pack Sizes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pack-size-1" id="pack-size-r2" />
            <Label htmlFor="pack-size-1" className="text-stone-500">
              Pack Size 1
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pack-size-2" id="pack-size-r2" />
            <Label htmlFor="pack-size-2" className="text-stone-500">
              Pack Size 2
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pack-size-3" id="pack-size-r2" />
            <Label htmlFor="pack-size-3" className="text-stone-500">
              Pack Size 3
            </Label>
          </div>
        </RadioGroup>
      </CollapsibleAdvancedFilterBrand>

      <CollapsibleAdvancedFilterBrand key="packStyleAdvancedSearch" label="Pack Style">
        <RadioGroup name="pack-style-advanced">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-pack-style" id="all-pack-style" />
            <Label htmlFor="all-pack-style" className="text-stone-500">
              All Pack Style
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pack-style-1" id="pack-style-r2" />
            <Label htmlFor="pack-style-1" className="text-stone-500">
              Pack Style 1
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pack-style-2" id="pack-style-r2" />
            <Label htmlFor="pack-style-2" className="text-stone-500">
              Pack Style 2
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pack-style-3" id="pack-style-r2" />
            <Label htmlFor="pack-style-3" className="text-stone-500">
              Pack Style 3
            </Label>
          </div>
        </RadioGroup>
      </CollapsibleAdvancedFilterBrand>

      <CollapsibleAdvancedFilterBrand key="growingMethodAdvancedSearch" label="Growing Method">
        <RadioGroup name="growing-method-advanced">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-growing-method" id="all-growing-method" />
            <Label htmlFor="all-growing-method" className="text-stone-500">
              All Growing Method
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="conventional-1" id="conventional-r2" />
            <Label htmlFor="conventional-1" className="text-stone-500">
              Conventional
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="organic-1" id="organic-r2" />
            <Label htmlFor="organic-1" className="text-stone-500">
              Organic
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hydroponic-1" id="hydroponic-r2" />
            <Label htmlFor="hydroponic-1" className="text-stone-500">
              Hydroponic
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pesticide-free-1" id="pesticide-free-r2" />
            <Label htmlFor="pesticide-free-1" className="text-stone-500">
              Pesticide Free
            </Label>
          </div>
        </RadioGroup>
      </CollapsibleAdvancedFilterBrand>

      <Separator orientation="horizontal" />

      <CollapsibleAdvancedFilterBrand key="quantityAdvancedSearch" label="Quantity Needed">
        <Input type="number" min={1} placeholder="Enter Quantity Needed" name="quantity-advanced" />
      </CollapsibleAdvancedFilterBrand>

      <CollapsibleAdvancedFilterBrand key="deliverDateSearch" label="Deliver Date">
        <Popover>
          <PopoverTrigger className="rounded-none" asChild>
            <Button
              variant={'outline'}
              className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Deliver Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </CollapsibleAdvancedFilterBrand>

      <Separator orientation="horizontal" />

      <div key="priceRangeAdvancedSearch" className="flex flex-col gap-y-5">
        <span className="text-stone-400 text-sm font-semibold">Price Range</span>
        <div>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="price-range"
            trackClassName="h-2 w-auto grow overflow-hidden rounded-full bg-stone-400 mt-2"
            value={rangePrice}
            min={1}
            max={560}
            ariaLabel={['Min Price', 'Max Price']}
            onChange={(values) => {
              setRangePrice(values);
            }}
            renderThumb={(props, state) => {
              const { key, ...rest } = props;
              return (
                <div key={key} {...rest}>
                  <div className="block h-6 w-6 rounded-sm border-2 border-stone-400 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <div className="flex flex-row items-center justify-center mt-[0.2rem] text-stone-400">
                      {state.index === 0 ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </div>
                </div>
              );
            }}
            pearling
            minDistance={9}
          />
        </div>

        <div className="flex flex-row justify-between mt-2">
          <span className="text-stone-400">${rangePrice[0]}</span>
          <span className="text-stone-400">${rangePrice[1]}</span>
        </div>
      </div>
    </section>
  );
};

export { AdvancedFilterBrand };
