import { FC } from 'react';
// import { NavigationGrower } from '@/app/(Grower)/components/Navigation';
// import { Grade } from '@/app/(Grower)/components/grades/Form';
import { IParamsProps } from '@/app/interfaces';
import { redirect } from 'next/navigation';
// import MainNavigationHeader from '@/components/MainNavigationHeader';
// import { applyAuthorizationOperations } from '@/lib/auth-checking';

const GradeDetail: FC<IParamsProps> = async ({ params }: { params: { id: string } }) => {
  redirect('/grower/home');
  // const me = await applyAuthorizationOperations();

  // return (
  //   <main className="flex min-h-screen">
  //     <section
  //       className="flex flex-col w-full"
  //       style={{
  //         background: 'no-repeat center/100% url("/fruits/marketplace-dashboard-bg.png")',
  //       }}
  //     >
  //       <MainNavigationHeader me={me} />
  //       <NavigationGrower />
  //       <Grade params={params} />
  //     </section>
  //   </main>
  // );
};

export default GradeDetail;
