import { redirect } from 'next/navigation';
import { FC } from 'react';
// import MainNavigationHeader from '@/components/MainNavigationHeader';
// import { NavigationGrower } from '../../components/Navigation';
// import { GradeTable } from '../../components/grades/Table';
// import { applyAuthorizationOperations } from '@/lib/auth-checking';

const GradePage: FC = async () => {
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
  //       <GradeTable />
  //     </section>
  //   </main>
  // );
};

export default GradePage;
