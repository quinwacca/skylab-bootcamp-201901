/**
 * Abstraction of reverse.
 * 
 * The reverse() method reverses an array in place. The first array element
 * becomes the last, and the last array element becomes the first.
 * 
 * @param {Array} arr - array to be joined
 * @param {String} separator - default value = ","
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {String} value - every item in array joined with the separator
 * 
 */

function join(arr, separator) {
    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');
    separator = separator === null ? "null" : separator;
    separator = separator === undefined ? "," : separator;
    separator = separator.toString();
    var stringed = '';
    for (var i = 0; i<arr.length; i++) {
        stringed+=arr[i]+separator;
        if (i===arr.length-2) {
            i++;
            stringed+=arr[i];
        }
    }
    return stringed;
}

// var array = [1,2,3,4,5,3,7];
// var indexFound = join(array,1);
// console.log(indexFound);