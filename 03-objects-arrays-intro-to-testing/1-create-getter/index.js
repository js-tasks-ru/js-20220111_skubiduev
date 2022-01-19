/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arrOfPath = path.split('.');

  return function (object) {
    let endingObject = object;

    for (let i = 0; i < arrOfPath.length; i++) {
      if (endingObject === undefined) {
        return;
      } else if (i === arrOfPath.length - 1) {
        return endingObject[arrOfPath[i]];
      }
      endingObject = endingObject[arrOfPath[i]];
    }
  };
}
