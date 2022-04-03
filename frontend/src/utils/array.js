/**
 *
 * @param {Array} array1
 * @param {Array} array2
 * @param {String} property1
 * @param {String} property2 - If not passed will be checked by property1
 *
 * @returns compares two arrays of objects and remove duplicates by value of property
 *
 * @example array1 = existingValues, array2 = arrayToRemoveDuplicates, property = checkByThisProperty
 */
export const removeDuplicateObjectsByProperty = (
  array1,
  array2,
  property1,
  property2 = property1
) => {
  array2 = array2.filter((item) => {
    for (let i = 0, len = array1.length; i < len; i++) {
      if (
        (array1[i][property1] && String(array1[i][property1]).toLowerCase()) ==
        (item[property2] && String(item[property2]).toLowerCase())
      ) {
        return false;
      }
    }

    return true;
  });

  return array2;
};
