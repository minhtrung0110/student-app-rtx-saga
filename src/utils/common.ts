/**
 * Generates a random ID string containing 6 alphanumeric characters.
 *
 * @returns {string} A random ID string.
 */
export function generateRandomID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}

/**
 * Returns an array containing the values associated with the given keys from the provided object.
 * If the keys are not present in the object, an empty array will be returned.
 *
 * @param {object} myObject - The input object from which to extract values.
 * @param {string} keyA - The first key to look for in the object.
 * @param {string} keyB - The second key to look for in the object.
 * @returns {any[]} An array containing values associated with keyA and keyB if found, otherwise an empty array.
 */
export function getUserTask(myObject, keyA, keyB) {
  const array: any[] = [];
  if (myObject.hasOwnProperty(keyA)) {
    array.push(myObject[keyA]);
    if (myObject.hasOwnProperty(keyB)) {
      array.push(myObject[keyB]);
    } else return array;
  }
  return array;
}
