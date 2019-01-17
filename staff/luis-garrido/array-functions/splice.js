/**
 * Abstraction of splice.
 * 
 * The splice() method changes the contents of an array by removing or replacing
 * existing elements and/or adding new elements.
 * 
 * @param {Array}  array - array to slice
 * @param {Number} begin - index from which you start slicing, default value = 0
 * @param {Number} end - index before function stop slicing, default value = array.length
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {Array} array - new array
 * 
 */

function slice(array,begin,end) {
    if (!(array instanceof Array))
        throw new TypeError(arguments[0] + ' is not an array');
        console.log(arguments);
    
    begin = begin === undefined ? 0 : (begin < 0 ? array.length + begin : begin);
    end = end === undefined ? array.length : (end < 0 ? array.length + end : end);

    var result = [];
    count = 0;

    for (var i = begin; i<end; i++) {
        result[count] = array[i];
        count++;
    }
    return result;
}

var array = [1,2,3,'pizza', 'morcilla'];
res = slice(array,2);
console.log(array); 
console.log(res);