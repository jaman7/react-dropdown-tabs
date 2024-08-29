import { Suspense, lazy } from 'react';
import data from '../data.json';
import './Employers.scss';
import { IEmployers } from './Employers.model';
import AccordionTabs from 'common/accordionTabsVertical/AccordionTabsVertical';
import Loader from 'common/Loader/Loader';

const EmployersContent = lazy(() => import('./EmployersContent'));

const Employers = () => {
  const employersData: IEmployers[] = data ?? [];

  const tabsConfig = () => {
    const uniquePositions = [...new Set(employersData?.map(el => el.position))];

    return uniquePositions?.map(el => {
      const filteredData = employersData?.filter(item => item.position === el)?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
      const header = el
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        header: header ?? '',
        position: el,
        Component: (props: any) => <EmployersContent {...props} />,
        data: filteredData,
      };
    });
  };

  return (
    <div>
      <h2>Lista pracowników</h2>
      <AccordionTabs config={tabsConfig()} />
    </div>
  );
};

export default Employers;
