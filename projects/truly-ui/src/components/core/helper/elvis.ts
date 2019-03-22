/**
 * Undefined-safe function to access the property given by path parameter
 * @param object The object to read from
 * @param path The path to the property
 */
export function elvis(object: any, path: string): any | undefined {
  return path ? path.split('.').reduce((value, key) => value && value[key], object) : object;
}
