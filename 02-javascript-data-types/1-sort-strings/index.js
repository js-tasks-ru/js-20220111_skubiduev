/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const copyOfArr = [...arr];
  copyOfArr.sort((string1, string2) => {
    const sortedNumber = string1.localeCompare(string2, ['ru', 'en'], {caseFirst: 'upper'});
    return param === 'asc' ? sortedNumber : -sortedNumber;
  });
  return copyOfArr;
}
