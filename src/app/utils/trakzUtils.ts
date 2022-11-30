import { formatDate } from '@angular/common';

export function isOverdue(date: Date) {
  const today = new Date();
  const dueDate = new Date(date);
  return !isToday(dueDate) && dueDate < today;
}

export function isToday(date: Date | string) {
  const today = new Date();
  const dueDate = new Date(date);
  return (
    dueDate.getDate() === today.getDate() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getHours() <= 23 &&
    dueDate.getMinutes() <= 59 &&
    dueDate.getSeconds() <= 59
  );
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
