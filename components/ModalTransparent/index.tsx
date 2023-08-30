import { CSSProperties, FC, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { cn } from '@/lib/utils';

interface ModalTransparentProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: CSSProperties;
}

const ModalTransparent: FC<ModalTransparentProps> = ({
  title,
  description,
  children,
  open,
  onOpenChange,
  className,
  style,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent style={style} className={cn('bg-black bg-opacity-60 !rounded-none', className)}>
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
