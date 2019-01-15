function find(arr, func) {
    for (var i = 0 ; i<arr.length ; i++) {
		if (func(arr[i])) return arr[i];
    }
}
var array=[2,3,4,5,6,7];
var finded = find(array,function(element){return element>8});
console.log(finded);