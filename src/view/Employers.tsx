import { lazy, Suspense } from 'react';
import { IEmployers } from './Employers.model';
import AccordionTabs from 'common/accordionTabsVertical/AccordionTabsVertical';
import data from '../data.json';
import './Employers.scss';

const EmployersContent = lazy(() => import('./EmployersContent'));

const getTabsConfig = (employersData: IEmployers[]) => {
  const uniquePositions =
    [...new Set(employersData?.map(el => el.position))]?.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) ?? [];

  return uniquePositions?.map(position => {
    const filteredData = employersData?.filter(item => item.position === position)?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
    const header = position
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      header: header ?? '',
      position,
      Component: (props: any) => <EmployersContent {...props} />,
      data: filteredData,
    };
  });
};

const Employers = () => {
  const employersData: IEmployers[] = data ?? [];
  const tabsConfig = getTabsConfig(employersData);

  return (
    <div>
      <h2>Lista pracowników</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <AccordionTabs config={tabsConfig} />
      </Suspense>
    </div>
  );
};

export default Employers;
