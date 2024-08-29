import { ComponentType } from 'react';

export interface ITabsConfig {
  header?: string;
  position?: string;
  Component?: ComponentType<any>;
  data?: any | any[];
}
