import { FC, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { cn } from '@/lib/utils';

interface ModalTransparentProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ModalTransparent: FC<ModalTransparentProps> = ({
  title,
  description,
  children,
  open,
  onOpenChange,
  className,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('bg-black bg-opacity-60 !rounded-none', className)}>
        <DialogHeader>
          {title}
          {description}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalTransparent;
