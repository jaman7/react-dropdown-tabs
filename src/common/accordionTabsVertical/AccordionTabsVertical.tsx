import React, { Suspense, lazy } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ITabsConfig } from './AccordionTabsVertical.model';
import Loader from '../Loader/Loader';

interface IProps {
  config?: ITabsConfig[];
  onTabOpen?: (index?: number | null) => void;
}

const AccordionTabsVertical: React.FC<IProps> = ({ config = [] }) => {
  return (
    <Accordion>
      {config &&
        config?.map((tab, index) => {
          const { header = '', Component, ...restProps } = tab || {};
          const LazyComponent = Component ? lazy(() => Promise.resolve({ default: Component })) : null;

          return (
            <AccordionTab header={header} key={index}>
              {LazyComponent ? (
                <Suspense fallback={<Loader />}>
                  <LazyComponent {...restProps} />
                </Suspense>
              ) : null}
            </AccordionTab>
          );
        })}
    </Accordion>
  );
};

export default React.memo(AccordionTabsVertical);
