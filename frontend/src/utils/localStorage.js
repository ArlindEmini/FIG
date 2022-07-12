/**
 * shorten function to get local storage item
 * @param {String} path
 * @returns value of a path in localStorage
 */
export const getItem = (path = "") => localStorage.getItem(path);

/**
 * shorten function to store data in localStorage
 * value will be converted to string before storing
 *
 * @param {String} path
 * @param {any} value
 */
export const setItem = (path = "", value = null) => {
  if (typeof value == "number") {
    localStorage.setItem(path, value);
  } else {
    localStorage.setItem(path, String(value));
  }
};
