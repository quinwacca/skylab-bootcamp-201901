function indexOf(arr, value, startIndex) {
    startIndex = startIndex? startIndex : 0
	for (var i = startIndex; i<arr.length; i++) {
        if (arr[i]===value) return i;
		else if(i===arr.length-1) return -1;
    }
}
var array = [1,2,3,4,5,3,7];
var indexFound = indexOf(array,3,3);
console.log(indexFound);