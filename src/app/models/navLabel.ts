// export type pageTitles = keyof typeof PageTitles;
export const pageTitles = {
  MyDay: 'My Day',
  Important: 'Important',
  Planned: 'Planned',
  Tasks: 'Tasks',
  Projects: 'Projects',
  Home: '',
} as const;

export type PageTitles = (typeof pageTitles)[keyof typeof pageTitles];

export interface INavLink {
  label: PageTitles;
  link: string;
  icon: string;
  count: number;
}
