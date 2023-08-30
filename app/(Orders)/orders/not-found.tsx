import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-x-6 mt-32">
        <Link className="text-xl" href="/search">
          <Button className="h-16 px-16">Go Back Shopping</Button>
        </Link>
      </div>

      <div className="mt-10">
        <p className="text-6xl text-center text-stone-500">No Grower Results</p>
      </div>
    </div>
  );
}
