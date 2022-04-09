/**
 * @param {String} String
 * @returns {Boolean} True if that string contains special characters
 *  */
export const hasSpecialCharacters = (str) => {
  const reg = /^[A-Za-z0-9 ]+$/;

  return !reg.test(str);
};

/**
 * @param {String} name
 * @returns Initials of user
 */
export function getInitials(name) {
  if (!name || typeof name !== "string" || /^\s*$/.test(name)) return "-";

  if (name.indexOf(",") > 0)
    name =
      name.substring(name.indexOf(",") + 1, name.length) +
      " " +
      name.substring(0, name.indexOf(","));

  var nameArr = name
    .trim()
    .split(" ")
    .filter(function (n) {
      return n.length > 1 && n[0] !== ")" && n[0] !== "(";
    });

  var a = nameArr.length > 0 ? nameArr[0].charAt(0) : "",
    b = nameArr.length > 1 ? nameArr[nameArr.length - 1].charAt(0) : "";

  return a + b;
}
