/**
 * converts all keys in an object toLowerCase()
 */
export const keysToLowerCase = (o = {}) => {
  return Object.keys(o).reduce((c, k) => ((c[k.toLowerCase()] = o[k]), c), {});
};

/**
 * local use only - create a fake promise
 * @param {Integer} timeout time in milliseconds
 * @returns Promise
 */
export const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
