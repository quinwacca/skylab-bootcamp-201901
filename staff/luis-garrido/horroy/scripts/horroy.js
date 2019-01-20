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

Horroy.prototype.push = function (value) {
    this[this.length++] = value;
};

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
 * ---------------------   FILL   -----------------------------
 * 
 * Fills an array from one position to other.
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} start 
 * @param {number} end 
 * 
 * @throws {Error} - If too many arguments (> 4)
 * @throws {TypeError} - If array is not an array
 */

Horroy.prototype.fill = function(value, start, end) {
    // if (arguments.length > 4) throw Error('too many arguments');
    // expect(arguments.length).toBeLessThanOrEqual(4);
    // expect(arguments[0] instanceof Array).toBe(true);
    // if (!(array instanceof Array))
    //     throw new TypeError(array + ' is not an array');

    start = start === undefined ? 0 : (start < 0 ? array.length + start : start);
    end = end === undefined ? array.length : (end < 0 ? array.length + end : end);
debugger
    for (var i = start; i < end; i++)
        this[i] = value;

    return array;
};