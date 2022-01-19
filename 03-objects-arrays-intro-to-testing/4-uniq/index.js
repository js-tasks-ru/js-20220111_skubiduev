/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  const newArray = [];

  if (arr === undefined) {
    return newArray;
  }

  for (let i = 0; i < arr.length; i++) {
    let matching = false;

    for (let j = 0; j < i; j++) {
      if (arr[j] === arr[i]) {
        matching = true;
      }
    }

    if (!matching) {
      newArray.push(arr[i]);
    }
  }

  return newArray;
}
