/**
 * Abstraction of join.
 * 
 * The join() method creates and returns a new string by concatenating all of the elements
 * in an array (or an array-like object), separated by commas or a specified separator string. 
 * If the array has only one item, then that item will be returned without using the separator.
 * 
 * @param {Array} arr 
 * @param {*} value 
 * @param {function} callback 
 *  * 
 * @throws {Error} - If too many arguments (> 2)
 * @throws {TypeError} - If array is not an array
 * 
 * @return {*} value
 * 
 */

function find(arr, callback) {
    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');
    if (!(callback instanceof Function))
        throw new TypeError(callback + ' is not a function');

    for (var i = 0 ; i<arr.length ; i++) {
        if (callback(arr[i])) return arr[i];
    }
}