export class ObjectManipulator {
  static safeDelete<T extends object, K extends keyof T>(obj: T, key: K): void {
    if (!(key in obj)) {
      console.warn(`Property ${String(key)} does not exist on the object.`);
      return;
    }

    delete obj[key];
  }

  static exclude<T extends object, K extends keyof T>(obj: T, keys: K[]): Partial<T> {
    return Object.keys(obj).reduce((acc, key) => {
      if (!keys.includes(key as K)) {
        acc[key] = obj[key];
      }

      return acc;
    }, {} as Partial<T>);
  }
}
