/**
 * converts all keys in an object toLowerCase()
 */
export const keysToLowerCase = (o = {}) => {
  return Object.keys(o).reduce((c, k) => ((c[k.toLowerCase()] = o[k]), c), {});
};
