import { formatDate } from '@angular/common';

import { PageTitles, pageTitles } from '@/models/navLabel';
import { Task, TaskStatus } from '@/models/task';

export function isOverdue(date: Date) {
  const today = new Date();
  const dueDate = new Date(date);
  return !isToday(dueDate) && dueDate < today;
}

export function isToday(date: Date | string) {
  const today = new Date();
  const comparedDate = new Date(date);
  return (
    comparedDate.getDate() === today.getDate() &&
    comparedDate.getMonth() === today.getMonth() &&
    comparedDate.getFullYear() === today.getFullYear() &&
    comparedDate.getHours() <= 23 &&
    comparedDate.getMinutes() <= 59 &&
    comparedDate.getSeconds() <= 59
  );
}

export function isThisYear(date: Date) {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function capitalizeFirstLetterOfEachWord(string: string) {
  return string
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
}

// my-day => My Day // my_day => My Day // my day => My Day // myDay => MyDay
export function slugToTitle(str: string) {
  return str
    .replace(/^\w|[A-Z]|\b\w/g, (word) => word.toUpperCase())
    .replace(/[- ]+/g, ' ');
}

export async function createHash(str: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const res = await crypto.subtle.digest('SHA-256', data);

  // decode the hash to a hex string
  const hashArray = Array.from(new Uint8Array(res));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function chooseDateToDisplay(date: Date | string) {
  const dueDate = new Date(date);
  if (isToday(dueDate)) {
    return 'Today';
  }
  if (isTomorrow(dueDate)) {
    return 'Tomorrow';
  }
  if (isYesterday(dueDate)) {
    return 'Yesterday';
  }
  const format =
    dueDate.getFullYear() === new Date().getFullYear()
      ? 'EEE, MMM d'
      : 'EEE. MMM d, y';
  return formatDate(dueDate, format, 'en-US');
}

export function isTomorrow(dueDate: Date) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    dueDate.getDate() === tomorrow.getDate() &&
    dueDate.getMonth() === tomorrow.getMonth() &&
    dueDate.getFullYear() === tomorrow.getFullYear() &&
    dueDate.getHours() <= 23 &&
    dueDate.getMinutes() <= 59 &&
    dueDate.getSeconds() <= 59
  );
}

export function isYesterday(dueDate: Date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    dueDate.getDate() === yesterday.getDate() &&
    dueDate.getMonth() === yesterday.getMonth() &&
    dueDate.getFullYear() === yesterday.getFullYear() &&
    dueDate.getHours() <= 23 &&
    dueDate.getMinutes() <= 59 &&
    dueDate.getSeconds() <= 59
  );
}

export function filterByStatusPredicate(status: TaskStatus) {
  return (task: Task) => {
    if (status === TaskStatus.completed) return task.isCompleted;
    if (status === TaskStatus.uncompleted) return !task.isCompleted;
    if (!task.dueDate) return false;
    const today = new Date();
    if (status === TaskStatus.earlier) return task.dueDate < today;
    if (status === TaskStatus.today) return isToday(task.dueDate);
    if (status === TaskStatus.tomorrow) return isTomorrow(task.dueDate);
    return task.dueDate.getTime() > today.getTime();
  };
}

export function filterFolderPredicate(folder: PageTitles | string) {
  if (folder === pageTitles.Planned) {
    return (task: Task) => !!task.dueDate;
  }
  if (folder === pageTitles.MyDay) {
    return (task: Task) => task.isInMyDay;
  }
  if (folder === pageTitles.Important) {
    return (task: Task) => task.isImportant;
  }
  return (task: Task) => task.folderName.toLowerCase() === folder.toLowerCase();
}

export function isFolderExists(
  folderName: string,
  tasksByFolder: Record<string, Task[]>,
) {
  return folderName.toLowerCase() in tasksByFolder;
}

export function getFlatTasks(tasksByFolder: Record<string, Task[]>) {
  return Object.values(tasksByFolder) //
    .flat(1)
    .sort(sortTasks);
}

export function toDateString(date: Date): string {
  return new Date(date)
    .toISOString()
    .replace(/[.:a-zA-Z]/g, '')
    .replace(/ /g, '')
    .replace(/-/g, '');
}

export function sortTasks(a: Task, b: Task): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export function taskGeneratedId(task: Task): string {
  const d1 = toDateString(task.createdAt);
  const d2 = toDateString(task.updatedAt);
  return `${d1}${d2}${task.folderName}`;
}

/**
 * - If today show time only (h:mm a) else show date and time (EEE, MMM d y, h:mm a)
 * - If yesterday show 'Yesterday at ' + time (h:mm a)
 * - If this year show date and time (EEE, MMM d, h:mm a)
 * - else show date only (EEE, MMM d y)
 * @example: Today at 2:30 PM, Yesterday at 2:30 PM, Mon, Jan 1, 2021, 2:30 PM, Mon, Jan 1, 2021
 * @param date
 * @param locale
 *  */
export function passedTimeFormatted(date: string | Date, locale = 'en-US') {
  const usedDate = new Date(date);
  const formatOpt: Record<
    'today' | 'yesterday' | 'thisYear' | 'other',
    Intl.DateTimeFormatOptions
  > = {
    today: { hour: 'numeric', minute: 'numeric' },
    yesterday: { hour: 'numeric', minute: 'numeric' },
    thisYear: { weekday: 'short', hour: 'numeric', minute: 'numeric' },
    other: {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
  };
  const toDayYesterdayFmt = new Intl.DateTimeFormat(locale, formatOpt.today);
  if (isToday(usedDate)) {
    return `Today at ${toDayYesterdayFmt.format(usedDate)}`;
  }
  if (isYesterday(usedDate)) {
    return `Yesterday at ${toDayYesterdayFmt.format(usedDate)}`;
  }
  const thisYearFmt = new Intl.DateTimeFormat(locale, formatOpt.thisYear);
  if (isThisYear(usedDate)) {
    return thisYearFmt.format(usedDate);
  }
  const otherFmt = new Intl.DateTimeFormat(locale, formatOpt.other);
  return otherFmt.format(usedDate);
}
