function Horroy() {
    this.length = arguments.length;

    if (arguments.length)
        for (var i = 0; i < arguments.length; i++)
            // this.push(arguments[i]); // WARN should avoid (if possible) calling member methods in a constructor (push)
            this[i] = arguments[i];
}

Horroy.from = function (value) {
    var horr = new Horroy;

    horr.length = value.length;

    if (typeof value === 'string') 
        for (var i = 0; i < value.length; i++)
            horr[i] = value[i];

    return horr;
};

// Horroy.prototype.push = function (value) {
//     this[this.length++] = value;
// };

Horroy.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++)
        callback(this[i]);
};

Horroy.prototype.toString = function() {
    var string = '';

    for(var i = 0; i < this.length - 1; i++)
        string += this[i] + ',';
    
    string += this[this.length - 1];

    return string;
};

/**
 * ----------------------------------------   FILL   ---------------------------------------------------
 * 
 * Fills an horroy from one position to other.
 * 
 * @param {*} value 
 * @param {number} start 
 * @param {number} end 
 * 
 */

Horroy.prototype.fill = function(value, start, end) {
    if (arguments.length > 3)
        throw Error('too many arguments');
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not a horroy');

    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

    for (var i = start; i < end; i++)
        this[i] = value;
    return this;
};

/**
 * ----------------------------------------- FIND ----------------------------------------------------
 * 
 * Returns the value of the first element in the horroy that satisfies the provided testing function.
 * Otherwise undefined is returned.
 * 
 * @param {*} value 
 * @param {function} callback 
 *  
 * @return {*} value
 * 
 */

Horroy.prototype.find = function(callback) {
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not a horroy');
    if (!(callback instanceof Function))
        throw new TypeError(callback + ' is not a function');

    for (var i = 0 ; i<this.length ; i++) {
        if (callback(this[i])) return this[i];
    }
}

/**
 * --------------------------------------- INDEXOF -------------------------------------------------
 * 
 * The indexOf() method returns the index within the calling String object of the first occurrence
 * of the specified value, starting the search at fromIndex. Returns -1 if the value is not found.
 * 
 * @param {*} value 
 * @param {number} startIndex - from which index of the horroy starts to search, default = 0 
 *  
 * @return {number} value - index of element found, or -1
 * 
 */


Horroy.prototype.indexOf = function(value, startIndex) {
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not a horroy');
    
    startIndex = startIndex === undefined ? 0 : (startIndex < 0 ? this.length + startIndex : startIndex);

	for (var i = startIndex; i<this.length; i++) {
        if (this[i]===value) return i;
		else if(i===this.length-1) return -1;
    }
}

/**
 * ---------------------------------------- JOIN ---------------------------------------------------
 * 
 * The join() method creates and returns a new string by concatenating all of the elements in an horroy
 * (or an horroy-like object), separated by commas or a specified separator string. If the horroy has only
 * one item, then that item will be returned without using the separator.
 * 
 * @param {String} separator - default value = ","
 * 
 * @return {String} value - every item in horroy joined with the separator
 * 
 */

Horroy.prototype.join = function(separator) {
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not a horroy');

    separator = separator === null ? "null" : (separator === undefined ? "," : separator);
    separator = separator.toString();
    var stringed = '';

    for (var i = 0; i<this.length; i++) {
        stringed+=this[i]+separator;
        if (i===this.length-2) {
            i++;
            stringed+=this[i];
        }
    }
    return stringed;
}

/**
 * -------------------------------------- POP -----------------------------------------------------
 * 
 * The pop() method removes the last element from an horroy and returns that element.
 * This method changes the length of the horroy.
 *  
 * @return {*} value - element deleted from horroy
 * 
 */

Horroy.prototype.pop = function() {
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not a horroy');
    
    var poped = this[this.length-1];
    delete this[this.length-1];
    this.length--;
    
    return poped;
}

/**
 * ------------------------------------- PUSH -----------------------------------------------------
 * 
 * The push() method adds one or more elements to the end of an horroy and returns
 * the new length of the horroy.
 *
 * @return {number} length - length of the resulting horroy
 * 
 */

Horroy.prototype.push = function() {
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not an horroy');
    
    var start = this.length;
    for (var i = 0; i<arguments.length; i++) {
        this[start++] = arguments[i];
        this.length++;
    }
    return this.length;
}

/**
 * -------------------------------- REDUCE ----------------------------------------------
 * 
 * The reduce() method executes a reducer function (that you provide)
 * on each member of the horroy resulting in a single output value.
 * 
 * @param {Function} callback - function to accomplish reduction
 *
 * @return {*} value - reduction
 * 
 */

// [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, horroy) {
//     return accumulator + currentValue;
//   });

// Horroy.prototype.reduce = function() {
//     WIP
// }

/**
 * ----------------------------- REVERSE ------------------------------------------------
 * 
 * The reverse() method reverses an horroy in place. The first horroy element
 * becomes the last, and the last horroy element becomes the first.
 * 
 * @return {Horroy} horroy - a reference to the new horroy
 * 
 */

Horroy.prototype.reverse = function() {
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not an horroy');

    var temp;
    count=0;

    for (var i = this.length-1; i>this.length/2-1; i--) {
        temp=this[count];
        this[count++]=this[i];
        this[i]=temp;
    }
    
    return this;

}

