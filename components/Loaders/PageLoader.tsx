import React from 'react';
import { SpinClockwiseLoader } from '@/components/Loaders/SpinClockwise';
import { useDomainConfigQuery } from '@/hooks/queries/useDomainConfigQuery';

const PageLoader = () => {
  const { data } = useDomainConfigQuery();

  return (
    <div className="flex items-center justify-center h-screen">
      <SpinClockwiseLoader spinnerStyles={{ color: data?.primaryColor }} />
    </div>
  );
};

export default PageLoader;
