// export type pageTitles = keyof typeof PageTitles;
import { DEFAULT_FOLDER } from '@/models/task';

export const pageTitles = {
  MyDay: DEFAULT_FOLDER.MyDay,
  Important: DEFAULT_FOLDER.Important,
  Planned: DEFAULT_FOLDER.Planned,
  Tasks: DEFAULT_FOLDER.Tasks,
  Projects: DEFAULT_FOLDER.Projects,
  Home: '',
} as const;

export type PageTitles = (typeof pageTitles)[keyof typeof pageTitles];

export interface INavLink {
  label: PageTitles;
  link: string;
  icon: string;
  count: number;
}