/**
 * --------------------------------------- SLICE --------------------------------------------------
 * 
 * The slice() method returns a shallow copy of a portion of an horroy into a new horroy object
 * selected from begin to end (end not included). The original horroy will not be modified.
 * 
 * @param {Number} begin - index from which you start slicing, default value = 0
 * @param {Number} end - index before function stop slicing, default value = horroy.length
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {Horroy} horroy - new horroy
 * 
 */

Horroy.prototype.slice = function(begin,end) {
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not an horroy');
    
    begin = begin === undefined ? 0 : (begin < 0 ? this.length + begin : begin);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

    var result = new Horroy();
    count = 0;

    for (var i = begin; i<end; i++) {
        result[count++] = this[i];
        result.length++;
    }
    return result;
}

/**
 * ------------------------------------------- SPLICE -------------------------------------------
 * 
 * The splice() method changes the contents of an horroy by removing or replacing
 * existing elements and/or adding new elements.
 * 
 * @param {Number} begin - * index from which you start deleting items
 *                          if bigger than horroy.length, then begin = 0
 *                          If negative, will begin that many elements
 *                          from the end of the horroy (with origin -1)
 * @param {Number} removeItems - (optional) number of items to delete. default = horroy.length - begin
 *                          if bigger than horroy.length - begin, then = horroy.length - begin
 *                          
 * @param {arguments} arguments - (optional) items to add to horroy
 *                          if no elements to add, splice will only remove elements
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {Horroy} horroy - A horroy containing the deleted elements. If only one element is removed,
 *                         a horroy of one element is returned. If no elements are removed,
 *                         an empty horroy is returned.
 * 
 */

Horroy.prototype.splice = function() {
    if (!(this instanceof Horroy))
        throw new TypeError(this + ' is not an horroy');
    if (isNaN(arguments[0]))
        throw new TypeError(arguments[0] + ' is not a number');
    
    arguments[0] = arguments[0] >= arguments.length ? 0 : (arguments[0] < 0 ? this.length + arguments[0] : arguments[0]);
    arguments[1] = isNaN(arguments[1]) ? 0 : (arguments[1] > this.length-begin ? this.length-begin : arguments[1]);
        
    var horroyOriginal = this;
    var begin = arguments[0];
    var end = arguments.length;
    var elementsToDelete = arguments[1];
    var firstItemIndex = 2;
    var returnedHorroy = new Horroy();
        
    // -- DELETE -------------------------

    if (elementsToDelete) {
        indexReturned = 0;
        for (var i = begin; i<=end; i++) {
            if (i<begin+elementsToDelete) {
                returnedHorroy[indexReturned++] = horroyOriginal[i];
                returnedHorroy.length++;
            }
            horroyOriginal[i] = horroyOriginal[i+elementsToDelete];
        }
        for (var i= begin; i<=end; i++) {
            delete horroyOriginal[i+end];
        }
        horroyOriginal.length = horroyOriginal.length-(elementsToDelete);

    }
    
    // -- ADD ----------------------------

    if (arguments.length>2) {
        var count=0;
        for (var i = firstItemIndex; i<end; i++) {
            for (var j = horroyOriginal.length; j>=i; j--) {
                horroyOriginal[j]=horroyOriginal[j-1];
            }   
            horroyOriginal[begin+count++]=arguments[i];
            this.length++;
        }
    }

    return returnedHorroy;
}

/**
 * ------------------------------------------- SOME -------------------------------------------
 * 
 * The some() method tests whether at least one element in the horroy passes
 * the test implemented by the provided function.
 * 
 * @param {Function} callback - * Function to test for each element, taking three arguments:
 *                          element - The current element being processed in the horroy.
 *                          index - (optional) The index of the current element being processed in the horroy.
 *                          horroy - (optional) The horroy some() was called upon.
 * @param {Horroy} thisArg - (optional) Value to use as this when executing callback.
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {Boolean} returnBoolean - true if the callback function returns a truthy value for any horroy element; 
 *                          otherwise, false.
 * 
 */

Horroy.prototype.some = function(callback) {
    if (!(callback instanceof Function))
        throw new TypeError(callback + ' is not a function');

    for (var i = 0; i<this.length; i++) {
        if (callback(this[i])) return true;
    }
    return false;
}

/**
 * ----------------------------------------- FILTER -------------------------------------------
 * 
 * The filter() method creates a new horroy with all elements that pass the test implemented
 * by the provided function.
 * 
 * @param {Function} callback - * Function is a predicate, to test each element of the horroy.
 *                          Return true to keep the element, false otherwise. It accepts three arguments:
 *                          element - The current element being processed in the horroy.
 *                          index - (optional) The index of the current element being processed in the horroy.
 *                          horroy - (optional) The horroy filter() was called upon.
 * @param {Horroy} thisArg - (optional) Value to use as this when executing callback.
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {Horroy} A new horroy with the elements that pass the test. If no elements pass the test,
 *                          an empty horroy will be returned.
 * 
 */

Horroy.prototype.filter = function(callback) {
    if (!(callback instanceof Function))
        throw new TypeError(callback + ' is not a function');

    var filteredHorroy = new Horroy();
    count = 0;
    for (var i = 0; i<this.length; i++) {
        if (callback(this[i])) {
            filteredHorroy[count++] = this[i];
        };
    }
    return false;
}
