/**
 * 
 * @param {*} arr 
 * @param {*} value 
 * @param {*} indexStart 
 * @param {*} indexEnd 
 */

function fill(arr,value, indexStart, indexEnd) {
    if(!(array.instanceof array))

	indexStart = indexStart === undefined? 0 : (indexStart < 0 ? arr.length+indexStart : indexStart);
	indexEnd = indexEnd === undefined? 0 : (indexEnd < 0 ? arr.length+indexEnd : arr.length-1);
    for (var i = indexStart; i<(indexEnd); i++) {
        arr[i] = value;
    }
}
var array = [2,4,5,6,7];
fill(array,5,3,3);
console.log(array);
