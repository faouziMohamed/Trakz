export enum PageTitles {
  MyDay = 'My Day',
  Important = 'Important',
  Planned = 'Planned',
  Tasks = 'Tasks',
  Projects = 'Projects',
  Home = '',
}

export interface INavLink {
  label: PageTitles;
  link: string;
  icon: string;
  count: number;
}
