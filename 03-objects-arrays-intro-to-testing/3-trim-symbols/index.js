/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let newString = '', countIteration = 0, countMatching = 0;
  const arrOfSymbols = string.split('');

  if (size === undefined) {
    return string;
  }

  for (let i = 0; i < arrOfSymbols.length; i++) {
    for (let j = i - 1; countIteration < size; j--) {
      if (arrOfSymbols[j] === arrOfSymbols[i]) {
        countMatching++;
      }
      countIteration++;
    }
    if (countMatching < size) {
      newString += arrOfSymbols[i];
    }
    countIteration = countMatching = 0;
  }

  return newString;
}
