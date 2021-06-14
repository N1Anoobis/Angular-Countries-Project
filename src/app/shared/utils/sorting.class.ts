export default class Sorting {
  static ascending = (a: unknown, b: unknown, propName: string): number => {
    if (typeof a[propName] === 'string' && typeof b[propName] === 'string') {
      return a[propName].localeCompare(b[propName]);
    } else if (
      typeof a[propName] === 'number' &&
      typeof b[propName] === 'number'
    ) {
      return a[propName] - b[propName];
    } else {
      return b[propName] - a[propName];
    }
  };

  static descending = (a: unknown, b: unknown, propName: string): number => {
    if (typeof a[propName] === 'string' && typeof b[propName] === 'string') {
      return b[propName].localeCompare(a[propName]);
    } else if (
      typeof a[propName] === 'number' &&
      typeof b[propName] === 'number'
    ) {
      return b[propName] - a[propName];
    } else {
      return a[propName] - b[propName];
    }
  };
}
